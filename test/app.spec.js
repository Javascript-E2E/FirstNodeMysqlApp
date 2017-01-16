var expect = require('chai').expect;
var request = require('superagent');

describe('First Node app', function(){
var nodeapp = require('../app');
var baseUrl = 'http://localhost:5000';
before(function(done){
    nodeapp.start(done)
})
after(function(done){
    nodeapp.stop(done)
})

describe("service is up and running", function(){
    it('should pass when Service is running', function(done){
        request.get(baseUrl+'/getAllcontactDetails').end(function assert(err,resp){
            expect(err).not.to.be.ok;
            expect(resp).to.have.property('status', 200);
           // expect(resp).to.be.an('array').with.length(2)
            done();
        })
    })
})
})