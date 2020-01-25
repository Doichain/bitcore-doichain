import bitcore from "bitcore-doichain";
import getPublicKey from "bitcore-doichain/lib/doichain/getPublicKey";
import getDataHash from "bitcore-doichain/lib/doichain/getDataHash";

export const DOI_STATE_WAITING_FOR_CONFIRMATION = 0
export const DOI_STATE_SENT_TO_VALIDATOR = 1
export const DOI_STATE_VALIDATOR_SENT_DOI_REQUEST_EMAIL = 2
export const DOI_STATE_VALIDATOR_RECEIVED_CONFIRMATION = 3


/**
 * Create a simple Doicoin Transaction (without nameId) with the given unconfirmed UTXOS (here called offchainUTXOS
 *
 * @param ourAddress
 * @param privateKey
 * @param toAddress
 * @param amount
 * @param offChainUTXOSs
 * @returns {Promise<{tx, changeAddress: *}>}
 */
export const createDoicoinTransaction = async (ourAddress,privateKey, toAddress,amount,offchainUTXOs) => {
    const changeAddress = ourAddress
    const fee = 100000 //0,00100000 TODO please calculate correct fee for transaction
    const feeInBTC = 0.00100000
    const amountComplete = Number(amount)+feeInBTC
    let tx = bitcore.Transaction();
        tx.to(toAddress, Number(amount*100000000));
        tx.change(changeAddress);
        tx.fee(fee);

    let our_txSerialized = undefined
    const utxosFromNode = await bitcore.getUTXOAndBalance(ourAddress, amountComplete) //.then(function (utxosFromNode) {

    const utxos = checkUTXOs(utxosFromNode,offchainUTXOs,amountComplete)
    tx.from(utxos.utxos);
    tx.sign(privateKey);
    our_txSerialized = tx.serialize(true)
    return {tx:our_txSerialized,changeAddress:changeAddress}
}

/**
 * Calculates the necessary amount including fees for a DOI reqeust,
 * fetches UTXO's from Node and compares it with unconfirmed UTXO's
 * in case no confirmed UTXOs are available.
 *
 * @param ourAddress
 * @param offChainUTXOSs
 * @returns {Promise<*>}
 */
export const getUTXOs4DoiRequest = async (ourAddress,offChainUTXOSs,unspentTX) => {
    const amountComplete = Number(bitcore.constants.VALIDATOR_FEE.btc)+
        Number(bitcore.constants.NETWORK_FEE.btc)+
        Number(bitcore.constants.TRANSACTION_FEE.btc)
    const utxosFromNode = await bitcore.getUTXOAndBalance(ourAddress, amountComplete,unspentTX)
    const our_utxos = await checkUTXOs(utxosFromNode,offChainUTXOSs,amountComplete)
    return our_utxos
}

/**
 * Calculates the necessary amount including fees for a Email verification reqeust,
 * fetches UTXO's from Node and compares it with unconfirmed UTXO's
 * in case no confirmed UTXOs are available.
 *
 * @param ourAddress
 * @param offChainUTXOSs
 * @returns {Promise<*>}
 */
export const getUTXOs4EmailVerificationRequest = async (ourAddress,offChainUTXOSs,unspentTX) => {
    const amountComplete = Number(bitcore.constants.EMAIL_VERIFICATION_FEE.btc)+
        Number(bitcore.constants.NETWORK_FEE.btc)+
        Number(bitcore.constants.TRANSACTION_FEE.btc)
    const utxosFromNode = await bitcore.getUTXOAndBalance(ourAddress, amountComplete,unspentTX)
    const our_utxos = await checkUTXOs(utxosFromNode,offChainUTXOSs,amountComplete)
    return our_utxos
}

/**
 *
 * @param email
 * @param ourWallet
 * @param offChainUtxos
 * @returns {Promise<{tx: *, doichainEntry, validatorAddress: string, changeAddress: string, utxos: *, validatorPublicKeyData}>}
 */
export const createDOIRequestTransaction = async (email, ourWallet, offChainUtxos) => {

    const validatorPublicKeyData = await getValidatorPublicKey(email)
    const doichainEntry = await createDoichainEntry(validatorPublicKeyData.key,email,ourWallet)
    const utxos = await getUTXOs4DoiRequest(ourWallet,offChainUtxos)

    const ourAddress = bitcore.getAddressOfPublicKey(ourWallet.publicKey).toString()
    const validatorAddress = bitcore.getAddressOfPublicKey(validatorPublicKeyData.key).toString()
    const changeAddress = ourAddress //just send change back to us for now - could be its better to generate a new address here
    const ourPrivateKey = ourWallet.privateKey

    const txSignedSerialized = await bitcore.createRawDoichainTX(
        doichainEntry.nameId,
        doichainEntry.nameValue,
        validatorAddress,
        changeAddress,
        ourPrivateKey,
        utxos, //here's the necessary utxos and the balance and change included
        bitcore.constants.NETWORK_FEE.btc, //for storing this record
        bitcore.constants.VALIDATOR_FEE.btc //0.01 for DOI storage, 0.01 DOI for reward for validator, 0.01 revokation reserved
    )

    return {
        tx:txSignedSerialized,
        doichainEntry:doichainEntry,
        utxos: utxos,
        validatorPublicKeyData:validatorPublicKeyData,
        changeAddress:changeAddress,
        validatorAddress: validatorAddress
    }
}
/**
 * Checking and collecting confirmed and unconfirmed UTXOs for a given amount.
 * We return the utxo's we need in order to fullfil 'amount'.
 * If both are insufficient we throw an error here.
 *
 * @param utxosFromNode
 * @param offChainUTXOSs
 * @param amount
 * @returns {{utxos}|*}
 */
export const checkUTXOs = (utxosFromNode,offChainUTXOSs,amount) => {
    console.log('checkingUTXOs: utxosFromNode'+JSON.stringify(utxosFromNode)+' offChainUTXOSs:'+offChainUTXOSs+' amount'+amount)
    if ((utxosFromNode.utxos.length === 0 || utxosFromNode.balanceAllUTXOs<amount) //in case blockchain doesn't have enough funds yet and no offchain utxos are stored
        && (!offChainUTXOSs || !offChainUTXOSs.utxos || offChainUTXOSs.utxos.length===0)){
        const err = 'insufficient funds - no utxos from node or utxos balance less then amount'
        console.log(err)
        throw err
    }
    //we spent all outputs but have a offchain balance left when adding amounts of change addresses
    else if(utxosFromNode.utxos.length === 0 && offChainUTXOSs.utxos.length>0){
        if(offChainUTXOSs.balance < amount) { //if the offchain utxos balance is also not sufficient
            const err = 'insufficient funds - no utxos from node and no utxos in change'
            console.log(err)
            throw err
        }
        //utxoObject cointains txid,utxos,balance
        if(!utxosFromNode.utxos) utxosFromNode.utxos=[]

        offChainUTXOSs.utxos.forEach((utxoObject)=>{
            utxosFromNode.utxos.push(utxoObject.utxos)
        }) //this is our new base for new transactions
        utxosFromNode.change = offChainUTXOSs.balance-amount //subtract the amount we want to transfer to receive the new change
    }
    if(utxosFromNode.change < 0) { //if the offchain utxos balance is also not sufficient
        const err = 'insufficient funds - offchain utxos available but insufficient'
        console.log(err)
        throw err
    }
    console.log('returning utxos',utxosFromNode)
    return utxosFromNode
}

/**
 *  Returns the public key of a validator by a given email address
 * @param email
 * @returns {Promise<*>}
 */
export const getValidatorPublicKey = async (email) => {
    const parts = email.split("@");
    const domain = parts[parts.length-1];
    let our_validatorPublicKeyData = await getPublicKey(domain)
    return our_validatorPublicKeyData
}


/**
 * Creates a DoichainEntry (nameId + nameValue) for storing it on Doichain blockchain
 *
 * @param validatorPublicKey
 * @param email
 * @param ourWallet
 * @returns {Promise<void>}
 */
export const createDoichainEntry = async (validatorPublicKey,recipientEmail, ourPrivateKey, senderEmail ) => {
    //TODO can be removed
    let our_doichainEntry =  await bitcore.createDoichainEntry(ourPrivateKey, validatorPublicKey.toString(), senderEmail, recipientEmail)
    return our_doichainEntry
}

export const broadcastTransaction = async (txData,encryptedTemplateData) => {

    const validatorPublicKey = txData && txData.validatorPublicKeyData?txData.validatorPublicKeyData.key:null
    const nameId = txData && txData.doichainEntry?txData.doichainEntry.nameId:null
    const tx = txData?txData.tx:null
    const changeAddress = txData.changeAddress

    let our_response = undefined

    await bitcore.broadcastTransaction(nameId,tx,encryptedTemplateData,validatorPublicKey).then((response) => {
        if(response.status==='fail'){
            const err = response.error
          throw err
        }
        const utxosResponse = getOffchainUTXOs(changeAddress,response)
        our_response = utxosResponse
    })

    return our_response
}

export const updateWalletBalance = (our_wallet, balance) => {
    our_wallet.balance = balance
}

export const encryptTemplate = async (validatorPublicKeyData, email,ourWallet) => {

    const ourFrom = ourWallet.senderEmail

    const templateData = {
        "sender": ourFrom, //TODO the sender of this email shouldn't be necessary to transmit (we only need this for the Doichain footer to tell the recipient whom he grants the permission) Unfortunately, we don't want to trust either the transmitting node nor the sending validator to know such data
        "recipient": email,
        "content": ourWallet.content,
        "redirect": ourWallet.redirectUrl,
        "subject": ourWallet.subject,
        "contentType": (ourWallet.contentType || 'html'),
        "returnPath": ourWallet.returnPath
    }

    if (validatorPublicKeyData.type === 'default' || validatorPublicKeyData.type === 'delegated')  //we store a hash only(!) at the responsible validator - never on a fallback validator
        templateData.verifyLocalHash = getDataHash({data: (ourFrom + email)}); //verifyLocalHash = verifyLocalHash

    let our_encryptedTemplateData = undefined
    await bitcore.encryptMessage(
        ourWallet.privateKey,
        validatorPublicKeyData.key.toString(),
        JSON.stringify(templateData))
        .then(async function (encryptedTemplateData) {
            console.log("encryptedTemplateData", encryptedTemplateData)
            our_encryptedTemplateData = encryptedTemplateData
        })
    return our_encryptedTemplateData
}


/**
 *
 * Creates the unspent transactions object from the response (tx outputs) of a Doichain node.
 * in order to create a new transaction before the next block is confirmed.
 *
 * @param changeAddress
 * @param response
 *
 * @returns {
 *  txid: the transaction
 *  utxos: unspent transaction object array
 *  balance: the new balance of the address based on the values of the owned addresses.
 *  //TODO if the address is a new address but belongs to our wallet this needs still handled
 * }
 */
export const getOffchainUTXOs = (changeAddress, txRaw) => {
    //const txRaw = response.txRaw
    const txid = txRaw.txid
    const vout = txRaw.vout
    const ourUTXOs = []
    let balance = 0 //balance of address

    vout.forEach((out)=>{
        const n = out.n
        const value = out.value
        const scriptPubKey = out.scriptPubKey
        const address = scriptPubKey.addresses[0]
        const hex = scriptPubKey.hex

        if(address===changeAddress){
            const new_utxo = {
                "address": address,
                "amount": value,
                "scriptPubKey": hex,
                "txid": txid,
                "vout": n
            }
            ourUTXOs.push(new_utxo)
            balance+=value
        }
    })
    return {txid:txid,utxos:ourUTXOs,balance:balance}
}
