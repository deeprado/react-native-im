"use strict"
/**
 * <plusmancn@gmail.com> created at 2017.02.10 11:31:39
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 用户信息维护-控制器
 */

const cloverx = require("cloverx")
const modelSession = cloverx.model.get("session")

let router = new cloverx.Router()
let V = cloverx.validator

/**
 * jsdoc
 * 保存会话
 * @tags user
 * @httpMethod post
 * @path /
 * @param {string#formData} userId - 系统分配的用户 id
 * @param {string#formData} name - 用户名，长度小于 20
 * @param {string#formData} avatar - 用户头像
 * @param {string#formData} unReadMessageCount - 未读数量
 * @param {string#formData} latestTime - 最后一次聊天时间
 * @param {string#formData} latestMessage - 最后一次聊天内容
 * @param {string#formData} toInfoName - 聊天对象名称
 * @param {string#formData} toInfoUserId - 聊天对象ID
 * @param {string#formData} toInfoAvatar - 聊天对象头像
 * @response @SessionInfo
 */
router.push({
  method: "post",
  path: "/",
  body: {
    userId: V.number().max(10).required(),
    name: V.string().max(20).required(),
    avatar: V.string().required(),
    unReadMessageCount: V.number().required(),
    latestTime: V.number().max(12).required(),
    latestMessage: V.string().required(),
    toInfoName: V.string().required(),
    toInfoAvatar: V.string().required(),
    toInfoUserId: V.number().required()
  },
  processors: [
    async (ctx, next) => {
      let body = ctx.filter.body
      let session = {
        userId: body.userId,
        name: body.name,
        avatar: body.avatar,
        unReadMessageCount: body.unReadMessageCount,
        latestTime:body.latestTime,
        latestMessage: body.latestMessage,
        toInfo: {
          userId : body.toInfoUserId,
          avatar : body.toInfoAvatar,
          name : body.toInfoName,
        }
      }
      let result = await modelSession.saveSession(session)

      ctx.body = cloverx.checker.module("@SessionInfo").checkAndFormat(result)
      return next()
    },
  ],
})

/**jsdoc
 * 在线用户列表
 * @tags user
 * @httpMethod get
 * @path /list/:userId
 * @response [@SessionInfo]
 */
router.push({
  method: "get",
  path: "/list/:userId",
  params: {
    userId: V.number().required(),
  },
  processors: [
    async (ctx, next) => {
      let result = await modelSession.list(ctx.filter.params.userId)
      console.log("session result", result)
      ctx.body = cloverx.checker.module("[@SessionInfo]").checkAndFormat(result)

      return next()
    },
  ],
})

/**jsdoc
 * 删除会话
 * @tags session
 * @httpMethod delete
 * @path /:userId/:sessionId
 * @param {integer#path} userId - 用户ID
 * @param {integer#path} sessionId - 会话ID
 * @response @UserInfo
 */
router.push({
  method: "delete",
  path: "/:userId/:sessionId",
  params: {
    userId: V.number().required(),
    sessionId: V.number().required(),
  },
  processors: [
    async (ctx, next) => {
      let result = await modelSession.deleteSession(
        ctx.filter.params.userId,
        ctx.filter.params.sessionId
      )

      ctx.body = cloverx.checker.module("@UserInfo").checkAndFormat(result)

      return next()
    },
  ],
})

module.exports = router
