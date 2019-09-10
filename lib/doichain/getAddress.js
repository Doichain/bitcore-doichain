import CryptoJS from 'crypto-js';
import Base58 from 'bs58';
import settings from "./settings"
//import { Buffer } from 'buffer'
const VERSION_BYTE = 0x34;
const VERSION_BYTE_REGTEST = 0x6f;


const getAddress = (publicKey) => {
   /* const pubKey = CryptoJS.lib.WordArray.create(Buffer.from(publicKey, 'hex'));
    let key = CryptoJS.SHA256(pubKey);
    key = CryptoJS.RIPEMD160(key);
    let versionByte = VERSION_BYTE;

    if(settings.regtest || settings.testnet) versionByte = VERSION_BYTE_REGTEST;

    let address = Buffer.concat([Buffer.from([versionByte]), Buffer.from(key.toString(), 'hex')]);
    key = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(address));
    key = CryptoJS.SHA256(key);
    let checksum = key.toString().substring(0, 8);
    address = new Buffer.from(address.toString('hex')+checksum,'hex');
    address = Base58.encode(address); */
    return address;
}

export default getAddress;
