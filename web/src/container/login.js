import { connect } from "react-redux"
import Login from "../components/login"
import { userLogin } from "../action/user"

function mapStateToProps(state) {
  return {
    logined: state.user.logined,
    socketId: state.user.socketId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: function (nickname, phone, socketId) {
      dispatch(userLogin(nickname, phone, socketId))
    },
  }
}

var LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer
