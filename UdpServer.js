const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

// console.log("socket", socket);

var packet = new Uint8Array(300);
packet[0] = 2;
packet[1] = 1;
packet[2] = 6;
packet[4] = 0x92;
packet[5] = 0xda;

socket.on("listening", function (message) {
  const address = socket.address();

  console.log(
    "UDP socket listening on " + address.address + ":" + address.port
  );
  // console.log("message", message);
  socket.send(packet, 0, packet.length, 55954, "255.255.255.255");
});

socket.on("message", function (message, remote) {
  console.log("SERVER RECEIVED:", remote.address + ":" + remote.port);

  console.log("msg", message);

  console.log(
    "MAC Address - ",
    message
      .subarray(28, 34)
      .toString("hex")
      .match(/.{1,2}/g)
      .join(":")
      .toUpperCase()
  );
  console.log("Model - ", message.subarray(44, 64).toString());
  console.log(
    "Host Name - ",
    message.subarray(90, 106).toString().split("\0")[0]
  );
  console.log("AP - ", message.subarray(110, 235).toString().split("\0")[0]);
  console.log(
    "IP Address - ",
    message[12] +
      "." +
      message[13] +
      "." +
      message[14] +
      "." +
      message[15].toString()
  );
  console.log(
    "Netmask - ",
    message[236] +
      "." +
      message[237] +
      "." +
      message[238] +
      "." +
      message[239].toString()
  );
  console.log(
    "Gateway - ",
    message[24] +
      "." +
      message[25] +
      "." +
      message[26] +
      "." +
      message[27].toString()
  );
  console.log("Kernel - ", message[109] + "." + message[108].toString());
  console.log("Is DHCP - ", message[106].toString() == "0" ? "false" : "true");
});

socket.bind(55954, "10.0.50.90", () => {
  socket.setBroadcast(true);
  console.log("server binded on port 55954");
});
