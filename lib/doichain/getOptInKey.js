import settings from "./settings"
import {resolveTxt} from "./resolveTxt"
import getOptInProvider from "./getOptInProvider"

const OPT_IN_KEY = "doichain-opt-in-key";
const OPT_IN_KEY_TESTNET = "doichain-testnet-opt-in-key";
export const FALLBACK_PROVIDER = "doichain.org"; //never change this - even if you think you can - its doesn't work.

const getOptInKey = async (domain) => {

    try {
        console.log("getOptInKey",domain)
        let ourOPT_IN_KEY=OPT_IN_KEY;
        if(settings.regtest || settings.testnet)
            ourOPT_IN_KEY = OPT_IN_KEY_TESTNET;

        const key = await resolveTxt(ourOPT_IN_KEY, domain);

        if(key === undefined){ //try delegatedKey

            const provider = await getOptInProvider(domain);
            const delegatedKey = await resolveTxt(ourOPT_IN_KEY, provider);
            if(delegatedKey) return  {type: 'delegated', key: delegatedKey} ;

            //otherwise use fallback
            if(key===undefined && delegatedKey===undefined){
                const fallbackKey = await resolveTxt(ourOPT_IN_KEY, FALLBACK_PROVIDER);
                if(fallbackKey) return {type: 'fallback', key: fallbackKey}
                else
                    throw {error:"fallback has no key defined"};
            }
        }
        else
            return {type: 'default', key: key}

    } catch (exception) {
        throw {error:"error while gathering doichain publicKey of email domain from dns",exception: exception};
    }
};


export default getOptInKey;
