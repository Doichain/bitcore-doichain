import bitcore from "bitcore-doichain";

const getPrivateKey = () => {
    const privateKey = new bitcore.PrivateKey('cNWesXsc9m1WxefFNeb8NV9eRcY6K1Y9e9xp37MguQj8eJTXgxyM');
    return privateKey
}
export default getPrivateKey