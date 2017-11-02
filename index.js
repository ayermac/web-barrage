var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var xss = require('xss');

// 设置静态资源目录 例如: /img/...
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//当前在线人数
var onlineCount = 0;

io.on('connection', function (socket) {
    // console.log('a user connected');
    onlineCount++;
    // 更新在线人数
    io.emit('update_online_count', onlineCount);

    // 接收弹幕消息
    socket.on('barrage', function (msg) {
        // console.log('message:' + msg);
        // 过滤 xss
        var msg = xss(msg);
        io.emit('barrage', msg);
    });

    // 断开连接
    socket.on('disconnect', function () {
        console.log('user disconnected');
        onlineCount--;
        io.emit('update_online_count', onlineCount);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});