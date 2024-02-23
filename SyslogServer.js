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

<<<<<<< HEAD
const connectedDevices = new Set();

socket.on("listening", () => {
  const address = socket.address();
  console.log(`UDP socket listening on ${address.address}:${address.port}`);
});

socket.on("message", (message, rinfo) => {
  console.log("Received message:", message.toString());
  const sourceIP = rinfo.address;
  //const sourcePort = rinfo.port;
  const version=message[4]
  const community=message.subarray(7,12).toString()
  const enterprise=message[18]+ "."+message[19]+ "."+message[20]+ "."+message[21]+ "."+message[22]+ "."+message[23]+ "."+message[24]+ "."+message[25]+ "."+message[26]+ "."+message[27].toString(16)
  const specific=message[25]
  const generic=message[29]
  const uptime=message.readUInt32BE(33).toString(16)
  const msg=message.subarray(37,42).toString('utf-8')
console.log(["-Version :",version,"-Community :",community,"-Enterprise :",enterprise, "-Specific :",specific,"-Generic :",
generic,"uptime :",uptime,"-Message :",msg,"-SourceIp :",sourceIP]);
});

socket.bind(5162, "0.0.0.0", () => {
  socket.setBroadcast(true);
  console.log("SNMP trap server");
});
=======
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
>>>>>>> eb25731000aec8f45fc5d563646a2e480de55bbf
