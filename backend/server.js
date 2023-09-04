const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {origin: 'https://real-time-v2-fr.onrender.com/'},
  allowedHeaders: ["my-custom-header"],
  credentials: true
});

io.on("connection", socket => {
    // either with send()
    socket.send("Hello!");
  
    // or with emit() and custom event names
    socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
  
    // handle the event sent with socket.send()
    socket.on("message", (data) => {
      console.log(data);
    });
  
    // handle the event sent with socket.emit()
    socket.on("salutations", (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3);
    });
});

httpServer.listen(4000);