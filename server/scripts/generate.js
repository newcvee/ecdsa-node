const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

// we are generating a random private key
const privateKey = secp.utils.randomPrivateKey();
// we re getting the public key from the private key
const publicKey =  secp.getPublicKey(privateKey);
// display on console
console.log('private key: ', toHex(privateKey));
console.log('public key: ', toHex(publicKey));
