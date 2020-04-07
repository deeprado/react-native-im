import { connect } from "react-redux"
import { hashHistory } from "react-router"

import Chat from "../components/chat"

var mapStateToProps = (state) => {
  return {
    logined: state.user.logined,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {}
}

var ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)
export default ChatContainer
