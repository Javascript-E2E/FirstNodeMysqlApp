var express = require('express');
var mysql = require('mysql');
var app = express();

var server;

var start = exports.start = function start(callback){
    server = app.listen(process.env.PORT || 5000, callback);
}

var stop = exports.stop = function stop(callback){
    server.close(callback);
}

var connection = mysql.createPool({
    connectionLimit:50,
    host:'us-cdbr-iron-east-04.cleardb.net',
    user:'b6ba3577c42d6f',
    password: '610bd226',
    database: 'heroku_b53d728efd81dd1'
});

app.get('/getAllcontactDetails', function(req, resp){
    connection.getConnection(function(error,tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query('select * from contact_informations', function(error, rows, fields){
                tempconnect.release();
                //connection.end();
                console.log(req.body);
                 if(error){
                    resp.json(error);
                }else{
                    resp.json(rows);
                }

            })
        }
    })
})

app.get('/getContactBy?:phone_number',function(req,resp){
    connection.getConnection(function(error, tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query('select * from contact_informations where phone_number = ?',[req.query.phone_number],function(error,rows,fields){
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
