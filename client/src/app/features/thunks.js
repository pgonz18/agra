import socket from '../../socket';
import { addMessage } from './chatSlice';
import { addPlayer, moveBall, endTurn } from './playerSlice';
import axios from 'axios';

//*** FOR LOCAL TESTING ***
const URL = 'http://localhost:5000/';

//*** FOR PRODUCTION ***
// const URL ='/';

export const sendMessage = (data) => async (dispatch) => {
  dispatch(addMessage(data));
  socket.emit("chat message", data);
};

export const sendBallMove = (data) => async (dispatch) => {
  try {
    axios.put(`${URL}move/${data.roomId}`, data);
    dispatch(moveBall(data));
    socket.emit('ball moved', data);
  } catch (err) {
    console.error(err);
  }

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
    }
    const { allPrisons, ballLocations, whoseTurn, name, _id } = response.data;
    const playerInfo = { ...response.data.users[0], allPrisons, ballLocations, whoseTurn, name, roomId: _id };
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

export const SendEndTurn = ({ whoseTurn, roomId }) => async (dispatch) => {
  const response = await axios.post(`${URL}move/${roomId}`, { whoseTurn });
  const nextTurn = response.data.whoseTurn;
  dispatch(endTurn(nextTurn));
  socket.emit('end turn', nextTurn);
};
