import actionType from './actionType';

export function onThemeChange(themeColor) {
  return (dispatch) => {
    dispatch(changeThemColor(themeColor));
  };
}

function changeThemColor(themeColor) {
  return {
    type: actionType.THEME_CHANAGE,
    themeColor: themeColor,
  };
}

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  onThemeChange,
};
