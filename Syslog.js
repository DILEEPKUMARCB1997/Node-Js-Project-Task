const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);
});

socket.on("message", (message, rinfo) => {
  console.log(message);
  const sourceIP = rinfo.address;
  const sourcePort = rinfo.port;
  // rest of your code
  console.log(sourceIP,sourcePort);
});

socket.bind(5162, "0.0.0.0", () => {
  socket.setBroadcast(true);
  console.log("SNMP trap server");
});
