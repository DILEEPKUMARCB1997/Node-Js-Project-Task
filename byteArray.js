// const uint8 = new Uint8Array(12);
// console.log(uint8[0]); // 42
// console.log(uint8.length); // 2
// console.log(uint8.BYTES_PER_ELEMENT);

const buffer = new ArrayBuffer(300);
console.log(buffer);
const uint8 = new Uint8Array(buffer);
console.log(uint8);
