const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);

// *** FOR PRODUCTION ***
const io = require('socket.io')(server);

// *** FOR LOCAL TESTING ***
// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:3000'
//   }
// });

const players = require('./players/player');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/player', (req, res) => {
  console.log('server: ', req.body.select)
  res.send(players[req.body.select]);
});

// *** FOR PRODUCTION ***
app.use(express.static((__dirname + '/client/build')));

// *** FOR LOCAL TESTING ***
// app.use(express.static(path.join(__dirname, 'public')));

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
