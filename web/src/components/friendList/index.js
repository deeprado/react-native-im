import React from "react"
import { connect } from "react-redux"

import { swithToInfo } from "../../action/user"
import { initFriends } from "../../action/friend"

require("./index.less")

class FriendList extends React.Component {
  constructor(props) {
    super(props)
    this.renderFriend = this.renderFriend.bind(this)
    this.renderFriends = this.renderFriends.bind(this)
  }

  async componentDidMount() {
    await this.getFriends()
  }

  getFriends = async () => {
    let { logined, initFriends } = this.props
    logined && (await initFriends())
  }

  renderFriend = (friend, index) => {
    let { toInfo, userInfo, swithToInfo } = this.props
    console.log("friend.userId == toInfo.userId", friend.userId, toInfo.userId)
    if (friend.userId == userInfo.userId) {
      return null;
    }
    if (friend.userId == toInfo.userId) {
      return (
        <li
          key={index}
          style={{
            color: "#fff",
            backgroundColor: "green",
          }}
        >
          <img
            src={friend.avatar}
            style={{
              width: "20px",
              height: "20px",
            }}
          />
          {friend.name}
        </li>
      )
    } else {
      return (
        <li
          key={index}
          onClick={() => {
            console.log("friend", friend)
            swithToInfo(friend)
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <img
            src={friend.avatar}
            style={{
              width: "20px",
              height: "20px",
            }}
          />
          {friend.name}
        </li>
      )
    }
  }

  filterFriends = () => {
    let { friends } = this.props
    let elements = Object.keys(friends)
      .map((firstLetter) => {
        let letterFriends = friends[firstLetter]
        return letterFriends
      })
      .reduce((prev, cur, index, arr) => {
        return prev.concat(cur)
      })
    return elements
  }

  renderFriends = () => {
    let that = this
    let friends = this.filterFriends()
    return friends.map((friend, index) => {
      return that.renderFriend(friend, index)
    })
  }

  render() {
    return (
      <ul className="name-list">
        <li className="name-list-title">在线用户:</li>
        {this.renderFriends()}
      </ul>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    logined: state.user.logined,
    userInfo: state.user.userInfo,
    toInfo: state.user.userInfo,
    friends: state.friend.friends,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    // 切换聊天对象
    swithToInfo: function (toInfo) {
      dispatch(swithToInfo(toInfo))
    },
    initFriends: function () {
      dispatch(initFriends())
    },
  }
}

let FriendListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList)
export default FriendListContainer
