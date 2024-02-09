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
const snmp = require("net-snmp");

const trapServer = dgram.createSocket("udp4");

trapServer.on("listening", function () {
  const address = trapServer.address();
  console.log(
    "Trap server listening on " + address.address + ":" + address.port
  );
});

trapServer.on("message", function (message, remote) {
  console.log("Received trap from " + remote.address + ":" + remote.port);
  console.log(remote);
  // const trap = snmp.Trap.decode(message);
  // console.log("Trap:", trap.toJSON());
});

trapServer.bind(5162, "10.0.50.90");
