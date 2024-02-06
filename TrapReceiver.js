// const { createSocket } = require("dgram");
const snmp=require('net-snmp')

//const Cisco=require('./Cisco')


var session = snmp.createSession("10.0.50.151", "public");
console.log(session);
var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];



var varbinds = [
  {
    oid: "1.3.6.1.2.1.1.5.0",
    type: snmp.ObjectType.OctetString,
    value: "host1",
  },
  {
    oid: "1.3.6.1.2.1.1.6.0",
    type: snmp.ObjectType.OctetString,
    value: "somewhere",
  },
];


