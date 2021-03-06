var bitcore = require('bitcore');
var Unit = bitcore.Unit;

// CONSTANTS
module.exports = {
  // pay this on name_* ops
  NETWORK_FEE : {
    btc: 0.01,
    satoshis: new Unit.fromBTC(0.01).satoshis
  },
  //0.01 for DOI storage, 0.01 DOI for reward for validator, 0.01 revokation reserved
  VALIDATOR_FEE: {
    btc: 0.03,
    satoshis: new Unit.fromBTC(0.03).satoshis
  },
  //0.01 for Email Verification storage, 0.01 DOI for reward for validator
  EMAIL_VERIFICATION_FEE: {
    btc: 0.02,
    satoshis: new Unit.fromBTC(0.02).satoshis
  },
  // this is the tx fee itself
  TRANSACTION_FEE: {
    btc: 0.005,
    satoshis: new Unit.fromBTC(0.005).satoshis
  },


  // same as TRANSACTION_FEE, but we could add some space here
  NMC_FEE_SECURITY_MARGIN: new Unit.fromBTC(0.005).satoshis,
  NAME_NEW_OPCODE: 81,
  NAME_FIRSTUPDATE_OPCODE: 82,
  NAME_UPDATE_OPCODE: 83,
  NAME_DOI_OPCODE: 90,

  // transactions with name_* opcodes get this version number
  NAMECOIN_TX_VERSION: 0x7100,

  // maximum sizes for name operation args
  NAME_MAX_LENGTH: 255,
  VALUE_MAX_LENGTH: 520
};
