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

socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);
});

socket.on("message", (message, remote) => {
  const sourceIP = remote.address;
  const version = message[4];
  const community = message.toString().substring(7, 12);
  const enterprise = message
    .slice(34, 42)
    .toString("hex")
    .match(/.{1}/g)
    .join(".");
  const specific = message[29].toString();
  const generic = message.readInt8(17).toString();
  const uptime = message.readUInt32BE(22);
  const timestamp = new Date().toISOString();
  const variableBindings = [];

  for (let i = 46; i < message.length; i += 4) {
    const oid = message
      .slice(i, i + 4)
      .toString("hex")
      .match(/.{1}/g)
      .join(".");
    const type = message.readUInt8(i + 1);
    const value = message.readUInt8(i + 2);
    variableBindings.push({ oid, type, value });
  }

  // Extract connected device details
  const connectedDevice = {
    sourceIP,
    version,
    community,
    enterprise,
    uptime,
    timestamp,
    message:`Port ${generic} - ${trapMapping[specific]}`,
    variableBindings,
  };

  console.log("Connected Device Details:", connectedDevice);
});

socket.bind(5162, "0.0.0.0", () => {
  socket.setBroadcast(true);
  console.log("SNMP trap server bound on port 5162");
});
