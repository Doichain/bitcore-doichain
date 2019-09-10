import generateNameId from "./generateNameId";
import getSignature from "./getSignature";
import getDataHash from "./getDataHash";
import getPublicKeyAndAddress from "./getPublicKeyAndAddress"
import encryptMessage from "./encryptMessage"
import getUrl from "./getUrl"
/**
 *
 * 1. Calculate NameId
 * 2. Create NameValue (SOI-signature)
 *
 * @param from
 * @param to
 */
const createDoichainEntry = (getPrivatKey,from,to,data) =>{
    const nameId = generateNameId();

    const message = to+from;  //TODO why to+from and not from+to?
    const recipientsPrivateKey = getPrivatKey;  //TODO check if we can just use our (alice) PrivatKey here for the signature
    const signature = getSignature(message, recipientsPrivateKey);
    let dataHash = "";
    if(data) dataHash = getDataHash(data);
    const parts = to.split("@");
    const domain = parts[parts.length-1];

    const publicKeyAndAddress = getPublicKeyAndAddress(domain);
    const fromHostUrl = getUrl()
    const fromHostUrlEncrypted = encryptMessage(publicKeyAndAddress.publicKey,fromHostUrl);

    const nameValue = JSON.stringify({
        signature: signature,
        dataHash: dataHash,
        from: fromHostUrlEncrypted
    });
}

export default createDoichainEntry