import bitcore from "bitcore-doichain";

const getAddressOfPublicKey = (publicKey) => {
    const publicKeyObj = bitcore.PublicKey(publicKey)
    var addr = new bitcore.Address(publicKeyObj, bitcore.Networks.get('doichain'));
    return addr
}

export default getAddressOfPublicKey
