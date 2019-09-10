import getOptInKey from "./getOptInKey"
//import getAddress from "./getAddress"

const getPublicKeyAndAddress = (domain) => {
    let publicKey = getOptInKey(domain).key;
    const destAddress =  getAddress(publicKey);
    return {publicKey:publicKey,destAddress:destAddress};
};

export default getPublicKeyAndAddress;