const http = require("http")
const express = require("express")
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname,"..","Public")));


app.get('/create-room', (req, res) => {
    const roomId = Math.random().toString(36).substring(7);
    console.log(`Room Created with RoomId ${roomId}`);
    res.send({roomId: `/chatroom/${roomId}`});
});

app.get('/chatroom/:roomId', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'chat.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join-room', (info) => {
        socket.join(info.Id);
        console.log(`${info.name} has joined ${info.Id}`);
        const username = info.name;

        socket.to(info.Id).emit('notify-enter', {name: username});

        socket.on('chat-message', (msg) => {
            io.to(info.Id).emit('chat-message', msg);
        });

        socket.on('disconnect', () => {
            socket.to(info.Id).emit('notify-leave', {name: username});
            console.log(`User has disconnected`);
        });

    });

});

server.listen(3000, () =>{
    console.log(`Listening on localhost:3000 `);
    console.log(__dirname);
});