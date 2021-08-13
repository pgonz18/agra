import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import chatReducer from './features/chatSlice';
import playerReducer from './features/playerSlice';

const rootReducer = combineReducers({
  messages: chatReducer,
  player: playerReducer,
});

const store =  createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
