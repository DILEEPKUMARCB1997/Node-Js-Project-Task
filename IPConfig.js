
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const packet = Buffer.alloc(300);
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

  setInterval(() => {
    socket.send(packet, 0, packet.length, 55954, "255.255.255.255");
  }, 60000);
});

socket.on("message", function (message, remote) {
  console.log(
    "Received network configuration information from: " +
      remote.address +
      ":" +
      remote.port
  );

  const ipAddress = message.slice(12, 16).join(".");
  const netmask = message.slice(236, 240).join(".");
  const gateway = message.slice(24, 28).join(".");

  console.log("IP Address: " + ipAddress);
  console.log("Netmask: " + netmask);
  console.log("Gateway: " + gateway);
});

socket.bind(55954, () => {
  socket.setBroadcast(true);
  console.log("Server binded on port 55954");
});



// const os = require("os");

// const ifaces = os.networkInterfaces();

// Object.keys(ifaces).forEach((ifname) => {
//   ifaces[ifname].forEach((iface) => {
//     if (iface.family === "IPv4" && iface.internal === false) {
//       console.log(`IPv4 Address: ${iface.address}`);
//       console.log(`Subnet Mask: ${iface.netmask}`);
//       console.log(`Default Gateway: ${iface.gateway}`);
//     }
//   });
// });