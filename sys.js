const dgram = require("dgram");

// Create a new UDP server
const server = dgram.createSocket("udp4");

// Define the port and IP address to listen on
const port = 5514;
const address = "10.0.50.150";

// Bind the server to the address and port
server.bind(
  {
    address: address,
    port: port,
  },
  () => {
    server.setBroadcast(true);
  }
);

// Define a function to parse RFC5424 messages
function parseRFC5424Message(message) {
  console.log("syslogMsg", message.toString());
  const index = message.indexOf(">");
  const PriValue = message.subarray(index - 1, index).toString();
  const facility = Math.floor(PriValue / 8);
  const severity = PriValue % 8;
  //const uptime = message.toString().match(/(\d{2}d\d{2}h\d{2}m\d{2}s)/)[0];
  const timestamp = new Date().toISOString();
  const secondIndex = message.indexOf(": ");
  const data = message.subarray(0, secondIndex).toString();
  const lastIndex = data.lastIndexOf(" ");
  const tag = data.substring(lastIndex + 1);
  const last2Index = data.lastIndexOf(" ", lastIndex - 1);
  const uptime = data.substring(last2Index + 1, lastIndex);
  const msg = message.subarray(secondIndex + 2).toString();
  return {
    PriValue,
    facility,
    severity,
    timestamp,
    tag,
    uptime,
    msg,
  };
}
// const response = Buffer.from(parseRFC5424Message);
// console.log("res", response);

// Define a function to handle incoming messages
function handleMessage(message, remote) {
  try {
    // Parse the message as RFC5424
    const parsedMessage = parseRFC5424Message(message);

    // Log the message
    console.log(
      `Received message from ${remote.address}:${remote.port}: `,
      message.toString()
    );
    console.log("parsed message", parsedMessage);
  } catch (error) {
    // If the message could not be parsed, log an error
    console.error(
      `Error parsing message from ${remote.address}:${remote.port}:`,
      error
    );
  }
}

// Listen for incoming messages
server.on("message", handleMessage);
