const dgram = require("node:dgram");
const socket = dgram.createSocket("udp4");
var Syslogd = require("syslogd");

socket.on("message", (msg, rinfo) => {
  console.log(rinfo);
  console.log(
    "Received broadcast from " + rinfo.address + ":" + rinfo.port + " - " + msg
  );
});

Syslogd(function (info) {
  // console.log("syslog msg", info);
  // info = {
  //   facility: 7,
  //   severity: 22,
  //   tag: "tag",
  //   hostname: "hostname",
  //   address: "127.0.0.1",
  //   family: "IPv4",
  //   port: null,
  //   size: 39,
  //   msg: "info",
  // };

  const syslogMsg = {
    facility: info.facility,
    severity: Number.isNaN(info.severity) ? 0 : info.severity,
    tag: info.tag,
    sourceIP: info.address,
    uptime: info.hostname,
    message: info.msg,
  };
  console.log("syslog message", syslogMsg);
}).listen(5514, function (err) {
  console.log(`Syslog server started`);
});

// Handle errors
socket.on("error", (err) => {
  console.error("Socket error:", err);
  socket.close();
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`server listening ${address.address}:${address.port}`);
});
socket.bind(55954, "10.0.50.90");
