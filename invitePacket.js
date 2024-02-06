

const Parser = require('net-snmp');

// Sample SNMP trap string
const snmpTrap = `OID: SNMPv2-MIB::disManEventMIBExperimental.0 discards 1
 enterprise: OID: SNMPv2-SMI::enterprises.9999
 agent-addr: IP Address: 10.0.0.1
 generic-trap: Specific Trap: 1
 time-stamp: Timestamp: 2022-02-08 14:43:12 GMT
 uptime: Uptime: 23 days, 12 hours, 34 minutes, 13 seconds
 variable-bindings: Variable Bindings:
 OID: SNMPv2-MIB::sysUpTime.0 value: 2067853
 OID: SNMPv2-MIB::sysDescr.0 value: Linux myhost 4.15.0-101-generic #102-Ubuntu SMP Tue Jan 14 12:18:31 UTC 2020 x86_64
 OID: SNMPv2-MIB::sysName.0 value: myhost
 OID: SNMPv2-MIB::sysLocation.0 value: My Location
 OID: SNMPv2-MIB::sysContact.0 value: Me <me@example.com>`;

const parsedTrap = Parser.parse(snmpTrap);

const info = {
  facility: parsedTrap.variables.find((v) => v.oid.name === "sysFacility")
    ?.value,
  severity:
    parsedTrap.variables.find((v) => v.oid.name === "sysSeverity")?.value || 0,
  tag: parsedTrap.variables.find(
    (v) => v.oid.name === "my enterprise-specific tag"
  )?.value,
  address: parsedTrap.agentAddr,
  hostname: parsedTrap.variables.find((v) => v.oid.name === "sysName")?.value,
  msg: parsedTrap.variables.find((v) => v.oid.name === "sysDescr")?.value,
};

console.log(info);