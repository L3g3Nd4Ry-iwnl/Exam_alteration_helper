const bcrypt = require('bcrypt');
const saltRounds = 10;

const myPlaintextPassword = 'dean_amrita'; 

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash)

console.log(bcrypt.compareSync(myPlaintextPassword, hash));