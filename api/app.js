//dependencies


var express = require('express');
var app = express();

var path = require('path');
var session = require('express-session');

var bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');

var mysql = require('mysql');

app.use('./public',express.static("public"));

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname,'views')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({ extended: false }));

//session init

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//db init
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'hello_mysql',
	database : 'faculty_db'
});

connection.connect((error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log('Database Connected Sucessfully!');
    }
});

//paths
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/views/login.html'));
    //res.render("login");
});

app.get('/adminlogin',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/adminlogin.html'));
});

app.get('/deanlogin',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/deanlogin.html'));
});

app.get('/faq',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/faq.html'));
});

app.get('/facultydash', (req,res) => {
    res.send('Logged in Sucessfully!!');
});

app.post('/auth', urlencodedParser, (req,res) => {
    if(req.body.login_type == 'faculty'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            connection.query('SELECT * FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ? AND `faculty_db`.`faculty_details`.`f_pwd` = ?', [username,password], (error, results, fields) => {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/facultydash');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        }
        else{
            res.status(400).send('Please enter username and password!');
            res.end();
        }
    }
    if(req.body.login_type == 'admin'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){

        }
        else{
            
        }
    }
    if(req.body.login_type == 'dean'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){

        }
        else{
            
        }
    }
});


app.post('/api/update', urlencodedParser, (req, res) => {
    //console.log(req.body)
    var spawn = require('child_process').spawn;
    var process = spawn('python',['./hello.py', req.body.user_name, req.body.email, req.body.question]);
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    });
});

//listener
var port = 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`)); 