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
        request.get('http://localhost:3000/',function(error,response,body)
        {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});