var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit:50,
    host:'us-cdbr-iron-east-04.cleardb.net',
    user:'b6ba3577c42d6f',
    password: '610bd226',
    database: 'heroku_b53d728efd81dd1'
});

app.get('/getAllCounties', function(req, resp){
    connection.getConnection(function(error,tempconnect){
        if(error){
            resp.json(error);
        }else{
            tempconnect.query('select * from contact_informations', function(error, rows, fields){
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
            tempconnect.query('select * from contact_informations where Continent = ?',[req.query.continent],function(error,rows,fields){
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

app.listen(process.env.PORT || 5000);
