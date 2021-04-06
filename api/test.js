// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const myPlaintextPassword = 'dean_amrita'; 

// const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
// console.log(hash)

// console.log(bcrypt.compareSync(myPlaintextPassword, hash));

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

// require('dotenv').config();
// const mysql = require('mysql');
// var connection = mysql.createConnection({
// 	host     : process.env.MYSQL_URL,
// 	user     : process.env.MYSQL_USERNAME,
// 	password : process.env.MYSQL_PASSWORD,
// 	database : process.env.MYSQL_DATABASE_ACC,
//     typeCast: false
// });
// connection.connect((error) => {
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('Database Connected Sucessfully!');
//     }
// });

// connection.query('SELECT fdb.f_name, fdb.f_mail_id, fdb.f_phone_no, fdb.f_house_no, fdb.f_street_name, fdb.f_area, fdb.f_city, fplace.state, fdb.f_department FROM faculty_db.faculty_details AS fdb, faculty_db.place AS fplace WHERE fplace.city=fdb.f_city', (error, rows, fields) => {
//     console.log(error)
//     console.log(rows)
//     console.log(fields)
// });


// const list = [{id:1},{id:2}]

// console.log(list)
// console.log(list[0])
// console.log(list[0].id)


var spawn = require('child_process').spawn;
    var process = spawn('python',['./hello.py']);
    process.stdout.on('data', function(data) { 
        var data = (data.toString());
        console.log(data)
        console.log(data[0]);
        console.log(data[0].id)
    });
    