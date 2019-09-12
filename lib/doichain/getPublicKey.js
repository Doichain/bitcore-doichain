import getOptInKey from "./getOptInKey"
const getPublicKey = async (domain) => {
        const optInKey = await getOptInKey(domain);
    return optInKey.key
};

export default getPublicKey;