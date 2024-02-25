// 生成公钥和私钥
const NodeRSA = require('node-rsa');
const key = new NodeRSA({
    b: 512
});

const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

console.log(publicKey);
console.log(privateKey);