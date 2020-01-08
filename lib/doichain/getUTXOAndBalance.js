import getUrl from "bitcore-doichain/lib/doichain/getUrl";

export default async function getUTXOAndBalance(doichainAddress,value){

  console.log('amount including fees',value)
  const spendable = {}
  const spendableUTXOs = []
  let spendableBalance = 0
  let spendableCurrent = 0
  let reached = false

  const unspentTX =  await listUnspent(doichainAddress)
  if(!unspentTX.error && unspentTX.status!=='fail'){
        unspentTX.data.forEach(function(it) {
            spendableBalance += it.amount
            if (!reached || !value) {
                spendableUTXOs.push(it)
                spendableCurrent += it.amount
                if (spendableCurrent > value) reached = true
                console.log("spendableCurrent now:",spendableCurrent)
            }
        })
  }

  spendable.balanceAllUTXOs = spendableBalance
  spendable.amountUsedUTXOs = spendableCurrent
  spendable.change = Number(spendableCurrent)-Number(value) //?(spendableCurrent)-Number(value):0
  spendable.utxos = spendableUTXOs
    
  console.log('spendable',spendable)
  return spendable
}

// TODO get url from settings
async function listUnspent(address) {
    const url = getUrl()+"/api/v1/listunspent?address=" + address;
    const response = await fetch(url);
    const json = await response.json();
    return json
}
