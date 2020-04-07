import React from "react"
import { connect } from "react-redux"
import { userLogout } from "../../action/user"

require("./index.less")

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.prop.handleLogout()
  }

  render() {
    let { userInfo } = this.props
    return (
      <div className="nav">
        <span>Welcome, {userInfo.name}!</span>
        <button onClick={this.logout}>退出</button>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    logined: state.user.logined,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    // 退出登录
    handleLogout: function () {
      dispatch(userLogout())
    },
  }
}

let NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav)
export default NavContainer
