import bitcore from "bitcore-doichain";

const createRawDoichainTX = (nameId, nameValue, validatorAddress,changeAddress,privKeySet,utxo,fee,amount) => {
    
    if(fee<0.01) throw Error("fee too low! Will not be accepted by doichain node")
    if(amount<0.03) throw Error("amount too low! Will not be accepted by validator - reward,revocation, doi-storage")

    const changeAmount = parseInt(utxo.change*100000000)

    const tx = new bitcore.Transaction()
        .from(utxo.utxos)          // Feed information about what unspent outputs one can use
        .nameDoi(nameId, nameValue, validatorAddress)
        .to(validatorAddress, amount*100000000)  // validator processing fee (reward, storage, revokaction) an output with the given amount of satoshis
        .to(changeAddress,changeAmount)
       // .change(changeAddress)      // Sets up a change address where the rest of the funds will go - unfortunately not working together with name_doi
      //  .fee(fee+100000000)  //storage fee in satoshies  - goes into name_doi transaction - unfortunately not working together with name_doi
        .sign(privKeySet)     // Signs all the inputs it can

    return tx.serialize(true);

}
export default createRawDoichainTX