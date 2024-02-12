const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

// console.log("socket", socket);

socket.on("listening", function (message) {
  const address = socket.address();

  console.log(
    "UDP socket listening on " + address.address + ":" + address.port
  );
});

socket.on("message", function (message, remote) {
  console.log(
    "SERVER RECEIVED:",
    remote.address + ":" + remote.port + " - " + message
  );

  console.log("message", message);
  console.log(message.toString());
  // const PriValue = message.toString().match(/<(\d+)>/)[1];
  const PriValue = message.subarray(1, 2).toString();
  const timeStamp = message.subarray(3, 22).toString();
  const upTime = message.subarray(24, 35).toString();
  const hostName = message.subarray(36, 42).toString();
  const msg = message.subarray(44, 110).toString();

  // const version = parseInt(PriValue / 8);
  // const version = message.readUInt8(0);
  // const timeStamp = new Date().toISOString();
  const syslogMsg = {
    priority: PriValue,
    TimeStamp: timeStamp,
    UpTime: upTime,
    HostName: hostName,
    Message: msg,
  };
  console.log("syslog message", syslogMsg);
});

socket.bind(5514, "10.0.50.150", () => {
  socket.setBroadcast(true);
  console.log("server binded on port 5514");
});
