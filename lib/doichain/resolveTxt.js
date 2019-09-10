//import dns from 'dns';
var dns = require('dns')

export function resolveTxt(key, domain) {
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
    }*/
}
