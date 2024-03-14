
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("listening", function () {
  const address = socket.address();

  console.log("syslog server started " + address.port);
});

socket.on("message", function (message, remote) {
  console.log(
    "SERVER RECEIVED:",
    remote.address + ":" + remote.port + " - " + message
  );


  const index = message.indexOf(">");
  const PriValue = message.subarray(index - 1, index).toString();
  const facility = Math.floor(PriValue / 8);
  const severity = PriValue % 8;
  const timestamp = new Date().toISOString();
  const secondIndex = message.indexOf(": ");
  const data = message.subarray(0, secondIndex).toString();
  const lastIndex = data.lastIndexOf(" ");
  const last2Index = data.lastIndexOf(" ", lastIndex - 1);
  const uptime = data.substring(last2Index + 1, lastIndex);
  const tag = data.substring(lastIndex + 1);
  const msg = message.subarray(secondIndex + 2).toString();

  console.log("priority :", PriValue);
  console.log("Facility :", facility);
  console.log("Severity :", severity);
  console.log("TimeStamp :", timestamp);
  console.log("UpTime :", uptime);
  console.log("Tagname :", tag);
  console.log("message :", msg);
});

socket.bind(5514);
