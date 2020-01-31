import bitcore from "bitcore-doichain";
import constants from "../constants"
const createRawDoichainTX = (nameId, nameValue, validatorAddress,changeAddress,privKeySet,utxo,networkFee,validatorFee) => {
    console.log('nameId ',nameId)
    let nameIdPart2 = ''
    if(nameId.length>77) //we have only space for 77 chars in the name in case its longer as in signatures put the rest into the value
    {
        console.log('cutting nameId in two parts',nameId.length)
        nameIdPart2 = nameId.substring(78,nameId.length)
        nameId = nameId.substring(0,77)

        console.log('nameIdPart2',nameIdPart2)
        nameValue = nameIdPart2+' '+nameValue
    }

    console.log("nameId",nameId)
    console.log('nameValue',nameValue)
    console.log('validatorAddress',validatorAddress)

    if(networkFee<constants.NETWORK_FEE.btc) throw Error("fee too low! Will not be accepted by doichain node")
    const transactionFee = (constants.TRANSACTION_FEE.satoshis*2)
    const changeAmount = Math.abs(parseInt(utxo.change*100000000)) //don't substract fees since they are already substracted inside change
    const tx = new bitcore.Transaction()
        .from(utxo.utxos)          // Feed information about what unspent outputs one can use
        .nameDoi(nameId, nameValue, validatorAddress)
        .to(validatorAddress, validatorFee)  //parseInt(validatorFee*100000000) validator processing fee (reward, storage, revokaction) an output with the given amount of satoshis
        .to(changeAddress,changeAmount)
        //.change(changeAddress)      // Sets up a change address where the rest of the funds will go - unfortunately not working together with name_doi
        //.fee(transactionFee) //fee+100000000 //storage fee in satoshies  - goes into name_doi transaction - unfortunately not working together with name_doi
             // Signs all the inputs it can
        .sign(privKeySet)     // Signs all the inputs it can

    console.log('signed transaction',tx.toString())
    return tx.serialize(true);

}
export default createRawDoichainTX
