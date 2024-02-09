const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

// console.log("socket", socket);

socket.on("listening", function (message) {
  const address = socket.address();
  console.log(
    "UDP socket listening on " + address.address + ":" + address.port
  );
  //console.log("message", message);
});

socket.on("message", function (message, remote) {
  console.log(
    "SERVER RECEIVED:",
    remote.address + ":" + remote.port + " - " + message
  );

  //console.log("msg", message);

  console.log(
    "mac",
    message
      .slice(28, 34)
      .toString("hex")
      .match(/.{1,2}/g)
      .join(":")
      .toUpperCase()
  );

  //console.log("ipaddress", remote.address);

  // console.log("mssg", message[1]);

  // console.log("old ip", message[12], message[13], message[14], message[15]);
  // console.log("new ip", message[16], message[17], message[18], message[19]);
  // console.log(
  //   "new gateway",
  //   message[24],
  //   message[25],
  //   message[26],
  //   message[27]
  // );
  // console.log(
  //   "mac add",
  //   message[28],
  //   message[29],
  //   message[30],
  //   message[31],
  //   message[32],
  //   message[33]
  // );

  // const ms = Buffer.from(message.toJSON().data);
  // console.log("ms", ms.toString("hex"));

  const packet = new Uint8Array(300);
  packet[0] = 2;
  packet[1] = 1;
  packet[2] = 6;
  packet[4] = 0x92;
  packet[5] = 0xda;

  socket.send(packet, 0, packet.length, remote.port, remote.address);
});

socket.bind(55954, "10.0.50.151", () => {
  console.log("server binded on port 55954");
});

// socket.connect(55954, "10.0.50.90", () => {
//   console.log("connected");
// });
