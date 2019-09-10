var Message = require('bitcore-message')
var bitcore = require('bitcore')

const getSignature = (message,privateKey) => {
    try {
        const signature = Message(message).sign(new bitcore.PrivateKey.fromString(privateKey));
        return signature;
    } catch(exception) {
        throw {error:"Error during creating signature for doichain entry", exception: exception};
    }
};

export default getSignature;