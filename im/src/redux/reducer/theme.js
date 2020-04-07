import actionType from '../actions/actionType';

const initialThemeState = {
  themeColor: 'green',
};

const theme = (state = initialThemeState, action) => {
  switch (action.type) {
    case actionType.THEME_CHANAGE:
      return {
        ...state,
        themeColor: action.themeColor,
      };
    default:
      return state;
  }
};

export default theme;
