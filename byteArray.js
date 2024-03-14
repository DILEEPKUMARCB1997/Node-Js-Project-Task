const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
var packet = new Uint8Array(300);
packet[0] = 2;
packet[1] = 1;
packet[2] = 6;
packet[4] = 0x92;
packet[5] = 0xda;
socket.on("listening", function () {
  const address = socket.address();
  console.log(
    "UDP socket listening on " + address.address + ":" + address.port
  );
  socket.send(packet, 0, packet.length, 55954, "255.255.255.255");
});

socket.on("message", function (message, remote) {
    console.log(message);
  //const response = JSON.parse(message.toString());

  console.log("IP Configuration:");
  console.log(`- IP Address: ${remote.ip_address}`);
  console.log(`- Subnet Mask: ${message.subnet_mask}`);
  console.log(`- Default Gateway: ${message.default_gateway}`);
  console.log(`- DNS Servers: ${message.dns_servers.join(", ")}`);
});

socket.bind(55954, "10.0.50.151", () => {
  socket.setBroadcast(true);
  console.log("server binded on port 55954");
});
