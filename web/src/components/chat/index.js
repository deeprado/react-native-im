import React from "react"
import { hashHistory } from "react-router"

import TypeIn from "../typein/index"
import MsgShow from "../msgshow/index"
import FriendList from "../friendList/index"
import Nav from "../nav/index"


require("./index.less")

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.checkLogin()
  }

  checkLogin() {
    let { logined } = this.props
    if (!logined) {
      hashHistory.push("/login")
    }
  }

  render() {
    return (
      <div className="chat-wrap">
        <Nav />
        <div className="message-wrap">
          {/* 朋友列表 */}
          <FriendList />
          {/* 输入区 */}
          <div className="typein-wrap">
            <MsgShow />
            <TypeIn />
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
