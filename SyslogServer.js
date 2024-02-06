// const str = "bobbyhadz.com";

// const byteArray = Buffer.from(str, "utf8");

// // 👇️ <Buffer 62 6f 62 62 79 68 61 64 7a 2e 63 6f 6d>
// console.log(byteArray);
// var str = "Hello竜";
// var bytes = []; // char codes
// var bytesv2 = []; // char codes

// for (var i = 0; i < str.length; ++i) {
//   var code = str.charCodeAt(i);

//   bytes = bytes.concat([code]);

//   bytesv2 = bytesv2.concat([code & 0xff, (code / 256) >>> 0]);
// }

// // 72, 101, 108, 108, 111, 31452
// console.log("bytes", bytes.join(", "));

// // 72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 220, 122
// console.log("bytesv2", bytesv2.join(", "));


// function getInvitePacket(data) {
//   if (!Authentication.isValid) {
//     return null;
//   }
//   try {
//     const packet = Buffer.allocUnsafe(300);
//     packet[0] = 2;
//     packet[1] = 1;
//     packet[2] = 6;
//     packet[4] = 0x92;
//     packet[5] = 0xda;
// console.log(packet);
//     return packet;
//   } catch (error) {
//     return null;
//   }
// }

// ModelInfo class to byte array
var modelInfo = {
  model: "My Model",
  MACAddress: "01:23:45:67:89:ab",
  IPAddress: "192.168.1.1",
  netmask: "255.255.255.0",
  gateway: "192.168.1.254",
  hostname: "my-model.local",
  kernel: "5.4.0-42-generic",
  ap: "My Access Point",
  isDHCP: true
};

var modelInfoJson = JSON.stringify(modelInfo);
var modelInfoBytes = new TextEncoder().encode(modelInfoJson);
console.log(modelInfoBytes);
// NetworkConfig class to byte array
var networkConfig = {
  MACAddress: "01:23:45:67:89:ab",
  IPAddress: "192.168.1.1",
  newIPAddress: "192.168.1.2",
  netmask: "255.255.255.0",
  gateway: "192.168.1.254",
  hostname: "my-model.local",
  username: "my-username",
  password: "my-password"
};

var networkConfigJson = JSON.stringify(networkConfig);
var networkConfigBytes = new TextEncoder().encode(networkConfigJson);