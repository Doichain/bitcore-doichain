var bitcore = require('bitcore');
var $ = bitcore.util.preconditions;
var Opcode = bitcore.Opcode;
var Networks = bitcore.Networks;
var Transaction = bitcore.Transaction;
var Script = bitcore.Script;
var script = require('./lib/script');
var names = require('./lib/names');
var NameInput = require('./lib/nameinput');

import constants from "./lib/constants"
import settings from "./lib/doichain/settings"
import getUrl from "./lib/doichain/getUrl"
import encryptMessage from "./lib/doichain/encryptMessage"
import getAddressOfPublicKey from "./lib/doichain/getAddressOfPublicKey"
import createWallet from "./lib/doichain/createWallet";
import getUTXOAndBalance from "./lib/doichain/getUTXOAndBalance"
import createDoichainEntry from "./lib/doichain/createDoichainEntry"
import createRawDoichainTX from "./lib/doichain/createRawDoichainTX"
import broadcastTransaction from "./lib/doichain/broadcastTransaction"
import verify from "./lib/doichain/verify"
/**
 * Set up bitcore specific constants, version numbers,
 * and helper functions for working with namecoin. Variables
 * and functions are put directly onto the bitcore instance.
 */

// disable warning about the NMC fees being too high
Transaction.FEE_SECURITY_MARGIN = constants.NMC_FEE_SECURITY_MARGIN;

// add nmc-specific opcodes ...
Opcode.map['OP_NAME_NEW'] = constants.NAME_NEW_OPCODE;
Opcode.map['1'] = constants.NAME_NEW_OPCODE;
Opcode.OP_NAME_NEW = constants.NAME_NEW_OPCODE;

Opcode.map['OP_NAME_FIRSTUPDATE'] = constants.NAME_FIRSTUPDATE_OPCODE;
Opcode.map['2'] = constants.NAME_FIRSTUPDATE_OPCODE;
Opcode.OP_NAME_FIRSTUPDATE = constants.NAME_FIRSTUPDATE_OPCODE;

Opcode.map['OP_NAME_UPDATE'] = constants.NAME_UPDATE_OPCODE;
Opcode.map['3'] = constants.NAME_UPDATE_OPCODE;
Opcode.OP_NAME_UPDATE = constants.NAME_UPDATE_OPCODE;

Opcode.map['OP_NAME_DOI'] = constants.NAME_DOI_OPCODE;
Opcode.map['10'] = constants.NAME_DOI_OPCODE;
Opcode.OP_NAME_DOI = constants.NAME_DOI_OPCODE;

// Namecoin:
// Version Bytes:
// https://en.bitcoin.it/wiki/Base58Check_encoding
var doichainMainnet = bitcore.Networks.add({
  name:  'doichain',
  alias: 'doichain',
  // https://github.com/namecoin/namecore/commit/4b33389f2ed7809404b1a96ae358e148a765ab6f
  pubkeyhash: 111, //mainnet 52  //111 testnet  //0x34 (bitcoin?)
  privatekey: 0xB4,  //TODO this doesn't seem correct
  scripthash: 13, //TODO  please double check ?
  // xpubkey: 0x043587cf,
  // xprivkey: 0x04358394,
  // xpubkey: null, // HD extended pubkey (nonexistant in namecoin o.g.)
  // xprivkey: null, // HD extended privkey (nonexistant in namecoin o.g.)
  networkMagic: 0xf9beb4fe, //TODO  please double check ?
  port: 8338,
  dnsSeeds: []
});

//TODO in case of mainnet please change this here.
const doichainTestnet = bitcore.Networks.add({
  name:  'doichain-testnet',
  alias: 'doichain-testnet',
  pubkeyhash: 111,  //mainnet 52  //111 testnet  //0x34 (bitcoin?)
  privatekey: 0xB4,  //TODO  please double check ?
  scripthash: 13, //TODO  please double check ?
  networkMagic: 0xf9beb4fe, //TODO  please double check ?
  port: 18338,
  dnsSeeds: []
});

// networkNamecoin.namecoin = networkNamecoin;

// overload bitcore-s namecoin-rejecting script
// serializing function with one that first handles
// namecoin scripts or passes control to the original
// bitcore implementation if no name script it detected.
Script.fromString = script.fromStringNmc;

Script.prototype.isNameOut = function() {
  return this.isNameNew() || this.isNameFirstUpdate() || this.isNameUpdate() || this.isNameDoi();
};

Script.prototype.getPublicKeyHashName = function() {
  $.checkState(this.isNameNew() ||
               this.isNameFirstUpdate() ||
               this.isNameUpdate() || this.isNameDoi(), 'Non-Namecoin script output');
  // TODO: sanity check on pubKey hash length / type
  // otherwise the errors moving forward are cryptic
  switch(this.chunks[0].opcodenum) {
  case Opcode.OP_NAME_NEW:
    return this.chunks[5].buf;
  case Opcode.OP_NAME_FIRSTUPDATE:
    return this.chunks[8].buf;
  case Opcode.OP_NAME_UPDATE:
    return this.chunks[7].buf;
  case Opcode.OP_NAME_DOI:
    return this.chunks[7].buf;
  default:
    throw new Error('Non-Namecoin script output');
  }
};

Script.prototype.isNameNew = function() {
  return this.chunks[0].opcodenum === Opcode.OP_NAME_NEW;
};

Script.prototype.isNameFirstUpdate = function() {
  return this.chunks[0].opcodenum === Opcode.OP_NAME_FIRSTUPDATE;
};

Script.prototype.isNameUpdate = function() {
  return this.chunks[0].opcodenum === Opcode.OP_NAME_UPDATE;
};

Script.prototype.isNameDoi = function() {
  return this.chunks[0].opcodenum === Opcode.OP_NAME_DOI;
};

Transaction.prototype._fromNonP2SH = NameInput.patchFromNonP2SH; //patchFromNonP2SH;
Transaction.Input.NameInput = require('./lib/nameinput.js');

// Add name_* functionality with chaining to Transaction
Transaction.prototype.nameNew = names.nameNew;
Transaction.prototype.nameFirstUpdate = names.nameFirstUpdate;
Transaction.prototype.nameUpdate = names.nameUpdate;
Transaction.prototype.nameDoi = names.nameDoi;

// Add some Doichain functions
bitcore.constants = constants
bitcore.settings = settings
bitcore.getUrl = getUrl
bitcore.encryptMessage = encryptMessage //encrypts a message with a public key
bitcore.createWallet = createWallet //create public and private key
bitcore.getUTXOAndBalance = getUTXOAndBalance //get unconfirmed transactions from
bitcore.createDoichainEntry = createDoichainEntry //generate entry for doichain with a NameId and value
bitcore.createRawDoichainTX = createRawDoichainTX //create a
bitcore.getAddressOfPublicKey = getAddressOfPublicKey //get the (first) doichain address from a public key
bitcore.broadcastTransaction = broadcastTransaction //broadcast the transaction together with the encrypted email permission request
bitcore.verify = verify
export default bitcore;
