import settings from "./settings"
import {resolveTxt} from "./resolveTxt"
import {FALLBACK_PROVIDER} from "./getOptInKey";
const PROVIDER_KEY = "doichain-opt-in-provider";
const PROVIDER_KEY_TESTNET = "doichain-testnet-opt-in-provider";

const getOptInProvider = async (domain) => {
    try {
        let ourPROVIDER_KEY=PROVIDER_KEY;
        if(settings.regtest || settings.testnet)
            ourPROVIDER_KEY = PROVIDER_KEY_TESTNET;

        const provider = await resolveTxt(ourPROVIDER_KEY, domain);
        if(provider === undefined) return FALLBACK_PROVIDER
        return provider;
    } catch (exception) {
        throw {error:"fallback has no key defined",exception: exception};
    }
};
export default getOptInProvider;
