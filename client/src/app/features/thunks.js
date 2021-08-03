import socket from '../../socket';
import { addMessage } from './chatSlice';
import { addPlayer, moveBall } from './playerSlice';
import axios from 'axios';

//*** FOR LOCAL TESTING ***
// const URL = 'http://localhost:5000/player';

//*** FOR PRODUCTION ***
const URL ='/player';

export const sendMessage = (data) => async (dispatch) => {
  dispatch(addMessage(data));
  socket.emit("chat message", data);
};

export const sendBallMove = (data) => async (dispatch) => {
  const { ball, location } = data;
  dispatch(moveBall({ ball, location }));
  socket.emit('ball moved', { ball, location });
};

export const fetchPlayer = (data) => async (dispatch) => {
  try {

    const { select, name } = data;
    const response = await axios.post(URL, { select });
    const player = { data: response.data, name };
    console.log('data fetchplayer: ', player);
    dispatch(addPlayer(player));
  } catch (error) {
    console.error(error);
  }
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
