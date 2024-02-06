
// const MESSAGE_TYPES = {
//   INVITE: 0x02,
//   REPORT: 0x01,
//   CONFIG: 0x00,
//   RESET: 0x05,
//   ACK: 0x03,
// };

// const MESSAGE_OPCODES = {
//   INVITE: MESSAGE_TYPES.INVITE,
//   CONFIG: MESSAGE_TYPES.CONFIG,
//   RESET: MESSAGE_TYPES.RESET,
//   BEEP: MESSAGE_TYPES.BEEP,
// };

// const MESSAGE_OPCODES_REVERSE = Object.fromEntries(
//   Object.entries(MESSAGE_OPCODES).map(([k, v]) => [v, k])
// );
// console.log(MESSAGE_OPCODES_REVERSE);
// function createMessage(opcode, data) {
//   const buffer = Buffer.alloc(data.length + 5);
//   buffer.writeUInt8(opcode, 0);
//   data.copy(buffer, 1);
//   return buffer;
// }


// function parseMessage(buffer) {
//   const opcode = buffer.readUInt8(0);
//   const data = buffer.slice(1);
//   return { opcode, data };
// }
// const UDP = require("dgram");

// const client = UDP.createSocket("udp4");

// const port = 55954;

// const hostname = "localhost";

// client.on("message", (message, info) => {
//   // get the information about server address, port, and size of packet received.

//   console.log(
//     "Address: ",
//     info.address,
//     "Port: ",
//     info.port,
//     "Size: ",
//     info.size
//   );

//   //read message from server

//   console.log("Message from server", message.toString());
// });

// const packet = Buffer.from("This is a message from client");

// client.send(packet, port, hostname, (err) => {
//   if (err) {
//     console.error("Failed to send packet !!");
//   } else {
//     console.log("Packet send !!");
//   }
// });
// const dgram = require("dgram");

// const socket = dgram.createSocket("udp4");

// const BOOTREQUEST = Buffer.from([
//   300, // End option
// ]);

// socket.send(
//   BOOTREQUEST,
//   0,
//   BOOTREQUEST.length,
//   67,
//   "255.255.255.255",
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("BOOTREQUEST sent to broadcast address");
//   }
// );



// async function getModelInfo(data) {
//   if (!Authentication.isValid) {
//     return null;
//   }
//   try {
//     if (data[0] === 1 && data[4] === 0x92 && data[5] === 0xda) {
//       const model = new ModelInfo();
//       model.model = Buffer.from(data.slice(44, 64), "utf8")
//         .toString()
//         .split("\0")[0];
//       model.MACAddress = data
//         .slice(28, 34)
//         .toString("hex")
//         .replace(/(.{2})/g, "$1:")
//         .slice(0, -1);
//       model.IPAddress = `${data[12]}.${data[13]}.${data[14]}.${data[15]}`;
//       model.netmask = `${data[236]}.${data[237]}.${data[238]}.${data[239]}`;
//       model.gateway = `${data[24]}.${data[25]}.${data[26]}.${data[27]}`;
//       model.hostname = Buffer.from(data.slice(90, 106), "utf8")
//         .toString()
//         .split("\0")[0];
//       model.kernel = `${data[109]}.${data[108].toString().padStart(2, "0")}`;
//       model.ap = Buffer.from(data.slice(110, 235), "utf8")
//         .toString()
//         .split("\0")[0];
//       model.isDHCP = data[106] === 0 ? false : true;

//       if (
//         model.MACAddress === "00:00:00:00:00:00" ||
//         model.IPAddress === "0.0.0.0"
//       ) {
//         return null;
//       }

//       return model;
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// }

// async function getAckModelInfo(data) {
//   if (!isValid) {
//     return null;
//   }
//   try {
//     if (data[0] === 3 && data[4] === 0x92 && data[5] === 0xda) {
//       const model = new ModelInfo();
//       model.model = Buffer.from(data.slice(44, 60), "utf8")
//         .toString()
//         .split("\0")[0];
//       model.MACAddress = data
//         .slice(28, 34)
//         .toString("hex")
//         .replace(/(.{2})/g, "$1:");
//       model.IPAddress = `${data[12]}.${data[13]}.${data[14]}.${data[15]}`;
//       model.netmask = `${data[236]}.${data[237]}.${data[238]}.${data[239]}`;
//       model.gateway = `${data[24]}.${data[25]}.${data[26]}.${data[27]}`;
//       model.hostname = Buffer.from(data.slice(90, 106), "utf8")
//         .toString()
//         .split("\0")[0];
//       model.kernel = `${data[109]}.${data[108].toString().padStart(2, "0")}`;
//       model.ap = Buffer.from(data.slice(110, 235), "utf8")
//         .toString()
//         .split("\0")[0];
//       model.isDHCP = data[106] === 0 ? false : true;

//       if (
//         model.MACAddress === "00:00:00:00:00:00" ||
//         model.IPAddress === "0.0.0.0"
//       ) {
//         return null;
//       }

//       return model;
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// }

// 
// async function getRebootPacket(data) {
//   if (!Authentication.isValid) {
//     return null;
//   }
//   try {
//     const config = {
//       MACAddress: data.MACAddress.replace(/:/g, ""),
//       IPAddress: data.IPAddress,
//       username: data.username,
//       password: data.password,
//     };

//     // Split data
//     const IP = config.IPAddress.split(".").map((a) => parseInt(a));
//     const MAC = config.MACAddress.match(/.{1,2}/g).map((a) => parseInt(a, 16));

//     // Create packet
//     const packet = new Buffer.alloc(300);

//     // Packet header
//     packet[0] = 5;
//     packet[1] = 1;
//     packet[2] = 6;
//     packet[4] = 0x92;
//     packet[5] = 0xda;

//     // IP address
//     packet[12] = IP[0];
//     packet[13] = IP[1];
//     packet[14] = IP[2];
//     packet[15] = IP[3];

//     // MAC address
//     packet[28] = MAC[0];
//     packet[29] = MAC[1];
//     packet[30] = MAC[2];
//     packet[31] = MAC[3];
//     packet[32] = MAC[4];
//     packet[33] = MAC[5];

//     // 2-> following are User Name + Password
//     packet[70] = 2;

//     // suppose user/password is default: "admin"
//     let i = 71;
//     config.username.split("").forEach((c) => (packet[i++] = c.charCodeAt(0)));
//     packet[i++] = 32;
//     config.password.split("").forEach((c) => (packet[i++] = c.charCodeAt(0)));

//     return packet;
//   } catch {
//     return null;
//   }
// }


// async function getBeepPacket(data) {
//   if (!Authentication.isValid) {
//     return null;
//   }
//   try {
//     const config = {
//       MACAddress: data.MACAddress.replace(/:/g, ""),
//       IPAddress: data.IPAddress,
//     };

//     // Split data
//     const IP = config.IPAddress.split(".").map((a) => parseInt(a));
//     const MAC = config.MACAddress.match(/.{1,2}/g).map((a) => parseInt(a, 16));

//     // Create packet
//     const packet = new Buffer.alloc(300);

//     // Packet header
//     packet[0] = 7;
//     packet[1] = 1;
//     packet[2] = 6;
//     packet[4] = 0x92;
//     packet[5] = 0xda;

//     // IP address
//     packet[12] = IP[0];
//     packet[13] = IP[1];
//     packet[14] = IP[2];
//     packet[15] = IP[3];

//     // MAC address
//     packet[28] = MAC[0];
//     packet[29] = MAC[1];
//     packet[30] = MAC[2];
//     packet[31] = MAC[3];
//     packet[32] = MAC[4];
//     packet[33] = MAC[5];

//     return packet;
//   } catch {
//     return null;
//   }
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
//       const packet = new Uint8Array(300);
//       packet[0] = 2;
//       packet[1] = 1;
//       packet[2] = 6;
//       packet[4] = 0x92;
//       packet[5] = 0xda;
//       return packet;
//     } catch {
//       return null;
//     }
//   }
// // }
// const Authentication = {
//     isValid:true
// }

// async function getDownloadRequest(data) {
//   if (!Authentication.isValid) {
//     return null;
//   }
//   try {
//     const def = "name1234passwd12modelname 123457"; // This is arbitrary and not very important
//     const dl_request = new Uint8Array(40);
//     console.log(dl_request);

//     for (let i = 0; i < def.length; i++) {
//       dl_request[i] = def.charCodeAt(i);
//     }

//     // Convert the file size to 4 byte representation and store in dl_request[32] to dl_request[35]
//     for (let j = 3; j >= 0; j--) {
//       dl_request[j + 32] = data.fileSize >> (j * 8);
//       data.fileSize = data.fileSize - (dl_request[j + 32] << (j * 8));
//     }

//     // Write the operation code 0x6c to dl_request[36]
//     dl_request[36] = 0x6c;

//     return dl_request;
//   } catch {
//     return null;
//   }
// }

// module.exports = { getDownloadRequest };

// const os = require("os");

// const ifaces = os.networkInterfaces();

// Object.keys(ifaces).forEach((ifname) => {
//   ifaces[ifname].forEach((iface) => {
//     if ("IPv4" !== iface.family || iface.internal !== false) {
//       // skip if not IPv4 or internal interface
//       return;
//     }
//     console.log(`Interface: ${ifname}, MAC: ${iface.hardwareAddress}`);
//   });
// });


////////////////MAC Address //////////////////
const os = require("os");

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


// const arp = require('arpscan');

// const options = {
//   interface: "eth0", // Use the network interface you want to scan on
//   timeout: 1000, // Timeout in milliseconds
//   retryCount: 2, // Number of times to retry
// };

// const ipAddress = "192.168.1.100"; // Replace with the IP address of the device you want to get the MAC address for

// arp.scan(options, (err, devices) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const device = devices.find((device) => device.ip === ipAddress);

//   if (device) {
//     console.log(`IP: ${device.ip} - MAC: ${device.mac}`);
//   } else {
//     console.log(`Device with IP address ${ipAddress} not found`);
//   }
// });