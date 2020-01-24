import getUrl from "bitcore-doichain/lib/doichain/getUrl";

const getPublicKey = async (domain) => {
    return await request(domain)
};

const request = async (domain) => {
    const url = getUrl()+"api/v1/getpublickeybypublicdns?domain="+domain;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    return json.data
}
export default getPublicKey;
