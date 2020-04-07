/**
 * 行动类型
 * @type {string}
 */

// 修改主题颜色
export const THEME_CHANAGE = 'change';

export const SOCKET_CONNECT = 'socket_connect';
export const SOCKET_CONNECTED = 'socket_connected';
export const SOCKET_CLOSE = 'socket_close';
export const SOCKET_OPEN = 'socket_open';
export const SOCKET_MESSAGE = 'socket_message';
export const SOCKET_RECEIVE_MESSAGE = 'socket_receive_message';
export const SOCKET_CLEAR = 'socket_clear';
export const SOCKET_DELETE = 'socket_delete';

export const SOCKET_RESTORE = 'socket_restore';
export const SOCKET_RESTORE_SESSIONS = 'socket_restore_sessions';
export const SOCKET_RESTORE_MESSAGES = 'socket_restore_messages';
export const SOCKET_CLEAR_UNREAD = 'socket_clear_unread';
export const SOCKET_CLEAR_CACHE = 'socket_clear_cache';
export const SOCKET_DELETE_SESSION = 'socket_delete_session';
export const SOCKET_SAVE_DATA = 'socket_save_data';
export const SOCKET_SAVE_MESSAGES = 'socket_save_messages';
export const SOCKET_SAVE_SESSIONS = 'socket_save_sessions';

export const SOCKET_UPDATE_TO_INFO = 'socket_update_to_info';
export const SOCKET_SEND_MESSAGE = 'socket_send_message';
export const SOCKET_SAVE_LOCAL = 'socket_save_local';

export const FILL_CHAT_ROOM = 'fill_chat_room';

export const USER_LOGIN = 'user_login';
export const USER_LOGIN_SUCCESS = 'user_login_success';
export const USER_LOGIN_FAIL = 'user_login_fail';

export const USER_LOGOUT = 'user_logout';
export const USER_MODIFY = 'user_modify';
export const USER_RESTORE = 'user_restore';

export const USER_FRIEND_LIST = 'user_friend_list';

export const USER_ONLINE = 'user_online';

export const RESTORE_FRIENDS = 'restore_friends';

export const RESTORE_SESSIONS = 'restore_sessions';

export const SESSION_ADD = 'session_add';



export default {
  THEME_CHANAGE,
  SOCKET_CONNECT,
  SOCKET_CONNECTED,
  SOCKET_CLOSE,
  SOCKET_OPEN,
  SOCKET_MESSAGE,
  SOCKET_RECEIVE_MESSAGE,
  SOCKET_CLEAR,
  SOCKET_DELETE,
  SOCKET_RESTORE,
  SOCKET_RESTORE_SESSIONS,
  SOCKET_RESTORE_MESSAGES,
  SOCKET_CLEAR_UNREAD,
  SOCKET_CLEAR_CACHE,
  SOCKET_DELETE_SESSION,
  SOCKET_SAVE_DATA,
  SOCKET_SAVE_MESSAGES,
  SOCKET_SAVE_SESSIONS,
  SOCKET_UPDATE_TO_INFO,
  SOCKET_SEND_MESSAGE,
  SOCKET_SAVE_LOCAL,
  FILL_CHAT_ROOM,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_MODIFY,
  USER_RESTORE,
  USER_FRIEND_LIST,
  USER_ONLINE,
  RESTORE_FRIENDS,
  RESTORE_SESSIONS,
  SESSION_ADD,
};
