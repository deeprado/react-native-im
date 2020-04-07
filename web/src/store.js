import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise"
import io from "socket.io-client"

import createSocketMiddleware from "./middleware"
import reducers from "./reducer"
import config from "./config"

let socket = io(config.server, {
  timeout: 10000,
  jsonp: false,
  transports: ["websocket"],
  autoConnect: false,
})
let socketMiddleware = createSocketMiddleware(socket)

const middlewares = [promiseMiddleware, thunkMiddleware, socketMiddleware]

let store = createStore(reducers, applyMiddleware(...middlewares))

export default store
