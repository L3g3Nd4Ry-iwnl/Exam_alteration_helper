// express module

const express = require('express');
const router = express.Router();

// path module

const path = require('path');

// body parser

const bodyParser= require('body-parser');

// url parser

const urlencodedParser = bodyParser.urlencoded({ extended: true });

// env vars

require('dotenv').config();

// bcrypt module

const bcrypt = require('bcrypt');

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
        console.log('Database Connected Sucessfully! [/auth]');
    }
});



// Router routes

router
    .route('/')
    .post(urlencodedParser, (req,res) => {
        if(req.body.login_type == 'faculty'){
            let username = req.body.username;
	        let password = req.body.password;
            if(username && password){
                connection.query('SELECT `f_pwd` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [username], (error, rows, fields) => {
                if (rows.length == 1) {
                    if(bcrypt.compareSync(password, rows[0].f_pwd)){
                        req.session.userId = username;
                        res.redirect('/faculty/dashboard');
                    }
                    else{
                        res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Wrong username and/or password!"});
                    }
                    res.end();
                } else {
                    res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Wrong username and/or password!"});
                }			
                res.end();
                });
            }
            else{
                res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Enter username and password!"});
                res.end();
            }
        }
        if(req.body.login_type == 'admin'){
            let username = req.body.username;
	        let password = req.body.password;
            if(username && password){
                if(username == process.env.ADMIN_USP && bcrypt.compareSync(password, process.env.ADMIN_HASH)){
                    req.session.userId = username;
                    res.redirect('/admin/dashboard');
                }
                else{
                    res.status(403).render(path.join(__dirname,'../views/admin_login.ejs'),{error:"Wrong username and/or password!"});
                }
                res.end();
            }
            else{
                res.status(403).render(path.join(__dirname,'../views/admin_login.ejs'),{error:"Enter username and password!"});
                res.end();
            }
        }
        if(req.body.login_type == 'dean'){
            let username = req.body.username;
	        let password = req.body.password;
            if(username && password){
                if(username == process.env.DEAN_USP && bcrypt.compareSync(password, process.env.DEAN_HASH)){
                    req.session.userId = username;
                    res.redirect('/dean/dashboard');
                }
                else{
                    res.status(403).render(path.join(__dirname,'../views/dean_login.ejs'),{error:"Wrong username and/or password!"});
                }
                res.end();
            }
            else{
                res.status(403).render(path.join(__dirname,'../views/dean_login.ejs'),{error:"Enter username and password!"});
                res.end();
            }
        }
    });

module.exports = router