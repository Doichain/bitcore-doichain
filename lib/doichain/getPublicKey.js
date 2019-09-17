import getOptInKey from "./getOptInKey"
const getPublicKey = async (domain) => {
        const optInKey = await getOptInKey(domain);
    return optInKey
};

export default getPublicKey;