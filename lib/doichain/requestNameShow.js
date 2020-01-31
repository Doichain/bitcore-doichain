import getUrl from "bitcore-doichain/lib/doichain/getUrl";

const requestNameShow = (nameId) => {
    return request(nameId)
};

const request = async (nameId) => {
    const url = getUrl()+"api/v1/name_show?nameId="+encodeURIComponent(nameId);
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
export default requestNameShow;
