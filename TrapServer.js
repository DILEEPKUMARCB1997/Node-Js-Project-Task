// const snmp = require('net-snmp');
// const dgram=require('dgram')
// let getCiscoDeviceIpArray;
// var options = {
//   port: 161,
//   retries: 1,
//   timeout: 5000,
//   backoff: 1.0,
//   transport: "udp4",
//   trapPort: 162,
//   version: snmp.Version1,
//   backwardsGetNexts: true,
//   reportOidMismatchErrors: false,
//   idBitsSize: 32,
// };
// var session = snmp.createSession("10.0.50.151", "public", options);
// console.log(session);
// function Receiver(port, onTrap, onError, onStart) {
//   this.port = port;
//   this.socket = null;
//   this.isRunning = false;
//   this.onTrap = onTrap;
//   this.onError = onError;
//   this.onStart = onStart;
// }

// Receiver.prototype.start = function start() {
//   try {
//     const self = this;
//     if (self.isRunning) return;
//     const socket = (self.socket = dgram.createSocket("udp4"));
//     socket.on("error", (err) => {
//       console.error(err);
//       socket.close();
//       self.isRunning = false;
//       if (self.onError) {
//         self.onError(err);
//       }
//     });
//     socket.on("message", (msg, remote) => {
//       if (self.onTrap) {
//         const pkt = parseTrapPacket(msg);
//         self.onTrap(remote, pkt);
//       }
//     });
//     socket.on("listening", () => {
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
//     const {
//       version,
//       community,
//       enterprise,
//       specific,
//       generic,
//       upTime,
//       varbinds,
//     } = pkt;

//     try {
//       const trapMsg = {
//         sourceIP,
//         version,
//         community,
//         enterprise,
//         specific,
//         generic,
//         upTime: upTime !== null ? upTime : 0,
//         varbinds: JSON.stringify(varbinds),
//         msg: `Port ${generic} - ${trapMapping[specific]}`,
//       };
//      // eventLogManagement.default.updateEventLog(trapMsg, "trap");
//       // console.log('Trap received')
//       // console.log(trapMsg)
//       // console.log('--------------------------------------')
//       // console.log(pkt)
//       // console.log('--------------------------------------')
//       const isCiscoDevice = getCiscoDeviceIpArray(trapMsg.sourceIP);
//       // if (!isCiscoDevice) {
//       //   eventLogManagement.default.updateEventLog(trapMsg, "custom");
//       // }

//       //telegramManagement.sendMessageTelegram(trapMsg);
//     } catch (error) {
//       //console.log(error);
//     }
//   },
//   (error) => {
//     console.log(error);
//   },
//   (port) => {
//     console.log(`Trap server start listen on : ${port}`);
//   }
// );

// trap.start();
// // session.trap(trapOid, trapVarbinds, (error, varbinds) => {
// //   if (error) {
// //     console.error("SNMP error:", error);
// //   } else {
// //     console.log("SNMP trap sent successfully");
// //   }
// // });

// session.close();
// const net = require('net');
// const snmp = require('snmp-native');

// const SNMPSessionList = {}; // Replace this with your actual SNMP sessions
// const devices = ['00:0a:95:9d:68:16', '00:0a:95:9d:68:17']; // Replace this with your actual devices

// const snmpTrapServerStatus = '.1.3.6.1.4.1.9.9.37.1.1.1.1.2';
// const snmpTrapServerIP = '.1.3.6.1.4.1.9.9.37.1.1.2.1.1.1';
// const snmpTrapServerPort = '.1.3.6.1.4.1.9.9.37.1.1.3.1.1';
// const snmpTrapServerTrapComm = '.1.3.6.1.4.1.9.9.37.1.1.4.1.1';

// const mib = {
//   private: {
//     basicSetting: {
//       saveConfigMgtAction: '.1.3.6.1.4.1.9.9.43.1.1.1.1.1',
//       systemRebootAction: '.1.3.6.1.4.1.9.9.43.1.1.2.1.1'
//     }
//   }
// };

// const param = {
//   trapServerIP: '192.168.1.1',
//   trapServerPort: 162,
//   trapCommString: 'public'
// };

// const setTrapSettings = async () => {
//   try {
//     let devicesCount = devices.length;
//     let devicesCountTimeout = devices.length;

//     for (const MACAddress of devices) {
//       try {
//         const { sysObjectId } = SNMPSessionList[MACAddress];
//         const { saveCfgMgtAction } = mib.private.basicSetting.saveConfigMgtAction;
//         const { systemRebootAction } = mib.private.basicSetting.systemRebootAction;
//         const oids = [
//           {
//             oid: sysObjectId + snmpTrapServerStatus,
//             type: snmp.ObjectType.Integer,
//             value: 2
//           },
//           {
//             oid: sysObjectId + snmpTrapServerIP,
//             type: snmp.ObjectType.OctetString,
//             value: param.trapServerIP
//           },
//           {
//             oid: sysObjectId + snmpTrapServerPort,
//             type: snmp.ObjectType.Integer,
//             value: param.trapServerPort
//           },
//           {
//             oid: sysObjectId + snmpTrapServerTrapComm,
//             type: snmp.ObjectType.OctetString,
//             value: param.trapCommString
//           }
//         ];

//         const saveConfigOids = [
//           {
//             oid: sysObjectId + saveCfgMgtAction,
//             type: snmp.ObjectType.Integer,
//             value: 1
//           },
//           {
//             oid: sysObjectId + systemRebootAction,
//             type: snmp.ObjectType.Integer,
//             value: 1
//           }
//         ];

//         await SNMPSessionList[MACAddress].rw.set(oids);
//         setTimeout(async () => {
//           await SNMPSessionList[MACAddress].rw.set(saveConfigOids);
//           devicesCount -= 1;
//           devicesCountTimeout -= 1;
//           if (devicesCount === 0 && devicesCountTimeout === 0) {
//             closeServer();
//           }
//           console.log('Trap settings set successfully');
//         }, 3000);
//       } catch (error) {
//         devicesCount -= 1;
//         console.error('Error setting trap settings:', error);
//       }
//     }
//   } catch (error) {
//     console.error('Error setting trap settings:', error);
//   }
// };

// const closeServer = () => {
//   // Close your server here
// };

//const isServerAlive = ()

var snmp = require("net-snmp");

// Create a session object
var session = snmp.createSession("127.0.0.1", "public");

// Define the trap parameters
var trapId = 12345;
var createAt = new Date();
var version = snmp.Version2c;
var sourceIp = "10.0.50.151";
var community = "public";
var enterprise = "1.3.6.1.4.1.23456"; // replace with your enterprise OID
var specific = "1"; // replace with your specific trap OID
var generic = snmp.TrapType.LinkDown;
var uptime = Math.floor(process.uptime());
var msg = "Link down on interface eth0";
console.log([
  "createAt",createAt,
  "uptime",uptime
  // `sourceIp:${sourceIp}`,
  // `version:${version}`,
  // `trapId:${trapId}`,
  // `enterprise:${enterprise}`,
  // `community:${community}`,
  // `specific:${specific}`,
  // `generic:${generic}`,
  // `uptime:${uptime}`,
  // `msg:${msg}`
]);
var varbinds = [
  {
    oid: "1.3.6.1.2.1.1.3.0",
    type: snmp.ObjectType.OctetString,
    value: uptime,
  },
  {
    oid: "1.3.6.1.2.1.1.5.0",
    type: snmp.ObjectType.OctetString,
    value: sourceIp,
  },
  {
    oid: "1.3.6.1.2.1.1.6.0",
    type: snmp.ObjectType.OctetString,
    value: community,
  },
  {
    oid: "1.3.6.1.4.1.23456.1.2.3.4",
    type: snmp.ObjectType.OctetString,
    value: msg,
  },
];
//console.log(varbinds);
// Send the trap
// session.trap(generic, specific, version, varbinds, function (error) {
//   if (error) {
//     console.error("Error sending trap: " + error.message);
//   } else {
//     console.log("Trap sent successfully");
//   }
//});