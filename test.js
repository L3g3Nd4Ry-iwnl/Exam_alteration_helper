// let a1 = 'aaa';

// function my1 () {
//   console.log(a1);
//   a1 = 'aab';
//   console.log(a1);
// }

// console.log(a1);
// my1();
// console.log(a1);

// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];
// let userId = 'gautham_r@cb.amrita.edu';
// let date = '18-05-2021';
// let slot = '1';

// fs.createReadStream('E:\\amrita class notes\\sem 6\\CSE313-SOFTWARE\\Project\\untouched_exam_schedule.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     if ((data.Facultyemail !== userId) && ((data.Date === date && data.Slot !== slot) || (data.Date !== date))){
//         results.push(data)
//     }   
//   })
//   .on('end', () => {
//     console.log(results);
//   });

// let v1 ="2018";
// let v2 = "btech";
// let v3 = "periodical1"

// console.log(v1+"_"+v2+"_"+v3+".pdf");

// let v1 = "mechanical engineering"
// console.log(v1.replace(" ","_"))

// const fs = require('fs');
// const csv = require('csv-append');
// const RELATIVE_PATH_TO_CSV = `./views/exchange_slot/exchange.csv`;
// const { append, end } = csv.csvAppend(RELATIVE_PATH_TO_CSV, true);
 
// // append([{ a: 1, b: 2 }, { a: 2, b: 3 }]);
// // Or
// append({ ID:'1', req_id:'1', to_make_id:'2', to_make_email:'saadhith2@gmail.com',filename:'blah.csv' });
 
// end();
// console.log(fs.readFileSync(RELATIVE_PATH_TO_CSV, { encoding: "utf8" }));

// const express = require('express');
// const app = express();

// app.get('/abc',(req,res) => {
//     console.log(req.query);
//     // console.log(req);
//     res.send("Hello");
// });


// app.listen(3001, ()=> console.log(`Listening on port ${3001}...   http://localhost:${3001}`)); 
// const path = require('path');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//   path: path.join(__dirname, "./views/exchange_slot/temp.csv"),
//   header: [
//     {id: 'Name', title: 'Name'},
//     {id: 'Surname', title: 'Surname'},
//     {id: 'Age', title: 'Age'},
//     {id: 'Gender', title: 'Gender'},
//   ]
// });

// const data = [
//   {
//     Name: 'John',
//     Surname: 'Snow',
//     Age: 26,
//     Gender: 'M'
//   }, {
//     Name: 'Clair',
//     Surname: 'White',
//     Age: 33,
//     Gender: 'F',
//   }, {
//     Name: 'Fancy',
//     Surname: 'Brown',
//     Age: 78,
//     Gender: 'F'
//   }
// ];

// csvWriter
//   .writeRecords(data)
//   .then(()=> console.log('The CSV file was written successfully'));

// console.log("1"-1);

// console.log(typeof("1"-1));

const express = require('express');
const app = express();
const path = require('path');

app.use('/',express.static(path.join(__dirname,'views')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'views'));

app.get('/', (req,res) => {
    // res.setHeader('Content-Type', 'text/csv');
    // res.setHeader("Content-Dispositon","attachment; filename=exchange.csv");
    // res.send("<a href="./views/exchange_slot/exchange.csv" download></a>")
    res.download(path.join(__dirname,"/views/exchange_slot/exchange.csv"), "exchange.csv");

});

app.listen(3001);
