var db = require('./config/db');
var nodeServer = require('./config/server');
var sqlQuery = require('./queries/queries')

nodeServer.start();

nodeServer.app.get('/getAllcontactDetails', function(req, resp){
    db.dbConnection.getConnection(function(error,tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query(sqlQuery.getAllcontactDetails(), function(error, rows, fields){
                tempconnect.release();
                 if(error){
                    resp.json(error);
                }else{
                    resp.json(rows);
                }

            })
        }
    })
})

nodeServer.app.get('/getContactBy?:phone_number',function(req,resp){
    dbConnection.getConnection(function(error, tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query(sqlQuery.getContactBy(),[req.query.phone_number],function(error,rows,fields){
                tempconnect.release();
                if(error){
                    resp.json(error);
                }else{
                    resp.json(rows);
                }
            })
        }
    })
})

//app.listen(process.env.PORT || 5000);
