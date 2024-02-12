/*
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

socket.bind(5162, () => {
  //socket.setBroadcast(true);
});
*/
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("listening", () => {
  const address = socket.address();
  console.log(`Trap Server listening on ${address.address}:${address.port}`);
});

socket.on("message", (message, remote) => {
  const version = message[0];
  const community = message.subarray(12, 17).toString();
  const enterprise = message.subarray(18, 25).toString("hex");
  const specific = message[25];
  const generic = message[26];
  const upTime = message.readUInt32BE(20);
  const varbinds = parseVarbinds(message, 28);
  const msg = varbinds[0].value;

  console.log({
    sourceIP: remote.address,
    version,
    community,
    enterprise,
    specific,
    generic,
    upTime,
   varbinds,
    msg,
  });
});

function parseVarbinds(message, start) {
  const varbinds = [];
  let index = start;

  while (index < message.length) {
    const oid = parseOid(message, index);
    index += oid.length;

    const type = message[index];
    index++;

    const value = parseValue(message, index, type);
    index += value.length;

    varbinds.push({ oid, type, value });
  }

  return varbinds;
}

function parseOid(message, start) {
  const length = message[start];
  const oid = message.subarray(start + 1, start + length + 1);
  return oid;
}

function parseValue(message, start, type) {
  switch (type) {
    case 1: // Integer
      return message.readInt32BE(start);
    case 2: // Octet String
      const length = message[start];
      return message.subarray(start + 1, start + length + 1).toString("utf-8");
    default:
      throw new Error(`Unsupported value type: ${type}`);
  }
}

socket.bind(5162, "10.0.50.151", () => {
//  socket.setBroadcast(true);
  //console.log("server binded on port 5162");
});