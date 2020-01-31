import bitcore from "bitcore-doichain";

/**
 * Create a public key and a private key
 * @returns {{privateKey: bitcore.PrivateKey, publicKey: bitcore.PublicKey}}
 */
const createWallet = () => {
    var privateKey = new bitcore.PrivateKey();
    var publicKey = new bitcore.PublicKey(privateKey);
    return {privateKey:privateKey, publicKey:publicKey}
}

export default createWallet
