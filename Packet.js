// const dgram = require("dgram");
// const socket = dgram.createSocket("udp4");
// const trapMapping = [
//   "cold start",
//   "warm start",
//   "link down",
//   "link up",
//   "authentication failure",
//   "egp neighbor loss",
//   "enterprise specific",
// ];


// socket.on("listening", () => {
//   const address = socket.address();
//   console.log(`UDP socket listening on ${address.address}:${address.port}`);
  
// });

// socket.on("message", (message, remote) => {
// //  console.log(message);
//   const sourceIP = remote.address;
//   const version = message[4];
//   const community = message.toString("utf8", 7,12).replace(/\s+/g,'');
//   const enterprise = message
//     .slice(11, 18)
//     .toString("hex")
//     .match(/.{1}/g)
//     .join(".");
//   const specific = message[2];
//   const generic = message.readUInt8(18);
//   const uptime = message.readUInt32BE(22);
//   const msg = `Port ${generic} - ${trapMapping[specific]}`;
//   const timestamp = new Date().toISOString();

//   const variableBindings = [];

//   for (let i = 46; i < message.length; i += 4) {
//     const oid = message
//       .slice(i, i + 4)
//       .toString("hex")
//       .match(/.{1}/g)
//       .join(".");;
//     const type = message.readUInt8(i + 1);
//     const value = message.readUInt8(i + 1);
//     variableBindings.push({ oid, type, value });
//   }

//   console.log("Received SNMP trap:");
//   console.log("- SourceIP:", sourceIP);
//   console.log("- Version:", version);
//   console.log("- Community:", community);
//   console.log("- Enterprise:", enterprise);
//   console.log("- Specific:", specific);
//   console.log("- Generic:", generic);
//   console.log("- Uptime:", uptime);
//   console.log("- Timestamp:", timestamp);
//   console.log("- Message:", msg);
//   console.log("- Variable Bindings:", JSON.stringify(variableBindings));
// });

// socket.bind(5162, () => {
//   socket.setBroadcast(true);
//   console.log("SNMP trap server")
// })





/*
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const trapMapping = [
  "cold start",
  "warm start",
  "link down",
  "link up",
  "authentication failure",
  "egp neighbor loss",
  "enterprise specific",
];
const packet = Buffer.from([
  0x30, 0x2f, 0x02, 0x01, 0x00, 0x04, 0x09, 0x6d, 0x65, 0x65, 0x6e, 0x61, 0x6b,
  0x73, 0x68, 0x69, 0xa4, 0x1f, 0x06, 0x0a, 0x2b, 0x06, 0x01, 0x04, 0x01, 0x9d,
  0x2b, 0x00, 0x00, 0x0f, 0x40, 0x04, 0x0a, 0x00, 0x32, 0x0c, 0x02, 0x01, 0x04,
  0x02, 0x01, 0x00, 0x43, 0x03, 0x10, 0xc3, 0x14, 0x30, 0x00,
]);
socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);
  socket.send(packet, 0, packet.length, 5162, "10.0.50.151", (err) => {
    if (err) {
      console.log("Error sending invite packet:", err);
    } else {
      console.log("Invite packet sent");
    }
  });
});

socket.on("message", (message, remote) => {
  const sourceIP = remote.address;
  const version = message[4];
  const community = message.subarray(7, 12).toString().replace(/\s+/g, "");
  const enterprise =
    message[11014] +
    "." +
    message[42031] +
    "." +
    message[12291] +
    "." +
    message[413] +
    "." +
    message[25957];
  const specific = message[11014];
  const generic = message[413];
  const uptime = message[15];
  const msg = `Port ${generic} - ${trapMapping[specific]}`;
  const variableBindings = [];

  for (let i = 46; i < message.length; i += 4) {
    const oid = message
      .slice(i, i + 4)
      .toString("hex")
      .match(/.{1}/g)
      .join(".");
    const type = message.readUInt8(i + 1);
    const value = message.readUInt8(i + 1);
    variableBindings.push({ oid, type, value });
  }

  console.log("Received SNMP trap:");
  console.log("- SourceIP:", sourceIP);
  console.log("- Version:", version);
  console.log("- Community:", community);
  console.log("- Enterprise:", enterprise);
  console.log("- Specific:", specific);
  console.log("- Generic:", generic);
  console.log("- Uptime:", uptime);
  console.log("- msg:", msg);
  console.log("- Variable Bindings:", JSON.stringify(variableBindings));
});

socket.bind(5162, "0.0.0.0", () => {
  socket.setRecvBufferSize(10);
  console.log("SNMP trap server binded on port 5162");
});



// const dgram = require("dgram");
// const socket = dgram.createSocket("udp4");
// const trapMapping = [
//   "cold start",
//   "warm start",
//   "link down",
//   "link up",
//   "authentication failure",
//   "egp neighbor loss",
//   "enterprise specific",
// ];

// const indexes = [
//   12291, 4, 25957,
//   42031, 11014, 413,
//   15, 2560, 513,
//   259, 1035, 12303,
//   11014
// ];

// const packet = Buffer.from([
//   0x30, 0x2f, 0x02, 0x01, 0x00, 0x04, 0x09, 0x6d, 0x65, 0x65, 0x6e, 0x61, 0x6b,
//   0x73, 0x68, 0x69, 0xa4, 0x1f, 0x06, 0x0a, 0x2b, 0x06, 0x01, 0x04, 0x01, 0x9d,
//   0x2b, 0x00, 0x00, 0x0f, 0x40, 0x04, 0x0a, 0x00, 0x32, 0x0c, 0x02, 0x01, 0x04,
//   0x02, 0x01, 0x00, 0x43, 0x03, 0x10, 0xc3, 0x14, 0x30, 0x00,
//   ...indexes.map(index => index & 0xFF),
// ]);

// socket.on("listening", () => {
//   const address = socket.address();
//   console.log(`UDP socket listening on ${address.address}:${address.port}`);
//   socket.send(
//     packet, 0, packet.length, 5162, "10.0.50.151",
//     (err) => {
//       if (err) {
//         console.log("Error sending invite packet:", err);
//       } else {
//         console.log("Invite packet sent");
//       }
//     }
//   );
// });

// socket.on("message", (message, remote) => {
//   console.log(message);
//   const sourceIP =
//     message[1] + "." + message[2] + "." + message[29] + "." + message[1];
//   const version = message[4];
//   const community = message.subarray(7, 12).toString().replace(/\s+/g, "");
//   //const enterprise = message[2] + "." + message[4] + "." + toString().join(".");
//   // const type = message.readUint8(i + 1);
//   // const value = message.readUint8(i + 1);
//   // variableBindings.push({ oid, type, value });

//   console.log("Received SNMP trap:");
//   console.log("- SourceIP:", sourceIP);
//   console.log("- Version:", version);
//   console.log("- Community:", community);
//   //console.log("- Enterprise:", enterprise);
//   // console.log("- Specific:", specific);
//   // console.log("- Generic:", generic);
//   // console.log("- Uptime:", uptime);
//   // console.log("- Timestamp:", timestamp);
//   // console.log("- msg:", msg);
//   // console.log("- Variable Bindings:", JSON.stringify(variableBindings));
// });


// socket.bind(5162, "0.0.0.0", () => {
//   socket.setRecvBufferSize(10);
//   console.log("SNMP trap server binded on port 5162");
// });

*/

/*
const dgram = require("dgram");
const trapMapping = {
  1: "Cold Start",
  2: "Warm Start",
  3: "Link Down",
  4: "Link Up",
  5: "Authentication Failure",
  6: "EGP Neighbor Loss",
};

const socket = dgram.createSocket("udp4");

const snmpTrapData = [
  [12291, 4, 25957, 42031, 11014, 413, 15, 2560, 513, 259, 1035, 12303, 11014],
];

socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);

  snmpTrapData.forEach((data) => {
    console.log(data);
    const packet = Buffer.from(data);
    socket.send(packet, 0, packet.length, 5162, "10.0.50.151", (err) => {
      if (err) {
        console.log("Error sending invite packet:", err);
      } else {
        console.log("Invite packet sent");
      }
    });
  });
});

socket.on("message", (message, remote) => {
  const sourceIP = message.subarray(12, 16).join(".");
  const version = message[0];
  const community = message.subarray(7, 12).toString()
  const enterprise = message
    .subarray(3, 8)
    .toString("hex")
    .replace(/\s+/g, ".");
  const specific = message[10];
  const generic = message[11];
  const uptime = message.readUInt16BE(7)
  const msg = `Port ${generic} - ${trapMapping[specific]}`;
  const timestamp = new Date().toISOString();
  const variableBindings = [];

  for (let i = 46; i < message.length; i += 4) {
    const oid = message
      .slice(i, i + 4)
      .toString("hex")
      .match(/.{1,2}/g)
      .join(".");
    const type = message.readUInt8(i + 1);
    const value = message.readUInt8(i + 2);
    variableBindings.push({ oid, type, value });
  }

  console.log("Received SNMP trap:");
  console.log("- SourceIP:", sourceIP);
  console.log("- Version:", version);
  console.log("- Community:", community);
  console.log("- Enterprise:", enterprise);
  console.log("- Specific:", specific);
  console.log("- Generic:", generic);
  console.log("- Uptime:", uptime);
  console.log("- Timestamp:", timestamp);
  console.log("- msg:", msg);
  console.log("- Variable Bindings:", JSON.stringify(variableBindings));
});

socket.bind(5162, "0.0.0.0", () => {
  socket.setRecvBufferSize(10);
  console.log("SNMP trap server binded on port 5162");
});
*/
const dgram = require("dgram");
const trapMapping = {
  1: "Cold Start",
  2: "Warm Start",
  3: "Link Down",
  4: "Link Up",
  5: "Authentication Failure",
  6: "EGP Neighbor Loss",
};

const socket = dgram.createSocket("udp4");

const snmpTrapData = [
  [12291, 4, 25957, 42031, 11014, 413, 15, 2560, 513, 259, 1035, 12303, 11014],
];

socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);

  snmpTrapData.forEach((data) => {
    console.log(data);
    const packet = Buffer.from(data);
    socket.send(packet, 0, packet.length, 5162, "10.0.50.151", (err) => {
      if (err) {
        console.log("Error sending invite packet:", err);
      } else {
        console.log("Invite packet sent");
      }
    });
  });
});

socket.on("message", (message, remote) => {
  const sourceIP = message.subarray(12, 16).join(".");
  const version = message[0];
  const community = message.subarray(7, 12).toString('utf-8');
  const enterprise = message
    .subarray(3, 8)
    .toString("hex")
    .replace(/\s+/g, ".");
  const specific = message[10];
  const generic = message[11];
  const uptime = message.readUInt16BE(7);
  const msg = `Port ${generic} - ${trapMapping[specific]}`;
  const timestamp = new Date().toISOString();
  const variableBindings = [];

  for (let i = 46; i < message.length; i += 4) {
    const oid = message
      .slice(i, i + 4)
      .toString("hex")
      .match(/.{1,2}/g)
      .join(".");
    const type = message.readUInt8(i + 1);
    const value = message.readUInt8(i + 2);
    variableBindings.push({ oid, type, value });
  }

  const deviceDetails = {
    sourceIP,
    version,
    community,
    enterprise,
    specific,
    generic,
    uptime,
    timestamp,
    msg,
    variableBindings,
  };

  console.log("Received SNMP trap:");
  console.log(JSON.stringify(deviceDetails, null, 2));
});

socket.bind(5162, "0.0.0.0", () => {
  socket.setRecvBufferSize(10);
  console.log("SNMP trap server binded on port 5162");
});