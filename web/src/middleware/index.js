import { socketConnected } from "../action/user"
import { receiveMessage } from "../action/message"
import actionType from "../action/actionType"

function createSocketMiddleware(socket) {
  let eventFlag = false
  return (store) => (next) => (action) => {
    let { user } = store.getState();
    if (!eventFlag) {
      eventFlag = true

      socket.on("connect", function () {
        let socketId = socket.id
        console.log("socketId", socketId)
        store.dispatch(socketConnected(socketId))
      })

      // 消息，远程消息入口，可能会有队列堆积，所以此处是个 Array
      socket.on("message", (payloads) => {
        console.log("接收消息", payloads)
        store.dispatch(receiveMessage(payloads))
      })

      // setInterval(function () {
      //   socket.emit("heart beat")
      // }, 10000)
    }
    switch (action.type) {
      case actionType.SOCKET_CONNECT:
        // 用户上线
        socket.connect()
        break
      case actionType.USER_ONLINE:
        // 用户上线
        socket.emit("user:online", {
          userId: user.userInfo.userId,
        })
        break
      case actionType.SEND_MESSAGE:
      case actionType.SOCKET_SEND_MESSAGE:
        console.log("发送消息", socket)
        socket && socket.emit("message", [action.payload])
        break
    }
    return next(action)
  }
}

export default createSocketMiddleware
