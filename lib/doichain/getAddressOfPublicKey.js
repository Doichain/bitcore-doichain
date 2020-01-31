import bitcore from "bitcore-doichain";

const getAddressOfPublicKey = (publicKey,network) => {
    const publicKeyObj = bitcore.PublicKey(publicKey)
    var addr = new bitcore.Address(publicKeyObj, network);
    return addr
}

export default getAddressOfPublicKey
