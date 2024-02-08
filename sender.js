
const dgram = require("dgram");
const snmp = require('net-snmp');
//const { parser } = require("syslogd");


function Reader(data) {
  //console.log(data);
  if (!data || !Buffer.isBuffer(data)) {
    throw new TypeError("data must be a node Buffer");
  }

  this._buf = data;
  this._size = data.length;

  // These hold the "current" state
  this._len = 0;
  this._offset = 0;

  const self = this;
  Object.defineProperty(this, "length", {
    get: () => self._len,
  });
  Object.defineProperty(this, "offset", {
    get: () => self._offset,
  });
  Object.defineProperty(this, "remain", {
    get: () => self._size - self._offset,
  });
  Object.defineProperty(this, "buffer", {
    get: () => self._buf.slice(self._offset),
  });
}
function parseTrapPacket(buffer) {
  const pkt = {};
  const reader = new Reader(buffer);

  //reader.readSequence();
  pkt.version = reader.readInt(); // 02 01 00
  pkt.community = reader.readString(); // 04 06 70 75 62 6c 69 63
  pkt.type = reader.readSequence(); // a4
  // 0x06, 0x0c, 0x2b, 0x06, 0x01, 0x04, 0x01, 0x81, 0x91, 0x28, 0x02, 0x02, 0x47, 0x64
  pkt.enterprise = reader.readOID();
  const bytes = reader.readString(64, true); // 0x40, 0x04, 0xc0, 0xa8, 0x17, 0x0a,
  pkt.agentAddr = `${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}`;
  pkt.specific = reader.readInt(); // 0x02, 0x01, 0x06,
  pkt.generic = reader.readInt(); // 0x02, 0x01, 0x0a
  pkt.upTime = reader.readTag(67); //
  pkt.varbinds = readVarbinds(reader);
  return pkt;
}
const trapMapping = {
  0: "coldStart",
  1: "warmStart",
  2: "linkDown",
  3: "linkUp",
  4: "authenticationFailure",
  5: "egpNeighborLoss",
  6: "enterpriseSpecific",
};
//console.log(trapMapping);
const trapReceiver = (port) => {
  const server = dgram.createSocket("udp4");
  server.on("error", (err) => {
    console.error(err);
    server.close();
  });

  server.on("message", (msg, remote) => {
    // console.log(remote);
    const trap = parseTrapPacket(msg)
    const {
      version,
      community,
      enterprise,
      specific,
      generic,
      uptime,
      varbinds,
    } = trap;

    const trapMsg = {
      sourceIP: remote.address,
      version,
      community,
      enterprise,
      specific,
      generic,
      uptime: uptime !== null ? uptime : 0,
      varbinds: JSON.stringify(varbinds),
      msg: `Port ${generic} - ${trapMapping[specific]}`,
    };
    console.log(trapMsg.sourceIP);
  
  });

  server.on("listening", () => {
    console.log(`Trap server start listen on : ${port}`);
  });
  server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(55954,"10.0.50.151");
};

trapReceiver(5162);





// const dgram = require('dgram');

// const trapMapping = {
//   0: 'coldStart',
//   1: 'warmStart',
//   2: 'linkDown',
//   3: 'linkUp',
//   4: 'authenticationFailure',
//   5: 'egpNeighborLoss',
//   6: 'enterpriseSpecific'
// };

// function parseTrapPacket(msg) {
//   const decoded = snmp.decode(msg);
//   const varbinds = decoded.varbinds;
//   const trapMsg = {};

//   varbinds.forEach(function(varbind) {
//     if (varbind.oid === '1.3.6.1.6.3.1.1.4.1.0') {
//       trapMsg.enterprise = varbind.value.toString();
//     } else if (varbind.oid === '1.3.6.1.6.3.1.1.4.3.0') {
//       trapMsg.agentAddr = varbind.value.toString();
//     } else if (varbind.oid === '1.3.6.1.6.3.1.1.4.4.0') {
//       trapMsg.generic = varbind.value.toString();
//     } else if (varbind.oid === '1.3.6.1.6.3.1.1.4.5.0') {
//       trapMsg.specific = varbind.value.toString();
//     } else if (varbind.oid === '1.3.6.1.6.3.1.1.4.6.0') {
//       trapMsg.uptime = varbind.value.toString();
//     } else if (varbind.oid === '1.3.6.1.6.3.1.1.4.11.0') {
//       trapMsg.varbinds = varbind.value.toString();
//     }
//   });

//   return trapMsg;
//   //console.log(trapMsg);
// }

// function Receiver(port, onTrap, onError, onStart) {
//   this.port = port;
//   this.socket = null;
//   this.isRunning = false;
//   this.onTrap = onTrap;
//   this.onError = onError;
//   this.onStart = onStart;
// }
// //console.log(Receiver);

// Receiver.prototype.start = function start() {
//   try {
//     const self = this;
//     if (self.isRunning) return;
//     const socket = (self.socket = dgram.createSocket('udp4'));
//     socket.on('error', (err) => {
//       console.error(err);
//       socket.close();
//       self.isRunning = false;
//       if (self.onError) {
//         self.onError(err);
//       }
//     });
//     socket.on('message', (msg, remote) => {
//       if (self.onTrap) {
//         const pkt = parseTrapPacket(msg);
//         self.onTrap(remote, pkt);
//       }
//     });
//     socket.on('listening', () => {
//       self.isRunning = true;
//       if (self.onStart) {
//         self.onStart(self.port);
//       }
//     });
//     socket.bind(self.port);
//   } catch (error) {
//     console.error(error);
//   }
// };

// Receiver.prototype.stop = function stop() {
//   const self = this;
//   if (self.isRunning) {
//     if (self.socket) {
//       self.socket.close();
//       self.isRunning = false;
//     }
//   }
// };

// const trap = new Receiver(
//   5162,
//   (remote, pkt) => {
//     const sourceIP = remote.address;
//     const { version, community, enterprise, specific, generic, uptime, varbinds } = pkt;

//     try {
//       const trapMsg = {
//         sourceIP,
//         version,
//         community,
//         enterprise,
//         specific,
//         generic,
//         uptime: uptime!== null? uptime : 0,
//         varbinds: JSON.stringify(varbinds),
//         msg: `Port ${generic} - ${trapMapping[specific]}`
//       };
//       console.log('Trap received');
//       console.log(trapMsg);
//       console.log('--------------------------------------');
//       console.log(pkt);
//       console.log('--------------------------------------');
//       // const isCiscoDevice = getCiscoDeviceIpArray(trapMsg.sourceIP);
//       // if (!isCiscoDevice) {
//       //   eventLogManagement.default.updateEventLog(trapMsg, 'custom');
//       // }

//       // telegramManagement.sendMessageTelegram(trapMsg);
//     } catch (error) {
//       console.log(error)
//     }
//   })