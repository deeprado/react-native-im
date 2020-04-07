import actionType from '../actions/actionType';

const initState = {
  // 是否登录
  logined: false,
  // 用户信息
  userInfo: {},
  // 是否恢复完毕
  isTryRestoreFromStorage: false,
};

const profile = (state = initState, action) => {
  switch (action.type) {
    case actionType.USER_LOGIN:
    case actionType.USER_LOGIN_SUCCESS:
    case actionType.USER_LOGIN_FAIL:
      return {
        ...state,
        logined: action.logined,
        userInfo: action.userInfo,
      };
    case actionType.USER_MODIFY:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case actionType.USER_LOGOUT:
      return {
        ...state,
        userInfo: {},
        logined: false,
      };
    case actionType.USER_RESTORE:
      return {
        ...state,
        userInfo: action.userInfo,
        isTryRestoreFromStorage: action.isTryRestoreFromStorage,
      };
    default:
      return state;
  }
};

export default profile;
