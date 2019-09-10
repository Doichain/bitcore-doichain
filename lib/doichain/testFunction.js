import {fetchUrl} from 'fetch'
import generateNameId from "bitcore-doichain/lib/doichain/generateNameId";
import getSignature from "bitcore-doichain/lib/doichain/getSignature";
import getDataHash from "bitcore-doichain/lib/doichain/getDataHash";
//import getPublicKeyAndAddress from "bitcore-doichain/lib/doichain/getPublicKeyAndAddress";
import getUrl from "bitcore-doichain/lib/doichain/getUrl";
import encryptMessage from "bitcore-doichain/lib/doichain/encryptMessage";
import bitcore from "bitcore-doichain";
import getOptInKey from "bitcore-doichain/lib/doichain/getOptInKey";
const testFunction = () => {
//    const privateKey = 'cNWesXsc9m1WxefFNeb8NV9eRcY6K1Y9e9xp37MguQj8eJTXgxyM'
    var privateKey = new bitcore.PrivateKey();

    // from a private key
    var publicKey = new bitcore.PublicKey(privateKey);

    //const publicKey = new bitcore.PublicKey(new bitcore.PrivateKey.fromString(privateKey)).toString()
    const validatorUrl = ""//getUrl()

    const url = "http://localhost:3000/api/v1/listunspent?address=mj1FQKeXxdUrWJkrRti8iy2utHqarcrSoB"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.log)
/*
    //get public key from public dns
    const url = "http://localhost:3000/api/v1/getpublickeybypublicdns?domain=le-space.de"
    console.log("contacting",url)

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.log)

   //importPubKey
   if (bitcore.PublicKey.isValid(publicKey)){ //check if this publicKey is alrady imported
        console.log('publicKey is valid importing to Doichain validator to gather utxo',publicKey)
        //https://www.npmjs.com/package/fetch
        const options = {headers:{disableGzip:false}}
        //const url = validatorUrl+
        const url = "http://localhost:3000/api/v1/importpubkey?pubkey="+publicKey
        console.log("contacting",url)
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch(console.log)
    }*/
    return
    //TODO importPrivateKey
    const from = "nico@le-space.de"
    const to = "petra@le-space.de"
    createDoichainEntry(privateKey,from,to)
}
const createDoichainEntry = (getPrivatKey,from,to,data) => {
    const nameId = generateNameId();

    const message = to+from;  //TODO why to+from and not from+to?
    const recipientsPrivateKey = getPrivatKey;  //TODO check if we can just use our (alice) PrivatKey here for the signature
    const signature = getSignature(message, recipientsPrivateKey);
    let dataHash = "";
    if(data) dataHash = getDataHash(data);
    const parts = to.split("@");
    const domain = parts[parts.length-1];

    //const publicKeyAndAddress = getPublicKeyAndAddress(domain);
    const publicKey = getOptInKey(domain).key;
    const fromHostUrl = getUrl()
    const fromHostUrlEncrypted = encryptMessage(publicKey,fromHostUrl);

    const nameValue = JSON.stringify({
        signature: signature,
        dataHash: dataHash,
        from: fromHostUrlEncrypted
    });
}
export default testFunction;
/*module.exports = {
    testFunction: testFunction,
    createDoichainEntry: createDoichainEntry
};*/