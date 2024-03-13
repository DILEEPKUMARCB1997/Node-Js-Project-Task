
// const dgram = require('dgram');
// const message =Buffer.alloc(300)

// const client = dgram.createSocket('udp4');

// client.on('listening', () => {
//   const address = client.address();
//   console.log(`UDP client listening on ${address.address}:${address.port}`);

//   // Broadcast the message to all devices on the local network
//    client.send(message, 0, message.length, 55954, "255.255.255.255");
// //   client.send(message, 0, message.length, address.port, '255.255.255.255', (err) => {
// //     if (err) {
// //       console.error(`Error sending message: ${err}`);
// //     } else {
// //       console.log('Sent message to all devices on the local network');
// //     }
// //   });
// });

// client.on('message', (msg, rinfo) => {
//   console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
//   console.log(`Message: ${msg}`);
// });

// client.on('error', (err) => {
//   console.error(`Error in UDP client: ${err}`);
//   client.close();
// });

// client.bind(55954,()=>{
//   client.setBroadcast(true)
// }); // Bind to a random port number