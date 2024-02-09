// const dgram = require("dgram");
// //const snmp = require("net-snmp");

// const socket = dgram.createSocket("udp4");

// socket.on("message", (msg, rinfo) => {
//  console.log(msg);
//  //console.log(rinfo);
//   console.log(
//     `Received broadcast from ${rinfo.address}:${rinfo.port} - ${msg}`
//   );
// });

// socket.on("error", (err) => {
//   console.error("Socket error:", err);
//   socket.close();
// });

// socket.on("listening", () => {
//   socket.setBroadcast(true)
//   const address = socket.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// socket.bind(5162,"10.0.50.151");
const dgram=require('dgram')
const socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
  //console.log(msg);
  console.log(rinfo);
  console.log(
    `Received broadcast from ${rinfo.address}:${rinfo.port} - ${msg}`
  );
});

socket.on("error", (err) => {
  console.error("Socket error:", err);
  socket.close();
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

socket.bind(5162,()=>{
  socket.setBroadcast(true);
}
);
