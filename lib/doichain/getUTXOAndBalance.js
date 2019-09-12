import {fetchUrl} from 'fetch'

export default async function getUTXOAndBalance(doichainAddress,value){

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
                if (spendableCurrent >= value) reached = true
            }
        })
  }

  spendable.balanceAllUTXOs = spendableBalance
  spendable.amountUsedUTXOs = spendableCurrent
  spendable.change = spendableCurrent-value
  spendable.utxos = spendableUTXOs
  return spendable
}

// TODO get url from settings
async function listUnspent(address) {
    const url = "http://localhost:3000/api/v1/listunspent?address=" + address;
    const response = await fetch(url);
    const json = await response.json();
    return json
}