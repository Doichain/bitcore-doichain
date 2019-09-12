import ecies from 'standard-ecies'

const encryptMessage = (publicKey,message) => {
    try {
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        const messageBuffer = Buffer.from(message);
        return ecies.encrypt(publicKeyBuffer, messageBuffer).toString('hex');
    } catch(exception) {
        throw {error:"error while encrypting fromHostUrl", exception: exception};
    }
};
export default encryptMessage;
