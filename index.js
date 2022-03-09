const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 

app.use(express.static('client'))

// GET Protocol
app.get('/', function (req,res) {
    res.sendFile(__dirname + '/client/homepage.html');
});

//can be change
server.listen(3000, function() {
    console.log('listening on *:3000');
});


io.on('connection',function(socket){

    socket.on('login' , function(msg){
        messageHistory.push(msg.username + ' has logged in.')
        socket.broadcast.emit('login-user' , {'username' : msg.username, 'message_history' : messageHistory} )
    })

    socket.on('message' , function(msg){

        messageHistory.push(msg.username + " : " + msg.message)
        socket.broadcast.emit('message-user' , {'username' : msg.username, 'message' : msg.message, 'message_history' : messageHistory})

    })

})