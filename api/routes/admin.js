// express module

const express = require('express');
const router = express.Router();

// path module

const path = require('path');

// body parser

const bodyParser= require('body-parser');

// url parser

const urlencodedParser = bodyParser.urlencoded({ extended: true });

// verify middleware

const verify = require('../middleware/verify');

// env vars

require('dotenv').config();

// fs

const fs = require('fs');

// bcrypt hash

const bcrypt = require('bcrypt');
const saltRounds = 10;

//  Node mailer

const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: Number(process.env.GMAIL_PORT),
    secure:true,
    auth: {
       user: process.env.GMAIL_ID,
       pass: process.env.GMAIL_PASSWORD
    }
});

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
        console.log('Database Connected Sucessfully! [/admin]');
    }
});

// paths

router
    .route('/login')
    .get(verify.redirectAdmin, (req,res) => {
        res.status(200).render(path.join(__dirname,'../views/admin_login.ejs'),{error:null});
    });

router
    .route('/logout')
    .post(verify.redirectLogin,(req,res)=>{
        req.session.destroy(err => {
            if (err){
                return res.redirect('/admindash');
            }
            res.clearCookie(process.env.SESS_NAME)
            res.status(200).render(path.join(__dirname,'../views/admin_login.ejs'),{error:"You have been logged out successfully!"}); 
        })  
    });

router
    .route('/dashboard')
    .get(verify.redirectLogin, (req,res) => {
        if (req.session.userId === process.env.ADMIN_USP){
            res.status(200).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:null});
        }
        else if (req.session.userId === process.env.DEAN_USP){
            res.redirect('/dean/dashoard');
        }
        else{
            res.redirect('/faculty/dashboard');
        }
        res.end(); 
    });
    
router
    .route('/faculty/add')
    .get(verify.isadmin,  urlencodedParser, (req, res) => {
            res.status(200).render(path.join(__dirname,'../views/faculty_acc_setup.ejs'));
            res.end();
    })
    .post(verify.isadmin,  urlencodedParser, (req, res) => {
        const hash = bcrypt.hashSync(req.body.pwd, saltRounds);
        connection.query('INSERT INTO `faculty_db`.`faculty_details` (`f_mail_id`, `f_name`, `f_phone_no`, `f_house_no`, `f_street_name`, `f_area`, `f_city`, `f_pwd`,`f_department`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.email, req.body.name, req.body.phoneno, req.body.houseno, req.body.streetname, req.body.area, req.body.city, hash, req.body.dept], (error, rows, fields) => { 
            if (error){
                console.log(error);
                return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
            }
        });
        if(req.files.timetable){
            let file = req.files.timetable;
            let filepath = path.join(__dirname,'../views/faculty_timetables/'+req.body.email+'.pdf');
            file.mv(filepath, function(error){
                if(error){
                return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
                }
            });
        }
        if(req.files.profilepic){
            let file = req.files.profilepic;
            let filepath = path.join(__dirname,'../views/profile_pictures/'+req.body.email+'.jpg');
            file.mv(filepath, function(error){
                if(error){
                    return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
                }
            });
        }
        else{
            const demo_pic = path.join(__dirname,'../views/images/faculty.jpg');
            const new_pic = path.join(__dirname,'../views/profile_pictures/',req.body.email+'.jpg');
            fs.copyFileSync(demo_pic, new_pic, fs.constants.COPYFILE_EXCL, (error) => {
                if(error){
                    return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
                }
            });
        }
        const message = {
            from: 'examalterationhelper@gmail.com',
            to: req.body.email,
            subject: 'Your account has been created!',
            html: `Hello ${req.body.name}! <br> Your account has been created with the credentials: <br> Username: ${req.body.email} <br> Password: ${req.body.pwd} <br> The Lannisters sent their regards! <br> We are extremely sorry if you recieved this mail by mistake.`
        }
        transport.sendMail(message, function(error, info) {
            if (error) {
                console.log(error);
                return res.status(403).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD});
            } else {
                console.log(info);
            }
        });
        res.status(200).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:'New user has been added!', QOTD: process.env.QUOTE_OTD});
    });

router
    .route('/faculty/edit')
    .get(verify.isadmin,  urlencodedParser, (req, res) =>{
        connection.query('SELECT fdb.f_name, fdb.f_mail_id, fdb.f_phone_no, fdb.f_house_no, fdb.f_street_name, fdb.f_area, fdb.f_city, fplace.state, fdb.f_department FROM faculty_db.faculty_details AS fdb, faculty_db.place AS fplace WHERE fplace.city=fdb.f_city', (error, rows, fields) => {
            if(error){
                res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                res.end();
            }
            else{
                res.status(200).render(path.join(__dirname,'../views/delete_faculty_list.ejs'),{error:null, userData:rows});
                res.end();
            }
        });
    })
    .post(verify.isadmin,  urlencodedParser, (req, res) =>{
        if(req.body.delete_email){
            connection.query('DELETE FROM `faculty_db`.`faculty_details` WHERE (`f_mail_id` = ?);',[req.body.delete_email], (error, rows, fields) => {
                if(error){
                    return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                }
            });
            const path1 = path.join(__dirname,'../views/faculty_timetables',req.body.delete_email+'.pdf');
            const path2 = path.join(__dirname,'../views/profile_pictures',req.body.delete_email+'.jpg')
            fs.unlink(path1, (error) => {
                if (error) {
                    return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                }
            });
            fs.unlink(path2, (error) => {
                if (error) {
                    return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                }
            });
            return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:"User has been deleted successfully!"});
        }
        else{
            return res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{error:"Enter a faculty e-mail!",QOTD: process.env.QUOTE_OTD});
        }
    });

router
    .route('/upload/timetable')
    .get(verify.isadmin,  urlencodedParser, (req, res) =>{

    });

router
    .route('/upload/hallalloc')
    .get(verify.isadmin,  urlencodedParser, (req, res) =>{

    });

router
    .route('/view/faq')
    .get(verify.isadmin,  urlencodedParser, (req, res) =>{
        if(req.session.userId == process.env.ADMIN_USP){
            connection.query('SELECT * FROM `faculty_db`.`faq`', (error, rows, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).render(path.join(__dirname,'../views/admin_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:"Some error occured!"});
                }
                else{
                    res.status(200).render(path.join(__dirname,'../views/view_faq.ejs'),{userData:rows});
                }
            });
        }
    });

module.exports = router