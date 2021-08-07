import socket from '../../socket';
import { addMessage } from './chatSlice';
import { addPlayer, moveBall } from './playerSlice';
import axios from 'axios';

//*** FOR LOCAL TESTING ***
const URL = 'http://localhost:5000/room';

//*** FOR PRODUCTION ***
// const URL ='/room';

export const sendMessage = (data) => async (dispatch) => {
  dispatch(addMessage(data));
  socket.emit("chat message", data);
};

export const sendBallMove = (data) => async (dispatch) => {
  const { ball, location } = data;
  dispatch(moveBall({ ball, location }));
  socket.emit('ball moved', { ball, location });
};

export const sendCreateRoom = (data) => async (dispatch) => {
  try {

    const { select, name, roomName } = data;
    const response = await axios.post(URL, { roomName, username: name, number: select });

    const { allPrisons, ballLocations, whoseTurn } = response.data;
    const playerInfo = { ...response.data.users[0], allPrisons, ballLocations, whoseTurn };
    dispatch(addPlayer(playerInfo));
  } catch (error) {
    console.error(error);
  };
};

export const fetchRoom = (room) => async (dispatch) => {
  try {
    console.log('thunk: ', room)
    const response = await axios.get(URL, { name: room });
    console.log(response);
  } catch (error) {
    console.error(error);
  };
};

export const notifyWin = (name) => {
  socket.emit('winner', name);
};

export const resetEveryone = () => {
  socket.emit('reset');
};

export const SendEndTurn = () => {
  socket.emit('end turn');
};
