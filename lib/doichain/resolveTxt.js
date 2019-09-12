//import dns from 'dns';
var dns = require('dns')

export async function resolveTxt(key, domain) {

        console.log(key,domain)
    //TODO this looks like it cannot be done in a browser
    //async function fetchDNS(domain) {
        const url = "http://localhost:3000/api/v1/getpublickeybypublicdns?domain=" + domain;
        const response = await fetch(url);
        const json = await response.json();
        console.log('resolveTxt',json)
        return json.data
   // }
   // await fetchDNS()
}
/*
    try {
        //const records = await  dns.resolveTxt(domain)
        const records = await dns_resolveTxt(domain) //syncFunc(key, domain);
        if(records === undefined) return undefined;
        let value = undefined;
        records.forEach(record => {
            if(record[0].startsWith(key)) {
                const val = record[0].substring(key.length+1);
                value = val.trim();
            }
        });
        return value;
    } catch(error) {
        if(error.message.startsWith("queryTxt ENODATA") ||
            error.message.startsWith("queryTxt ENOTFOUND")) return undefined;
        else throw error;
    }
}
*/
