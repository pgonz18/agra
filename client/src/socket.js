import io from "socket.io-client";
import store from './app/store';
import { addMessage } from './app/features/chatSlice';
import { moveBall, setWinner, addPlayer, endTurn } from './app/features/playerSlice';

const SERVER = "/";

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
