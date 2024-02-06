const UDP = require("dgram");

const server = UDP.createSocket("udp4");

const port = 55954;

// Define a function to convert the data into a packet

server.on("listening", () => {
  // Server address it’s using to listen

  const address = server.address();

  console.log(
    "Listining to ",
    "Address: ",
    address.address,
    "Port: ",
    address.port
  );
});

server.on("message", (msg, rinfo) => {
  console.log(
    "Received broadcast from " +
      rinfo.address +
      ":" +
      rinfo.port +
      " - " +
      msg.toString()
  );

  // const packet = Buffer.alloc(300);

  // const MAC = packet
  //   .slice(28, 34)
  //   .toString("hex")
  //   .match(/.{1,2}/g)
  //   .join(":")
  //   .toUpperCase();

  // // const oldIP = rinfo.oldIPAddress;

  // // Packet header
  // packet[0] = 0;
  // packet[1] = 1;
  // packet[2] = 6;
  // packet[4] = 0x92;
  // packet[5] = 0xda; // const newIP = rinfo.address;
  // // Old IP address
  // // packet[12] = oldIP[0];
  // // packet[13] = oldIP[1];
  // // packet[14] = oldIP[2];
  // // packet[15] = oldIP[3];

  // // New IP address
  // // packet[16] = newIP[0];
  // // packet[17] = newIP[1];
  // // packet[18] = newIP[2];
  // // packet[19] = newIP[3];

  // // MAC address
  // packet[28] = MAC[0];
  // packet[29] = MAC[1];
  // packet[30] = MAC[2];
  // packet[31] = MAC[3];
  // packet[32] = MAC[4];
  // packet[33] = MAC[5];

  let utf8Encode = new TextEncoder();
  utf8Encode.encode("abc");
  console.log("data", utf8Encode);
  server.send(utf8Encode, port, rinfo.address, (err) => {
    if (err) {
      console.error("Failed to send response !!");
    } else {
      console.log("Response send Successfully");
    }
  });
});

server.bind(port, "10.0.50.150", () => {
  server.setBroadcast(true);
});

// const dgram = require("node:dgram");
// const server = dgram.createSocket("udp4");
// const snmp = require("net-snmp");

// server.on("error", (err) => {
//   console.error(`server error:\n${err.stack}`);
//   server.close();
// });

// server.on("message", (msg, rinfo) => {
//   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// server.on("listening", () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind(5514);

// var session = snmp.createSession("10.0.50.12", "public");
// console.log(session);

// const option = {
//   syslogStatus: ".10.1.2.1.0",
//   serverPort: ".10.1.2.3.0",
//   eventServerLevel: ".10.1.2.4.0",
//   eventLogToFlash: ".10.1.2.5.0",
//   eventServerIP: ".10.1.2.6.0",
// };

// const setting = {
//   logLevel: 3,
//   logToFlash: 1,
//   logToServer: 1,
//   serverIP: "10.0.50.150",
//   serverPort: 514,
// };
// var varbind = [
//   {
//     oid: "1.3.6.1.2.1.1.4.0",
//     type: snmp.ObjectType.OctetString,
//     value: setting,
//   },
// ];
// console.log(varbind);
