'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.02.10 10:22:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 会话表
 */

const cloverx = require('cloverx');
const S = cloverx.S;

module.exports = {
    fields: {
        sessionId: {
            primaryKey: true,
            type: S.INTEGER(11).UNSIGNED,
            // 如果为空，则默认值是将键名从 camelCase 转换为 underscore
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            comment: '会话 ID'
        },
        userId: {
            type: S.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '用户ID'
        },
        name: {
            type: S.STRING(100),
            allowNull: false,
            comment: '名称'
        },
        avatar: {
            type: S.STRING(200),
            allowNull: false,
            comment: '头像'
        },
        unReadMessageCount: {
            type: S.INTEGER(11).UNSIGNED,
            defaultValue: 0,
            allowNull: true,
            comment: '最后聊天时间'
        },
        latestTime: {
            type: S.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '最后聊天时间'
        },
        latestMessage: {
            type: S.STRING(100),
            allowNull: false,
            comment: '最后聊天内容'
        },
        toInfo: {
            type: S.TEXT,
            allowNull: true,
            comment: '其他信息，比如聊天对象数据'
        }
    },
    comment: '会话表'
};
