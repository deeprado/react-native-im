import actionType from "../action/actionType"
import moment from "moment"

let initMsgState = {
  messages: [
    {
      from: 6,
      to: 5,
      uuid: "asdfsd",
      msg: {
        type: "txt",
        content: "文本内容",
      },
      ext: {
        avatar:
          "https://c-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.jpeg",
        name: "小明",
        timestamp: moment().startOf("minute").fromNow(),
      },
    },
  ],
}
const message = (state = initMsgState, action) => {
  let { messages } = state
  switch (action.type) {
    case actionType.USER_LOGOUT:
      return {
        ...state,
        messages: [],
      }
    case actionType.KEEP_LOCAL_MESSAGE:
      messages.push(action.payload);
      console.log('axxxxxxxxxxxasdfsadf')
      return {
        ...state,
        messages,
      }
    case actionType.RECEIVE_MESSAGE:
      return {
        ...state,
        messages: messages.concat(action.payloads),
      }
    default:
      return state
  }
}

export default message
