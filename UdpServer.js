

// const dgram = require('dgram');
// const server = dgram.createSocket('udp4');


// server.on("listening", () => {
//   const address = server.address();
//   console.log(`UDP Server listening on ${address.address}:${address.port}`);
// });

// server.on("message", (message, remote) => {
//   console.log(
//     `Received message from ${remote.address}:${remote.port} - ${message}`
//   );
// });

// server.bind(55954, () => {
//   server.setBroadcast(true);
// });
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const os=require('os')
const net = require("node:net");


server.on("listening", () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on("message", (message, remote) => {
  // Parse the received data and extract device details
  const ipAddress = remote.address;
  const macAddress = getMacAddress(ipAddress);
  const netmask = "Netmask"; // You need to implement this
  const gateway = "Gateway"; // You need to implement this

  // Create a response message
  const response = `IP Address: ${ipAddress}, MAC Address: ${macAddress}, Netmask: ${netmask}, Gateway: ${gateway}`;

  // Send the response back to the client
  server.send(Buffer.from(response), remote.port, remote.address, (error) => {
    if (error) {
      console.error(`Error sending response: ${error}`);
    } else {
      console.log(`Sent response to ${remote.address}:${remote.port}`);
    }
  });
});
function getMacAddress() {
  const interfaces = os.networkInterfaces();
  let macAddress;

  for (const key in interfaces) {
    if (interfaces.hasOwnProperty(key)) {
      const interface = interfaces[key];
      for (const address of interface) {
        if (address.mac && address.mac !== "00:00:00:00:00:00") {
          macAddress = address.mac;
          break;
        }
      }
    }
  }

  return macAddress;
}

console.log("MAC Address:", getMacAddress());

server.bind(55954,"10.0.50.151");


const server1 = net.createServer((socket) => {
  socket.on("data", (data) => {
    // Assuming data is a buffer containing the packet
    const newNetmask = [0xff, 0xff, 0xff, 0x00]; // Example netmask (255.255.255.0)

    packet[236] = newNetmask[0];
    packet[237] = newNetmask[1];
    packet[238] = newNetmask[2];
    packet[239] = newNetmask[3];
console.log(newNetmask);
    // Send the updated packet back to the client
    socket.write(Buffer.from(packet));
  });

  socket.on("end", () => {
    console.log("Connection ended");
  });
});

// server1.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });
// const message = Buffer.from('Hello, server!');
// const serverAddress = '127.0.0.1';
// const serverPort = 55954;

// client.send(message, 0, message.length, serverPort, serverAddress, (err) => {
//   if (err) {
//     console.log(`Error sending message: ${err}`);
//   } else {
//     console.log('Message sent to server');
//   }

//   client.close();
// });
  