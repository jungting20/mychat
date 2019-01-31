const SocketIO = require('socket.io');
const axios = require('axios');


module.exports = (server,app,sessionMiddleware) => {
    const io = SocketIO(server,{path : '/socket.io'}); //받은 서버 소켓서버로 업글

    app.set('io',io);//app 에서 io 사용하려고 set 했음
    const room = io.of('/room');
    const chat = io.of('/chat');

    io.use((socket,next) => {
        sessionMiddleware(socket.request,socket.request.res,next);
    });

    room.on('connection',socket => {
        console.log('room socket 연결');
        socket.on('disconnect', () => {
            console.log('room socket 끝');
        });
    });

    chat.on('connection',socket => {
        console.log('chat socket 연결');
        socket.on('disconnect',() => {
            console.log('chat socket 끝');
        });
    });
    


}
