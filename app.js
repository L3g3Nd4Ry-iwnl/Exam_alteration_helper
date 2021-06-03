require('dotenv').config();

const express = require('express');
const app = express();


const session = require('express-session');

// path module

const path = require('path');

// body parser

const bodyParser= require('body-parser');

// url parser

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); 

// file uploader

const fileupload = require("express-fileupload");
app.use(fileupload());

// x-powered-by is like S.H.I.E.L.D.

app.disable('x-powered-by');

app.use('/',express.static(path.join(__dirname,'views')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({ extended: false }));

//session init
const IN_PROD = process.env.NODE_ENV === 'production'
app.use(session({
	name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie:{
        maxAge: Number(process.env.SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD
    }
}));

// mySQL database connection

const mysql = require('mysql');

let connection = mysql.createConnection({
	host     : process.env.MYSQL_URL,
	user     : process.env.MYSQL_USERNAME,
	password : process.env.MYSQL_PASSWORD,
	database : process.env.MYSQL_DATABASE_ACC,
    typeCast: false
});

connection.connect((error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log('Database Connected Sucessfully! [/]');
    }
});

// redirectors

app.use('/faculty',express.static(path.join(__dirname,'views')));
app.use('/faculty/update',express.static(path.join(__dirname,'views')));
app.use('/faculty/display',express.static(path.join(__dirname,'views')));
app.use('/faculty/exchange',express.static(path.join(__dirname,'views')));
app.use('/faculty/requests',express.static(path.join(__dirname,'views')));

const faculty = require('./routes/faculty');
app.use('/faculty', faculty);

app.use('/dean',express.static(path.join(__dirname,'views')));
app.use('/dean/faculty',express.static(path.join(__dirname,'views')));
app.use('/dean/display',express.static(path.join(__dirname,'views')));

const dean = require('./routes/dean');
app.use('/dean', dean);

app.use('/admin',express.static(path.join(__dirname,'views')));
app.use('/admin/faculty',express.static(path.join(__dirname,'views')));
app.use('/admin/upload',express.static(path.join(__dirname,'views')));
app.use('/admin/view',express.static(path.join(__dirname,'views')));
app.use('/admin/download',express.static(path.join(__dirname,'views')));
app.use('/admin/delete',express.static(path.join(__dirname,'views')));

const admin = require('./routes/admin');
app.use('/admin', admin);

app.use('/forgot',express.static(path.join(__dirname,'views')));

const forgot = require('./routes/forgot_password');
app.use('/forgot', forgot);

app.use('/auth',express.static(path.join(__dirname,'views')));
const auth = require('./routes/auth');
app.use('/auth', auth);

// other pages

app.get('/', (req,res) =>{
    res.status(200).render(path.join(__dirname,'/views/home_page.ejs'));
});

app.get('/faq',(req,res) => {
    res.status(200).render(path.join(__dirname,'/views/faq.ejs'),{error:null});
});

app.get('/about', (req, res) =>{
    res.status(200).render(path.join(__dirname,'/views/about.ejs'));
});

// add new faq

app.post('/addfaq', urlencodedParser, (req, res) => {
    connection.query('INSERT INTO `faculty_db`.`faq` (`name`, `email`, `question`) VALUES (?, ?, ?)', [req.body.user_name, req.body.email, req.body.question], (error, rows, fields) => {
        if(error){
            console.log(error);
            res.status(500).render(path.join(__dirname,'/views/faq.ejs'),{error:"Some error occured!"});
        }
        else{
            res.status(200).render(path.join(__dirname,'/views/faq.ejs'),{error:"Your question was submitted successfully!"});
        }
    });
});
// listener
app.listen(process.env.PORT, ()=> console.log(`Listening on port ${process.env.PORT}...   http://localhost:${process.env.PORT}`)); 
