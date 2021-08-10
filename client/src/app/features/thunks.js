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

export const fetchRoom = (data) => async (dispatch) => {
  try {
    const { number, name, roomName, id, update } = data;
    let response;
    // if room already exists
    if (id) {
      response = await axios.post(`${URL}/${id}`, { number, name, update } );
    } else {
      response = await axios.post(URL, { roomName, username: name, number });
    }
    const { allPrisons, ballLocations, whoseTurn } = response.data;
    const playerInfo = { ...response.data.users[0], allPrisons, ballLocations, whoseTurn };
    dispatch(addPlayer(playerInfo));
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
