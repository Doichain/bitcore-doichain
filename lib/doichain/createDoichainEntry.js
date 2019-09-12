import generateNameId from "./generateNameId";
import getSignature from "./getSignature";
import getDataHash from "./getDataHash";
import getPublicKey from "./getPublicKey"
import encryptMessage from "./encryptMessage"
import getUrl from "./getUrl"
/**
 *
 * 1. Calculate NameId
 * 2. Create NameValue (SOI-signature)
 *
 * @param getPrivatKey
 * @param from
 * @param to
 * @param data
 */
const createDoichainEntry = async (getPrivatKey,from,to,data) =>{
    const nameId = await generateNameId();
    const message = to+from;  //TODO why to+from and not from+to?
    const privateKey = getPrivatKey;  // TODO check if we can just use our (alice) PrivatKey here for the signature
    const signature = getSignature(message, privateKey);
    let dataHash = "";
    if(data) dataHash = getDataHash(data);
    const parts = to.split("@");
    const domain = parts[parts.length-1];
    const publicKey = await getPublicKey(domain);

    const fromHostUrl = getUrl()
    const fromHostUrlEncrypted = encryptMessage(publicKey,fromHostUrl);

    const nameValue = JSON.stringify({
        signature: signature,
        dataHash: dataHash,
        from: fromHostUrlEncrypted
    });
    return {nameId:nameId,nameValue:nameValue,validatorPublicKey:publicKey}
}

export default createDoichainEntry