const dgram = require("dgram");
const snmp = require("net-snmp");

// Create a UDP socket
const socket = dgram.createSocket("udp4");

// Define a handler function for traps
function trapHandler(pdu, rinfo) {
  // Log the source IP and port of the trap
  console.log("Received trap from " + rinfo.address + ":" + rinfo.port);
//console.log(rinfo);
  // Loop through the varbinds in the trap
  for (var i = 0; i < pdu.varbinds.length; i++) {
    // Check for errors
    if (snmp.isVarbindError(pdu.varbinds[i])) {
      console.error(snmp.varbindError(pdu.varbinds[i]));
    } else {
      // Log the OID and value of the varbind
      console.log(pdu.varbinds[i].oid + " = " + pdu.varbinds[i].value);
    }
  }
}

// Start listening on port 5162
socket.on("message", function (msg, rinfo) {
  console.log(rinfo);
  // Parse the trap message
  const pdu = snmp.parseMessage(msg);

  // Check if the message is a trap
  if (pdu && pdu.type === snmp.PDU_TRAP) {
    // Handle the trap
    trapHandler(pdu, rinfo);
  }
});

socket.bind(5162,"10.0.50.151", function () {
  console.log("Listener started on port 5162");
});
