
const dgram = require("dgram");
const snmp = require("net-snmp");

const socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
  console.log(
    `Received broadcast from ${rinfo.address}:${rinfo.port} - ${msg}`
  );
});

socket.on("error", (err) => {
  console.error("Socket error:", err);
  socket.close();
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

socket.bind(55954, "10.0.50.151");

const session = new snmp.Session({
  port: 5162,
  host: "localhost",
  version: snmp.Version2c,
  community: "public",
});
console.log(session.target);
session.on("snmp data", (data) => {
  console.log("Received SNMP data:", data);
});

session.on("snmp end", () => {
  console.log("SNMP session ended");
});

session.on("snmperror", (error) => {
  console.error("SNMP error:", error);
});