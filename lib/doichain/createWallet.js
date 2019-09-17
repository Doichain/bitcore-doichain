import bitcore from "bitcore-doichain";
import localStorageDB from "localstoragedb";

const createWallet = (name) => {
    var privateKey = new bitcore.PrivateKey();
    var publicKey = new bitcore.PublicKey(privateKey);

    const  db = new localStorageDB("doiworks", localStorage); //https://nadh.in/code/localstoragedb/
    if(!db.tableExists("wallets")){
        console.log('table does not exist')
        db.createTable("wallets", ["name","privateKey","publicKey"]);
        db.commit();
    }else{
      //  db.drop("wallets")
      //  console.log('dropped wallet')
    }

    db.insert("wallets", {
        name: name,
        registered:false,
        privateKey:privateKey.toString(),
        publicKey:publicKey.toString()})
    console.log('stored publicKey and privateKey into wallet', db.queryAll('wallets'))
    db.commit();

    return {privateKey:privateKey, publicKey:publicKey}
}

export default createWallet