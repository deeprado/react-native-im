import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import moment from 'moment';

import config from '../../config';
import fetchLocal from '../../util/fetchLocal';

import actionType from '../actions/actionType';

let getSessions = async (userId) => {
  let result = await fetchLocal(config.server + `/v1/session/list/${userId}`, {
    method: 'GET',
  });
  let sessions = [];
  if (result && result.success) {
    sessions = result.data;
  }
  return sessions;
};

export async function initSessions(userId) {
  let sessions = await getSessions(userId);
  sessions.forEach((session) => {
    session.toInfo =
      typeof session.toInfo == 'string'
        ? JSON.parse(session.toInfo)
        : session.toInfo;
  });
  return (dispatch) => {
    dispatch(onInitSessions(sessions));
  };
}

function onInitSessions(sessions) {
  return {
    type: actionType.RESTORE_SESSIONS,
    sessionList: sessions,
  };
}

export function deleteSession(key) {
  return (dispatch) => {
    dispatch(onDeleteSession(key));
  };
}

function onDeleteSession(key) {
  return {
    type: actionType.SOCKET_DELETE_SESSION,
    key,
  };
}

_restoreDataFromLocalStore = async () => {
  // 恢复 sessionListMap
  let keys = await AsyncStorage.getItem('session:list:map:keys');
  let initArray = [];
  if (keys) {
    for (let key of keys.split(',')) {
      let value = JSON.parse(await AsyncStorage.getItem(`session:list:${key}`));
      initArray.push([key, value]);
    }
  }
  return initArray;
};

export async function restoreSessions() {
  let sessionListMap = await _restoreDataFromLocalStore();
  return (dispatch) => {
    dispatch(onRestoreSessions(sessionListMap));
  };
}

function onRestoreSessions(sessionListMap) {
  return {
    type: actionType.SOCKET_RESTORE_SESSIONS,
    sessionListMap,
  };
}

export function clearUnRead(chatKey) {
  return (dispatch) => {
    dispatch(onClearUnRead(chatKey));
  };
}

function onClearUnRead(chatKey) {
  return {
    type: actionType.SOCKET_CLEAR_UNREAD,
    chatKey,
  };
}

export async function clearCache() {
  await AsyncStorage.clear();
  return (dispatch) => {
    dispatch(onClearCache());
  };
}

function onClearCache() {
  return {
    type: actionType.SOCKET_CLEAR_CACHE,
  };
}

/**
 * Session 存储结构如下
 * session:list:map:keys 存放 map key 值列表
 * session:list:key 存储最新一条消息信息
 */
let _saveDataToLocalStore = async (sessionListMap) => {
  // 处理 sessionListMap
  AsyncStorage.setItem(
    'session:list:map:keys',
    [...sessionListMap.keys()].join(','),
  );
  for (let [key, value] of sessionListMap.entries()) {
    AsyncStorage.setItem(`session:list:${key}`, JSON.stringify(value));
  }
};

export async function saveSessions(sessionListMap) {
  await _saveDataToLocalStore(sessionListMap);
  return (dispatch) => {
    dispatch(onSaveSessions());
  };
}

function onSaveSessions() {
  return {
    type: actionType.SOCKET_SAVE_SESSIONS,
  };
}

let xxx = async (toInfo) => {};

export function addSession(userInfo, toInfo) {
  // 保存到数据库
  // await xxxxx(toInfo);
  let session = {
    name: userInfo.name,
    avatar: userInfo.avatar,
    unReadMessageCount: 0,
    latestTime: moment().startOf('minute').fromNow(),
    latestMessage: '',
    toInfo: toInfo,
  };
  return (dispatch) => {
    dispatch(onAddSession(session));
  };
}

function onAddSession(session) {
  return {
    type: actionType.SESSION_ADD,
    session,
  };
}

export default {
  initSessions,
  restoreSessions,
  deleteSession,
  clearCache,
  clearUnRead,
  saveSessions,
};
