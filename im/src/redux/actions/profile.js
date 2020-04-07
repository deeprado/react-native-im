import AsyncStorage from '@react-native-community/async-storage';

import actionType from './actionType';
import config from '../../config';
import fetchLocal from '../../util/fetchLocal';
import {initFriends} from './friend';
import {initSessions} from './session';

const STORAGE_KEY_USER_INFO = 'IM_USER_INFO';
const STORAGE_KEY_FRIEND_LIST = 'IM_FRIEND_LIST';

let doLogin = async (name, phone, socketId) => {
  let data = JSON.stringify({
    name,
    phone,
    socketId,
  });
  let result = await fetchLocal(config.server + '/v1/user', {
    method: 'POST',
    body: data,
  });
  let userInfo = {};
  if (result && result.success) {
    userInfo = result.data;
    await AsyncStorage.setItem(STORAGE_KEY_USER_INFO, JSON.stringify(userInfo));
  }
  return userInfo;
};

export async function userLogin(name, phone, socketId = '') {
  let userInfo = await doLogin(name, phone, socketId);
  let logined = !!userInfo;
  if (logined) {
    return (dispatch) => {
      dispatch(initFriends(userInfo.userId));
      dispatch(initSessions(userInfo.userId));
      dispatch(onLoginSuccess(userInfo, logined));
    };
  } else {
    return (dispatch) => {
      dispatch(onLoginFail());
    };
  }
}

function onLoginSuccess(userInfo, logined) {
  return {
    type: actionType.USER_LOGIN_SUCCESS,
    userInfo,
    logined,
  };
}

function onLoginFail(userInfo = {}, logined = false) {
  return {
    type: actionType.USER_LOGIN_FAIL,
    userInfo,
    logined,
  };
}

let doLogout = async (userId) => {
  let result = await fetchLocal(config.server + `/v1/user/${userId}/status`, {
    method: 'delete',
  });
  return result.success;
};

export async function userLogout(userId) {
  let logoutSuccess = await doLogout(userId);
  if (logoutSuccess) {
    await AsyncStorage.clear();
    return (dispatch) => {
      dispatch(onLogout());
    };
  }
}

function onLogout() {
  return {
    type: actionType.USER_LOGOUT,
  };
}

// 拉取在线用户列表
let getOnlineList = async () => {
  let url = config.server + '/v1/user/online/list';
  let result = await fetchLocal(url);

  let friendList = [];
  if (result.success) {
    friendList = result.data;
    AsyncStorage.setItem(STORAGE_KEY_FRIEND_LIST, JSON.stringify(friendList));
  }

  return friendList;
};

export async function onlineList() {
  let friendList = await getOnlineList();

  return (dispatch) => {
    dispatch(onOnlineList(friendList));
  };
}

function onOnlineList(friendList) {
  return {
    type: actionType.USER_FRIEND_LIST,
    friendList,
  };
}

// 更新用户信息
let modifyUserInfo = async (userId, field, value) => {
  let url = config.server + `/v1/user/${userId}/property/${field}`;
  let result = await fetchLocal(url, {
    method: 'PUT',
    body: JSON.stringify({
      value,
    }),
  });

  let userInfo;
  if (result.success) {
    userInfo = result.data;
    await AsyncStorage.setItem(STORAGE_KEY_USER_INFO, JSON.stringify(userInfo));
  }

  return userInfo;
};

export async function modifyProfile(userId, field, value) {
  let userInfo = await modifyUserInfo(userId, field, value);
  return (dispatch) => {
    dispatch(onModifyUser(userInfo));
  };
}

function onModifyUser(userInfo) {
  return {
    type: actionType.USER_MODIFY,
    userInfo,
  };
}

// 从本地缓存恢复用户信息
let _restoreUserInfoFromStorage = async () => {
  let value = await AsyncStorage.getItem(STORAGE_KEY_USER_INFO);
  return value ? JSON.parse(value) : value ? value : {};
};

export async function restoreProfile() {
  let userInfo = await _restoreUserInfoFromStorage();
  let isTryRestoreFromStorage = !!userInfo;

  return (dispatch) => {
    dispatch(onRestoreUser(userInfo, isTryRestoreFromStorage));
  };
}

function onRestoreUser(userInfo, isTryRestoreFromStorage = false) {
  return {
    type: actionType.USER_RESTORE,
    userInfo,
    isTryRestoreFromStorage,
  };
}

export async function updateSocketInfo(userId, socketId) {
  let userInfo = await modifyUserInfo(userId, 'socketId', socketId);

  return (dispatch) => {
    dispatch(onModifyUser(userInfo));
  };
}

export default {
  userLogin,
  userLogout,
  onlineList,
  modifyProfile,
  restoreProfile,
  updateSocketInfo,
};
