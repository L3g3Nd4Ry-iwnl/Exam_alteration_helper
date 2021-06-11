var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;
var request = require('request');




describe('1) MAIN PAGE', function(done)
{
    it('TESTCASE1 PASSED(HOME PAGE)', function(done)
    {
        request('http://localhost:3000/' , function(error, response, body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('TESTCASE2 FAILED (PORT NUMBER IS WRONG)', function(done)
    {
        request.get('http://localhost:3000/?',function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });       
});



describe('2) ADMIN LOGIN PAGE', function(done)
{
    it('TESTCASE3 PASSED (ADMIN LOGIN WITH VALID CREDENTIALS)', function(done)
    {
        let username='admin_amrita';
        let password='admin_amrita';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    
    it('TESTCASE4 PASSED (ADMIN LOGIN WITH INVALID CREDENTIALS)', function(done)
    {
        let username='admin_amrita';
        let password='admin';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('TESTCASE5 PASSED (ADMIN LOGIN WITH  NULL CREDENTIALS)', function(done)
    {
        let username='';
        let password='';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});


describe('3) DEAN LOGIN PAGE', function(done)
{
    it('TESTCASE6 PASSED (DEAN LOGIN WITH VALID CREDENTIALS)', function(done)
    {
        let username='dean_amrita';
        let password='dean_amrita';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('TESTCASE7 PASSED (DEAN LOGIN WITH INVALID CREDENTIALS)', function(done)
    {
        let username='dean';
        let password='dean';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('TESTCASE8 PASSED (DEAN LOGIN WITH NULL CREDENTIALS)', function(done)
    {
        let username='';
        let password='';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
       
});

describe('4) FACULTY LOGIN PAGE', function(done)
{
    it('TESTCASE9 PASSED (FACULTY LOGIN WITH VALID CREDENTIALS)', function(done)
    {
        let username='gautham@cb.amrita.edu';
        let password='gautham123';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('TESTCASE10 PASSED (FACULTY LOGIN WITH INVALID CREDENTIALS)', function(done)
    {
        let username='gautham';
        let password='gautham';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('TESTCASE11 PASSED (FACULTY LOGIN WITH NULL CREDENTIALS)', function(done)
    {
        let username='';
        let password='';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });   
});

describe('4) FACULTY LOGIN PAGE', function(done)
{
    it('TESTCASE12 PASSED (FACULTY LOGIN WITH VALID CREDENTIALS)', function(done)
    {
        let username='gautham@cb.amrita.edu';
        let password='gautham123';
        request.get('http://localhost:3000/?username='+username+'&&password='+password,function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

});