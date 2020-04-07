import moment from 'moment';
import actionType from '../actions/actionType';

moment.locale('zh-cn');

const initState = {
  socketId: null,
  // 当前聊天对象
  toInfo: {},
  // 当前聊天
  currentChatKey: null,
  // 当前聊天窗聊天消息
  currentChatRoomHistory: [],
  // 页码
  page: 0,
  // 每页数据
  pageSize: 12,
  // 是否有新消息
  hasNewMessage: false,
};

const chat = (state = initState, action) => {
  let {currentChatRoomHistory, currentChatKey} = state;

  switch (action.type) {
    case actionType.SOCKET_CONNECTED:
      return {
        ...state,
        socketId: action.socketId,
      };
    case actionType.SOCKET_SAVE_MESSAGES:
      return {
        ...state,
      };
    case actionType.SOCKET_SAVE_SESSIONS:
      return {
        ...state,
      };
    case actionType.FILL_CHAT_ROOM:
      return {
        ...state,
        currentChatKey: action.currentChatKey,
        currentChatRoomHistory: currentChatRoomHistory.concat(action.messages),
      };
    case actionType.SOCKET_UPDATE_TO_INFO:
      return {
        ...state,
        toInfo: action.toInfo,
      };
    case actionType.SOCKET_SAVE_LOCAL:
      // 如果是当前聊天窗，则推入聊天消息
      if (action.key === currentChatKey) {
        currentChatRoomHistory = [...currentChatRoomHistory].concat(
          action.payloads,
        );
      }
      return {
        ...state,
        currentChatRoomHistory,
      };

    case actionType.SOCKET_RECEIVE_MESSAGE:
      let {payloads, key} = action;

      // 如果是当前聊天窗，则推入聊天消息
      // if (key === currentChatKey) {
      currentChatRoomHistory = [...currentChatRoomHistory].concat(payloads);
      // }

      return {
        ...state,
        currentChatKey,
        currentChatRoomHistory,
      };
    default:
      return state;
  }
};

export default chat;
