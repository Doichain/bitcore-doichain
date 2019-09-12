import bitcore from "bitcore-doichain";

const createRawDoichainTX = (nameId, nameValue, validatorAddress,changeAddress,privKeySet,utxo,fee,amount) => {
    console.log("amount",amount)
    if(fee<0.01) throw Error("fee too low! Will not be accepted by doichain node")
    if(amount<0.03) throw Error("amount too low! Will not be accepted by validator - reward,revocation, doi-storage")

    var tx = new bitcore.Transaction()
        .from(utxo)          // Feed information about what unspent outputs one can use
        .nameDoi(nameId, nameValue, validatorAddress)
        .to(validatorAddress, amount*100000000)  // validator processing fee (reward, storage, revokaction) an output with the given amount of satoshis
        .change(changeAddress)      // Sets up a change address where the rest of the funds will go
        .fee(fee+100000000)  //storage fee in satoshies  - goes into name_doi transaction
        .sign(privKeySet)     // Signs all the inputs it can

    console.log(tx.toJSON())
    var serialized = tx.serialize(true);
    return serialized

}
export default createRawDoichainTX