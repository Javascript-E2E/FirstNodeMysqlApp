var db = require('./config/db');
var nodeServer = require('./config/server');
var sqlQuery = require('./queries/queries')
var trans = require('./transactions/dbTransactions')

nodeServer.start();

nodeServer.app.get('/getAllcontactDetails', function(req, resp){
    trans.selectQuery(sqlQuery.getAllcontactDetails(),req,resp);
})

nodeServer.app.get('/getContactBy?:phone_number',function(req,resp){
    trans.selectQuery(sqlQuery.getContactBy(),req,resp);
})

//app.listen(process.env.PORT || 5000);
