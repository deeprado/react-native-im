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
const modelUser = cloverx.model.get("user")
const schemaMessage = cloverx.mysql.get("im/message")

const redis = cloverx.connection.get("redis").get("main")

/**
 * 私聊消息
 * 判断将用户消息存入队列还是直接发送
 */
async function sendPeerMessage(socket, payloads) {
  let user = await modelUser.getByUserId(payloads[0].to)
  console.log("user", user)
  // 补充消息内容
  payloads = payloads.map((payload) => {
    payload.uuid = payload.uuid || uuid.v4()
    payload.ext.timestamp = +new Date()
    return payload
  })

  // 保存到数据库
  batchSavePayloads(payloads)

  if (user.status === "online" && user.socketId) {
    // 用户在线，即时发送
    socket.to(user.socketId).emit("message", payloads)
    // socket.emit("message", payloads)
    // socket.broadcast.emit("message", payloads)

  } else {
    // 不在线，通过队列存储
    let serialPayloads = payloads.map((payload) => {
      return JSON.stringify(payload)
    })
    redis.rpush(`offline:queue:userId:${user.userId}`, ...serialPayloads)
  }
}

/**
 * 私聊消息
 * 将用户离线消息推送给用户，离线消息封顶 1000 条
 */
async function sendOfflineMessage(socket, userId) {
  let redisKey = `offline:queue:userId:${userId}`
  let queue = await redis.lrange(redisKey, 0, -1)
  if (!queue.length) {
    return
  }

  let payloads = queue.map((item) => {
    return JSON.parse(item)
  })

  // 数据拆分
  let payloadsDict = new Map()
  for (let i = 0; i < payloads.length; i++) {
    let payload = payloads[i]
    let { from } = payload

    if (payloadsDict.get(from)) {
      payloadsDict.get(from).push(payload)
    } else {
      payloadsDict.set(from, [payload])
    }
  }

  for (let value of payloadsDict.values()) {
    socket.emit("message", value)
  }

  // 收到 Ack 后，清空离线队列
  await redis.del(redisKey)
}

async function batchSavePayloads(payloads = []) {
  if (payloads.length <= 0) {
    return
  }

  let tasks = []
  // 保存数据库
  payloads.forEach((payload) => {
    let extra = JSON.stringify(payload.ext)
    let data = {
      from: payload.from,
      to: payload.to,
      toType: "peer",
      msgType: payload.msg.type,
      msgContent: payload.msg.content,
      extra: extra,
    }
    tasks.push(
      new Promise((resolve, reject) => {
        schemaMessage.build(data).save()
      })
    )
  })
  let result = await Promise.all(tasks)
  console.log(result)
}

module.exports = {
  sendPeerMessage,
  sendOfflineMessage,
}
