var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit:50,
    host:'localhost',
    user:'root',
    password: '1234',
    database: 'world'
});

app.get('/getAllCounties', function(req, resp){
    connection.getConnection(function(error,tempconnect){
        if(error){
            tempconnect.release();
            resp.json(error);
        }else{
            tempconnect.query('select * from country', function(error, rows, fields){
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

app.listen(8080);