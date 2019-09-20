import bitcore from "bitcore-doichain";

const registerPublicKey = (url,pubkey) => {
    fetch(url+"?pubkey="+pubkey,{
        mode: 'no-cors' // 'cors' by default
    })
        .then(res => res.json())
        .then((data) => {
            console.log("publicKey registered on "+url,data);
            return data
        })
       // .catch(console.log("problem while registering publicKey on "+url))
}

export default  registerPublicKey
