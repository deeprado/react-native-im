import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import actionType from './actionType';

export function openSocket() {
  return (dispatch) => {
    dispatch(onOpenSocket());
  };
}

function onOpenSocket() {
  return {
    type: actionType.SOCKET_OPEN,
  };
}

export function closeSocket() {
  return (dispatch) => {
    dispatch(onCloseSocket());
  };
}

function onCloseSocket() {
  return {
    type: actionType.SOCKET_CLOSE,
  };
}

export function connectSocket() {
  return (dispatch) => {
    dispatch(onConnectSocket());
  };
}

function onConnectSocket() {
  return {
    type: actionType.SOCKET_CONNECT,
  };
}

export function connected(socketId) {
  return (dispatch) => {
    dispatch(onConnected(socketId));
  };
}

function onConnected(socketId) {
  return {
    type: actionType.SOCKET_CONNECTED,
    socketId,
  };
}

/**
 * 格式化 payload
 * @param {Number} delta - 未读数步进
 */
_formatPayloadToSessionItem = (key, preSessionItem, payload, delta = 1) => {
  let sessionItem;
  if (payload.localeExt) {
    let toInfo = payload.localeExt.toInfo;
    sessionItem = {
      avatar: toInfo.avatar,
      name: toInfo.name,
      latestMessage: payload.msg.content,
      unReadMessageCount: 0,
      timestamp: +new Date(),
      key: key,
      toInfo: toInfo,
    };
  } else {
    let ext = payload.ext;
    sessionItem = {
      avatar: ext.avatar,
      name: ext.name,
      latestMessage: payload.msg.content,
      timestamp: ext.timestamp,
      unReadMessageCount: preSessionItem
        ? preSessionItem.unReadMessageCount + delta
        : delta,
      key: key,
      toInfo: {
        userId: payload.from,
        avatar: ext.avatar,
        name: ext.name,
      },
    };
  }

  return sessionItem;
};

/**
 * 从历史恢复消息
 * 每次取的数目还不能超过 13 条，不然由于 listView 懒加载，无法滚动到底部
 */
let _restoreMessageFromLocalStore = async (key, page = 0, pageSize = 10) => {
  let history = await AsyncStorage.getItem(`message:history:${key}`);
  if (history) {
    let historyUUIDs = history
      .split(',')
      .slice(-(pageSize * (page + 1)), -(pageSize * page) || undefined)
      .map((uuid) => `message:item:${uuid}`);
    let messageArray = await AsyncStorage.multiGet(historyUUIDs);
    return messageArray.map((item) => {
      return JSON.parse(item[1]);
    });
  } else {
    return [];
  }
};

export async function restoreMessages() {
  let messages = await _restoreMessageFromLocalStore();
  return (dispatch) => {
    dispatch(onRestoreMessages(messages));
  };
}

function onRestoreMessages(messages) {
  return {
    type: actionType.SOCKET_RESTORE_MESSAGES,
    messages,
  };
}

let _getPayloadKey = (payload) => {
  if (payload.localeExt) {
    return `${payload.from}-${payload.to}`;
  } else {
    return `${payload.to}-${payload.from}`;
  }
};

/**
 * 历史消息存储结构
 * message:history:${key} 存储用户的消息 id 集合
 * message:item:${uuid} 消息 uuid 集合
 */
let _saveMessageToLocalStore = async (key, payloads) => {
  let historyKey = `message:history:${key}`;
  let history = await AsyncStorage.getItem(historyKey);

  // 聊天记录索引
  let uuids = payloads.map((payload) => {
    return payload.uuid;
  });
  await AsyncStorage.setItem(
    historyKey,
    `${history ? history + ',' : ''}${uuids.join(',')}`,
  );

  payloads.forEach((payload) => {
    AsyncStorage.setItem(
      `message:item:${payload.uuid}`,
      JSON.stringify(payload),
    );
  });
};

export async function saveMessages(key, payloads) {
  await _saveMessageToLocalStore(key, payloads);
  return (dispatch) => {
    dispatch(onSaveMessages());
  };
}

function onSaveMessages() {
  return {
    type: actionType.SOCKET_SAVE_MESSAGES,
  };
}

export async function fillChatRoom(currentChatKey, page = 0, pageSize = 12) {
  let messages = [];
  if (currentChatKey) {
    if (typeof page === 'number' && page === 0) {
      // 异步更新
      messages = await _restoreMessageFromLocalStore(
        currentChatKey,
        page,
        pageSize,
      );
    } else {
      messages = await _restoreMessageFromLocalStore(
        currentChatKey,
        page,
        pageSize,
      );
    }
  }
  return (dispatch) => {
    dispatch(onFillChatRoom(currentChatKey, messages, page, pageSize));
  };
}

function onFillChatRoom(currentChatKey, messages, page, pageSize) {
  return {
    type: actionType.FILL_CHAT_ROOM,
    currentChatKey,
    messages,
    page,
    pageSize,
  };
}

export function updateToInfo(toInfo) {
  // TODO 从缓存会话中读取，若无则创建新会话

  return (dispatch) => {
    dispatch(onUpdateToInfo(toInfo));
  };
}

function onUpdateToInfo(toInfo) {
  return {
    type: actionType.SOCKET_UPDATE_TO_INFO,
    toInfo,
  };
}

export function sendMessage(payload) {
  return (dispatch) => {
    dispatch(onSendMessage(payload));
  };
}

function onSendMessage(payload) {
  return {
    type: actionType.SOCKET_SEND_MESSAGE,
    payload,
  };
}

/**
 * 历史消息存储结构
 * message:history:${key} 存储用户的消息 id 集合
 * message:item:${uuid} 消息 uuid 集合
 */
_saveMessageToLocalStore = async (key, payloads) => {
  let historyKey = `message:history:${key}`;
  let history = await AsyncStorage.getItem(historyKey);

  // 聊天记录索引
  let uuids = payloads.map((payload) => {
    return payload.uuid;
  });
  await AsyncStorage.setItem(
    historyKey,
    `${history ? history + ',' : ''}${uuids.join(',')}`,
  );

  payloads.forEach((payload) => {
    AsyncStorage.setItem(
      `message:item:${payload.uuid}`,
      JSON.stringify(payload),
    );
  });
};

export function receiveMessage(payloads) {
  let delta = payloads.length;
  let payload = payloads[delta - 1];
  let key = _getPayloadKey(payload);

  // 需要支持 payload 数组
  payloads = payloads.map((payload) => {
    return _.omit(payload, ['localeExt']);
  });

  _saveMessageToLocalStore(key, payloads);

  return (dispatch) => {
    dispatch(onReceiveMessage(key, payload, payloads, delta));
  };
}

function onReceiveMessage(key, payload, payloads, delta) {
  return {
    type: actionType.SOCKET_RECEIVE_MESSAGE,
    key,
    payload,
    payloads,
    delta,
  };
}

export function saveLocal(payload) {
  let key = _getPayloadKey(payload);
  let payloads = [payload];
  // 需要支持 payload 数组
  payloads = payloads.map((payload) => {
    return _.omit(payload, ['localeExt']);
  });

  _saveMessageToLocalStore(key, payloads);

  return (dispatch) => {
    dispatch(onSaveLocal(key, payload));
  };
}

function onSaveLocal(key, payload) {
  let payloads = [payload];
  return {
    type: actionType.SOCKET_SAVE_LOCAL,
    key,
    payloads,
  };
}
