import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {},
  reducers: {
    addPlayer: (state, obj) => {
      const { data, name } = obj.payload;
      data.username = name;
      return data;
    },
    rollDice: (state, value) => {
      state.rolledNumber = value.payload;
    },
    grabBall: (state, data) => {
      state.ballOnHand = data.payload;
    },
    moveBall: (state, data) => {
      const { ball, location } = data.payload;
      state.ballLocations[ball] = location;
      state.rolledNumber = 0;
    },
    setWithinFinish: (state, data) => {
      const { adjustedIndex, value } = data.payload;
      state.finishing[adjustedIndex] = value;
    },
    checkWin: (state, data) => {
      const { ball, location } = data.payload;
      const previousLocation = state.ballLocations[ball];
      if (state.finishLane[previousLocation] !== undefined) {
        state.finishLane[previousLocation] = false;
      };
      state.finishLane[location] = true;
      let checkAllWin = true;
      for (const key in state.finishLane) {
        if (!state.finishLane[key]) checkAllWin = false;
      };
      if (checkAllWin) {
        state.won = true;
      };
    },
    setWinner: (state, data) => {
      state.won = false;
      state.winner = data.payload;
    },
    endTurn: (state) => {
      state.rolledNumber = 0;
      if (state.whoseTurn === 5) {
        state.whoseTurn = 2;
      } else {
        state.whoseTurn++;
      };
    },
  },
});

export const { rollDice, grabBall, moveBall, addPlayer, setWithinFinish, checkWin, setWinner, endTurn } = playerSlice.actions;

export default playerSlice.reducer;