import React from "react"
import { hashHistory } from 'react-router'

require("./index.less")

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: "demo",
      phone: "13684511513",
    }
    this.login = this.login.bind(this)
    this.nicknameChange = this.nicknameChange.bind(this)
    this.phoneChange = this.phoneChange.bind(this)
  }

  componentDidMount() {
    this.checkLogin()
  }

  checkLogin() {
    let { logined } = this.props
    if (logined) {
      hashHistory.push("/")
    }
  }

  login() {
    let { userLogin, socketId } = this.props
    let { nickname, phone } = this.state
    console.log("nickname, phone, socketId", nickname, phone, socketId, "bbb")
    userLogin(nickname, phone, socketId)
  }

  nicknameChange = (event) => {
    this.setState({ nickname: event.target.value })
  }

  phoneChange = (event) => {
    this.setState({ phone: event.target.value })
  }

  render() {
    let { logined } = this.props
    if (logined) {
      hashHistory.push("/")
    }
    let { nickname, phone } = this.state
    return (
      <div className="nick-name">
        <h2>起一个昵称吧！</h2>
        <div>
          <label>
            昵称：
            <input
              name="nickname"
              value={nickname}
              onChange={this.nicknameChange}
            />
          </label>
        </div>
        <div>
          <label>
            手机号：
            <input name="phone" value={phone} onChange={this.phoneChange} />
          </label>
        </div>
        <div>
          <button onClick={this.login}>确定</button>
        </div>
      </div>
    )
  }
}

export default Login
