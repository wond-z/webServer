/**
 * @file 入口文件
 * @author wond-z
 */
var express = require('express');
var app = express();
var path = require('path');
var os = require('os');

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

// 获取内网ip
function getIPAddress() {
    let IPAddress = '';
    // interfaces的结果会是当前主机的所有网络信息（包含本地127.0.0.1、虚拟机ip、主机真实ip）
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                IPAddress = alias.address;
            }
        }
    }
    return IPAddress;
};


var server = app.listen(6868, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;

    // console.log('服务启动，访问地址为 http://%s:%s', host, port);
    console.log('服务启动，访问地址为 http://%s:%s', 'localhost', port);
    console.log('服务启动，访问地址为 http://%s:%s', getIPAddress(), port);
});
