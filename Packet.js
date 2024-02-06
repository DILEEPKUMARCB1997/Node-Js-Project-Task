const async = require("async");

class MonitoringProtocol {
  constructor() {
    this.authentication = {
      isValid: true,
    };
  }

  async getInvitePacket(data) {
    if (!this.authentication.isValid) {
      return null;
    }
    try {
      const packet = Buffer.alloc(300);
      packet[0] = 2;
      packet[1] = 1;
      packet[2] = 6;
      packet[4] = 0x92;
      packet[5] = 0xda;

      return packet;
    } catch (error) {
      return null;
    }
  }

  async getConfigPacket(data) {
    if (!this.authentication.isValid) {
      return null;
    }

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
    const oldIP = Buffer.from(
      config.IPAddress.split(".").map((n) => parseInt(n, 10))
    );
    const newIP = Buffer.from(
      config.newIPAddress.split(".").map((n) => parseInt(n, 10))
    );
    const newNetmask = Buffer.from(
      config.netmask.split(".").map((n) => parseInt(n, 10))
    );
    const newGetway = Buffer.from(
      config.gateway.split(".").map((n) => parseInt(n, 10))
    );
    const MAC = Buffer.from(
      config.MACAddress.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );

    // Create packet
    const packet = Buffer.alloc(300);

    // Packet header
    packet[0] = 0;
    packet[1] = 1;
    packet[2] = 6;
    packet[4] = 0x92;
    packet[5] = 0xda;

    // Old IP address
    oldIP.copy(packet, 12);

    // New IP address
    newIP.copy(packet, 16);

    // New Gateway IP address
    newGetway.copy(packet, 24);

    // MAC address
    MAC.copy(packet, 28);

    // New netmask
    newNetmask.copy(packet, 236);

    // hostname
    let i = 90;
    for (const c of config.hostname) {
      packet[i++] = c;
    }

    // 2-> following are User Name + Password
    packet[70] = 2;

    // suppose user/password is default: "admin"
    i = 71;
    for (const c of config.username) {
      packet[i++] = c;
    }
    packet[i++] = " ".charCodeAt(0);
    for (const c of config.password) {
      packet[i++] = c;
    }

    return packet;
  }
}

module.exports = MonitoringProtocol;
