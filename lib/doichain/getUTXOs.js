
/*
function getUTXOsSufficient(doichainAddress,value){

  const spendable = {}
  const spendableUTXOs = []
  let spendableBalance = 0
  let spendableCurrent = 0
  let reached = false

  getUTXOs(doichainAddress).forEach(function(it){
    if(it.spendable){

        spendableBalance+=it.amount

        if(!reached){
          spendableUTXOs.push(it)
          spendableCurrent+=it.amount
          if(spendableCurrent>=value) reached = true
        }

    }
  })

  spendable.balanceAllUTXOs = spendableBalance
  spendable.amountUsedUTXOs = spendableCurrent
  spendable.change = spendableCurrent-value
  spendable.utxos = spendableUTXOs

  console.log(spendable,spendableBalance)
  return spendable
}
*/


export default function getUTXOs(address){

  return [
  {
  "txid": "8c9ed6f8f8062ad19a54362a436eccd6b97de9a15938acf1d99defd7ff74ba01",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12708,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "10e26a5dcaebd549f1be7946bfc29f249326a2728ebca9191d1954dcaf93ba09",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7819,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "022a6a18bc2230cfabc2d67829774e0aca0751bf6e8cee1691e85878629fc919",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12871,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "69c752a7ca5d30b4320693743026f8c32d1f024e09ea55b4de77dd710c53862f",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 10355,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "9ce29ff097c192b179e5709851d7ca60c5aa4d0a6e5537531807fce3ff85ac3d",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12721,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "337762789768fcb9c840d8a8672d05f2c16a54f35fc1e3063bf27ead50022045",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12655,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "37e64f05971cee6807bc4b809d4fe3c7526175855b266559547369506c37684c",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7807,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "aa3d226f713235ec35e38754223f8d2968f76c1679a5be5ffea301d672b7a255",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.02,
  "confirmations": 29021,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "804ad8f93e2b3a8e36b3aabb3cea8400ec76e7a3e12bfda52d08f43f6cd7e358",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12543,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "d683a258406f74f20cb5c169973ffd9c57fefa60538c325202c581d972ec3f5b",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.02,
  "confirmations": 29021,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "d55cace74266d89c165de956937a514429d52e4772030f32accfd7e38f60fe60",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12698,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "0851c5cc31606ab876b86316b6cdd979561b166e017ac90463b6be6cc0105c65",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7553,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "b073211f157980f07a37eecb0b82cfb0f75773c6faaaf7ae5cd2afa969587975",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12713,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "7ab1df084080bbc8745fbedfbb912378148724d2c94606970aaea04c7baa1f7b",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 1,
  "confirmations": 11,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "dbb07f6db328dcd970b46e22100b7621ade18db8af1ac9cd33586cf454c85f83",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12543,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "f52a6cc3bb3a6f05f25f07928034bcac4cfe14e028e5e5f5bb39a29155067f86",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7811,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "8ec0d7d0d795c5191614bbe515a602657c764e3cbbc091fe9a8260fa99b60e88",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.02,
  "confirmations": 29021,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "ec936acebe4b8fc0f1b9c9289bcc92c7f0b3ecf751ba085c40a7172e43d7f488",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 9666,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "c82da8d63f81c4364a8264ff716105aed858b3fe3240395a8ef56340b9e656aa",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7811,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "90a7f7938048eb410a498ac6b5ed726cae6db6bfa6082086d6b1ea8623bf74b8",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12472,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "ab0f5a011839ad16cb7958a5b9bda62bec72c44154305098acf5b5e10e2eefbc",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7807,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "2ba4e3d41b95372d029ce3c64f920dc211c3f2ab4088a17adff502ead9c54dc2",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12660,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "030799bea255dbc0d6b506f112a19841ff282ff5858f0cb9857dd6bc68d13ec3",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7808,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "6d795e2c096ec0ce42ad61fec8bd76c21393ff488ea09dc0fb8227a6499ccfca",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12672,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "2ef312b38dd9a85edbbe96af7f0152219d1555c119346ff7dabee3a05a1742d0",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12550,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "e1c921540a2f05b3c0db788840414cbe09a46d9bd3f4b39fe905be6c096360e9",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 12720,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "59da68795a44b06c0732ce675b7da1ff92bdd19f0b1c2f7b3f167633e1cb27fc",
  "vout": 1,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7807,
  "spendable": true,
  "solvable": true,
  "safe": true
},
{
  "txid": "e1299640a1ef2221962320895441cab6d08ec3673b826e2222066b8dac51cefe",
  "vout": 0,
  "address": "mu6KFxEwkj8aDkCuru4y54TzJcC5tRWArA",
  "account": "",
  "scriptPubKey": "76a91494e8dc927a7c2e2799cb11a5df57d0651167f13f88ac",
  "amount": 0.03,
  "confirmations": 7535,
  "spendable": true,
  "solvable": true,
  "safe": true
}]
}
