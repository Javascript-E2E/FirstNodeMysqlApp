var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit:50,
    host:'localhost',
    user:'root',
    password: 'Chandra@88',
    database: 'world'
});

app.get('/getAllCounties', function(req, resp){
    connection.getConnection(function(error,tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query('select * from country', function(error, rows, fields){
                tempconnect.release();
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

app.get('/getCountriesByContinent?:continent',function(req,resp){
    connection.getConnection(function(error, tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query('select * from country where Continent = ?',[req.query.continent],function(error,rows,fields){
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