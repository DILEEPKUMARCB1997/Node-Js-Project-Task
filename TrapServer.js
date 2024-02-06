const UDP = require("dgram");
const gwd = require("./gwd");

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
  // console.log(msg);
  // console.log(
  //   "Received broadcast from " + rinfo.address + ":" + rinfo.port + " - " + msg
  // );
  gwd.initialize(msg);
});

server.bind(port, "10.0.50.150", () => {
  server.setBroadcast(true);
});
