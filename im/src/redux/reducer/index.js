import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 主题
import theme from './theme';
// 聊天
import chat from './chat';
// 个人信息
import profile from './profile';
// 好友
import friend from './friend';
// 会话
import session from './session';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
  chat: chat,
  profile: profile,
  friend: friend,
  session: session,
});
