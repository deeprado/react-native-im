import actionType from "./actionType"

import config from "../config"
import fetchLocal from "../util/fetchLocal"

export function connectSocket() {
  return {
    type: actionType.SOCKET_CONNECT,
  }
}

export function socketConnected(socketId) {
  return {
    type: actionType.SOCKET_CONNECTED,
    socketId,
  }
}

let doLogin = async (name, phone, socketId) => {
  let data = JSON.stringify({
    name,
    phone,
    socketId,
  })
  console.log("data", data)
  let result = await fetchLocal(config.server + "/v1/user", {
    method: "POST",
    body: data,
  })
  console.log("doLogin", result)
  let userInfo = {}
  if (result && result.success) {
    userInfo = result.data
  }
  return userInfo
}

export async function userLogin(nickname, phone, socketId) {
  let userInfo = await doLogin(nickname, phone, socketId)
  let logined = !!userInfo
  return {
    type: actionType.USER_LOGIN,
    userInfo,
    logined,
  }
}

let doLogout = async function (userId) {
  return true
}

export async function userLogout(userId) {
  let logoutSuccess = await doLogout(userId)
  return {
    type: actionType.USER_LOGOUT,
  }
}

export function swithToInfo(toInfo) {
  console.log("action swithToInfo", toInfo)
  return {
    type: actionType.USER_SWITCH_TOINFO,
    toInfo,
  }
}
