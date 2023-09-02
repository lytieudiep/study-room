const { App } = require('uWebSockets.js');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const CHAT_SECRET = "CHAT_SECRET";

const app = App();
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
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

    socket.on('chat message', (message) => {
      console.log("timestamp:", new Date().toLocaleString(), "room:", room, "email:", email, "message:", message);
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