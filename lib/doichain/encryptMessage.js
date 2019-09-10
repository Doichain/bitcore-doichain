import ecies from 'standard-ecies';
//import { Buffer } from 'buffer'


const encryptMessage = (publicKey,message) => {
    try {
        const publicKey = Buffer.from(publicKey, 'hex');
        const message = Buffer.from(message);
        return ecies.encrypt(publicKey, message).toString('hex');
    } catch(exception) {
        throw {error:"error while encrypting fromHostUrl", exception: exception};
    }
};

export default encryptMessage;
