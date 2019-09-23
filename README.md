# Doichain Support Module for Bitcore (based on Namecoin version)

`bitcore-doichain` adds doichain support to bitcore for creating doichain `name_*` transactions, private keys, and scripts in [Node.js](http://nodejs.org/) and web browsers.

Note: This is still experimental software. This module is not intended for use in production environments, or for use where real money is at stake, at this point.

See [the main bitcore repo](https://github.com/bitpay/bitcore) for more information.

## Getting Started

```sh
npm install bitcore-doichain
```
```sh
yarn add bitcore-doichain
```
```sh
bower install bitcore-doichain
```

To create a doichain wallet (privateKey & publicKey) and register it at a doichain dApp (so you can retrieve UTXO's)
```javascript
import bitcore from "bitcore-doichain";

const wallet = bitcore.createWallet(name)
const url = bitcore.getUrl()+"/api/v1/importpubkey"
bitcore.registerPublicKey(url, wallet.publicKey)
```

To get a Doichain Address from a Doichain PublicKey and request UTXO's (and balances)
```javascript
import bitcore from "bitcore-doichain";
const addr = bitcore.getAddressOfPublicKey(publicKey)
const amount = 0.05 //amount (in DOI) to send - amount determines the required amount of utxos to be used as inputs
const response = await bitcore.getUTXOAndBalance(addr.toString(),amount)
response.balanceAllUTXOs //balance of all UTXO's of this address
response.amountUsedUTXOs //the amount of all used utxos which are required to fullfil the requested amount
response.change //the change which results between the amount to spend and the amount of used UTXOs
response.utxos //the full unspent transactions with details in an array
```        

To import a doichain WIF (from vanitygen, for example):

```javascript
// return bitcore with namecoin commands overlayed
var bitcore = require('bitcore-doichain');
var privateKey = bitcore.PrivateKey.fromWIF('74pxNKNpByQ2kMow4d9kF6Z77BYeKztQNLq3dSyU4ES1K5KLNiz');
var address = privateKey.toAddress();
console.log( address.toString());
// NAMEuWT2icj3ef8HWJwetZyZbXaZUJ5hFT
```

To create a `name_new` transaction:

```javascript
var bitcore = require('bitcore-doichain');
var tx = new bitcore.Transaction()
  .from(utxo)
  .nameNew('d/name', 'randomvalue', 'mzGfeiJFdQyiuQnhB45aeBYefzHJSsiSfj')
  .change('mpe83RGRVWibHrdgfmkJwTxgufNs9quaZC')
  .fee(0.005)
  .sign(privKeySet); // utxo and nameNew output addrs need to have privKeys here
// now we can broadcast out to the network
var serialized = tx.serialize();
```

To create a `name_firstupdate` transaction:

```javascript
var tx = new bitcore.Transaction()
  .from([utxo, nameNewUtxo])
  .nameFirstUpdate('d/name', '092abbca8a938103abcc', 'VALUE', 'mzGfeiJFdQyiuQnhB45aeBYefzHJSsiSfj')
  .change('mpe83RGRVWibHrdgfmkJwTxgufNs9quaZC')
  .fee(constants.NETWORK_FEE.satoshis)
  .sign([privKeys[inputAddr], privKeys[nameNewAddr]]);
var serialized = tx.serialize();
```
To create a `name_update` transaction:

```javascript
var tx =  new bitcore.Transaction()
  .from(utxos)
  .nameUpdate('AAAAAAAAAA', 'CCCCCCCCCC', 'mkGdewyuvU13uHzpMUZe2t8ii4LKgKC8mE')
  .change('mkVNqbVqcYxi3zB2fRfiRQonf4JjwdAvnE')
  .fee(constants.NETWORK_FEE.satoshis)
  .sign([privKeys[outputAddr],privKeys[nameFirstUpdate]]);
var serialized = tx.serialize();
```

## Details

`bitcore-doichain` works by pulling in bitcore and then adding Namecoin-specific
version constants, name operation functions onto `Transaction`, and patches
a few bitcore functions that do not allow for altcoin compatability (specifically
`bitcore.Script.fromString` and `Transaction.prototype._fromNonP2SH`). These will
hopefully by replaced by native Bitcore functions as I work to improve Bitcore's
altcoin compatability.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](https://github.com/bitpay/bitcore/blob/master/CONTRIBUTING.md) on the main bitcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Written in 2015 by Brandon Robertz.
