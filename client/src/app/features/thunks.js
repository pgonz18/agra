import socket from '../../socket';
import { addMessage } from './chatSlice';
import { addPlayer, moveBall, endTurn } from './playerSlice';
import axios from 'axios';

//*** FOR LOCAL TESTING ***
// const URL = 'http://localhost:5000/';

//*** FOR PRODUCTION ***
const URL ='/';

export const sendMessage = (data) => async (dispatch) => {
  dispatch(addMessage(data));
  socket.emit("chat message", data);
};

export const sendBallMove = (data) => async (dispatch) => {
  try {
    dispatch(moveBall(data));
    socket.emit('ball moved', data);
  } catch (err) {
    console.error(err);
  };
};

export const fetchRoom = (data) => async (dispatch) => {
  try {
    const { number, username, roomName, id, update } = data;
    let response;
    // if room already exists
    if (id) {
      response = await axios.post(`${URL}room/${id}`, { number, username, update } );
    } else {
      response = await axios.post(URL + 'room', { roomName, username, number });
    };
    const { allPrisons, ballLocations, whoseTurn, name, _id } = response.data;
    const playerInfo = { ...response.data.users[0], allPrisons, ballLocations, whoseTurn, name, roomId: _id };
    dispatch(addPlayer(playerInfo));
    socket.emit('join room', { roomId: playerInfo.roomId });
  } catch (error) {
    console.error(error);
  };
};

export const notifyWin = (name, roomId) => {
  socket.emit('winner', { name, roomId });
};

export const resetEveryone = (id) => {
  socket.emit('reset', id);
};

export const SendEndTurn = ({ whoseTurn, roomId }) => async (dispatch) => {
  let nextTurn = whoseTurn;
  if (nextTurn === 5) {
    nextTurn = 2;
  } else {
    nextTurn++;
  };
  dispatch(endTurn(nextTurn));
  socket.emit('end turn', { nextTurn, roomId });
};
