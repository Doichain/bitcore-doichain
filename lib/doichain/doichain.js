import bitcore from 'bitcore-doichain'
import getDoichainNode from 'getDoichainNode'


/**
 * TODO add p2p node discovery
 *  - https://books.google.com.uy/books?id=MpwnDwAAQBAJ&pg=PA347&lpg=PA347&dq=encrypt+message+bitcore+lib&source=bl&ots=wQ9rqjA_z5&sig=ACfU3U1CufNAbSM9Xh6IzNH2gTJ4qVizaQ&hl=de&sa=X&ved=2ahUKEwivxKWtk8TkAhWC-KQKHY9HAg8Q6AEwBHoECAkQAQ#v=onepage&q=encrypt%20message%20bitcore%20lib&f=false
 *  - https://github.com/bitpay/bitcore-p2p
 *  contact doichain node with address
 * (server adds this to watchonly addresses and returns utxos)
 *
 * @param address
 */
const getUTXOs = (address) => {
    const doichainNode = getDoichainNode()
  return null
}


/**
 * Creates a doichain name_doi transaction an serialized it for broadcast
 *
 * @param name
 * @param value
 * @param address
 * @param changeAddress
 * @param fee
 * @param privKeySet
 */
const createDoichainTransaction = (name,value,address,changeAddress,fee,privKeySet) => {

}

/**
 * Contacts Doichain Node and broadcasts serialized transaction
 *
 * @param from
 * @param to
 */
const broadcastTransaction = (from,to) =>{

}