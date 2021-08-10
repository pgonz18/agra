const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const db = require('./db/db');
const { createRoom, addPlayerToDatabase, Room } = require('./db/roomModel');


db.on('error', console.error.bind(console, 'connection error: '));

db.once("open", () => {
  console.log("Database connected!")
})

// *** FOR PRODUCTION ***
// const io = require('socket.io')(server);

// *** FOR LOCAL TESTING ***
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const players = require('./players/player');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/room', async (req, res) => {
  try {
    const rooms = await Room.find({}, '_id name users.username users.playerNumber', (err, rooms) => {
      if (err) console.error(err);
      res.send(rooms);
    });
  } catch (err) {
    console.error(err);
  }
});

app.post('/room/:id', async (req, res) => {
  try {
    const { number, name, update } = req.body;
    const id = req.params.id;
    let room, user;
    if (update) {
      await Room.findOneAndUpdate({ _id: id, 'users.playerNumber': number }, { 'users.$.username': name }, { useFindAndModify: false });
    } else {
      room = await Room.findOne({ _id: id });
      user = addPlayerToDatabase(name, number);
      room.users.push(user);
      await room.save();
    };
    room = await Room.findOne({ _id: id, 'users.playerNumber': number }, '_id name whoseTurn ballOnHand allPrisons ballLocations users.$' );
    res.send(room);
  } catch (err) {
    console.error(err);
  };
});

app.post('/room', async (req, res) => {
  try {
    const { roomName, username, number } = req.body;
    let room = await createRoom(roomName, username, number);
    res.send(room);
  } catch (err) {
    console.error(err);
  };
});

// *** FOR PRODUCTION ***
// app.use(express.static((__dirname + '/client/build')));

// *** FOR LOCAL TESTING ***
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat message', (data) => {
    socket.broadcast.emit('chat message', data);
  });

  socket.on('ball moved', (data) => {
    socket.broadcast.emit('ball moved', data);
  });

  socket.on('winner', (data) => {
    socket.broadcast.emit('winner', data);
  });

  socket.on('reset', () => {
    socket.emit('reset');
  });

  socket.on('end turn', () => {
    socket.broadcast.emit('end turn');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
