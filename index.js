/**
 * @file 入口文件
 * @author wond-z
 */
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

app.all('*', function (req, res, next) {
    console.log('[' + req.method + '] ' + req.url);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Max-Age', 1728000); // 预请求缓存20天
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


var server = app.listen(6868, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;

    // console.log('服务启动，访问地址为 http://%s:%s', host, port);
    console.log('服务启动，访问地址为 http://%s:%s', 'localhost', port);
});
