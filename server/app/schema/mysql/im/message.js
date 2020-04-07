'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.02.10 10:22:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 消息表
 */

const cloverx = require('cloverx');
const S = cloverx.S;

module.exports = {
    fields: {
        messageId: {
            primaryKey: true,
            type: S.INTEGER(11).UNSIGNED,
            // 如果为空，则默认值是将键名从 camelCase 转换为 underscore
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            comment: '消息 ID'
        },
        from: {
            type: S.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '发送者'
        },
        to: {
            type: S.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '接收者'
        },
        toType: {
            type: S.STRING(10),
            defaultValue: 'peer',
            allowNull: true,
            comment: '目标类型，目前仅支持个人(单聊)'
        },
        msgType: {
            type: S.STRING(10),
            defaultValue: 'txt',
            allowNull: false,
            comment: '消息类型'
        },
        msgContent: {
            type: S.STRING(255),
            allowNull: false,
            comment: '消息内容'
        },
        extra: {
            type: S.TEXT,
            allowNull: true,
            comment: '其他信息，比如发送者数据'
        }
    },
    comment: '消息表'
};
