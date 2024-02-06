

const net = require("net");
const snmp = require("net-snmp");

const sysObjectId = ".1.3.6.1.2.1.1";
 const snmpTrapServerStatus= ".8.6.1.5.0";
 const  snmpTrapServerIP=".8.6.1.7.0";
 const snmpTrapServerPort= ".8.6.1.6.0";
 const snmpTrapServerTrapComm= ".8.6.1.3.0";
 const   systemRebootAction= ".2.9.1.0";
 const saveCfgMgtAction= ".13.1.0";


const oids = [
  {
    oid: sysObjectId + snmpTrapServerStatus,
    type: snmp.ObjectType.Integer,
    value: 2,
  },
  {
    oid: sysObjectId + snmpTrapServerIP,
    type: snmp.ObjectType.OctetString,
    value: "192.168.1.100", // Replace with your trap server IP
  },
  {
    oid: sysObjectId + snmpTrapServerPort,
    type: snmp.ObjectType.Integer,
    value: 162, // Replace with your trap server port
  },
  {
    oid: sysObjectId + snmpTrapServerTrapComm,
    type: snmp.ObjectType.OctetString,
    value: "myTrapCommString", // Replace with your trap community string
  },
];
//console.log(oids);
const saveConfigOids = [
  {
    oid: sysObjectId + saveCfgMgtAction,
    type: snmp.ObjectType.Integer,
    value: 1,
  },
  {
    oid: sysObjectId + systemRebootAction,
    type: snmp.ObjectType.Integer,
    value: 1,
  },
];
console.log(saveConfigOids);
const server = net.createServer((socket) => {
  socket.on("data", async (data) => {
    try {
      const trap = snmp.parseTrap(data);
      console.log("Received SNMP trap:", trap);

      
      await snmp.setOids(saveConfigOids);

      // Reboot system
      await snmp.setOids(saveConfigOids);
    } catch (error) {
      console.error("Error handling SNMP trap:", error);
    }
  });
});

server.on("error", (error) => {
  console.error("SNMP trap server error:", error);
});

server.listen(5162, () => {
  console.log("SNMP trap server listening on UDP port 5162");
});