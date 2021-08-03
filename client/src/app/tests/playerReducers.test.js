import reducer, {
  addPlayer,
  rollDice,
  grabBall,
  moveBall,
  setWithinFinish,
  updateEnemiePlayers,
  checkWin,
  setWinner,
  endTurn,
 } from '../features/playerSlice';

 test('should return the initial state', () => {
   expect(reducer(undefined, {})).toEqual({});
 });

 test('should add a player from server', () => {
  const fakePlayer = {
  player: '2',
  color: 'red',
  };
  expect(reducer({}, addPlayer({ data: fakePlayer }))).toEqual({
    player: '2',
    color: 'red',
    });
 });

describe('should handle varius changes to state according to player moves', () => {
  let newState;
  const previousState = {
   player: '2',
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
   };

   test('should update die number after rolling and reseting to zero after moving or ending turn', () => {
    newState = reducer(previousState, rollDice(3));
    expect(newState.rolledNumber).toEqual(3);

    newState = reducer(newState, moveBall({ ball: 0, location: '1' }));
    expect(newState.rolledNumber).toEqual(0);


   newState = reducer(newState, rollDice(5))
   newState = reducer(newState, endTurn());
   expect(newState.rolledNumber).toEqual(0);
  });

  test('should grab and move a ball to a new location', () => {
    newState = reducer(previousState, grabBall('160'));
    expect(newState.ballOnHand).toEqual('160');

    const ballIndex = newState.ballLocations.indexOf('160');
    newState = reducer(newState, moveBall({ ball: ballIndex, location: '1' }));
    expect(newState.ballLocations[0]).toEqual('1');
  });

  test('should handle finishing and winning game', () => {
    newState = reducer(previousState, setWithinFinish({ adjustedIndex: 0, value: true }));
    expect(newState.finishing[0]).toEqual(true);

    newState = reducer(newState, checkWin({ ball: 0, location: '156' }));
    expect(newState.finishLane['156']).toEqual(true);
    expect(newState.won).toEqual(undefined);

    newState = reducer(newState, checkWin({ ball: 1, location: '157' }));
    newState = reducer(newState, checkWin({ ball: 2, location: '158' }));
    newState = reducer(newState, checkWin({ ball: 3, location: '159' }));
    expect(newState.won).toEqual(true);
    });
  });
