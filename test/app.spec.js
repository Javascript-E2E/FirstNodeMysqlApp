var expect = require('chai').expect;
var request = require('superagent');
var trans = require('../transactions/dbTransactions');

describe('First Node app', function(){
var nodeapp = require('../config/server.js');
var baseUrl = 'http://localhost:5000';

describe("service is up and running", function(){
    it('to validate error is given if server is down', function(done){
        request.get(baseUrl+'/getAllcontactDetails').end(function assert(err,resp){
           expect(err).to.be.ok;
            done();
        })
    });

    it('to validate response is given if server is up', function(done){
        request.get(baseUrl+'/getAllcontactDetails').end(function assert(err,resp){
             nodeapp.start(done);
             expect(resp).to.be.ok;
             expect(resp).to.have.property('status', 200);
             nodeapp.stop(done);
            done();
        })
    });

    it('test dbTransaction query formation with no params',function(done){
        var query = "select * from contact_informations";

        var result = trans.formatQuery(query);

        expect(result).to.equal(query);
        done();
    })
})
})