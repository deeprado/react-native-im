import React from "react"
import { connect } from "react-redux"

require("./index.less")

class MsgShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title ? props.title : "群聊",
    }
  }

  // componentDidUpdate() {
  //   let t = this.refs.myDiv
  //   let scrollTop = t.scrollHeight - t.offsetHeight
  //   t.scrollTop = scrollTop
  // }

  render() {
    let { messages, userInfo, toInfo } = this.props
    return (
      <div ref="myDiv" className="msg-show">
        <h5>{toInfo.name}</h5>
        <ul>
          {messages.map((item, index) => {
            let extra =
              typeof item.ext == "string" ? JSON.parse(item.ext) : item.ext
            if (item.from === userInfo.userId) {
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.msg.content,
                    }}
                  />
                  <div>
                    <img
                      src={extra.avatar}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <span>{extra.name}</span>
                  </div>
                </li>
              )
            } else {
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={extra.avatar}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <span>{extra.name}</span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.msg.content,
                    }}
                  />
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    toInfo: state.user.toInfo,
    messages: state.message.messages,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {}
}

let MsgShowContainer = connect(mapStateToProps, mapDispatchToProps)(MsgShow)
export default MsgShowContainer
