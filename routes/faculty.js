// express module

const express = require('express');
const router = express.Router();

// path module

const path = require('path');

// body parser

const bodyParser= require('body-parser');

// url parser

const urlencodedParser = bodyParser.urlencoded({ extended: true });

// qotd for accept / reject

const quoteoftheday = process.env.QUOTE_OTD;

// verify middleware

const verify = require('../middleware/verify');

// fs

const fs = require('fs');

// bcrypt hash

const bcrypt = require('bcrypt');
const saltRounds = 10;

// child spawner

var spawn = require("child_process").spawn;

// csv parser

const csv = require('csv-parser')

// csv appender

const csv_append = require('csv-append');

// csv writer
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: "./views/exchange_slot/exchange.csv",
    header: [
        {id: "ID", title: "ID"},
        {id: "to_make_email", title: "to_make_email"},
        {id: "req_email", title: "req_email"},
        {id: "req_slot_id", title: "req_slot_id"},
        {id: "req_name", title: "req_name"},
        {id: "req_date", title: "req_date"},
        {id: "req_slot", title: "req_slot"},
        {id: "req_start", title: "req_start"},
        {id: "req_end", title: "req_end"},
        {id: "req_room", title: "req_room"},
        {id: "req_subject", title: "req_subject"},
        {id: "exchange_date", title: "exchange_date"},
        {id: "exchange_slot", title: "exchange_slot"},
        {id: "exchange_start", title: "exchange_start"},
        {id: "exchange_end", title: "exchange_end"},
        {id: "exchange_room", title: "exchange_room"},
        {id: "exchange_subject", title: "exchange_subject"},
        {id: "filename", title: "filename"}
    ]
});

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
        console.log('Database Connected Sucessfully! [/faculty]');
    }
});

// paths

router
    .route('/login')
    .get((req,res) =>{
        res.status(200).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:process.env.temp1+' '+process.env.temp2+' '+process.env.temp3});
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
            res.status(200).render(path.join(__dirname,'../views/pdf_displayer.ejs'),{message:"Your timetable", facultytt:req.session.userId, examtt:null});
            res.end();
        }
        else{
            res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD: process.env.QUOTE_OTD, img:req.session.userId});
            res.end();
        }
    });
 
router    
    .route('/display/examtt')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        return res.status(200).render(path.join(__dirname,'../views/faculty_display_exam_tt.ejs'));
    })
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        connection.query('SELECT `faculty_db`.`faculty_details`.`f_department` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ? LIMIT 1', [req.session.userId], (error, rows, fields) => {
            if (error){
                console.log(error)
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! Some server side error occured!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }
            let dept = rows[0].f_department;
            let branch;
            if (dept === 'cse' || dept === 'mechanical engineering'){
                branch = 'btech';
            }
            else{
                branch = dept;
            }
            let filepath = path.join(__dirname,"../views/exam_schedules/"+req.body.year+"_"+branch+"_"+req.body.examname+".pdf");
            if (fs.existsSync(filepath)){
                return res.status(200).render(path.join(__dirname,'../views/pdf_displayer.ejs'),{message: req.body.year+" "+req.body.examname+" "+" timetable", facultytt:null, examtt: req.body.year+"_"+branch+"_"+req.body.examname});
            }
            else{
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! File was not found!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }
        });
    });

router
    .route('/display/hallalloc')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        return res.status(200).render(path.join(__dirname,'../views/faculty_display_hall_alloc.ejs'));
    })
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        connection.query('SELECT `faculty_db`.`faculty_details`.`f_department` FROM `faculty_db`.`faculty_details` WHERE `faculty_db`.`faculty_details`.`f_mail_id` = ? LIMIT 1', [req.session.userId], (error, rows, fields) => {
            if (error){
                console.log(error)
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Sorry! Some server side error occured!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }
            let dept = rows[0].f_department;
            dept = dept.replace(" ","_");
            let slots = [];
            let filepath = path.join(__dirname,"../views/hall_allocation/"+req.body.year+"_"+req.body.examname+'_'+dept+'.csv');    
            if (fs.existsSync(filepath) === true){
                fs
                .createReadStream(filepath)
                .pipe(csv())
                .on('data', (data) => {
                    if (data.Facultyemail === req.session.userId){
                        slots.push(data);
                    }   
                })
                .on('end', () => {
                    if (slots.length > 0){
                        return res.status(200).render(path.join(__dirname,'../views/faculty_view_slot.ejs'),{slots:slots,filename:req.body.year+"_"+req.body.examname+'_'+dept+'.csv'});
                    }
                    else{
                        return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'No slots have been allocated for you!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
                    }
                });
            }
            else{
                return res.status(404).render(path.join(__dirname,'../views/faculty_dashboard.ejs'), {error:'Slots for the requested exam is not available! Please contact COE', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
            }

            
        });
    });

router
    .route('/exchange/select')
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        let filename = path.join(__dirname,'../views/hall_allocation/',req.body.filename);
        let free_slots = [];
        let requester = [];
        fs
            .createReadStream(filename)
            .pipe(csv())
            .on('data', (data) =>{
                if (data.ID === req.body.req_id){
                    requester.push(data);
                }
            });   
        let count = 1;
        fs
            .createReadStream(filename)
            .pipe(csv())
            .on('data', (data) =>{
                if (data.Facultyemail === req.session.userId && data.Data === requester[0].Date){
                    count = count - 1;
                }
            }); 
        // for getting new slots
        fs
            .createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => {
                if ((data.Facultyemail !== req.session.userId) && (((data.Date === requester[0].Date && data.Slot !== requester[0].Slot) && (count === 0)) || (data.Date !== requester[0].Date))){
                    free_slots.push(data);
                }   
            })
            .on('end', () => {
                if (free_slots.length > 0){
                    return res.status(200).render(path.join(__dirname,'../views/faculty_select_exchange_slot.ejs'),{slots:free_slots,filename:req.body.filename,req_id:req.body.req_id});
                }
                else{
                    return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'No faculties are free for the time being, please contact the COE!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
                }
            });
    });

router
    .route('/exchange/confirm')
    .post(verify.isfaculty, urlencodedParser, (req, res) =>{
        let req_id = req.body.req_id;
        let to_make_id = req.body.to_make_id;
        let filename = path.join(__dirname,'../views/hall_allocation/'+req.body.filename);
        let req_slot_detail=[];
        let exchange_slot_detail=[];
        fs
            .createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => {
                if (data.ID === to_make_id){
                    exchange_slot_detail.push(data);
                }
                if (data.ID === req_id){
                    req_slot_detail.push(data);
                }   
            })
            .on('end', ()=>{
                let len = 0;
                let exist = 0;
                fs
                    .createReadStream(path.join(__dirname,'../views/exchange_slot/exchange.csv'))
                    .pipe(csv())
                    .on('data', (data) => {
                        len += 1;
                        //
                        if((data.to_make_email===exchange_slot_detail[0].Facultyemail) && (data.req_email=== req_slot_detail[0].Facultyemail) && (data.req_slot_id===req_id) && (data.exchange_slot_id===to_make_id) && (data.req_name===req_slot_detail[0].Facultyname) && (data.req_date===req_slot_detail[0].Date) && (data.req_slot===req_slot_detail[0].Slot) && (data.req_start===req_slot_detail[0].Starttime) && (data.req_end===req_slot_detail[0].Endtime) && (data.req_room===req_slot_detail[0].Roomnumber) && (data.req_subject===req_slot_detail[0].Subject) && (data.exchange_date===exchange_slot_detail[0].Date) && (data.exchange_slot===exchange_slot_detail[0].Slot) && (data.exchange_start===exchange_slot_detail[0].Starttime) && (data.exchange_end===exchange_slot_detail[0].Endtime) && (data.exchange_room===exchange_slot_detail[0].Roomnumber) && (data.exchange_subject===exchange_slot_detail[0].Subject) && (data.filename=== req.body.filename)){
                            exist = exist + 1;
                        }  
                    })
                    .on('end', () => {
                        if(exist === 0 ){
                            let to_append = { 
                                ID:len,
                                to_make_email:exchange_slot_detail[0].Facultyemail,
                                req_email: req_slot_detail[0].Facultyemail,
                                req_slot_id:req_id,
                                exchange_slot_id:to_make_id,
                                req_name:req_slot_detail[0].Facultyname,
                                req_date:req_slot_detail[0].Date,
                                req_slot:req_slot_detail[0].Slot,
                                req_start:req_slot_detail[0].Starttime,
                                req_end:req_slot_detail[0].Endtime,
                                req_room:req_slot_detail[0].Roomnumber,
                                req_subject:req_slot_detail[0].Subject,
                                exchange_date:exchange_slot_detail[0].Date,
                                exchange_slot:exchange_slot_detail[0].Slot,
                                exchange_start:exchange_slot_detail[0].Starttime,
                                exchange_end:exchange_slot_detail[0].Endtime,
                                exchange_room:exchange_slot_detail[0].Roomnumber,
                                exchange_subject:exchange_slot_detail[0].Subject,
                                filename: req.body.filename
                            };
                            const RELATIVE_PATH_TO_CSV = './views/exchange_slot/exchange.csv';
                            const { append, end } = csv_append.csvAppend(RELATIVE_PATH_TO_CSV, true);
                            append(to_append);
                            const message = {
                                from: 'examalterationhelper@gmail.com',
                                to: exchange_slot_detail[0].Facultyemail,
                                subject: 'New slot exchange request!',
                                html: `Hello! <br> You have received a new slot exchange request. <br> Please login to the portal to accept or reject it. <br> Thank you.`
                            }
                            transport.sendMail(message);                            
                            return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'Request has been made! Please wait for the respective faculty to respond!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
                        }
                        else{
                            return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'You had already made a request! Please wait for the existing response!', QOTD:process.env.QUOTE_OTD, img:req.session.userId});
                        }
                    });   
            });       
    });

// add mailer to send accepted/ rejected request
router
    .route('/requests/view')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        let my_requests=[];
        fs
            .createReadStream(path.join(__dirname,'../views/exchange_slot/exchange.csv'))
            .pipe(csv())
            .on('data', (data) => {
                if(data.to_make_email === req.session.userId){
                    my_requests.push(data);
                }
            })
            .on('end', () => {
                if (my_requests.length > 0){
                    return res.status(200).render(path.join(__dirname,'../views/faculty_view_exchange_req.ejs'),{slots:my_requests}); 
                }
                else{
                    return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'You have no requests!', QOTD:process.env.QUOTE_OTD, img:req.session.userId}); 
                }
            });     
    })

router
    .route('/requests/accept')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        var process = spawn('python',[path.join(__dirname,"../python_programs/accept_request.py"), req.query.id] );
        const message = {
            from: 'examalterationhelper@gmail.com',
            to: req.query.mail,
            subject: 'Slot exchange request rejected!',
            html: `Hello! <br> Your slot exchange request to ${req.session.userId} on the exam slot on date: ${req.query.date}, slot: ${req.query.slot} has been accepted! <br> Thank you.`
        }
        transport.sendMail(message);
        return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'Request accepted successfully!', QOTD:quoteoftheday, img:req.session.userId});
    });

router
    .route('/requests/reject')
    .get(verify.isfaculty, urlencodedParser, (req, res) =>{
        var process = spawn('python',[path.join(__dirname,"../python_programs/reject_request.py"), req.query.id] );
        console.log('Rejected successfully!');
        const message = {
            from: 'examalterationhelper@gmail.com',
            to: req.query.mail,
            subject: 'Slot exchange request rejected!',
            html: `Hello! <br> Your slot exchange request to ${req.session.userId} on the exam slot on date: ${req.query.date}, slot: ${req.query.slot} has been declined! <br> Thank you.`
        }
        transport.sendMail(message);
        return res.status(200).render(path.join(__dirname,'../views/faculty_dashboard.ejs'),{error:'Request rejected successfully!', QOTD:quoteoftheday, img:req.session.userId}); 
    });

module.exports = router