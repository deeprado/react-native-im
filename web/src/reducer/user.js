import actionType from "../action/actionType"

let initUserState = {
  socketId: null,
  logined: false,
  userInfo: {},
  toInfo: {},
}

const user = (state = initUserState, action) => {
  switch (action.type) {
    case actionType.SOCKET_CONNECTED:
      return {
        ...state,
        socketId: action.socketId,
      }
    case actionType.USER_LOGIN:
      return {
        ...state,
        logined: action.logined,
        userInfo: action.userInfo,
      }
    case actionType.USER_LOGOUT:
      return {
        ...state,
        socketId: null,
        logined: false,
        userInfo: {},
        toInfo: {},
      }
    case actionType.USER_SWITCH_TOINFO:
      console.log('reducer USER_SWITCH_TOINFO')
      return {
        ...state,
        toInfo: action.toInfo,
      }
    default:
      return state
  }
}

export default user
