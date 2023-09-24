const { App } = require('uWebSockets.js');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const CHAT_SECRET = "CHAT_SECRET";

const app = App();
const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://focuszone.net"],
    methods: ["GET", "POST"]
  }
});

io.attachApp(app);

io.on("connection", (socket) => {
  console.log("Received a new connection");
  let identityToken = socket.handshake.query.identityToken;
  if (identityToken) {
    let identity = jwt.verify(identityToken, CHAT_SECRET);
    let email = identity.email;
    let room = identity.roomId;
    socket.join(room);

    socket.on('chat message', (message) => {
      message['email'] = email;
      console.log(message)
  
      io.to(room).emit('chat message', message)
    });
  } else {
    socket.disconnect();
  }

});


app.listen(3001, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});