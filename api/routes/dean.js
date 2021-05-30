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

// fs

const fs = require('fs');

// csv parser

const csv = require('csv-parser')

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
        console.log('Database Connected Sucessfully! [/dean]');
    }
});

// paths

router
    .route('/login')
    .get(verify.redirectDean, (req,res) => {
    res.status(200).render(path.join(__dirname,'../views/dean_login.ejs'),{error:null});
    });

router
    .route('/logout')
    .post(verify.redirectLogin,(req,res)=>{
        req.session.destroy(err => {
            if (err){
                return res.redirect('/deandash');
            }
            res.clearCookie(process.env.SESS_NAME)
            res.status(200).render(path.join(__dirname,'../views/dean_login.ejs'),{error:"You have been logged out successfully!"}); 
        }) 
    });

router
    .route('/dashboard')
    .get(verify.redirectLogin, (req,res) => {
        if (req.session.userId === process.env.DEAN_USP){
            res.status(200).render(path.join(__dirname,'../views/dean_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:null});
        }
        else if (req.session.userId === ADMIN_USP){
            res.redirect('/admindash');
        }
        else{
            res.redirect('/facultydash');
        } 
        res.end();
    });

router
    .route('/faculty/view')
    .get(verify.isdean, urlencodedParser, (req, res) =>{
        connection.query('SELECT fdb.f_name, fdb.f_mail_id, fdb.f_phone_no, fdb.f_house_no, fdb.f_street_name, fdb.f_area, fdb.f_city, fplace.state, fdb.f_department FROM faculty_db.faculty_details AS fdb, faculty_db.place AS fplace WHERE fplace.city=fdb.f_city', (error, rows, fields) => {
            if(error){
                res.status(500).render(path.join(__dirname,'../views/dean_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:error});
                res.end();
            }
            else{
                res.status(200).render(path.join(__dirname,'../views/view_faculty_list.ejs'),{error:null, userData:rows});
                res.end();
            }
        });
    });

router
    .route('/display/examtt')
    .get(verify.isdean,  urlencodedParser, (req, res) =>{
        res.status(200).render(path.join(__dirname,'../views/dean_display_exam_tt.ejs'));
    })
    .post(verify.isdean,  urlencodedParser, (req, res) =>{
        let filepath = path.join(__dirname,"../views/exam_schedules/",req.body.year+"_"+req.body.branch+"_"+req.body.examname+".pdf");
        console.log(filepath);
        if (fs.existsSync(filepath)){
            return res.status(200).render(path.join(__dirname,'../views/pdf_displayer.ejs'),{message: req.body.year+" "+req.body.branch+" "+req.body.examname+" timetable", facultytt:null, examtt:req.body.year+"_"+req.body.branch+"_"+req.body.examname});
        }
        else{
            return res.status(404).render(path.join(__dirname,'../views/dean_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:process.env.QUOTE_OTD});
        }
    });

router
    .route('/display/hallalloc')
    .get(verify.isdean, urlencodedParser, (req,res) => {
        res.status(200).render(path.join(__dirname,'../views/dean_select_hall_alloc.ejs'));
    })
    .post(verify.isdean, urlencodedParser, (req,res) => {
        let filepath = path.join(__dirname,'../views/hall_allocation/',req.body.year+"_"+req.body.examname+"_"+req.body.department+'.csv');
        if (fs.existsSync(filepath)){
            // display csv as table filename
            let slots=[];
            fs
                .createReadStream(filepath)
                .pipe(csv())
                .on('data', (data) =>{
                    slots.push(data);
                })
                .on('end', () => {
                    return res.status(200).render(path.join(__dirname,'../views/dean_display_hall_alloc.ejs'), {slots:slots});
                });
        }
        else{
            return res.status(404).render(path.join(__dirname,'../views/dean_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:process.env.QUOTE_OTD});
        }
    });

module.exports = router