import React from "react"
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"

import { sendMessage, keepLocalMessage } from "../../action/message"

require("./index.less")

// 中国时区
moment.locale("zh-cn")

class TypeIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msgContent: "",
    }
    this.messageSend = this.messageSend.bind(this)
    this.messageType = this.messageType.bind(this)
    this.handleDown = this.handleDown.bind(this)
    this.handleUp = this.handleUp.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.sendMess = this.sendMess.bind(this)
  }

  sendMess(msgContent) {
    let { userInfo, toInfo, doSendMessage, keepLocalMessage } = this.props
    // 封装数据
    let payload = {
      from: userInfo.userId,
      to: toInfo.userId,
      uuid: uuidv4(),
      msg: {
        type: "txt",
        content: msgContent,
      },
      ext: {
        avatar: userInfo.avatar,
        name: userInfo.name,
        timestamp: moment().startOf("minute").fromNow(),
      },
    }
    console.log("payload", payload)
    doSendMessage(payload)
    keepLocalMessage(payload)
    console.log("send message done")
  }

  messageType(e) {
    this.setState({
      msgContent: e.target.value,
    })
  }

  messageSend(e) {
    let value = this.refs.myInput.value
    //只有不为空字符串的时候才执行
    if (value && value != 0) {
      let regLeft = /</g
      let regRight = />/g
      value = value.replace(regLeft, "&lt;")
      value = value.replace(regRight, "&gt;")
      value = value.replace(/\n/g, "<br/>")

      this.sendMess(value)
    }
    this.setState({
      msgContent: "",
    })
  }

  handleDown(e) {
    if (e.keyCode == 13) {
      if (!e.ctrlKey) {
        e.preventDefault()
        this.refs.myButton.click()
      } else {
        this.setState((prevState) => {
          return {
            msgContent: prevState.msgContent + "\n",
          }
        })
      }
    }
  }

  handleUp(e) {
    if (e.keyCode == 13 && !e.ctrlKey) {
      e.preventDefault()
    }
    let scrollTop =
      this.refs.myInput.scrollHeight - this.refs.myInput.offsetHeight
    this.refs.myInput.scrollTop = scrollTop
  }

  handlePress(e) {
    if (e.keyCode == 13 && !e.ctrlKey) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div className="type-in">
        <textarea
          ref="myInput"
          onKeyUp={this.handleUp}
          onChange={this.messageType}
          onKeyDown={this.handleDown}
          value={this.state.msgContent}
          onKeyPress={this.handlePress}
        ></textarea>
        <button onClick={this.messageSend} ref="myButton">
          提交
        </button>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    toInfo: state.user.toInfo,
    logined: state.user.logined,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    // 发送消息
    doSendMessage: function (payload) {
      console.log("payloadpayloadpayload")
      dispatch(sendMessage(payload))
    },
    // 本地保存消息
    keepLocalMessage: function (payload) {
      console.log("keepLocalMessage")
      dispatch(keepLocalMessage(payload))
    },
  }
}

let TypeInContainer = connect(mapStateToProps, mapDispatchToProps)(TypeIn)
export default TypeInContainer
