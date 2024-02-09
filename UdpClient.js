const oldIP = message
  .toString("binary")
  .split(".")
  .map(Number)
  .map((x) => x & 0xff);
console.log(oldIP);
