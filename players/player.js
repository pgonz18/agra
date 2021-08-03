const players = {
  '2': {
    playerNumber: '2',
    color: 'red',
    whoseTurn: 2,
    ballOnHand: '',
    prison: ['160', '161', '162', '163'],
    allPrisons: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    ballLocations: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    finishing: [false, false, false, false],
    finishLane: { '156': false, '157': false, '158': false, '159': false },
    rolledNumber: 0,
    startingSpot: '2',
    finishLine: [56, 50],
    lastNum: 159,
    ballIndexAdjustment: 0,
    indexRange: [0, 4],
  },
  '3': {
    playerNumber: '3',
    color: 'blue',
    whoseTurn: 2,
    ballOnHand: '',
    prison: ['146', '147', '148', '149'],
    allPrisons: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    ballLocations: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    finishing: [false, false, false, false],
    finishLane: { '142': false, '143': false, '144': false, '145': false },
    rolledNumber: 0,
    startingSpot: '44',
    finishLine: [42, 36],
    lastNum: 145,
    ballIndexAdjustment: 4,
    indexRange: [4, 8],
  },
  '4': {
    playerNumber: '4',
    color: '#0dad02',
    whoseTurn: 2,
    ballOnHand: '',
    prison: ['132', '133', '134', '135'],
    allPrisons: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    ballLocations: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    finishing: [false, false, false, false],
    finishLane: { '128': false, '129': false, '130': false, '131': false },
    rolledNumber: 0,
    startingSpot: '30',
    finishLine: [28, 22],
    lastNum: 131,
    ballIndexAdjustment: 8,
    indexRange: [8, 12],
  },
  '5': {
    playerNumber: '5',
    color: '#ff8c00',
    whoseTurn: 2,
    ballOnHand: '',
    prison: ['118', '119', '120', '121'],
    allPrisons: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    ballLocations: ['160', '161', '162', '163', '146', '147', '148', '149', '132', '133', '134', '135', '118', '119', '120', '121'],
    finishing: [false, false, false, false],
    finishLane: { '114': false, '115': false, '116': false, '117': false },
    rolledNumber: 0,
    startingSpot: '16',
    finishLine: [14, 8],
    lastNum: 123,
    ballIndexAdjustment: 12,
    indexRange: [12, 16],
  },
};

module.exports = players;