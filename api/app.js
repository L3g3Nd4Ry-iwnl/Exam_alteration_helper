//env vars
const{
    PORT=3000,
    MYSQL_URL = 'localhost',
    MYSQL_USERNAME = 'root',
    MYSQL_PASSWORD = 'hello_mysql',
    MYSQL_DATABASE_ACC = 'faculty_db',
    ADMIN_USP = 'admin_amrita',
    DEAN_USP = 'dean_amrita',

    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_LIFETIME = 1000 * 60 * 60 * 1, // 1 hour
    SESS_SECRET = 'LlK5_Z5_W3VjIv' //ThI5_I5_S3CrEt
}=process.env

//dependencies
const express = require('express');
const app = express();

const path = require('path');
const session = require('express-session');

const bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');

const mysql = require('mysql');
const e = require('express');

//Helemt to prevent hackers to get info on the modules used
// const helmet = require('helmet');
// app.use(helmet());
app.disable('x-powered-by')

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname,'views')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({ extended: false }));

//session init
const IN_PROD = NODE_ENV === 'production'
app.use(session({
	name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
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

// session redirectors

// to redirect to home if the user is not auth
const redirectLogin = (req, res, next) =>{
    if (!req.session.userId){
        res.redirect('/')
    }
    else{
        next()
    }
}
// if faculty auth they must be redirected directly to faculty dashboard
const redirectFaculty = (req, res, next) =>{
    if (req.session.userId){
        res.redirect('/facultydash')
    }
    else{
        next()
    }
}
// if dean auth they must be redirected directly to dean dashboard
const redirectDean = (req, res, next) =>{
    if (req.session.userId === DEAN_USP){
        res.redirect('/deandash')
    }
    else{
        next()
    }
}
// if admin auth they must be redirected directly to admin dashboard
const redirectAdmin = (req, res, next) =>{
    if (req.session.userId === ADMIN_USP){
        res.redirect('/admindash')
    }
    else{
        next()
    }
}

//paths
app.get('/', redirectFaculty, (req,res) => {
    res.render(path.join(__dirname,'/views/login.ejs'));
});

app.get('/adminlogin', redirectAdmin, (req,res) => {
    res.render(path.join(__dirname,'/views/adminlogin.ejs'));
});

app.get('/deanlogin', redirectDean, (req,res) => {
    res.render(path.join(__dirname,'/views/deanlogin.ejs'));
});

app.get('/faq',(req,res) => {
    res.render(path.join(__dirname,'/views/faq.ejs'));
});

app.get('/about', (req, res) =>{
    res.render(path.join(__dirname,'/views/about.ejs'));
})

app.get('/facultydash', redirectLogin, (req,res) => {
    if (req.session.userId === DEAN_USP){
        res.redirect('/deandash');
    }
    else if (req.session.userId === ADMIN_USP){
        res.redirect('/admindash');
    }
    else{
        res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'));
    }
	
	res.end();  
});

app.get('/deandash', redirectLogin, (req,res) => {
    if (req.session.userId === DEAN_USP){
        res.render(path.join(__dirname,'/views/dean_dashboard.ejs'));
    }
    else if (req.session.userId === ADMIN_USP){
        res.redirect('/admindash');
    }
    else{
        res.redirect('/facultydash');
    } 
    res.end();
});

app.get('/admindash', redirectLogin, (req,res) => {
    if (req.session.userId === ADMIN_USP){
        res.render(path.join(__dirname,'/views/admin_dashboard.ejs'));
    }
    else if (req.session.userId === DEAN_USP){
        res.redirect('/deandash');
    }
    else{
        res.redirect('/facultydash');
    }
	res.end(); 
});

// logouts

app.post('/facultylogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/facultydash');
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/')  
    })
      
});

app.post('/deanlogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/deandash');
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/deanlogin') 
    }) 
});

app.post('/adminlogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/admindash');
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/adminlogin')
    })  
});

// authentication

app.post('/auth', urlencodedParser, (req,res) => {
    if(req.body.login_type == 'faculty'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            connection.query('SELECT * FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ? AND `faculty_db`.`faculty_details`.`f_pwd` = ?', [username,password], (error, results, fields) => {
                if (results.length > 0) {
                    req.session.userId = username;
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
                req.session.userId = username;
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
                req.session.userId = username;
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

// python programs

app.post('/api/update', urlencodedParser, (req, res) => {
    var spawn = require('child_process').spawn;
    var process = spawn('python',['./hello.py', req.body.user_name, req.body.email, req.body.question]);
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    });
});



// listener
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...   http://localhost:${PORT}`)); 


/**TODO 
 * 
 * use express-mysql-session to store sessions in a database
 * else it will be in memory only and get destoryed if server restarts 
 *  
 * need to throw error if wrong username or password is used
 * 
 * need to hash passwords
 */