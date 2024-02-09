

// const dgram = require("dgram");

// const port = 5162;
// const address = "10.0.50.151";

// const snmpRequest = new Buffer.from([
//   0x30,
//   0x2c, // seq, length
//   0x02,
//   0x01,
//   0x01, // OID, length, SNMP version
//   0x02,
//   0x02,
//   0x01,
//   0x00, // community-string
//   0x30,
//   0x14, // seq, length
//   0x06,
//   0x08,
//   0x2b,
//   0x06,
//   0x01,
//   0x05,
//   0x05,
//   0x00,
//   0x02,
//   0x01, // enterprise OID
//   0x04,
//   0x00, // specific-type, no-such-object
// ]);

// const snmpServer = dgram.createSocket("udp4");

// snmpServer.on("listening", () => {
//   console.log("SNMP trap server listening on " + address + ":" + port);
// });

// snmpServer.on("message", (message, remote) => {
//   console.log("Received SNMP trap from " + remote.address + ":" + remote.port);
//   console.log(message.toString("hex"));
// });

// snmpServer.bind(port, address);

// // Send a sample SNMP trap
// setInterval(() => {
//   snmpServer.send(snmpRequest, 0, snmpRequest.length, port, address, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Sent sample SNMP trap");
//     }
//   });
// }, 3000);


const dgram = require("dgram");
// const {
//   Reader,
//   ASN1,
//   assert,
// } = require("asn1");

const trapMapping = {
  0: "coldStart",
  1: "warmStart",
  2: "linkDown",
  3: "linkUp",
  4: "authenticationFailure",
  5: "egpNeighborLoss",
  6: "enterpriseSpecific",
};

function Reader(data) {
  //console.log(data);
  if (!data || !Buffer.isBuffer(data)) {
    throw new TypeError("data must be a node Buffer");
  }

  this._buf = data;
  this._size = data.length;

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

  reader.readSequence();
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

function readVarbinds(reader) {
  const vbs = [];
  reader.readSequence();
  for (;;) {
    reader.readSequence();

    const oid = reader.readOID();
    const type = reader.peek();
    let value = "";

    if (type == null) break;

    switch (type) {
      case 1:
        value = reader.readBoolean();
        break;
      case 2:
      case 65:
      case 66:
      case 67:
        value = reader.readTag(2);
        break;
      case 4:
        value = reader.readString(null);
        break;
      case 5:
      case 128:
      case 129:
      case 130:
        reader.readByte();
        reader.readByte();
        value = null;
        break;
      case 6:
        value = reader.readOID();
        break;
      case 64: {
        const bytes = reader.readString(64, true);
        value =
          bytes.length === 4
           ? `${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}`
            : "";
        break;
      }
      case 68:
      case 70:
        value = reader.readString(type, true);
        break;
      default:
        break;
    }
    vbs.push({
      oid,
      type,
      value,
    });
  }
  return vbs;
}

const trap = dgram.createSocket("udp4");

trap.on("message", (msg, rinfo) => {
  console.log(rinfo);
  const pkt = parseTrapPacket(msg);
  const {
    version,
    community,
    enterprise,
    specific,
    generic,
    upTime,
    varbinds,
  } = pkt;

  try {
    const trapMsg = {
      version,
      community,
      enterprise,
      specific,
      generic,
      upTime: upTime!== null? upTime : 0,
      varbinds: JSON.stringify(varbinds),
      msg: `Port ${generic} - ${trapMapping[specific]}`,
    };

    console.log(trapMsg);
  } catch (error) {
    console.log(error);
  }
});

trap.on("error", (err) => {
  console.error("Trap server error:", err);
});

trap.bind(5162)
// const dgram = require("dgram");
// const snmp = require("net-snmp");

// const trapServer = dgram.createSocket("udp4");

// trapServer.on("listening", function () {
//   const address = trapServer.address();
//   console.log(
//     "Trap server listening on " + address.address + ":" + address.port
//   );
// });

// trapServer.on("message", function (message, remote) {
//   console.log("Received trap from " + remote.address + ":" + remote.port);
// console.log(remote);
//   // const trap = snmp.Trap.decode(message);
//   // console.log("Trap:", trap.toJSON());


// });

// trapServer.bind(5162,"10.0.50.151");
