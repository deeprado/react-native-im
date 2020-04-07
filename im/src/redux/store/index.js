import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import io from 'socket.io-client';

import config from '../../config';
import reducers from '../reducer';

import {navMiddleware} from '../navigator/AppNavigators';
import createSocketMiddleware from '../middleware/createSocketMiddleware';

let socket = io(config.server, {
  timeout: 10000,
  jsonp: false,
  transports: ['websocket'],
  autoConnect: false,
});

const socketMiddleware = createSocketMiddleware(socket);
const middlewares = [
  navMiddleware,
  promiseMiddleware,
  thunkMiddleware,
  socketMiddleware,
];

// 连接
socket.connect();

/**
 * 创建store
 */
export let configureStore = () => {
  // 根据 reducer 初始化 store
  const store = createStore(reducers, applyMiddleware(...middlewares));

  return store;
};

export default configureStore();
