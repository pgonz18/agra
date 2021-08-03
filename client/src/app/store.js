import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import thunk from 'redux-thunk';
import chatReducer from './features/chatSlice';
import playerReducer from './features/playerSlice';

const rootReducer = combineReducers({
  messages: chatReducer,
  player: playerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store =  createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
