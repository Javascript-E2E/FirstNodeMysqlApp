var express = require('express');
var app =exports.app = express();

var server;

var start = exports.start = function start(callback){
    server = app.listen(process.env.PORT || 5000, callback);
}

var stop = exports.stop = function stop(callback){
    server.close(callback);
}