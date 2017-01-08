var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit:50,
    host:'mysql://b6ba3577c42d6f:610bd226@us-cdbr-iron-east-04.cleardb.net/heroku_b53d728efd81dd1?reconnect=true',
    user:'b6ba3577c42d6f',
    password: '610bd226',
    database: 'heroku_b53d728efd81dd1'
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

app.listen(process.env.PORT || 5000);
