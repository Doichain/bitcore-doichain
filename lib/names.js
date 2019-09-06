var doiTx = require('doichain-transaction');
var hash = require('crypto-hashing');
var conv = require('binstring');

var bitcore = require('bitcore');
var bufferTools = bitcore.util.buffer;
var JSUtil = bitcore.util.js;
var constants = require('./constants');
var $ = bitcore.util.preconditions;

/**
 * Build an output for a name_* operation. This is a
 * low level interface meant for direct import into
 * a Trasnaction.addOutput() call afterward.
 * @param {Number} satoshis - Amount of satoshis to spend
 * @param {Script} script - The proper name_* script
 */
function makeOutput( json){
  return new bitcore.Transaction.Output({
    satoshis: Number(json.satoshis),
    script: new bitcore.Script(json.script)
  });
}

/**
 * Make sure a name_new random value is a hex-encoded
 * value. If it's not, encode it hex so that the
 * implementors don't need to worry about hex buffers.
 * @param {string} rand - A string to use in name_new rand.
 */
function randHex(rand) {
  var hexRand;
  if (rand.length % 2 === 0 && JSUtil.isHexa(rand)) {
    hexRand = rand;
  } else {
    hexRand = bufferTools.bufferToHex(new Buffer(rand));
  }
  return hexRand;
}

/**
 * Add a name_new output to a transaction. This function
 * needs to be bound to a Transaction.
 */
function nameNew( name, rand, address) {
  $.checkState( name && rand && address, 'Missing args.');
  $.checkState( name.length < constants.NAME_MAX_LENGTH, 'Name too long.');
  var nameNewAsm = doiTx.newName( name, randHex( rand), address);
  var nameNewOut = makeOutput({
    script: nameNewAsm,
    satoshis:  constants.NETWORK_FEE.satoshis
  });
  this.addOutput( nameNewOut);
  // txs containing name_* scripts have a different version
  this.version = constants.NAMECOIN_TX_VERSION;
  return this;
}

function nameFirstUpdate( name, rand, value, address) {
  $.checkState( name && rand && value && address, 'Missing args.');
  $.checkState( name.length < constants.NAME_MAX_LENGTH, 'Name too long.');
  $.checkState( value.length < constants.VALUE_MAX_LENGTH, 'Value too long.');
  var nameFirstUpdateAsm = doiTx.nameFirstUpdate(
      name, randHex( rand), value, address
  );
  var nameFirstUpdateOut = makeOutput({
    script: nameFirstUpdateAsm,
    satoshis:  constants.NETWORK_FEE.satoshis
  });
  this.addOutput( nameFirstUpdateOut);
  this.version = constants.NAMECOIN_TX_VERSION;
  return this;
}

function nameUpdate( name, value, address) {
  $.checkState( name && value && address, 'Missing args.');
  $.checkState( name.length < constants.NAME_MAX_LENGTH, 'Name too long.');
  $.checkState( value.length < constants.VALUE_MAX_LENGTH, 'Value too long.');
  var nameUpdate = doiTx.nameUpdate( name, value, address);
  var nameUpdateOut = makeOutput({
    script: nameUpdate,
    satoshis: constants.NETWORK_FEE.satoshis
  });
  this.addOutput( nameUpdateOut);
  this.version = constants.NAMECOIN_TX_VERSION;
  return this;
}

function nameDoi( name, value, address) {
  $.checkState( name && value && address, 'Missing args.');
  $.checkState( name.length < constants.NAME_MAX_LENGTH, 'Name too long.');
  $.checkState( value.length < constants.VALUE_MAX_LENGTH, 'Value too long.');
  var nameDoi = doiTx.nameDoi( name, value, address);
  var nameDoiOut = makeOutput({
    script: nameDoi,
    satoshis: constants.NETWORK_FEE.satoshis
  });
  this.addOutput( nameDoiOut);
  this.version = constants.NAMECOIN_TX_VERSION;
  return this;
}

module.exports = {
  nameNew: nameNew,
  nameFirstUpdate: nameFirstUpdate,
  nameUpdate: nameUpdate,
  nameDoi: nameDoi
};
