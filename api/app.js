//dependencies
var express = require('express');
var app = express();

var path = require('path');
var session = require('express-session');

var bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');

var mysql = require('mysql');

app.use(express.static('../public'));

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); 

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
        console.log('Connected Sucessfully!');
    }
});

//paths
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../views/login.html'));
});

app.get('/adminlogin',(req,res) => {
    res.sendFile(path.join(__dirname,'../views/adminlogin.html'));
});

app.get('/deanlogin',(req,res) => {
    res.sendFile(path.join(__dirname,'../views/deanlogin.html'));
});

app.get('/faq',(req,res) => {
    res.sendFile(path.join(__dirname,'../views/faq.html'));
});

app.post('/auth', urlencodedParser, (req,res) => {
    if(req.body.login_type == 'faculty'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            console.log(username, password);
        }
        else{
            res.status(400).send('Please enter username and password!');
            res.redirect
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
var port = 5000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`)); 