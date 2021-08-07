import io from "socket.io-client";
import store from './app/store';
import { addMessage } from './app/features/chatSlice';
import { moveBall, setWinner, addPlayer, endTurn } from './app/features/playerSlice';

// *** FOR LOCAL TESTING ***
const SERVER = "http://localhost:5000";

// *** FOR PRODUCTION ***
// const SERVER = "/";

var socket = io(SERVER);

socket.on("connect", () => {
  socket.on("chat message", (data) => {
    store.dispatch(addMessage(data));
  });

  socket.on("ball moved", (data) => {
    store.dispatch(moveBall(data));
  });

  socket.on("winner", (data) => {
    store.dispatch(setWinner(data));
  });

  socket.on("reset", () => {
    store.dispatch(addPlayer({ data: {}, name: '' }));
  });

  socket.on("end turn", () => {
    store.dispatch(endTurn());
  });
});

export default socket;
