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

// url middleware

const url = require('url');

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

// JSON Webtoken

const jwt = require('jsonwebtoken');

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
        console.log('Database Connected Sucessfully! [/forgotpass]');
    }
});

// routes

router
    .route('/getlink')
    .get((req,res) =>{
        res.status(200).render(path.join(__dirname,'views/forgot_password.ejs'));
    })
    .post((req,res) =>{
        const email = req.body.email;
        connection.query('SELECT `f_name` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [email], (error, rows, fields) => {
            if (rows.length == 1) {
                const token = jwt.sign({__id:req.body.email}, process.env.RESET_PASSWORD_JWT, {expiresIn: '30m'});
                const message = {
                    from: 'examalterationhelper@gmail.com',
                    to: email,
                    subject: 'Reset password',
                    html: `Hello ${rows[0].f_name}! <br> Click <a href="http://127.0.0.1:${process.env.PORT}/forgot/updatepassword?token=${token}">here</a> to reset your password <br> The Lannisters sent their regards!`
                }
                transport.sendMail(message, function(error, info) {
                    if (error) {
                        console.log(error);
                        res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Some server side error occured! Try again!"});
                    } else {
                        console.log(info);
                    }
                });
                connection.query('UPDATE  `faculty_db`.`faculty_details` SET `f_reset_link` = ? WHERE (`faculty_db`.`faculty_details`.`f_mail_id` = ?)', [token, email], (error, rows, fields) => {
                    if(error){
                        console.log(error);
                        res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Some server side error occured! Try again!"});
                    }
                });
                res.status(200).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Please check your e-mail for the reset link!"});
            }
            else if(error){
                console.log(error);
                res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Some server side error occured! Try again!"});
            }
            else{
                res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"The entered e-mail doesn't exist in our database!"});
            }
        });
    });

router
    .route('/updatepassword')
    .get((req,res) =>{
        const params = url.parse(req.url, true).search
        const token = params.substr(7)
        jwt.verify(token, process.env.RESET_PASSWORD_JWT, (error, decodeData) =>{
            if(error){
                res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"The token is invalid!"});
            }
            else{
                connection.query('SELECT `f_mail_id` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_reset_link` = ?', [token], (error, rows, fields) => {
                    if(error){
                        console.log(error);
                    }
                    else if (rows.length == 1){
                        const email = rows[0].f_mail_id;
                        return res.status(200).render(path.join(__dirname,'../views/reset_forgot_password.ejs'),{email:email});
                    }
                    res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"The token is invalid!"});
                });   
            }
        });
    })
    .post((req,res) =>{
        const email = req.body.email;
        if(req.body.newpass1 == req.body.newpass2){
            const hash = bcrypt.hashSync(req.body.newpass1, saltRounds);
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_pwd` = ?, `f_reset_link`= ? WHERE (`f_mail_id` = ?)', [hash, null, email], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Some server side error occured! Try again!"});
                }
                else{
                    return res.status(200).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Password updated successfully!"});
                }
            });
        }
        else{
            res.status(500).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"Passwords didn't match! Try again!"});
        }
    });

module.exports = router