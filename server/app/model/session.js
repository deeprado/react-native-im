"use strict"
/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * 消息管理，基于 redis
 */
const uuid = require("uuid")

const cloverx = require("cloverx")
const schemaSession = cloverx.mysql.get("im/session")

/**
 * 拉取会话列表
 */
async function list(userId) {
  let where = {}
  if (userId) {
    where.userId = userId
  }

  let result = await schemaSession.findAll({
    attributes: [
      "sessionId",
      "userId",
      "avatar",
      "name",
      "unReadMessageCount",
      "latestTime",
      "latestMessage",
      "toInfo",
    ],
    where,
    order: [
      ["updatedAt", "desc"],
    ],
    raw: true,
  })
 
  return result
}

/**
 * 保存会话
 * @param {*} session 
 */
async function saveSession(session) {
  let toInfo = JSON.stringify(session.toInfo)
  let data = {
    name: session.from,
    avatar: payload.avatar,
    latestTime: session.latestTime,
    latestMessage: session.latestMessage,
    toInfo: toInfo,
  }
  let result = await schemaSession.build(data).save();
  return result;
}

/**
 * 批量保存会话
 * @param {*} sessions 
 */
async function batchSaveSessions(sessions = []) {
  if (sessions.length <= 0) {
    return
  }

  let tasks = []
  // 保存数据库
  sessions.forEach((session) => {
    let toInfo = JSON.stringify(session.toInfo)
    let data = {
      name: session.from,
      avatar: payload.avatar,
      latestTime: session.latestTime,
      latestMessage: session.latestMessage,
      toInfo: toInfo,
    }
    tasks.push(
      new Promise((resolve, reject) => {
        schemaSession.build(data).save()
      })
    )
  })
  let result = await Promise.all(tasks)
  console.log(result)
}

module.exports = {
  list,
  saveSession,
  batchSaveSessions,
}
