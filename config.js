// const os = require("os");
// const crypto = require("crypto");

// async function getConfigPacket(data) {
//   //  console.log(data);
//   if (!isValidAuthentication(data)) {
//     return null;
//   }

//   const config = {
//     MACAddress: data.MACAddress.replace(/:/g, ""),
//     IPAddress: data.oldIPAddress,
//     newIPAddress: data.newIPAddress,
//     netmask: data.netmask,
//     gateway: data.gateway,
//     hostname: data.hostname,
//     username: data.username,
//     password: data.password,
//   };
// console.log(config.MACAddress);
//   // Split data
//   const oldIP = config.IPAddress.split(".").map((a) => parseInt(a));
//   const newIP = config.newIPAddress.split(".").map((a) => parseInt(a));
//   const newNetmask = config.netmask.split(".").map((a) => parseInt(a));
//   const newGateway = config.gateway.split(".").map((a) => parseInt(a));
//   const MAC = Buffer.from(config.MACAddress, "hex");

//   // Generate hash of password
//   const hash = crypto
//     .createHash("sha256")
//     .update(config.password)
//     .digest("hex");

//   return {
//     config,
//     oldIP,
//     newIP,
//     newNetmask,
//     newGateway,
//     MAC,
//     hash,
//   };
// }

// function isValidAuthentication(data) {
//   // Implement authentication logic here
//   return true;
// }

// module.exports = getConfigPacket;



// Packet header
// packet[0] = 0; // Sync byte
// packet[1] = 1; // Packet length (set to 0x01 for this example)
// packet[2] = 6; // Packet type (set to 0x06 for this example)
// packet[4] = 0x92; // Destination address (set to 0x92 for this example)
// packet[5] = 0xda; // Source address (set to 0xDA for this example)

// Other packet data (if needed)
//...

// const oldIP = [192, 168, 1, 100];
// const packet = Buffer.alloc(300);
// packet[12] = oldIP[0];
// packet[13] = oldIP[1];
// packet[14] = oldIP[2];
// packet[15] = oldIP[3];

// console.log(packet);
// const originalPacket = new Buffer.from([/* your original packet data */]);
// const newIp = '192.168.1.100';
// const newPacket = new Buffer.alloc(originalPacket.length);

// // Copy the original packet data into the new buffer
// originalPacket.copy(newPacket);

// // Replace the IP address in the new buffer
// newPacket[26] = 192;
// newPacket[27] = 168;
// newPacket[28] = 1;
// newPacket[29] = 100;
// console.log(newPacket[29]);
// Send the new packet over the network
//...

//const macAddress = [0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc];
// const packet = Buffer.alloc(300);
// packet[28] = macAddress[0];
// packet[29] = macAddress[1];
// packet[30] = macAddress[2];
// packet[31] = macAddress[3];
// packet[32] = macAddress[4];
// packet[33] = macAddress[5];
// console.log(macAddress);
///////////////////////////////hostname,usn,pwd//////////////////
// const dgram = require("dgram");

// const macAddress = "01:23:45:67:89:ab";
// const message = "Hello, world!";

// const socket = dgram.createSocket("udp4");

// socket.on("listening", () => {
//   const address = socket.address();
//   console.log(`UDP server listening on ${address.address}:${address.port}`);

//   const buffer = Buffer.from(message);
//   socket.send(buffer, address.port, address.address, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`Message sent to ${address.address}:${address.port}`);
//     }
//   });
// });

// socket.bind(() => {
//   const address = socket.address();
//   console.log(`UDP server bound to ${address.address}:${address.port}`);

//   const buffer = Buffer.from(macAddress);
//   socket.send(buffer, address.port, address.address, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`MAC address sent to ${address.address}:${address.port}`);
//     }
//   });
// });

// socket.on("message", (msg, rinfo) => {
//   console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// socket.on("error", (err) => {
//   console.error(err);
// });
// let lockInit = true

// const packet = Buffer.alloc(300);

// // broadcast received new device  new device online
// function broadcastReceiver(packet) {
//     console.log(packet);
//   try {
//     if (lockInit) {
//       return
//     }
//     // parser MAC address from packet
//     console.log(packet.slice(28, 34).toString('hex'));
//     const MACAddress = packet
//       .slice(28, 34)
//       .toString('hex')
//       .match(/.{1,2}/g)
//       .join(':')
//       .toUpperCase()
// //console.log(MACAddress);
// }catch(err){
//     console.error(err)
// }

// }


// // const packet = Buffer.alloc(300);

// // // 1-> first 8 bytes are for the header
// // packet.write('0000000000000000', 0, 16);

// // // 2-> next 4 bytes are for the length of the data
// // packet.writeUInt32BE(25, 16);

// // // 3-> next 4 bytes are for the type of the data
// // packet.writeUInt32BE(1, 20);

// // // 4-> next 4 bytes are for the ID of the data
// // packet.writeUInt32BE(1, 24);

// // // 5-> next 4 bytes are for the fragment number
// // packet.writeUInt32BE(1, 28);

// // // 6-> next 4 bytes are for the total number of fragments
// // packet.writeUInt32BE(1, 32);

// // // 7-> next 4 bytes are for the reserved field
// // packet.writeUInt32BE(0, 36);

// // // 8-> next 4 bytes are for the status code
// // packet.writeUInt32BE(0, 40);

// // // 9-> next 4 bytes are for the result code
// // packet.writeUInt32BE(0, 44);

// // // 10-> next 4 bytes are for the data type
// // packet.writeUInt32BE(0, 48);

// // // 11-> next 4 bytes are for the reserved field
// // packet.writeUInt32BE(0, 52);

// // // 12-> next 4 bytes are for the reserved field
// // packet.writeUInt32BE(0, 56);

// // // 13-> next 4 bytes are for the reserved field
// // packet.writeUInt32BE(0, 60);

// // // 14-> next 4 bytes are for the reserved field
// // packet.writeUInt32BE(0, 64);

// // // 15-> next 4 bytes are for the reserved field
// // packet.writeUInt32BE(0, 68);

// // 16-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 72);

// // 17-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 76);

// // 18-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 80);

// // 19-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 84);

// // 20-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 88);

// // 21-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 92);

// // 22-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 96);

// // 23-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 100);

// // 24-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 104);

// // 25-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 108);

// // 26-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 112);

// // 27-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 116);

// // 28-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 120);

// // 29-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 124);

// // 30-> next 4 bytes are for the reserved field
// packet.writeUInt32BE(0, 128);

// // 31-> next 4 bytes are

// Function to set device details
function setDeviceDetails(model, macAddress, ipAddress, netmask, gateway, hostname, kernel, ap, isDHCP) {
  const deviceDetails = {};
  deviceDetails.model = model;
  deviceDetails.MACAddress = macAddress;
  deviceDetails.IPAddress = ipAddress;
  deviceDetails.netmask = netmask;
  deviceDetails.gateway = gateway;
  deviceDetails.hostname = hostname;
  deviceDetails.kernel = kernel;
  deviceDetails.ap = ap;
  deviceDetails.isDHCP = isDHCP;
  return deviceDetails;
}

// Function to get device details
function getDeviceDetails(deviceDetails) {
  console.log("Model: ", deviceDetails.model);
  console.log("MAC Address: ", deviceDetails.MACAddress);
  console.log("IP Address: ", deviceDetails.IPAddress);
  console.log("Netmask: ", deviceDetails.netmask);
  console.log("Gateway: ", deviceDetails.gateway);
  console.log("Hostname: ", deviceDetails.hostname);
  console.log("Kernel: ", deviceDetails.kernel);
  console.log("AP: ", deviceDetails.ap);
  console.log("Is DHCP: ", deviceDetails.isDHCP);
}

// Example usage:
const deviceDetails = setDeviceDetails(
  'My Model',
  '00:00:00:00:00:00',
  '192.168.0.1',
  '255.255.255.0',
  '192.168.0.1',
  'myhostname',
  'mykernel',
  'myap',
  true
);

getDeviceDetails(deviceDetails);
// const Authentication={
//     isValid:true
// }
// class ModelInfo {
//   constructor(
//     model,
//     MACAddress,
//     IPAddress,
//     netmask,
//     gateway,
//     hostname,
//     kernel,
//     ap,
//     isDHCP
//   ) {
//     this.model = model;
//     this.MACAddress = MACAddress;
//     this.IPAddress = IPAddress;
//     this.netmask = netmask;
//     this.gateway = gateway;
//     this.hostname = hostname;
//     this.kernel = kernel;
//     this.ap = ap;
//     this.isDHCP = isDHCP;
//   }
// }

// class NetworkConfig {
//   constructor(
//     MACAddress,
//     IPAddress,
//     newIPAddress,
//     netmask,
//     gateway,
//     hostname,
//     username,
//     password
//   ) {
//     this.MACAddress = MACAddress;
//     this.IPAddress = IPAddress;
//     this.newIPAddress = newIPAddress;
//     this.netmask = netmask;
//     this.gateway = gateway;
//     this.hostname = hostname;
//     this.username = username;
//     this.password = password;
//   }
// }

// class MonitoringProtocol {
//   static async getInvitePacket(data) {
//     if (!Authentication.isValid) {
//       return null;
//     }
//     try {
//       const packet = new Buffer.alloc(300);
//       packet[0] = 2;
//       packet[1] = 1;
//       packet[2] = 6;
//       packet[4] = 0x92;
//       packet[5] = 0xda;
//       return packet;
//     } catch (error) {
//       return null;
//     }
//   }
// }

// // Example usage
// const modelInfo = new ModelInfo(
//   "My Model",
//   "00:11:22:33:44:55",
//   "192.168.1.1",
//   "255.255.255.0",
//   "192.168.1.254",
//   "y-device.local",
//   "5.4.0-42-generic",
//   "My Access Point",
//   true
// );
// const networkConfig = new NetworkConfig(
//   "00:11:22:33:44:55",
//   "192.168.1.1",
//   "192.168.1.2",
//   "255.255.255.0",
//   "192.168.1.254",
//   "y-device.local",
//   "username",
//   "password"
// );
// const invitePacket =  MonitoringProtocol.getInvitePacket();
// console.log(invitePacket);