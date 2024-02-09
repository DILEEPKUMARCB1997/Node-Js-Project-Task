const dgram = require("node:dgram");
const socket = dgram.createSocket("udp4");
var Syslogd = require("syslogd");

Syslogd(function (info) {

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
  console.log(`Syslog server started 5514`);
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

