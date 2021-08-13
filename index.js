const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const db = require('./db/db');
const { createRoom, addPlayerToDatabase, Room } = require('./db/roomModel');


db.on('error', console.error.bind(console, 'connection error: '));

db.once("open", () => {
  console.log("Database connected!")
});

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


app.post('/room', async (req, res) => {
  try {
    const { roomName, username, number } = req.body;
    let room = await createRoom(roomName, username, number);
    res.send(room);
  } catch (err) {
    console.error(err);
  };
});

app.post('/room/:id', async (req, res) => {
  try {
    const { number, username, update } = req.body;
    const id = req.params.id;
    let room, user;
    if (update) {
      await Room.findOneAndUpdate({ _id: id, 'users.playerNumber': number }, { 'users.$.username': username }, { useFindAndModify: false });
    } else {
      room = await Room.findOne({ _id: id });
      user = addPlayerToDatabase(username, number);
      room.users.push(user);
      await room.save();
    };
    room = await Room.findOne({ _id: id, 'users.playerNumber': number }, '_id name whoseTurn ballOnHand allPrisons ballLocations users.$' );
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
  const { ball, location, i, previousLocation, playerNumber, _id, roomId } = data;
  Room.findById(roomId)
    .then((room) => {
      room.ballLocations.set(ball, location);
      if (i > -1 || previousLocation) {
        const player = room.users.id(_id);
          if (i > -1) {
            player.finishing.set(i, true);
          };
          if (previousLocation) {
            if (player.finishLane[previousLocation]) {
              player.set({ finishLane: { ...player.finishLane, [previousLocation]: false } });
            };
            player.set({ finishLane: { ...player.finishLane, [location]: true } });
          };
        };
      return room.save();
      })
    // clean up consoles, add winner to database so if game is not reset it can be reset later
  .then((room) => socket.broadcast.emit('ball moved', data))
  .catch((err) => {
  console.error(err);
});

});

socket.on('winner', async (data) => {
  try {
    const { name, roomId } = data;
    await Room.findByIdAndUpdate(roomId, { '$set':
    { 'users.$[].winner': name }
  });
    socket.broadcast.emit('winner', name);
  } catch (err) {
    console.error(err);
  };
});

socket.on('reset', async (data) => {
  try {
    const id = data;
    await Room.findByIdAndDelete(id);
    socket.emit('reset');
  } catch (err) {
    console.error(err);
  };
});

socket.on('end turn', async (data) => {
  try {
    const { nextTurn, roomId } = data;
    await Room.findOneAndUpdate({ _id: roomId }, { whoseTurn: nextTurn }, { useFindAndModify: false });
    socket.broadcast.emit('end turn', nextTurn);
  } catch (err) {
  console.error(err)
  };
});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
