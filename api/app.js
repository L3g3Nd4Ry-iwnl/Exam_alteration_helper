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
    SESS_SECRET = 'LlK5_Z5_W3VjIv', //ThI5_I5_S3CrEt

    CURRENT_EXAM = '/views/exam_schedules/periodical2',
    QUOTE_OTD = 'The greatest glory in living lies not in never falling, but in rising every time we fall.'
}=process.env

//dependencies
const express = require('express');
const app = express();

const path = require('path');
const session = require('express-session');

const bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');

const mysql = require('mysql');


const fs = require('fs')

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
	database : MYSQL_DATABASE_ACC,
    typeCast: false
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
    res.render(path.join(__dirname,'/views/login.ejs'),{error:null});
});

app.get('/adminlogin', redirectAdmin, (req,res) => {
    res.render(path.join(__dirname,'/views/adminlogin.ejs'),{error:null});
});

app.get('/deanlogin', redirectDean, (req,res) => {
    res.render(path.join(__dirname,'/views/deanlogin.ejs'),{error:null});
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
        res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{QOTD:QUOTE_OTD, error:null, img:req.session.userId});
    }
	
	res.end();  
});

app.get('/deandash', redirectLogin, (req,res) => {
    if (req.session.userId === DEAN_USP){
        res.render(path.join(__dirname,'/views/dean_dashboard.ejs'),{QOTD:QUOTE_OTD, error:null});
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
        res.render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD:QUOTE_OTD, error:null});
    }
    else if (req.session.userId === DEAN_USP){
        res.redirect('/deandash');
    }
    else{
        res.redirect('/facultydash');
    }
	res.end(); 
});

// authentication

app.post('/auth', urlencodedParser, (req,res) => {
    if(req.body.login_type == 'faculty'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            connection.query('SELECT `f_pwd` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [username], (error, rows, fields) => {
            if (rows.length == 1) {
                if(bcrypt.compareSync(password, rows[0].f_pwd)){
                    req.session.userId = username;
                    res.redirect('/facultydash');
                }
                else{
                    res.render(path.join(__dirname,'/views/login.ejs'),{error:"Wrong username and/or password!"});
                }
                res.end();
            } else {
                res.render(path.join(__dirname,'/views/login.ejs'),{error:"Wrong username and/or password!"});
            }			
            res.end();
            });
        }
        else{
            res.render(path.join(__dirname,'/views/login.ejs'),{error:"Enter username and password!"});
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
                res.render(path.join(__dirname,'/views/adminlogin.ejs'),{error:"Wrong username and/or password!"});
            }
            res.end();
        }
        else{
            res.render(path.join(__dirname,'/views/adminlogin.ejs'),{error:"Enter username and password!"});
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
                res.render(path.join(__dirname,'/views/deanlogin.ejs'),{error:"Wrong username and/or password!"});
            }
            res.end
        }
        else{
            res.render(path.join(__dirname,'/views/deanlogin.ejs'),{error:"Enter username and password!"});
            res.end();
        }
    }
});

// logouts

app.post('/facultylogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/facultydash');
        }
        res.clearCookie(SESS_NAME)
        res.render(path.join(__dirname,'views/login.ejs'),{error:"You have been logged out successfully!"}); 
    })
      
});

app.post('/deanlogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/deandash');
        }
        res.clearCookie(SESS_NAME)
        res.render(path.join(__dirname,'views/deanlogin.ejs'),{error:"You have been logged out successfully!"}); 
    }) 
});

app.post('/adminlogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/admindash');
        }
        res.clearCookie(SESS_NAME)
        res.render(path.join(__dirname,'views/adminlogin.ejs'),{error:"You have been logged out successfully!"}); 
    })  
});

// python programs

app.post('/api/update', urlencodedParser, (req, res) => {
    var spawn = require('child_process').spawn;
    var process = spawn('python',['./hello.py', req.body.user_name, req.body.email, req.body.question]);
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    });
});

// --------------------------faculty dashboard functions--------------------------

// update faculty details and password

app.get('/updatefacultydetails', (req, res) =>{
    if(req.session.userId && req.session.userId != ADMIN_USP && req.session.userId != DEAN_USP){
        connection.query('SELECT * FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [req.session.userId], (error, rows, fields) => {
            if (rows.length == 1){
                res.render(path.join(__dirname,'/views/edit_faculty_details.ejs'), {img:req.session.userId, email:rows[0].f_mail_id, name:rows[0].f_name, phoneno:rows[0].f_phone_no, houseno:rows[0].f_house_no, streetname:rows[0].f_street_name, area:rows[0].f_area, city:rows[0].f_city});
                res.end();
            }
        });
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

app.post('/updatefacultydetails', (req,res) =>{
    if(req.session.userId && req.session.userId != ADMIN_USP && req.session.userId != DEAN_USP){
        connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_phone_no` = ?, `f_house_no` = ?, `f_street_name` = ?, `f_area` = ?, `f_city` = ? WHERE (`f_mail_id` = ?)', [req.body.phoneno, req.body.houseno, req.body.streetname, req.body.area, req.body.city, req.session.userId], (error, rows, fields) => {
            if (error){
                res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD:QUOTE_OTD, img:req.session.userId});
                res.end();
            }
            else{
                res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"Details have been updated successfully!", QOTD:QUOTE_OTD, img:req.session.userId});
                res.end();
            }
        });
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

app.get('/updateoldpassword', (req, res) =>{
    if(req.session.userId && req.session.userId != ADMIN_USP && req.session.userId != DEAN_USP){
        res.render(path.join(__dirname,'/views/resetpassword.ejs'));
        res.end();
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

app.post('/updateoldpassword', (req, res) =>{
    if(req.session.userId && req.session.userId != ADMIN_USP && req.session.userId != DEAN_USP){
        connection.query('SELECT `f_pwd` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [req.session.userId], (error, rows, fields) => {
            if(bcrypt.compareSync(req.body.oldpass, rows[0].f_pwd)){
                if (req.body.newpass1 === req.body.newpass2) {
                    const hash = bcrypt.hashSync(req.body.newpass1, saltRounds);
                    connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_pwd` = ? WHERE (`f_mail_id` = ?)', [hash, req.session.userId], (error, rows, fields) => {
                        if (error){
                            res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD:QUOTE_OTD, img:req.session.userId});
                        }
                        else{
                            res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"Password updated successfully!", QOTD:QUOTE_OTD, img:req.session.userId});
                        }
                    });
                }
                else{
                    res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"You re-entered the wrong password! Please try again!", QOTD:QUOTE_OTD, img:req.session.userId});
                }
            }
            else{
                res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"Your old password didn't match with our database! Please try again!", QOTD:QUOTE_OTD, img:req.session.userId});
            }
        });
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
    }
});

// display exam timetable

app.get('/displayexamtimetable', (req, res) =>{
    if(req.session.userId && req.session.userId != ADMIN_USP && req.session.userId != DEAN_USP){
        const filepath = path.join(__dirname,CURRENT_EXAM+'.pdf');
        console.log(filepath)
        if (fs.existsSync(filepath)){
            res.contentType('application/pdf');
            fs.createReadStream(filepath).pipe(res);
            //not working...
        }
        else{
            res.status(404).render(path.join(__dirname,'/views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:QUOTE_OTD, img:req.session.userId});
        }
        res.end();
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

// display timetable

app.get('/displayfacultytimetable', (req, res) => {
    if(req.session.userId && req.session.userId != ADMIN_USP && req.session.userId != DEAN_USP){
        const filepath = path.join(__dirname,'/views/faculty_timetables/',req.session.userId+'.pdf');
        if (fs.existsSync(filepath)){
            res.contentType('application/pdf');
            fs.createReadStream(filepath).pipe(res);
        }
        else{
            res.status(404).render(path.join(__dirname,'/views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:QUOTE_OTD, img:req.session.userId});
        }
        res.end();
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

// exchange slot

app.get('/exchangefacultyslots', (req, res) =>{

});

// view slot request

app.get('/viewfacultyrequestslots', (req, res) =>{

});

// --------------------------dean dashboard functions--------------------------

// view all faculty details

app.get('/viewfacultylist', (req, res) =>{

});

// view current exam time table

app.get('/viewexamtimetable', (req, res) =>{

});

// --------------------------admin dashboard functions--------------------------

// add new user

app.get('/addnewfaculty', (req, res) => {
    if(req.session.userId == ADMIN_USP){
        res.render(path.join(__dirname,'/views/faculty_acc_setup.ejs'));
        res.end();
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});


app.post('/addnewfaculty', (req, res) => {
    if(req.session.userId == ADMIN_USP){
        const hash = bcrypt.hashSync(req.body.pwd, saltRounds);
        connection.query('INSERT INTO `faculty_db`.`faculty_details` (`f_mail_id`, `f_name`, `f_phone_no`, `f_house_no`, `f_street_name`, `f_area`, `f_city`, `f_pwd`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.email, req.body.name, req.body.phoneno, req.body.houseno, req.body.streetname, req.body.area, req.body.city, hash], (error, rows, fields) => { 
            if (error){
                res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:error, QOTD:QUOTE_OTD});
                res.end();
            }
            else{
                
                res.status(200).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:'New user has been added!', QOTD:QUOTE_OTD});
                res.end();
            }
        });
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

// edit faculty list

app.get('/editfacultylist', (req, res) =>{

});

// upload new exam timetable

app.get('/uploadnewtimetable', (req, res) =>{

});

// view new FAQs

app.get('/viewnewfaq', (req, res) =>{

});

// listener

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...   http://localhost:${PORT}`)); 


/**TODO 
 * 
 * use express-mysql-session to store sessions in a database
 * else it will be in memory only and get destoryed if server restarts 
 * 
 * need to hash dean and admin passwords
 * 
 * change title for all html pages
 * 
 * update image in update profile
 */