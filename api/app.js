//env vars
const{
    PORT=3000,
    MYSQL_URL = 'localhost',
    MYSQL_USERNAME = 'root',
    MYSQL_PASSWORD = 'hello_mysql',
    MYSQL_DATABASE_ACC = 'faculty_db',
    ADMIN_USP = 'admin_amrita',
    DEAN_USP = 'dean_amrita'
}=process.env

//dependencies
const express = require('express');
const app = express();

const path = require('path');
const session = require('express-session');

const bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');

const mysql = require('mysql');

//Helemt to prevent hackers to get info on the modules used
const helmet = require('helmet');
app.use(helmet());

const urlencodedParser = bodyParser.urlencoded({ extended: true });
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
	host     : MYSQL_URL,
	user     : MYSQL_USERNAME,
	password : MYSQL_PASSWORD,
	database : MYSQL_DATABASE_ACC
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

app.get('/about', (req, res) =>{
    res.sendFile(path.join(__dirname,'/views/about.html'));
})

app.get('/facultydash', (req,res) => {
    if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'./views/faculty_dashboard.html'));
        return ;
	} else {
		res.send('Please login to view this page!');
	}
	res.end();  
});

app.get('/admindash', (req,res) => {
    if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'./views/admin_dashboard.html'));
        return ;
	} else {
		res.send('Please login to view this page!');
	}
	res.end(); 
});

app.get('/logout', (req,res)=>{
    req.session.loggedin = false;
    res.redirect('/');
    return;
});

app.get('/deandash', (req,res) => {
    if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'./views/dean_dashboard.html'));
        return ;
	} else {
		res.send('Please login to view this page!');
	}
	res.end(); 
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
                    res.send('<script>alert("Wrong username and/or password!, Go back to continue")</script>');
                }			
                res.end();
            });
        }
        else{
            res.send('<script>alert("Enter username and password, Go back to continue")</script>');
            res.end();
        }
    }
    if(req.body.login_type == 'admin'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            if(username == ADMIN_USP && password== ADMIN_USP){
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/admindash');
            }
            else{
                res.send('<script>alert("Wrong username and/or password!, Go back to continue")</script>');
            }
        }
        else{
            res.send('<script>alert("Enter username and password, Go back to continue")</script>');
            res.end();
        }
    }
    if(req.body.login_type == 'dean'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            if(username == DEAN_USP && password== DEAN_USP){
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/deandash');
            }
            else{
                res.send('<script>alert("Wrong username and/or password!, Go back to continue")</script>');
            }
        }
        else{
            res.send('<script>alert("Enter username and password, Go back to continue")</script>');
            res.end();
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
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...   http://localhost:${PORT}`)); 