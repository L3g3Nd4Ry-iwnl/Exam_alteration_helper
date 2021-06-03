// path module

const path = require('path');

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
    if (req.session.userId && req.session.userId != process.env.DEAN_USP && req.session.userId != process.env.ADMIN_USP){
        res.redirect('/faculty/dashboard');
    }
    else{
        next();
    }
}

// if dean auth they must be redirected directly to dean dashboard

const redirectDean = (req, res, next) =>{
    if (req.session.userId === process.env.DEAN_USP){
        res.redirect('/dean/dashboard');
    }
    else{
        next();
    }
}

// if admin auth they must be redirected directly to admin dashboard

const redirectAdmin = (req, res, next) =>{
    if (req.session.userId === process.env.ADMIN_USP){
        res.redirect('/admin/dashboard');
    }
    else{
        next();
    }
}

const isfaculty = (req, res, next) =>{
    if (req.session.userId && req.session.userId != process.env.DEAN_USP && req.session.userId != process.env.ADMIN_USP){
        next();
    }
    else{
        res.status(403).render(path.join(__dirname,'../views/faculty_login.ejs'),{error:'Unauthorized access!'});
    }
}

const isdean = (req, res, next) =>{
    if (req.session.userId === process.env.DEAN_USP){
        next();
    }
    else{
        res.status(403).render(path.join(__dirname,'../views/dean_login.ejs'),{error:'Unauthorized access!'});
    }
}

const isadmin = (req, res, next) =>{
    if (req.session.userId === process.env.ADMIN_USP){
        next();
    }
    else{
        res.status(403).render(path.join(__dirname,'../views/admin_login.ejs'),{error:'Unauthorized access!'});
    }
}

module.exports = {
    redirectLogin : redirectLogin,
    redirectFaculty : redirectFaculty,
    redirectDean : redirectDean,
    redirectAdmin : redirectAdmin,
    isfaculty:isfaculty,
    isdean:isdean,
    isadmin:isadmin
}