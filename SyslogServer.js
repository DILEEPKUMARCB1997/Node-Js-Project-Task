const dgram = require("node:dgram");
const socket = dgram.createSocket("udp4");
var Syslogd = require("syslogd");

Syslogd(function (info) {
  // console.log("syslog msg", info);
  // info = {
  //   facility: 7,
  //   severity: 22,
  //   tag: "tag",
  //   hostname: "hostname",
  //   address: "127.0.0.1",
  //   family: "IPv4",
  //   port: null,
  //   size: 39,
  //   msg: "info",
  // };

  const syslogMsg = {
    facility: info.facility,
    severity: Number.isNaN(info.severity) ? 0 : info.severity,
    tag: info.tag,
    sourceIP: info.address,
    uptime: info.hostname,
    message: info.msg,
  };
  console.log("syslog message", syslogMsg);
}).listen(5514, function (err) {
  console.log(`Syslog server started`);
});

// Handle errors
socket.on("error", (err) => {
  console.error("Socket error:", err);
  socket.close();
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`server listening ${address.address}:${address.port}`);
});
socket.bind(55954, "10.0.50.150");

// var dgram = require("dgram");
// var syslog = require("syslogd");

// function noop() {}

// function Syslogd(fn, opt) {
//   if (!(this instanceof Syslogd)) {
//     return new Syslogd(fn, opt);
//   }
//   this.opt = opt || {};
//   this.handler = fn;
//   this.server = dgram.createSocket("udp4");
// }

// var proto = Syslogd.prototype;

// proto.listen = function (port, cb) {
//   var server = this.server;
//   if (this.port) {
//     syslog("server has binded to %s", port);
//     return;
//   }
//   syslog("try bind to %s", port);
//   cb = cb || noop;
//   this.port = port || 5514; // default is 514
//   var me = this;
//   server
//     .on("error", function (err) {
//       syslog("binding error: %o", err);
//       cb(err);
//     })
//     .on("listening", function () {
//       syslog("binding ok");
//       cb(null);
//     })
//     .on("message", function (msg, rinfo) {
//       var info = parser(msg, rinfo);
//       me.handler(info);
//     })
//     .bind(port);

//   return this;
// };

// var timeMaxLen = "Dec 15 10:58:44".length;

// var Severity = {};
// "Emergency Alert Critical Error Warning Notice Informational Debug"
//   .split(" ")
//   .forEach(function (x, i) {
//     Severity[x.toUpperCase()] = i;
//   });

// exports.Severity = Severity;

// var Facility = {}; // to much

// function parsePRI(raw) {
//   // PRI means Priority, includes Facility and Severity
//   // e.g. 10110111 =  10110: facility 111: severity
//   var binary = (~~raw).toString(2);
//   var facility = parseInt(binary.substr(binary.length - 3), 2);
//   var severity = parseInt(binary.substring(0, binary.length - 3), 2);
//   return [facility, severity];
// }

// function parser(msg, rinfo) {
//   // https://tools.ietf.org/html/rfc5424
//   // e.g. <PRI>time hostname tag: info
//   //console.log('entering syslog parser');
//   msg = msg + "";
//   console.log("msg = ", msg);
//   console.log("rinfo ", rinfo);
//   var tagIndex = msg.indexOf(": ");
//   var format = msg.substr(0, tagIndex);
//   var priIndex = format.indexOf(">");
//   var pri = format.substr(1, priIndex - 1);
//   // console.log('pri = ', pri)
//   pri = parsePRI(pri);
//   var lastSpaceIndex = format.lastIndexOf(" ");
//   var tag = format.substr(lastSpaceIndex + 1);

//   var last2SpaceIndex = format.lastIndexOf(" ", lastSpaceIndex - 1); // hostname cannot contain ' '

//   var upTime = format.substring(last2SpaceIndex + 1, lastSpaceIndex);
//   // time is complex because don't know if it has year

//   var time = format.substring(priIndex + 1, last2SpaceIndex);
//   time = new Date(time);
//   time.setYear(new Date().getFullYear()); // fix year to now
//   return {
//     facility: pri[0],
//     severity: pri[1],
//     tag: tag,
//     time: time,
//     upTime: upTime,
//     address: rinfo.address,
//     family: rinfo.family,
//     port: rinfo.port,
//     size: rinfo.size,
//     msg: msg.substr(tagIndex + 2),
//   };
// }
// /* eslint-enable */
// Syslogd((info) => {
//   // info = {
//   //   facility: 1,
//   //   severity: NaN,
//   //   tag: 'kernel',
//   //   time: 2019-01-14T21:51:26.000Z,
//   //   upTime: '00d00h08m34s',
//   //   address: '192.168.5.83',
//   //   family: 'IPv4',
//   //   port: 56393,
//   //   size: 77,
//   //   msg: 'Link Status: Port4 link is down.\n'
//   // }
//   //console.log('sys info');
//   //console.log(info);

//   const syslogMsg = {
//     facility: info.facility,
//     severity: Number.isNaN(info.severity) ? 0 : info.severity,
//     tag: info.tag,
//     sourceIP: info.address,
//     upTime: info.upTime,
//     message: info.msg,
//   };
//   console.log("syslog msg", syslogMsg);
// }).listen(5514, (err) => {
//   if (err) console.error(err);
//   console.log(`Syslog server start.`);
// });
