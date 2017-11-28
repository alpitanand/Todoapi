const {
    SHA256
} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
var password = '123abc!';
//var message = 2;
//var hash = SHA256(message).toString();
//console.log(hash);
//
//var data = {
//    id : 4
//}
//
//var token = {
//    data : data,
//    hash :SHA256(JSON.stringify(data)+'somesecret').toString()
//}
//
//var resultHASH = SHA256(JSON.stringify(token.data)+'somesecret').toString();
//
//if(resultHASH === token.hash){
//    console.log("Data was not changed");
//}
//else{
//    console.log('Data was changed');
//}

//var data = {
//    id: 10
//}
//var token = jwt.sign(data, '123abc');
//console.log(token);
//
//var decoded = jwt.verify(token, '123abc');
//console.log(decoded);

//bcrypt.genSalt(10, (err, salt)=>{
//    bcrypt.hash(password,salt,(err,hash)=>{
//        console.log(hash);
//    })
//})

var hashedPassword =  "$2a$10$eepEfMqa5bdg441hwF865uE79oxy3Kuu4LvcJHD9QW1iYxCgMp772";

bcrypt.compare(password,hashedPassword,(err, res)=>{
    console.log(res);
})