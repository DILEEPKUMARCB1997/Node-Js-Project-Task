// const dgram = require("dgram");
// const socket = dgram.createSocket("udp4");

// // console.log("socket", socket);

// socket.on("listening", function (message) {
//   const address = socket.address();

//   console.log(
//     "UDP socket listening on " + address.address + ":" + address.port
//   );
// });

// socket.on("message", function (message, remote) {
//   console.log(
//     "SERVER RECEIVED:",
//     remote.address + ":" + remote.port + " - " + message
//   );

//   console.log("message", message);
//   // console.log(message.toString());
//   // const PriValue = message.toString().match(/<(\d+)>/)[1];
//   const PriValue = message.subarray(1, 2).toString();
//   const timeStamp = message.subarray(3, 22).toString();
//   const upTime = message.subarray(24, 35).toString();
//   const hostName = message.subarray(36, 42).toString();
//   const msg = message.subarray(44, 110).toString();

//   // const version = parseInt(PriValue / 8);
//   // const version = message.readUInt8(0);
//   // const timeStamp = new Date().toISOString();
//   const syslogMsg = {
//     priority: PriValue,
//     TimeStamp: timeStamp,
//     UpTime: upTime,
//     HostName: hostName,
//     Message: msg,
//   };
//  // console.log("syslog message", syslogMsg);
// });

// socket.bind(5514, "10.0.50.151", () => {
//   socket.setBroadcast(true);
//   console.log("server binded on port 5514");
// });


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
  console.log("message", message);

  const index = message.indexOf(">");
  const PriValue = message.subarray(index - 1, index).toString();
  const facility = Math.floor(PriValue / 8);
  const severity = PriValue % 8;
  //const uptime = message.toString().match(/(\d{2}d\d{2}h\d{2}m\d{2}s)/)[0];
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
