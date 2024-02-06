
/*
const MonitoringProtocol = {
  getInvitePacket: async function (data) {
    try {
      const packet = new Buffer.alloc(300);
      packet[0] = 2;
      packet[1] = 1;
      packet[2] = 6;
      packet[4] = 0x92;
      packet[5] = 0xda;

      return packet;
    } catch (error) {
      return null;
    }
  },

  getConfigPacket: async function (data) {
    try {
      const config = {
        MACAddress: data.MACAddress.replace(/:/g, ""),
        IPAddress: data.oldIPAddress,
        newIPAddress: data.newIPAddress,
        netmask: data.netmask,
        gateway: data.gateway,
        hostname: data.hostname,
        username: data.username,
        password: data.password,
      };

      // Split data
      const oldIP = config.IPAddress.split(".").map((x) => parseInt(x));
      const newIP = config.newIPAddress.split(".").map((x) => parseInt(x));
      const newNetmask = config.netmask.split(".").map((x) => parseInt(x));
      const newGetway = config.gateway.split(".").map((x) => parseInt(x));
      const MAC = Buffer.from(
        config.MACAddress.match(/.{1,2}/g).map((x) => parseInt(x, 16)),
        "hex"
      );

      // Create packet
      const packet = new Buffer.alloc(300);

      // Packet header
      packet[0] = 0;
      packet[1] = 1;
      packet[2] = 6;
      packet[4] = 0x92;
      packet[5] = 0xda;

      // Old IP address
      packet[12] = oldIP[0];
      packet[13] = oldIP[1];
      packet[14] = oldIP[2];
      packet[15] = oldIP[3];

      // New IP address
      packet[16] = newIP[0];
      packet[17] = newIP[1];
      packet[18] = newIP[2];
      packet[19] = newIP[3];

      // New Gateway IP address
      packet[24] = newGetway[0];
      packet[25] = newGetway[1];
      packet[26] = newGetway[2];
      packet[27] = newGetway[3];

      // MAC address
      MAC.copy(packet, 28);

      // new netmask
      packet[236] = newNetmask[0];
      packet[237] = newNetmask[1];
      packet[238] = newNetmask[2];
      packet[239] = newNetmask[3];

      // hostname
      let i = 90;
      for (const char of config.hostname) {
        packet[i++] = char;
      }

      // 2-> following are User Name + Password
      packet[70] = 2;

      // suppose user/password is default: "admin"
      i = 71;
      for (const char of config.username) {
        packet[i++] = char;
      }
      packet[i++] = " ";
      for (const char of config.password) {
        packet[i++] = char;
      }

      return packet;
    } catch (error) {
      return null;
    }
  },



function createLoginPacket(data) {
  if (!Authentication.isValid) {
    return null;
  }

  try {
    const config = {
      MACAddress: data.MACAddress.replace(/:/g, ''),
      IPAddress: data.IPAddress,
      username: data.username,
      password: data.password,
    };

    const IP = config.IPAddress.split('.').map(Number);
    const MAC = Buffer.from(config.MACAddress, 'hex');

    const packet = Buffer.alloc(300);

    // Packet header
    packet[0] = 5;
    packet[1] = 1;
    packet[2] = 6;
    packet[4] = 0x92;
    packet[5] = 0xDA;

    // IP address
    packet[12] = IP[0];
    packet[13] = IP[1];
    packet[14] = IP[2];
    packet[15] = IP[3];

    // MAC address
    packet[28] = MAC[0];
    packet[29] = MAC[1];
    packet[30] = MAC[2];
    packet[31] = MAC[3];
    packet[32] = MAC[4];
    packet[33] = MAC[5];

    // 2-> following are User Name + Password
    packet[70] = 2;

    // suppose user/password is default: "admin"
    let i = 71;
    for (const char of config.username) {
      packet[i++] = char.charCodeAt(0);
    }
    packet[i++] = 0x20; // space
    for (const char of config.password) {
      packet[i++] = char.charCodeAt(0);
    }

    return packet;
  } catch (error) {
    return null;
  }
}

function createBeepPacket(data) {
  if (!Authentication.isValid) {
    return null;
  }

  try {
    const config = {
      MACAddress: data.MACAddress.replace(/:/g, ''),
      IPAddress: data.IPAddress,
    };

    const IP = config.IPAddress.split('.').map(Number);
    const MAC = Buffer.from(config.MACAddress, 'hex');

    const packet = Buffer.alloc(300);

    // Packet header
    packet[0] = 7;
    packet[1] = 1;
    packet[2] = 6;
    packet[4] = 0x92;
    packet[5] = 0xDA;

    // IP address
    packet[12] = IP[0];
    packet[13] = IP[1];
    packet[14] = IP[2];
    packet[15] = IP[3];

    // MAC address
    packet[28] = MAC[0];
    packet[29] = MAC[1];
    packet[30] = MAC[2];
    packet[31] = MAC[3];
    packet[32] = MAC[4];
    packet[33] = MAC[5];

    return packet;
  } catch (error) {
    return null;
  }
}

  async validate(username, password) {
    // Replace this with your actual authentication logic
    if (username === 'admin' && password === 'password') {
      this.isValid = true;
    }
  }
}

class ModelInfo {
  constructor() {
    this.model = '';
    this.MACAddress = '';
    this.IPAddress = '';
    this.netmask = '';
    this.gateway = '';
    this.hostname = '';
    this.kernel = '';
    this.ap = '';
    this.isDHCP = false;
  }
}

class Device {
  constructor() {
    this.auth = new Authentication();
  }

  async getAckModelInfo(data) {
    if (!this.auth.isValid) {
      return null;
    }

    try {
      if (data[0] === 3 && data[4] === 0x92 && data[5] === 0xDA) {
        const modelInfo = new ModelInfo();
        modelInfo.model = data.toString('utf8', 44, 50).split('\0')[0];
        modelInfo.MACAddress = data.toString('hex', 28, 34).replace(/(.{2})/g, '$1:');
        modelInfo.IPAddress = `${data[12]}.${data[13]}.${data[14]}.${data[15]}`;
        modelInfo.netmask = `${data[236]}.${data[237]}.${data[238]}.${data[239]}`;
        modelInfo.gateway = `${data[24]}.${data[25]}.${data[26]}.${data[27]}`;
        modelInfo.hostname = data.toString('utf8', 90, 106).split('\0')[0];
        modelInfo.kernel = `${data[109]}.${data[108].toString(16).padStart(2, '0')}`;
        modelInfo.ap = data.toString('utf8', 110, 135).split('\0')[0];
        modelInfo.isDHCP = data[106] === 0 ? false : true;

        if (modelInfo.MACAddress === '00:00:00:00:00:00' || modelInfo.IPAddress === '0.0.0.0') {
          return null;
        }

        return modelInfo;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async getDownloadRequest(data) {
    if (!this.auth.isValid) {
      return null;
    }

    try {
      const def = 'name1234passwd12modelname 123457';
      const dlRequest = Buffer.alloc(40);

      for (let i = 0; i < def.length; i++) {
        dlRequest[i] = def.charCodeAt(i);
      }

      for (let j = 3; j >= 0; j--) {
        dlRequest[j + 32] = Math.floor(data.fileSize / Math.pow(256, j));
        data.fileSize -= dlRequest[j + 32] * Math.pow(256, j);
      }

      dlRequest[36] = 0x6C;

      return dlRequest;
    } catch (error) {
      return null;
    }
  }
}

// */
// const net = require('net-snmp');

// const SNMPSessionList = {};

// const mib = {
//   private: {
//     trapSetting: {
//       snmpTrapServerStatus: '1.3.6.1.4.1.12345.1.1',
//       snmpTrapServerIP: '1.3.6.1.4.1.12345.1.2',
//       snmpTrapServerPort: '1.3.6.1.4.1.12345.1.3',
//       snmpTrapServerTrapComm: '1.3.6.1.4.1.12345.1.4',
//     },
//     basicSetting: {
//       saveConfig: {
//         saveCfgMgtAction: '1.3.6.1.4.1.12345.2.1',
//       },
//       systemReboot: {
//         systemRebootAction: '1.3.6.1.4.1.12345.2.2',
//       },
//     },
//   },
// };

// const host = '127.0.0.1';
// const communityString = 'public';

// const createSNMPSession = (MACAddress) => {
//   const session = new net.Session();
//   session.connect(host, communityString, (error) => {
//     if (error) {
//       console.error(`Error connecting to ${MACAddress}:`, error);
//       return;
//     }
//     console.log(`Connected to ${MACAddress}`);
//     SNMPSessionList[MACAddress] = session;
//   });
//   return session;
// };

// const setupTrapServer = () => {
//   // You can implement a simple TFTP server here if needed
//   console.log('SNMP Trap Server is running');
// };

// const tearDownTrapServer = () => {
//   // You can implement a simple TFTP server shutdown here if needed
//   console.log('SNMP Trap Server is stopped');
// };

// const isServerAlive = () => {
//   // You can implement a simple check for the server status here
//   return true;
// };

// const handleTrapSettingRequest = (devices, param) => {
//   if (!param) {
//     throw new Error('Invalid input parameters');
//   }

//   if (!isServerAlive()) {
//     setupTrapServer();
//   }

//   let devicesCount = devices.length;

//   devices.forEach((MACAddress) => {
//     if (!SNMPSessionList[MACAddress]) {
//       SNMPSessionList[MACAddress] = createSNMPSession(MACAddress);
//     }

//     const { sysObjectId } = SNMPSessionList[MACAddress];
//     const oids = [
//       {
//         oid: sysObjectId + mib.private.trapSetting.snmpTrapServerStatus,
//         type: net.ObjectType.Integer,
//         value: 2,
//       },
//       {
//         oid: sysObjectId + mib.private.trapSetting.snmpTrapServerIP,
//         type: net.ObjectType.OctetString,
//         value: param.trapServerIP,
//       },
//       {
//         oid: sysObjectId + mib.private.trapSetting.snmpTrapServerPort,
//         type: net.ObjectType.Integer,
//         value: param.trapServerPort,
//       },
//       {
//         oid: sysObjectId + mib.private.trapSetting.snmpTrapServerTrapComm,
//         type: net.ObjectType.OctetString,
//         value: param.trapCommString,
//       },
//     ];

//     const saveConfigOids = [
//       {
//         oid: sysObjectId + mib.private.basicSetting.saveConfig.saveCfgMgtAction,
//         type: net.ObjectType.Integer,
//         value: 1,

//       }
//     ]
function unpack(str) {
  var bytes = [];
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    bytes.push(char >>> 8);
    bytes.push(char & 0xff);
  }
 // return bytes;
  console.log(bytes);
}

// const net = require("net");
// const snmp = require('net-snmp');

// // Set up SNMP session
// const session = new snmp.Session({
//   host: "target-device-ip",
//   community: "public",
//   version: snmp.Version.v2c,
// });
// var varbind = {
//   oid: "1.3.6.1.2.1.1.4.0",
//   type: snmp.ObjectType.OctetString,
//   value: "user.name@domain.name",
// };
// // Define trap parameters
// const trapParams = {
//   enterprise: "my-enterprise-number",
//   agentAddr: "my-agent-ip",
//   genericTrap: snmp.TrapType.coldStart,
//   specificTrap: null,
//   timeStamp: null,
//   uptime: null,
//   variables: varbind
// };

// // Send trap
// session.trap(trapParams, (err, session) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Trap sent successfully");
//   }
//  // session.close();
// });