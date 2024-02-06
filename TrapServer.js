// const dgram = require("dgram");
// const socket = dgram.createSocket("udp4");

// // console.log("socket", socket);

// socket.on("listening", function (message) {
//   const address = socket.address();
//   console.log(
//     "UDP socket listening on " + address.address + ":" + address.port
//   );
//   console.log("message", message);
// });

// socket.on("message", function (message, remote) {
//   console.log(
//     "SERVER RECEIVED:",
//     remote.address + ":" + remote.port + " - " + message
//   );

//   console.log("msg", message);

//   console.log(
//     "mac",
//     message
//       .slice(28, 34)
//       .toString("hex")
//       .match(/.{1,2}/g)
//       .join(":")
//       .toUpperCase()
//   );

//   // console.log("mssg", message[1]);

//   // console.log("old ip", message[12], message[13], message[14], message[15]);
//   // console.log("new ip", message[16], message[17], message[18], message[19]);
//   // console.log(
//   //   "new gateway",
//   //   message[24],
//   //   message[25],
//   //   message[26],
//   //   message[27]
//   // );
//   // console.log(
//   //   "mac add",
//   //   message[28],
//   //   message[29],
//   //   message[30],
//   //   message[31],
//   //   message[32],
//   //   message[33]
//   // );

//   // const ms = Buffer.from(message.toJSON().data);
//   // console.log("ms", ms.toString("hex"));

//   const packet = new Uint8Array(300);
//   packet[0] = 2;
//   packet[1] = 1;
//   packet[2] = 6;
//   packet[4] = 0x92;
//   packet[5] = 0xda;

//   socket.send(packet, 0, packet.length, remote.port, remote.address);
// });

// socket.bind(55954, "10.0.50.90", () => {
//   console.log("server binded on port 55954");
// });


const dgram = require("node:dgram");
const snmp = require("net-snmp");

// Create a UDP socket and bind it to port 55954
const socket = dgram.createSocket("udp4");
socket.bind(55954,"10.0.50.151", () => {
  console.log("UDP server listening on port 55954");
});
//console.log(socket);
// Create an SNMP session
const session = new snmp.Session({
  port: 5162,
  host: "localhost",
  version: snmp.Version2c,
  community: "public",
});
console.log(session.target);
// Handle incoming SNMP traps
socket.on("message", (msg, rinfo) => {
  console.log(`Received SNMP trap from ${rinfo.address}:${rinfo.port}`);

  // Parse the SNMP trap message
  const message = snmp.Message.parse(msg);
  console.log("Trap message:", message.toString());

  // Send an SNMP response to the SNMP agent
  const response = new snmp.PDU();
  response.enterprise = message.enterprise;
  response.add(
    new snmp.VariableBinding(message.oid, snmp.Type.OctetString, "Response")
  );
  //console.log(response);
  session.send(response, rinfo.address, rinfo.port, (error) => {
    if (error) {
      console.error(`Error sending SNMP response: ${error.message}`);
    } else {
      console.log(`Sent SNMP response to ${rinfo.address}:${rinfo.port}`);
    }
  });
});