var {SHA256} = require("crypto-js");
console.log(SHA256('helloworld...from aanand bhandari').toString());
let data = {
    id : 3
};
console.log(JSON.stringify(data)+'hello');
let token = {
    data,
    hash : SHA256(JSON.stringify(data)+ 'secretekey').toString()
};
token.data.id =3;
token.hash = SHA256(JSON.stringify(token.data.id)).toString();
let resultHash = SHA256(JSON.stringify(token.data.id) + 'secretekey').toString();
if (resultHash === token.hash) {
    console.log('data was not changed');
} else {
    console.log('data was changed');
}