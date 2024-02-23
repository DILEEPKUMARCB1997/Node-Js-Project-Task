
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
const buffer= Buffer.from([
  0x30, 0x2f, 0x02, 0x01, 0x00, 0x04, 0x09, 0x6d, 0x65, 0x65, 0x6e, 0x61, 0x6b,
  0x73, 0x68, 0x69, 0xa4, 0x1f, 0x06, 0x0a, 0x2b, 0x06, 0x01, 0x04, 0x01, 0x9d,
  0x2b, 0x00, 0x00, 0x0f, 0x40, 0x04, 0x0a, 0x00, 0x32, 0x0c, 0x02, 0x01, 0x04,
  0x02, 0x01, 0x00, 0x43, 0x03, 0x10, 0xc3, 0x14, 0x30, 0x00,
]);
socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);
   socket.send(
   buffer, 0, buffer.length, 5162, "10.0.50.151",
     (err) => {
       if (err) {
         console.log("Error sending invite packet:", err);
       } else {
         console.log("Invite packet sent");
       }
     }
   );
}) 

socket.on("message", (message, remote) => { 
console.log(message);
const sourceIP = remote.address
const version = message[4].toString()
//message.toString().trim().indexOf(0)
const community = message.subarray(7,12).toString().replace(/\s+/g, "");
const enterprise = message.slice(11,18)
    .toString("hex")
    .match(/.{1}/g)
    .join(".");
  const specific = message[2].toString(8);
  const generic = message.readUInt8(18).toString(8)
  // const uptime =message.readUInt32BE(22).toString(16)
  const uptime = message.readUInt32BE(33).toString(16);
  const msg = `Port ${generic} - ${trapMapping[specific]}`;
 //const agentAddr =message[0]+"."+message[1]+"."+message[2]+"."+message[3]
 // `${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}`;
  // message.subarray(9,38).toString('utf-8')
  // const agentAddress = message
  //   .slice(28, 34)
  //   .toString("hex")
  //   .match(/.{1,2}/g)
  //   .join(":")
  //   .toUpperCase();
  // const trapOid = message
  //   .slice(34, 42)
  //   .toString("hex")
  //   .match(/.{1,2}/g)
  //   .join(".");
  const timestamp = new Date().toISOString().toString();
  const variableBindings = [];

  for (let i = 46; i < message.length; i += 4) {
    const oid =message
      .slice(i, i + 4)
      .toString("hex")
      .match(/.{1}/g)
      .join(".");
    const type = message.readUint8(i+1);
    const value = message.readUint8(i+1);
    variableBindings.push({ oid, type, value })
  }

  console.log("Received SNMP trap:");
  console.log("- SourceIP:", sourceIP);
  console.log("- Version:", version);
  console.log("- Community:", community);
  console.log("- Enterprise:", enterprise);
  console.log("- Specific:", specific);
  console.log("- Generic:", generic);
  console.log("- Uptime:",uptime);
 //console.log("- Agent Address:", agentAddr);
  //console.log("- Trap OID:", trapOid);
  console.log("- Timestamp:", timestamp);
  console.log("- msg:", msg);
  console.log("- Variable Bindings:",JSON.stringify( variableBindings));
});
 

socket.bind(5162, "0.0.0.0", () => {
  socket.setBroadcast()
  console.log("SNMP trap server binded on port 5162");
});

