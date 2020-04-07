import actionType from "../actions/actionType"

let initFriendState = {
  friends: {
    d: [
      {
        id: 5,
        userId: 5,
        name: "小芳",
        avatar:
          "https://c-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.jpeg",
        status: "online",
        latestTime: "2020-01-02",
        latestMessage: "啥时候还钱",
      },
    ],
  },
}

const friend = (state = initFriendState, action) => {
  let { friends } = state
  switch (action.type) {
    case actionType.USER_LOGOUT:
      return {
        ...state,
        friends: {},
      }
    case actionType.RESTORE_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      }
    default:
      return state
  }
}

export default friend
