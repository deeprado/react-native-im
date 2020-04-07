import { combineReducers } from "redux"


import friend from './friend'
import message from './message'
import user from './user'

var reducers = combineReducers({
  user: user,
  friend: friend,
  message: message,
})

export default reducers
