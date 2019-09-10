
import bitcore from 'bitcore-doichain'
import getUTXOs from './doi.works/getUTXOs'
//var bitcore = require('bitcore-doichain');


//const privKey = 'cNWesXsc9m1WxefFNeb8NV9eRcY6K1Y9e9xp37MguQj8eJTXgxyM'
//const doichainAddress = getAdressFromPrivKey(privKey)
const doichainAddress = "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA"

const rawTx = createNewNameTX(doichainAddress,doichainAddress,0.005,privateKey)


function getAdressFromPrivKey(privKey){
    const privateKey = bitcore.PrivateKey.fromWIF(privKey);
    var address = privateKey.toAddress();
    console.log( address.toString());
    return address.toString()
}
function createNewNameTX(address,changeAddress,fee,privKeySet){

    //const utxos = getUTXOsSufficient(address,0.01)

    var utxo = {
        "txId" : "59da68795a44b06c0732ce675b7da1ff92bdd19f0b1c2f7b3f167633e1cb27fc",
        "outputIndex" : 1,
        "address" : "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
        "script" : "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
        "satoshis" : 5000
    };
    /*
    working name_new
    var tx = new bitcore.Transaction()
        .from(utxo)          // Feed information about what unspent outputs one can use
        .nameNew('d/name', 'randomvalue', address)
        .to(address, 1000)  // Add an output with the given amount of satoshis
        .change(changeAddress)      // Sets up a change address where the rest of the funds will go
        .sign(privKeySet)     // Signs all the inputs it can

    console.log(tx.toString()) */

    var tx = new bitcore.Transaction()
        .from(utxo)          // Feed information about what unspent outputs one can use
        .nameDoi('d/name01', 'randomvalue', address)
        .to(address, 0)  // Add an output with the given amount of satoshis
        .change(changeAddress)      // Sets up a change address where the rest of the funds will go
        .fee(fee)
        .sign(privKeySet)     // Signs all the inputs it can

    console.log(tx.toJSON())

//console.lo//g(tx.serialize())
    // console.log('utxo',utxo)
    /*  var tx = new bitcore.Transaction()
          .from(utxo)
         // .nameNew('d/name', 'randomvalue', address)
           .to(address,10000)
          .change(changeAddress)
          .fee(fee)
          .sign(privKeySet); // utxo and nameNew output addrs need to have privKeys here
        // now we can broadcast out to the network*/
    var serialized = tx.serialize(true);
    return serialized
    //return tx.toString()
    // return JSON.stringify(tx.toJSON())
}