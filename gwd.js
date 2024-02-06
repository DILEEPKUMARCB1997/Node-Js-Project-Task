const packet = require("./Packet");
const udpServer = require("./UdpServer");
const gwdAckWaitingList = {};
let duplicateLockList = {};
let lockInit = true;

// initialization the list,and kill all work queue.
function initialize() {
  try {
    lockInit = false;
    duplicateLockList = {};
    // kill all queue.
    onlinePacketQueue.kill();
    receiverQueue.kill();

    // send boradcast to invite
    deviceDiscovery();
  } catch (error) {
    console.error(error);
  }
}
function deviceDiscovery() {
  try {
    const message = packet.prototype.getInvitePacket({}, true);
    udpServer.default.send(message, "255.255.255.255", 55954);
    setTimeout(() => {
      udpServer.default.send(message, "255.255.255.255", 55954);
    }, 400);
    setTimeout(() => {
      udpServer.default.send(message, "255.255.255.255", 55954);
    }, 800);
  } catch (error) {
    console.error(error);
  }
}
module.exports = { initialize };
