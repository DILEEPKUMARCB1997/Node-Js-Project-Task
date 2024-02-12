

// 


const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);
});

socket.on("message", (message, remote) => {
  console.log(remote);
  const sourceIP = remote.address;
  const version = message.readUInt8(20).toString();
  const community = message.subarray(7, 12).toString("utf-8");
  const enterprise = message.slice(34, 42)
    .toString("hex")
    .match(/.{1,2}/g)
    .join(".");
  const specific = message.readInt8(16).toString();
  const generic = message.readInt8(17).toString(8);
  const uptime = message.readUInt16BE(16);
  const msg = message.subarray(44,110).toString();
  // const agentAddress = message
  //   .slice(28, 34)
  //   .toString("hex")
  //   .match(/.{1,2}/g)
  //   .join(":")
  //   .toUpperCase();
  const trapOid = message
    .slice(34, 42)
    .toString("hex")
    .match(/.{1,2}/g)
    .join(".");
  const timestamp = new Date().toISOString(" ").toString('utf-8');
  const variableBindings = [];

  for (let i = 46; i < message.length; i += 4) {
    const oid = message
      .slice(i, i + 4)
      .toString("hex")
      .match(/.{1,2}/g)
      .join(".");
    const type = message.readUInt8(i + 1);
    const value = message.readUInt8(i + 2);
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
  //console.log("- Agent Address:", agentAddress);
  console.log("- Trap OID:", trapOid);
  console.log("- Timestamp:", timestamp);
  console.log("- msg:", msg);
  console.log("- Variable Bindings:", variableBindings);
});

socket.bind(5161, "0.0.0.0", () => {
  socket.setBroadcast(true);
  console.log("SNMP trap server binded on port 5161");
});