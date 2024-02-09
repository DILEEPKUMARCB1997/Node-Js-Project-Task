// const dgram = require("node:dgram");
// const server = dgram.createSocket("udp4");

// server.on("error", (err) => {
//   console.error(`server error:\n${err.stack}`);
//   server.close();
// });

// server.on("message", (msg, rinfo) => {
//   console.log("message", msg.toString());
//   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// server.on("listening", () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind(55954, "10.0.50.150", () => {
//   server.setBroadcast(true);
// });

const dgram = require("dgram");

const socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
  console.log(msg.toString());
  //console.log(rinfo);
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

socket.bind(5514, "10.0.50.150", () => {
  socket.setBroadcast(true);
});
