import React from "react"
import { render } from "react-dom"
import { Router, Route, hashHistory } from "react-router"
import { Provider } from "react-redux"

import store from "./store"
import {connectSocket} from './action/user';

import ChatContainer from "./container/chat"
import LoginContainer from "./container/login"

import "./index.less"

store.dispatch(connectSocket());

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ChatContainer} />
      <Route path="/login" component={LoginContainer} />
    </Router>
  </Provider>,
  document.getElementById("app")
)
