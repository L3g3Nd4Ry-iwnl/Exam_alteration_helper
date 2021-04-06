const bcrypt = require('bcrypt');
const saltRounds = 10;

const myPlaintextPassword = 'dean_amrita'; 

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash)

console.log(bcrypt.compareSync(myPlaintextPassword, hash));

// const jwt = require("jsonwebtoken");

// const key = 'hello123';

// const email = 'saadhith2@gmail.com'
// const token = jwt.sign({__id: email}, key, {expiresIn: '20m'});
// console.log(token);

// jwt.verify(token, key, (error, decodedData) => {
//     if (error){
//         console.log(error);
//     }
//     else{
//         console.log('Accepted');
//     }
// });