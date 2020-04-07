import moment from 'moment';
import actionType from '../actions/actionType';

moment.locale('zh-cn');

let initState = {
  // 会话记录 对象
  sessionListMap: new Map(),
  // 会话记录
  sessionList: [],
  // 未读消息数量
  unReadMessageCountTotal: 0,
};

let _getPayloadKey = (payload) => {
  if (payload.localeExt) {
    return `${payload.from}-${payload.to}`;
  } else {
    return `${payload.to}-${payload.from}`;
  }
};

let _unReadMessageCountTotal = (sessionList) => {
  let unReadMessageCountTotal = 0;
  sessionList.forEach(function (item) {
    unReadMessageCountTotal += item.unReadMessageCount;
  });
  return unReadMessageCountTotal;
};

let _unReadMapMessageCountTotal = (sessionListMap) => {
  let unReadMessageCountTotal = 0;
  [...sessionListMap.values()].forEach(function (item) {
    unReadMessageCountTotal += item.unReadMessageCount;
  });
  return unReadMessageCountTotal;
};

let _sessionList = (sessionListMap) => {
  return [...sessionListMap.values()]
    .sort(function (a, b) {
      return b.timestamp - a.timestamp;
    })
    .map(function (item) {
      item.latestTime = moment(item.timestamp).startOf('minute').fromNow();
      return item;
    });
};

/**
 * 格式化 payload
 * @param {Number} delta - 未读数步进
 */
let _formatPayloadToSessionItem = (key, preSessionItem, payload, delta = 1) => {
  let tmpSessionItem;
  if (payload.localeExt) {
    let toInfo = payload.localeExt.toInfo;
    tmpSessionItem = {
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
    tmpSessionItem = {
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

  return tmpSessionItem;
};

const session = (state = initState, action) => {
  let {sessionListMap, sessionList} = state;
  switch (action.type) {
    case actionType.SOCKET_DELETE_SESSION:
      sessionListMap.delete(action.key);
      return {
        ...state,
        sessionListMap,
      };
    case actionType.RESTORE_SESSIONS:
      return {
        ...state,
        sessionList: action.sessionList,
        unReadMessageCountTotal: _unReadMessageCountTotal(action.sessionList),
      };
    case actionType.SOCKET_RESTORE_SESSIONS:
      return {
        ...state,
        sessionListMap: action.sessionListMap,
        sessionList: _sessionList(action.sessionListMap),
        unReadMessageCountTotal: _unReadMapMessageCountTotal(
          action.sessionListMap,
        ),
      };
    case actionType.SOCKET_CLEAR_CACHE:
      sessionListMap.clear();
      return {
        ...state,
        sessionListMap,
      };
    case actionType.SOCKET_CLEAR_UNREAD:
      let tmpSessionItem = sessionListMap.get(action.chatKey);
      if (tmpSessionItem) {
        tmpSessionItem = Object.assign({}, tmpSessionItem, {
          unReadMessageCount: 0,
        });
        sessionListMap.set(action.chatKey, tmpSessionItem);
      }
      return {
        ...state,
        currentChatKey: null,
        sessionListMap,
      };
    case actionType.SOCKET_RESTORE:
      return {
        ...state,
        sessionListMap: sessionListMap.concat(action.sessionListMap),
      };
    case actionType.SOCKET_RECEIVE_MESSAGE:
      let {key, payload, payloads, delta} = action;
      let preSessionItem = sessionListMap.get(key);
      // 取数组最新一条消息，并格式化为
      let sessionItem = _formatPayloadToSessionItem(
        key,
        preSessionItem,
        payload,
        delta,
      );
      sessionListMap.set(String(sessionItem.key), sessionItem);
      return {
        ...state,
        sessionListMap,
        sessionList: _sessionList(sessionListMap),
        unReadMessageCountTotal: _unReadMessageCountTotal(sessionListMap),
      };
    case actionType.SESSION_ADD:
      sessionList.push(action.session);
      return {
        ...state,
        sessionList,
      };
    default:
      return state;
  }
};

export default session;
