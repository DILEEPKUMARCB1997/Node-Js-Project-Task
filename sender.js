

const snmp = require("net-snmp");

const trapMapping = {
  1: "Cold Start",
  2: "Warm Start",
  3: "Link Down",
  4: "Link Up",
  5: "Authentication Failure",
  6: "EGP Neighbor Loss",
};

const trapServer = snmp.createSession({
  version: snmp.Version2c,
  port: 55954,
  transport: "udp4",
  trapPort: 5162,
});
//console.log(trapServer);

trapServer.on("message", (msg) => {
  const {
    version,
    community,
    enterprise,
    specific,
    generic,
    uptime,
    varbinds,
  } = msg;
  try {
    const trapMsg = {
      sourceIP: msg.remote.address,
      version,
      community,
      enterprise,
      specific,
      generic,
      uptime: uptime !== null ? uptime : 0,
      varbinds: JSON.stringify(varbinds),
      msg: `Port ${generic} - ${trapMapping[specific]}`,
    };

    console.log(trapMsg);
  } catch (error) {
    console.log(error);
  }
});

trapServer.on("error", (error) => {
  console.log(error);
});

trapServer.on("listening", (port) => {
  console.log(`Trap server start listening on : ${port}`);
});
