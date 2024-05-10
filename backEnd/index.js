

let express = require('express');
let app = express(); // it is a request handler not http server
let http = require('http');
let server = http.Server(app);// http server wih handler app
let SocketIo = require('socket.io');// socket service handler
let io =  SocketIo(server,{ //io is now the socket server with socketio handler
    cors:
    {
        origin: ["http://localhost:4200"]
    }
});

const user = require('./api/users');
const mongoose = require('./db/mongoose');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use("", user);


let usersd = [];

const port = process.env.PORT || 3000;// if 3000 not available


io.on('connection', (socket) => {
    
    socket.on("user", user => {
        usersd.push({ name: user, id: socket.id });
        console.log(usersd);
    })
    socket.on("send-msg", (msg, target) => {
        let a = usersd.find(x => x.name == target);
        console.log(a);
        socket.to(a.id).emit("receive-msg",msg);
    })
});

// server.listen(port, () => {
//     console.log(`server started on port: ${port}`);
// });
// app.listen(port, () => {
//     console.log(`server started on port: ${port}`);
// });
server.listen(port, () => {
    console.log(`server started on port: ${port}`);
    usersd = [];
});



