const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    username: String,
    playerNumber: String,
    color: String,
    prison: [String],
    finishing: [Boolean],
    finishLane: {},
    rolledNumber: Number,
    startingSpot: String,
    finishLine: [Number],
    lastNum: Number,
    ballIndexAdjustment: Number,
    indexRange: [Number],
    ballOnHand: String,
});

const roomSchema = new Schema({
  name: String,
  users: [playerSchema],
  whoseTurn: Number,
  allPrisons: [String],
  ballLocations: [String],
});

const Room = mongoose.model('Room', roomSchema);

const Player = mongoose.model('Player', playerSchema);

const addPlayerToDatabase = (username, number) => {
  const choices = {
    '2': {
      color: 'red',
      prison: ['160', '161', '162', '163'],
      finishLane: { '156': false, '157': false, '158': false, '159': false },
      startingSpot: '2',
      finishLine: [56, 50],
      lastNum: 159,
      ballIndexAdjustment: 0,
      indexRange: [0, 4],
    },
    '3': {
      color: 'blue',
      prison: ['146', '147', '148', '149'],
      finishLane: { '142': false, '143': false, '144': false, '145': false },
      startingSpot: '44',
      finishLine: [42, 36],
      lastNum: 145,
      ballIndexAdjustment: 4,
      indexRange: [4, 8],
    },
    '4': {
      color: '#0dad02',
      prison: ['132', '133', '134', '135'],
      finishLane: { '128': false, '129': false, '130': false, '131': false },
      startingSpot: '30',
      finishLine: [28, 22],
      lastNum: 131,
      ballIndexAdjustment: 8,
      indexRange: [8, 12],
    },
    '5': {
      color: '#ff8c00',
      prison: ['118', '119', '120', '121'],
      finishLane: { '114': false, '115': false, '116': false, '117': false },
      startingSpot: '16',
      finishLine: [14, 8],
      lastNum: 123,
      ballIndexAdjustment: 12,
      indexRange: [12, 16],
    },
  };
  const { color, prison, finishLane, startingSpot, finishLine, lastNum, ballIndexAdjustment, indexRange } = choices[number];
  const player = new Player({
    username,
    playerNumber: number,
    color,
    prison,
    finishing: [false, false, false, false],
    finishLane,
    rolledNumber: 0,
    startingSpot,
    finishLine,
    lastNum,
    ballIndexAdjustment,
    indexRange,
  });
  return player;
};

const createRoom = (roomName, username, number) => {
  const user = addPlayerToDatabase(username, number);
  const room = new Room({
    name: roomName,
    whoseTurn: 2,
    ballOnHand: '',
    allPrisons: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    ballLocations: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    users: [user],
  });

  room.save((err) => {
    if (err) return console.error(err);
  });
  return room;
};

module.exports = { addPlayerToDatabase, createRoom, Room };
