var db = require('../config/db');
var sqlQuery = require('../queries/queries')
var mysql = require('mysql');


var selectQuery = (query,req,resp) => {
        db.dbConnection.getConnection(function(error,tempconnect){
        if(error){
            resp.json(error);
        }else{
            var queryToBeExecuted = formatQuery(query,req.query);
            tempconnect.query(queryToBeExecuted,function(error, rows, fields){
                tempconnect.release();
                 if(error){
                    resp.json(error);
                }else{
                    resp.json(rows);
                }

            })
        }
        console.log(resp);
    });

    return resp;
};

var formatQuery = (query,params) => {
    if(!params){
        return query;
    }else{
        var variables = Object.keys(params).map(key => params[key]);
        return mysql.format(query,variables);
    }
}


module.exports = {
    selectQuery,
    formatQuery
}