const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });


app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('message', (message) => {
        console.log("Received message: " + message);
        if (message !== "User connected!") {
            io.emit('message', message);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
