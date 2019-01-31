const SocketIO = require('socket.io');
const axios = require('axios');


module.exports = (server,app,sessionMiddleware) => {
    const io = SocketIO(server,{path : '/socket.io'}); //받은 서버 소켓서버로 업글

    app.set('io',io);//app 에서 io 사용하려고 set 했음

    io.on('connection',socket => {
        console.log('socket 연결함');
    });



}
