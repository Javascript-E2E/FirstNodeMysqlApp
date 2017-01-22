var mysql = require('mysql');
var connection =exports.dbConnection = mysql.createPool({
    connectionLimit:50,
    host:'us-cdbr-iron-east-04.cleardb.net',
    user:'b6ba3577c42d6f',
    password: '610bd226',
    database: 'heroku_b53d728efd81dd1'
});