
let defaultDeviceData={}
const onlineArrayDeviceList = Object.values(defaultDeviceData);
const onlineCiscoDevice = onlineArrayDeviceList.filter(
  (fd) => fd.model === "Cisco CGS2520" && fd.isAUZ
);
return { deviceListArray: onlineCiscoDevice, onlineArrayDeviceList };
