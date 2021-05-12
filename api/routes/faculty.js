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
        console.log('Database Connected Sucessfully! [/faculty]');
    }
});

// paths

router
    .route('/login')
    .get((req,res) =>{
        res.status(200).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:null});
    });

router
    .route('/logout')
    .post(verify.redirectLogin,(req,res)=>{
        req.session.destroy(err => {
            if (err){
                return res.redirect('/faculty/dashboard');
            }
            res.clearCookie(process.env.SESS_NAME)
            res.status(200).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:"You have been logged out successfully!"}); 
        })
    });

router
    .route('/dashboard')
    .get(verify.redirectLogin, (req,res) => {
        if (req.session.userId === process.env.DEAN_USP){
            res.redirect('/dean/dashboard');
        }
        else if (req.session.userId === process.env.ADMIN_USP){
            res.redirect('/admin/dashboard');
        }
        else{
            res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{QOTD: process.env.QUOTE_OTD, error:null, img:req.session.userId});
        }
        res.end();  
    });

router
    .route('/update/details')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        connection.query('SELECT * FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [req.session.userId], (error, rows, fields) => {
            if (rows.length == 1){
                res.status(200).render(path.join(__dirname,'../views/edit_faculty_details.ejs'), {img:req.session.userId, email:rows[0].f_mail_id, name:rows[0].f_name, phoneno:rows[0].f_phone_no, houseno:rows[0].f_house_no, streetname:rows[0].f_street_name, area:rows[0].f_area, city:rows[0].f_city, dept:rows[0].f_department});
                res.end();
            }
        });
    })
    .post(verify.isfaculty, urlencodedParser,(req,res) =>{
        let phoneno = req.body.phoneno;
        let houseno = req.body.houseno;
        let streetname = req.body.streetname;
        let area = req.body.area;
        let city = req.body.city;
        if (phoneno !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_phone_no` = ? WHERE (`f_mail_id` = ?)', [req.body.phoneno, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (houseno !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_house_no` = ? WHERE (`f_mail_id` = ?)', [req.body.houseno, req.session.userId], (error, rows, fields) => {
                if (error){
                        return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                    }
            });
        }
        if (streetname !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_street_name` = ? WHERE (`f_mail_id` = ?)', [req.body.streetname, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (area !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_area` = ? WHERE (`f_mail_id` = ?)', [req.body.area, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if (city !== '') {
            connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_city` = ? WHERE (`f_mail_id` = ?)', [req.body.city, req.session.userId], (error, rows, fields) => {
                if (error){
                    return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        if(req.files){
            let file = req.files.myfile;
            let filepath = path.join(__dirname,'../views/profile_pictures/'+req.session.userId+'.jpg');
            file.mv(filepath, function(err){
                if(err){
                    return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
        }
        res.render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:"Details have been updated successfully!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
    });

router
    .route('/update/password')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        res.status(200).render(path.join(__dirname,'../views/reset_password.ejs'));
        res.end();
    })
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        connection.query('SELECT `f_pwd` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ?', [req.session.userId], (error, rows, fields) => {
            if(bcrypt.compareSync(req.body.oldpass, rows[0].f_pwd)){
                if (req.body.newpass1 === req.body.newpass2) {
                    const hash = bcrypt.hashSync(req.body.newpass1, saltRounds);
                    connection.query('UPDATE `faculty_db`.`faculty_details` SET `f_pwd` = ? WHERE (`f_mail_id` = ?)', [hash, req.session.userId], (error, rows, fields) => {
                        if (error){
                            return res.status(500).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:error, QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                        }
                        else{
                            return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:"Password updated successfully!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                        }
                    });
                }
                else{
                    return res.status(403).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:"Passwords didn't match! Please try again!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
                }
            }
            else{
                return res.status(403).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:"Your old password didn't match with our database! Please try again!", QOTD: process.env.QUOTE_OTD, img:req.session.userId});
            }
        });
    });

router
    .route('/display/facultytt')
    .get(verify.isfaculty, urlencodedParser, (req, res) => {
        const filepath = path.join(__dirname,'../views/faculty_timetables/',req.session.userId+'.pdf');
        if (fs.existsSync(filepath)){
            res.status(200).render(path.join(__dirname,'../views/pdf_displayer.ejs'),{message:"Your timetable", file1:req.session.userId, file2:null});
            res.end();
        }
        else{
            res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD: process.env.QUOTE_OTD, img:req.session.userId});
            res.end();
        }
    });

// get year, exam name (p1/p2/endsem/supplementary) from user
 
router    
    .route('/display/examtt')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        return res.send("Display exam tt");
    })
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        connection.query('SELECT `faculty_db`.`faculty_details`.`f_department` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ? LIMIT 1', [req.session.userId], (error, rows, fields) => {
            if (error){
                console.log(error)
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! Some server side error occured!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }
            let dept = rows[0].f_department;
            let branch = '';
            if (dept === 'cse' || dept === 'mechanical engineering'){
                branch = 'btech';
            }
            else{
                branch = dept;
            }
            let filepath = path.join(__dirname+"../views/exam_schedules/"+req.body.year+"_"+global.branch+"_"+req.body.examname+".pdf");
            if (fs.existsSync(filepath)){
                return res.status(200).render(path.join(__dirname,'../views/pdf_displayer.ejs'),{message: process.env.CURRENT_EXAM+" timetable", file1:null, file2: process.env.CURRENT_EXAM});
            }
            else{
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }
        });
    });

// get year , exam name (p1/p2/endsem/supplementary) from user end

router
    .route('/display/hallalloc')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        return res.send("Hello display hall alloc");
    })
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        connection.query('SELECT `faculty_db`.`faculty_details`.`f_department` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ? LIMIT 1', [req.session.userId], (error, rows, fields) => {
            if (error){
                console.log(error)
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! Some server side error occured!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }
            let dept = rows[0].f_department;
            let slots = [];
            fs
                .createReadStream(path.join(__dirname,'../views/hall_allocation/'+req.body.year+"_"+req.body.examname+'_'+global.dept+'.csv'))
                .pipe(csv())
                .on('data', (data) => {
                    if (data.Facultyemail === req.session.userId){
                        slots.push(data)
                    }   
                })
                // replace filename with the actual filename
                .on('end', () => {
                    console.log(slots);
                    if (slots.length > 0){
                        return res.status(200).render(path.join(__dirname,'../views/filename1'),{slots:slots,error:null,file:year+"_"+process.env.CURRENT_EXAM+'_'+dept+'.csv'});
                    }
                    else{
                        return res.status(200).render(path.join(__dirname,'../views/filename1'),{slots:null,error:'No slots have been allocated for you!'});
                    }
                });
        });
    });

router
    .route('/exchange')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        // get slots of faculty who are free during the slot
        // use submit button and radio button...
        let filename = path.join(__dirname,'../views/hall_allocation/'+req.body.filename);
        let slot = req.body.slot;
        let date = req.body.date;

        let free_slots = [];
        fs
            .createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => {
                if ((data.Facultyemail !== req.session.userId) && ((data.Date === date && data.Slot !== slot) || (data.Date !== date))){
                    free_slots.push(data)
                }   
            })
        // replace filename with the actual filename
            .on('end', () => {
                console.log(slots);
                if (free_slots.length > 0){
                    return res.status(200).render(path.join(__dirname,'../views/filename2'),{slots:free_slots,error:null,file:req.body.filename,req_id:req.body.id});
                }
                else{
                    return res.status(200).render(path.join(__dirname,'../views/filename2'),{slots:null,error:'No faculties are free for the time being, please contact the COE!'});
                }
            });
    })
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        let req_id = req.body.req_id;
        let to_make_id = req.body.to_make_id;
        let filename = path.join(__dirname,'../views/hall_allocation/'+req.body.filename);

    });

// add mailer to send accepted/ rejected request
router
    .route('/viewrequests')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        res.send("Hello view exchange slot");
    })

module.exports = router