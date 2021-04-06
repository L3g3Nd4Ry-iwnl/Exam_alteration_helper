// dependencies

// env vars

require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const session = require('express-session');

const bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');

const mysql = require('mysql');

const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

const fs = require('fs')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const url = require('url');

const fileupload = require("express-fileupload");
app.use(fileupload());

// x-powered-by is like S.H.I.E.L.D.

app.disable('x-powered-by');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname,'views')));
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

//db init
var connection = mysql.createConnection({
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
        console.log('Database Connected Sucessfully!');
    }
});

// mailer init

let transport = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: Number(process.env.GMAIL_PORT),
    secure:true,
    auth: {
       user: process.env.GMAIL_ID,
       pass: process.env.GMAIL_PASSWORD
    }
});

// session redirectors

// to redirect to home if the user is not auth

const redirectLogin = (req, res, next) =>{
    if (!req.session.userId){
        res.redirect('/');
    }
    else{
        next();
    }
}

// if faculty auth they must be redirected directly to faculty dashboard

const redirectFaculty = (req, res, next) =>{
    if (req.session.userId){
        res.redirect('/facultydash');
    }
    else{
        next();
    }
}

// if dean auth they must be redirected directly to dean dashboard

const redirectDean = (req, res, next) =>{
    if (req.session.userId === process.env.DEAN_USP){
        res.redirect('/deandash');
    }
    else{
        next();
    }
}

// if admin auth they must be redirected directly to admin dashboard

const redirectAdmin = (req, res, next) =>{
    if (req.session.userId === process.env.ADMIN_USP){
        res.redirect('/admindash');
    }
    else{
        next();
    }
}

//paths

app.get('/', redirectFaculty, (req,res) => {
    res.status(200).render(path.join(__dirname,'/views/login.ejs'),{error:null});
});

app.get('/adminlogin', redirectAdmin, (req,res) => {
    res.status(200).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:null});
});

app.get('/deanlogin', redirectDean, (req,res) => {
    res.status(200).render(path.join(__dirname,'/views/deanlogin.ejs'),{error:null});
});

app.get('/faq',(req,res) => {
    res.status(200).render(path.join(__dirname,'/views/faq.ejs'),{error:null});
});

app.get('/about', (req, res) =>{
    res.status(200).render(path.join(__dirname,'/views/about.ejs'));
});

app.get('/facultydash', redirectLogin, (req,res) => {
    if (req.session.userId === process.env.DEAN_USP){
        res.redirect('/deandash');
    }
    else if (req.session.userId === process.env.ADMIN_USP){
        res.redirect('/admindash');
    }
    else{
        res.status(200).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:null, img:req.session.userId});
    }
	
	res.end();  
});

app.get('/deandash', redirectLogin, (req,res) => {
    if (req.session.userId === process.env.DEAN_USP){
        res.status(200).render(path.join(__dirname,'/views/dean_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:null});
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
    if (req.session.userId === process.env.ADMIN_USP){
        res.status(200).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:null});
    }
    else if (req.session.userId === process.env.DEAN_USP){
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
                    res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"Wrong username and/or password!"});
                }
                res.end();
            } else {
                res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"Wrong username and/or password!"});
            }			
            res.end();
            });
        }
        else{
            res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"Enter username and password!"});
            res.end();
        }
    }
    if(req.body.login_type == 'admin'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            if(username == process.env.ADMIN_USP && bcrypt.compareSync(password, process.env.ADMIN_HASH)){
                req.session.userId = username;
                res.redirect('/admindash');
            }
            else{
                res.status(403).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:"Wrong username and/or password!"});
            }
            res.end();
        }
        else{
            res.status(403).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:"Enter username and password!"});
            res.end();
        }
    }
    if(req.body.login_type == 'dean'){
        var username = req.body.username;
	    var password = req.body.password;
        if(username && password){
            if(username == process.env.DEAN_USP && bcrypt.compareSync(password, process.env.DEAN_HASH)){
                req.session.userId = username;
                res.redirect('/deandash');
            }
            else{
                res.status(403).render(path.join(__dirname,'/views/deanlogin.ejs'),{error:"Wrong username and/or password!"});
            }
            res.end();
        }
        else{
            res.status(403).render(path.join(__dirname,'/views/deanlogin.ejs'),{error:"Enter username and password!"});
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
        res.clearCookie(process.env.SESS_NAME)
        res.status(200).render(path.join(__dirname,'views/login.ejs'),{error:"You have been logged out successfully!"}); 
    })
      
});

app.post('/deanlogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/deandash');
        }
        res.clearCookie(process.env.SESS_NAME)
        res.status(200).render(path.join(__dirname,'views/deanlogin.ejs'),{error:"You have been logged out successfully!"}); 
    }) 
});

app.post('/adminlogout', redirectLogin,(req,res)=>{
    req.session.destroy(err => {
        if (err){
            return res.redirect('/admindash');
        }
        res.clearCookie(process.env.SESS_NAME)
        res.status(200).render(path.join(__dirname,'views/adminlogin.ejs'),{error:"You have been logged out successfully!"}); 
    })  
});

// forgot password

app.get('/forgotpassword', (req,res) =>{
    res.status(200).render(path.join(__dirname,'views/forgotpassword.ejs'));
});

// mail token creation and mail it

app.post('/forgotpassword', (req,res) =>{
    
    const email = req.body.email;
    connection.query('SELECT `f_name` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [email], (error, rows, fields) => {
        if (rows.length == 1) {
            const token = jwt.sign({__id:req.body.email}, process.env.RESET_PASSWORD_JWT, {expiresIn: '30m'});
            const message = {
                from: 'examalterationhelper@gmail.com',
                to: email,
                subject: 'Reset password',
                html: `Hello ${rows[0].f_name}! <br> Click <a href="http://127.0.0.1:${process.env.PORT}/updateforgotpassword?token=${token}">here</a> to reset your password <br> The Lannisters sent their regards!`
            }
            transport.sendMail(message, function(error, info) {
                if (error) {
                    console.log(error);
                    res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"Some server side error occured! Try again!"});
                } else {
                    console.log(info);
                }
            });
            connection.query('UPDATE  `faculty_db`.`faculty_details` SET `f_reset_link` = ? WHERE (`faculty_db`.`faculty_details`.`f_mail_id` = ?)', [token, email], (error, rows, fields) => {
                if(error){
                    console.log(error);
                    res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"Some server side error occured! Try again!"});
                }
            });
            res.status(200).render(path.join(__dirname,'/views/login.ejs'),{error:"Please check your e-mail for the reset link!"});
        }
        else if(error){
            console.log(error);
            res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"Some server side error occured! Try again!"});
        }
        else{
            res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"The entered e-mail doesn't exist in our database!"});
        }
    });
});

// check token and allow access

app.get('/updateforgotpassword', (req,res) =>{
    const params = url.parse(req.url, true).search
    const token = params.substr(7)

    jwt.verify(token, process.env.RESET_PASSWORD_JWT, (error, decodeData) =>{
        if(error){
            res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"The token is invalid!"});
        }
        else{
            connection.query('SELECT `f_mail_id` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_reset_link` = ?', [token], (error, rows, fields) => {
                if(error){
                    console.log(error);
                }
                else if (rows.length == 1){
                    const email = rows[0].f_mail_id;
                    return res.status(200).render(path.join(__dirname,'/views/resetforgotpassword.ejs'),{email:email});
                }
                res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:"The token is invalid!"});
            });
            
        }
    });
});

// reflect password in db

app.post('/updateforgotpassword', (req,res) =>{
    const email = req.body.email;
    if(req.body.newpass1 == req.body.newpass2){
        const hash = bcrypt.hashSync(req.body.newpass1, saltRounds);
        connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_pwd` = ?, `f_reset_link`= ? WHERE (`f_mail_id` = ?)', [hash, null, email], (error, rows, fields) => {
            if (error){
                return res.status(500).render(path.join(__dirname,'/views/login.ejs'),{error:"Some server side error occured! Try again!"});
            }
            else{
                return res.status(200).render(path.join(__dirname,'/views/login.ejs'),{error:"Password updated successfully!"});
            }
        });
    }
    else{
        res.status(500).render(path.join(__dirname,'/views/login.ejs'),{error:"Passwords didn't match! Try again!"});
    }
});

// python programs

app.post('/addfaq', urlencodedParser, (req, res) => {
    var spawn = require('child_process').spawn;
    var process = spawn('python',['./add_new_faq.py', req.body.user_name, req.body.email, req.body.question]);
    process.stdout.on('data', function(data) { 
        console.log(data.toString());
        res.status(200).render(path.join(__dirname,'/views/faq.ejs'),{error:"Your question was submitted successfully!"});
        res.end();
    });
});

// --------------------------faculty dashboard functions--------------------------

// update faculty details and password

app.get('/updatefacultydetails', (req, res) =>{
    if(req.session.userId && req.session.userId != process.env.ADMIN_USP && req.session.userId != process.env.DEAN_USP){
        connection.query('SELECT * FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [req.session.userId], (error, rows, fields) => {
            if (rows.length == 1){
                res.status(200).render(path.join(__dirname,'/views/edit_faculty_details.ejs'), {img:req.session.userId, email:rows[0].f_mail_id, name:rows[0].f_name, phoneno:rows[0].f_phone_no, houseno:rows[0].f_house_no, streetname:rows[0].f_street_name, area:rows[0].f_area, city:rows[0].f_city, dept:rows[0].f_department});
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
    if(req.session.userId && req.session.userId != process.env.ADMIN_USP && req.session.userId != process.env.DEAN_USP){
        var phoneno = req.body.phoneno;
        var houseno = req.body.houseno;
        var streetname = req.body.streetname;
        var area = req.body.area;
        var city = req.body.city;
        if (phoneno !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_phone_no` = ? WHERE (`f_mail_id` = ?)', [req.body.phoneno, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (houseno !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_house_no` = ? WHERE (`f_mail_id` = ?)', [req.body.houseno, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (streetname !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_street_name` = ? WHERE (`f_mail_id` = ?)', [req.body.streetname, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (area !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_area` = ? WHERE (`f_mail_id` = ?)', [req.body.area, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (city !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_city` = ? WHERE (`f_mail_id` = ?)', [req.body.city, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if(req.files){
            let file = req.files.myfile;
            var filepath = path.join(__dirname,'/views/profile_pictures/'+req.session.userId+'.jpg');
            file.mv(filepath, function(err){
              if(err){
                return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
              }
            });
        }
        res.render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"Details have been updated successfully!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

app.get('/updateoldpassword', (req, res) =>{
    if(req.session.userId && req.session.userId != process.env.ADMIN_USP && req.session.userId != process.env.DEAN_USP){
        res.status(200).render(path.join(__dirname,'/views/resetpassword.ejs'));
        res.end();
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

app.post('/updateoldpassword', (req, res) =>{
    if(req.session.userId && req.session.userId != process.env.ADMIN_USP && req.session.userId != process.env.DEAN_USP){
        connection.query('SELECT `f_pwd` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [req.session.userId], (error, rows, fields) => {
            if(bcrypt.compareSync(req.body.oldpass, rows[0].f_pwd)){
                if (req.body.newpass1 === req.body.newpass2) {
                    const hash = bcrypt.hashSync(req.body.newpass1, saltRounds);
                    connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_pwd` = ? WHERE (`f_mail_id` = ?)', [hash, req.session.userId], (error, rows, fields) => {
                        if (error){
                            return res.status(500).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                        }
                        else{
                            return res.status(200).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"Password updated successfully!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                        }
                    });
                }
                else{
                    return res.status(403).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"You re-entered the wrong password! Please try again!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            }
            else{
                return res.status(403).render(path.join(__dirname,'/views/faculty_dashboard.ejs'),{error:"Your old password didn't match with our database! Please try again!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
            }
        });
    }
    else{
        return res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
    }
});

// display exam timetable

app.get('/displayexamtimetable', (req, res) =>{
    if(req.session.userId && req.session.userId != process.env.ADMIN_USP && req.session.userId != process.env.DEAN_USP){
        const filepath = path.join(__dirname,'/views/exam_schedules/', process.env.CURRENT_EXAM+'.pdf');
        if (fs.existsSync(filepath)){
            res.status(200).render(path.join(__dirname,'/views/pdfdisplayer.ejs'),{message: process.env.CURRENT_EXAM+" timetable", file1:null, file2: process.env.CURRENT_EXAM});
            res.end();
        }
        else{
            res.status(404).render(path.join(__dirname,'/views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            res.end();
        }
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/login.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

// display timetable

app.get('/displayfacultytimetable', (req, res) => {
    if(req.session.userId && req.session.userId != process.env.ADMIN_USP && req.session.userId != process.env.DEAN_USP){
        const filepath = path.join(__dirname,'/views/faculty_timetables/',req.session.userId+'.pdf');
        if (fs.existsSync(filepath)){
            res.status(200).render(path.join(__dirname,'/views/pdfdisplayer.ejs'),{message:"Your timetable", file1:req.session.userId, file2:null});
            res.end();
        }
        else{
            res.status(404).render(path.join(__dirname,'/views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD: process.env.QUOTE_OTD, img:req.session.userId});
            res.end();
        }
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
    if(req.session.userId == process.env.DEAN_USP){
        connection.query('SELECT fdb.f_name, fdb.f_mail_id, fdb.f_phone_no, fdb.f_house_no, fdb.f_street_name, fdb.f_area, fdb.f_city, fplace.state, fdb.f_department FROM faculty_db.faculty_details AS fdb, faculty_db.place AS fplace WHERE fplace.city=fdb.f_city', (error, rows, fields) => {
            if(error){
                res.status(500).render(path.join(__dirname,'/views/dean_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                res.end();
            }
            else{
                res.status(200).render(path.join(__dirname,'/views/view_faculty_list.ejs'),{error:null, userData:rows});
                res.end();
            }
        });
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/deanlogin.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

// view current exam time table

app.get('/viewexamtimetable', (req, res) =>{
    if(req.session.userId == process.env.DEAN_USP){
        const filepath = path.join(__dirname,'/views/exam_schedules/', process.env.CURRENT_EXAM+'.pdf');
        if (fs.existsSync(filepath)){
            res.status(200).render(path.join(__dirname,'/views/pdfdisplayer.ejs'),{message: process.env.CURRENT_EXAM+" timetable", file1:null, file2: process.env.CURRENT_EXAM});
            res.end();
        }
        else{
            res.status(404).render(path.join(__dirname,'/views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            res.end();
        }
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/deanlogin.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});

// --------------------------admin dashboard functions--------------------------

// add new user

app.get('/addnewfaculty', (req, res) => {
    if(req.session.userId == process.env.ADMIN_USP){
        res.status(200).render(path.join(__dirname,'/views/faculty_acc_setup.ejs'));
        res.end();
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:'Unauthorized access!'});
        res.end();
    }
});


app.post('/addnewfaculty', (req, res) => {
    if(req.session.userId == process.env.ADMIN_USP){
        const hash = bcrypt.hashSync(req.body.pwd, saltRounds);
        connection.query('INSERT INTO `faculty_db`.`faculty_details` (`f_mail_id`, `f_name`, `f_phone_no`, `f_house_no`, `f_street_name`, `f_area`, `f_city`, `f_pwd`,`f_department`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.email, req.body.name, req.body.phoneno, req.body.houseno, req.body.streetname, req.body.area, req.body.city, hash, req.body.dept], (error, rows, fields) => { 
            if (error){
                console.log(error);
                res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
            }
        });
        const demo_pic = path.join(__dirname,'/views/images/faculty.jpg');
        const new_pic = path.join(__dirname,'/views/profile_pictures/',req.body.email+'.jpg');
        fs.copyFileSync(demo_pic, new_pic, fs.constants.COPYFILE_EXCL, (error) => {
            if(error){
                return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
            }
        });
        if(req.files){
            file = req.files.myfile;
            var filepath = path.join(__dirname,'/views/faculty_timetables/'+req.body.email+'.pdf');
            file.mv(filepath, function(error){
              if(error){
                return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
              }
            });
        }
        const message = {
            from: 'examalterationhelper@gmail.com',
            to: req.body.email,
            subject: 'Your account has been created!',
            html: `Hello ${req.body.name}! <br> Your account has been created with the credentials: <br> Username: ${req.body.email} <br> Password: ${req.body.pwd} <br> The Lannisters sent their regards!`
        }
        transport.sendMail(message, function(error, info) {
            if (error) {
                console.log(error);
                return res.status(403).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
            } else {
                console.log(info);
            }
        });
        res.status(200).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:'New user has been added!', QOTD: process.env.QUOTE_OTD});
    }
    else{
        res.status(403).render(path.join(__dirname,'/views/adminlogin.ejs'),{error:'Unauthorized access!'});
    }
});

// edit faculty list

app.get('/editfacultylist', (req, res) =>{
    if(req.session.userId == process.env.ADMIN_USP){
        connection.query('SELECT fdb.f_name, fdb.f_mail_id, fdb.f_phone_no, fdb.f_house_no, fdb.f_street_name, fdb.f_area, fdb.f_city, fplace.state, fdb.f_department FROM faculty_db.faculty_details AS fdb, faculty_db.place AS fplace WHERE fplace.city=fdb.f_city', (error, rows, fields) => {
            if(error){
                res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                res.end();
            }
            else{
                res.status(200).render(path.join(__dirname,'/views/delete_faculty_list.ejs'),{error:null, userData:rows});
                res.end();
            }
        });
    }
});

app.post('/editfacultylist', (req, res) =>{
    if(req.session.userId == process.env.ADMIN_USP){
        if(req.body.delete_email){
            connection.query('DELETE FROM `faculty_db`.`faculty_details` WHERE (`f_mail_id` = ?);',[req.body.delete_email], (error, rows, fields) => {
                if(error){
                    return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                }
            });
            const path1 = path.join(__dirname,'/views/faculty_timetables',req.body.delete_email+'.pdf');
            const path2 = path.join(__dirname,'/views/profile_pictures',req.body.delete_email+'.jpg')
            fs.unlink(path1, (error) => {
                if (error) {
                    return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                }
            });
            fs.unlink(path2, (error) => {
                if (error) {
                    return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                }
            });
            return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:"User has been deleted successfully!"});
        }
        else{
            return res.status(500).render(path.join(__dirname,'/views/admin_dashboard.ejs'),{error:"Enter a faculty e-mail!",QOTD: process.env.QUOTE_OTD});
        }
    }
});

// upload new exam timetable

app.get('/uploadnewtimetable', (req, res) =>{

});

// view new FAQs

app.get('/viewnewfaq', (req, res) =>{

});

// listener
app.listen(process.env.PORT, ()=> console.log(`Listening on port ${process.env.PORT}...   http://localhost:${process.env.PORT}`)); 


/**TODO 
 * 
 * use express-mysql-session to store sessions in a database
 * else it will be in memory only and get destoryed if server restarts 
 */