// // const net = require("net");

// // const server = net.createServer((socket) => {
// //   console.log("Client connected");

// //   socket.on("data", (data) => {
// //     console.log("Received data:", data);
// //     // Create invite packet
// //     const packet = Buffer.alloc(300);
// //     packet[0] = 2;
// //     packet[1] = 1;
// //     packet[2] = 6;
// //     packet[4] = 0x92;
// //     packet[5] = 0xda;

// //     // Send invite packet to client
// //     socket.write(packet);
// //   });

// //   socket.on("end", () => {
// //     console.log("Client disconnected");
// //   });
// // });

// // server.listen(55954, () => {
// //   console.log("Server listening on port 55954");
// // });


// // var nmap = require('libnmap');

// // nmap.discover(function(err, report) {
// //   if (err) throw new Error(err);

// //   for (var item in report) {
// //     console.log(JSON.stringify(report[item]));
// //   }
// // }
// // )

// // var subnet = require('netmask').Netmask,
// //   ifaces = require('os').networkInterfaces();

// // ifaces.forEach(function (iface) {
// //   console.log(new netmask(iface.address + "/" + iface.netmask));
// // });
// // const dgram = require('dgram');

// // const listener = dgram.createSocket('udp4');
// // const listenPort=55954
// // listener.on('listening', () => {
// // console.log(
// // `Listening on port ${listenPort}`
// // );
// // });

// // listener.on('message', (msg, rinfo) => {
// // console.log(
// // `Received message from ${rinfo.address}:${rinfo.port}: ${msg}`
// // );
// // });

// // listener.bind(listenPort);

// // Server Code:

// // const dgram = require('dgram');
// // //const listener = dgram.createSocket("udp4");


// // const server = dgram.createSocket('udp4');
// // const _listenPort=55954
// // server.on('listening', () => {
// // console.log(
// //  `listening on port ${_listenPort}`
// // );
// // });

// // server.send('Testing…', _listenPort, '192.168.255.255');

// // console.log('Message sent to the broadcast address');

// // server.close();

// //listener.close();

// /////////////////sender///////////////



// //////////////Listener//////////////
// // const dgram = require("dgram");
// // const server = dgram.createSocket("udp4");

// // const listenPort =55954;

// // server.on("listening", () => {
// //   console.log(`UDP server listening on port ${listenPort}`);
// // });

// // server.on("message", (msg, rinfo) => {
// //   console.log(`Received ${msg} from ${rinfo.address}:${rinfo.port}`);
// // });

// // server.bind(listenPort);
// // const dgram = require("dgram");

// // const listenPort = 55954;

// // // function startListener() {
// // //   const listener = dgram.createSocket("udp4");
// // //   listener.on("listening",() => {
// // //     console.log(`UDP listener started on port ${listenPort}`);
// // //   });
// // //   listener.on("message", (msg, rinfo) => {
// // //     console.log(`Received ${msg} from ${rinfo.address}:${rinfo.port}`);
// // //   });
// // //   listener.bind(listenPort, "10.0.50.151");
// // // }

// // // startListener();

// // const snmp = require('net-snmp');

// // const oids = {
// //   // ... your OIDs here
// // };

// // const session = snmp.createSession("127.0.0.1", "public"); // replace '127.0.0.1' with your target IP address

// // const trapOid = "1.3.6.1.6.3.1.1.5.1"; // sysUpTimeInstance
// // const trapVarbinds = [
// //   { oid: trapOid, type: snmp.ObjectType.Timeticks, value: 100 },
// //   {
// //     oid: oids.systemModel,
// //     type: snmp.ObjectType.OctetString,
// //     value: "Your System Model",
// //   },
// //   {
// //     oid: oids.basicSetting.ipConfiguration.ipConfigurationDHCPStatus,
// //     type: snmp.ObjectType.Integer32,
// //     value: 1,
// //   },
// //   // ... add more trap varbinds as needed
// // ];

// // session.trap(trapVarbinds, (error, varbinds) => {
// //   if (error) {
// //     console.error("Failed to send SNMP trap:", error);
// //   } else {
// //     console.log("SNMP trap sent successfully:", varbinds);
// //   }
// // });
// //////////////////////////////////////////////////////////////////
// // const snmp = require('net-snmp')
// // const dgram = require("dgram");
// // const net = require("net");

// // const trapPort = 162;
// // const communityString = "public";

// // // Create an SNMP agent
// // const agent = snmp.createAgent();

// // // Register a trap handler
// // agent.on("trap", (session, varbinds, address, port) => {
// //   console.log(`Received trap from ${address}:${port}:`);
// //   console.log(snmp.varbindsToText(varbinds));
// // });

// // // Start listening for traps
// // const udpServer = dgram.createSocket("udp4");
// // udpServer.bind(trapPort);

// // // Send a trap when a new TCP connection is established
// // net
// //   .createServer((socket) => {
// //     console.log(
// //       `New TCP connection from ${socket.remoteAddress}:${socket.remotePort}`
// //     );
// //     const trap = snmp.createTrap({
// //       enterprise: snmp.ObjectIdentity.enterprises.iso(1).oids.internet(4),
// //       agentAddress: socket.remoteAddress,
// //       genericTrap: snmp.TrapType.LinkDown,
// //       specificTrap: snmp.TrapType.LinkDown,
// //       time: new Date(),
// //       address: socket.remoteAddress,
// //       port: socket.remotePort,
// //       community: communityString,
// //     });

// //     udpServer.send(trap, 0, trap.length, trapPort, "127.0.0.1", (error) => {
// //       if (error) {
// //         console.error(`Error sending trap: ${error}`);
// //       } else {
// //         console.log("Trap sent");
// //       }
// //     });

// //     socket.on("data", (data) => {
// //       console.log(
// //         `Received data from ${socket.remoteAddress}:${
// //           socket.remotePort
// //         }: ${data.toString()}`
// //       );
// //     });

// //     socket.on("close", () => {
// //       console.log(
// //         `TCP connection closed from ${socket.remoteAddress}:${socket.remotePort}`
// //       );
// //     });

// //     socket.on("error", (error) => {
// //       console.error(`TCP connection error: ${error}`);
// //     });
// //   })
// //   .listen(161, "127.0.0.1");

// // console.log(
// //   `SNMP trap server is running on port ${trapPort} with community string "${communityString}"`
// // );


// const snmp = require("net-snmp");

// // Create a new SNMP session
// const session = snmp.createSession("10.0.50.151", "public");
// console.log(session);

// const GenericType = snmp.GenericType;


// // Define the trap parameters
// // const trapType = snmp.TrapType.LinkDown;
// // const enterprise = "1.3.6.1.4.1.2620"; // Enterprise specific OID
// // const agentAddress = "127.0.0.1";
// // const genericType = GenericType.LinkDown;
// // const specificType = 0; // Specific type code (optional)
// // const uptime = 123456; // Uptime in hundredths of a second
// // const variables = [
// //   { oid: "1.3.6.1.2.1.1.3.0", value: "127.0.0.1" },
// //   { oid: "1.3.6.1.2.1.1.5.0", value: "My System" },
// //   { oid: "1.3.6.1.2.1.1.6.0", value: "My Software" },
// // ];

// // // Send the trap
// // session.trap(
// //   trapType,
// //   enterprise,
// //   agentAddress,
// //   genericType,
// //   specificType,
// //   uptime,
// //   variables,
// //   function (error) {
// //     if (error) {
// //       console.error("Error sending trap:", error);
// //     } else {
// //       console.log("Trap sent successfully");
// //     }
// //     session.close();
// //   }
// // );



async function getInvitePacket() {
  const response = await fetch("your_api_endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // your data here
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get invite packet");
  }

  const packet = await response.arrayBuffer();
  const byteArray = new Uint8Array(packet);

  return byteArray;
}

getInvitePacket()
  .then((packet) => {
    console.log("Invite packet:", packet);
  })
  .catch((error) => {
    console.error("Error:", error);
  });