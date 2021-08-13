import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {},
  reducers: {
    addPlayer: (state, player) => {
      return player.payload;
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
      const { location, previousLocation } = data.payload;
      state.finishLane[location] = true;
      if (state.finishLane[previousLocation] !== undefined) {
        state.finishLane[previousLocation] = false;
      } else {
        let checkAllWin = true;
        for (const key in state.finishLane) {
          if (!state.finishLane[key]) checkAllWin = false;
        };
        if (checkAllWin) {
          state.winner = state.username;
        };
      };
    },
    setWinner: (state, data) => {
      state.winner = data.payload;
    },
    endTurn: (state, data) => {
      state.rolledNumber = 0;
      state.whoseTurn = data.payload;
    },
  },
});

export const { rollDice, grabBall, moveBall, addPlayer, setWithinFinish, checkWin, setWinner, endTurn } = playerSlice.actions;

export default playerSlice.reducer;
