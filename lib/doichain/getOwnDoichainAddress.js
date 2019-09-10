import bitcore from "bitcore-doichain";

const getOwnDoichainAddress  = (privateKeyWif) => {
    const privateKey = bitcore.PrivateKey.fromWIF(privateKeyWif);
    var address = privateKey.toAddress();
    return address.toString()
}

export default getOwnDoichainAddress