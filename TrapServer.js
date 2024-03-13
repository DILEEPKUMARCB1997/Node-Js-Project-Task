const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const trapMsg = [
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
  console.log(
    `SNMP Trap server listening on ${address.address}:${address.port}`
  );

  socket.on("message", (message, remote) => {
    console.log(`Received message from ${remote.address}:${remote.port}`);
    const sourceIP = remote.address;
    const version = message.toString().trim().indexOf(0);
    const community = message.subarray(7, 13).toString("utf-8");
    const enterprise = message
      .slice(18, 24)
      .toString("hex")
      .match(/.{1}/g)
      .map((byte) => parseInt(byte, 16))
      .join(".");
    const specific = message.readUInt8(2);
    const generic = message.readUInt8(4);
    // const specific = message[2].toString(8);
    // const generic = message.readUInt8(18).toString(8);
    const uptime = message.readUInt32BE(33).toString(16);
    const msg = `Port ${generic} - ${trapMsg[specific]}`;
    const timestamp = new Date().toISOString().toString();

    const variableBindings = [];

    for (let i = 46; i < message.length; i += 4) {
      const oid = message
        .slice(i, i + 4)
        .toString("hex")
        .match(/.{1}/g)
        .map((byte) => parseInt(byte, 16))
        .join(".");
      const type = message.readUInt8(i - 1).toString();
      const value = message.readUInt8(i + 1).toString();
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
    console.log("- Variable Bindings:", variableBindings);
  });
});
socket.bind(5162,"10.0.50.151");

