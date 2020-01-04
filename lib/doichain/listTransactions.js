import getUrl from "bitcore-doichain/lib/doichain/getUrl";

export default async function listtransactions(address) {
    const url = getUrl()+"/api/v1/listtransactions?address=" + address;
    const response = await fetch(url);
    const json = await response.json();
    return json
}
