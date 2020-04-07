import {Vibration} from 'react-native';
import * as actionType from '../actions/actionType';

import {connected, receiveMessage} from '../actions/chat';
import {updateSocketInfo} from '../actions/profile';

function createSocketMiddleware(socket) {
  let eventFlag = false;

  return (store) => (next) => (action) => {
    let {profile} = store.getState();
    // 如果中间件第一次被调用，
    // 则首先绑定一些socket订阅事件
    if (!eventFlag) {
      eventFlag = true;

      ///// 绑定Socket接收事件
      // 链接
      socket.on('connect', () => {
        let socketId = socket.id;
        console.log('socketId', socketId);

        // 绑定新连接
        store.dispatch(connected(socketId));
        // 判断是否重新连接
        // if (profile.logined) {
        //   if (profile.userInfo.socketId !== socketId) {
        //     store.dispatch(updateSocketInfo(profile.userInfo.userId, socketId));
        //   }
        // }
      });
      socket.on('disconnect', () => {
        console.log('disconnect');
        // 登录情况下，手动重连
        socket.open();
      });
      // 消息，远程消息入口，可能会有队列堆积，所以此处是个 Array
      socket.on('message', (payloads) => {
        console.log('接收消息', payloads);
        if (profile.userInfo.vibration) {
          Vibration.vibrate();
        }
        store.dispatch(receiveMessage(payloads));
      });
      socket.on('open', () => {
        console.log('open');
      });
      socket.on('close', () => {
        console.log('close');
      });

      // socket.on('guest update', function (data) {
      //   next(guest_update(data));
      // });
      // socket.on('msg from server', function (data) {
      //   next(message_update(data));
      // });
      // socket.on('self logout', function () {
      //   window.location.reload();
      // });
      // 心跳
      setInterval(function () {
        socket.emit('heart beat');
      }, 10000);
    }
    // 捕获action，如果是和发送相关的事件，
    // 则调用socket对应的发布函数
    switch (action.type) {
      case actionType.USER_ONLINE:
        // 用户上线
        socket.emit('user:online', {
          userId: profile.userInfo.userId,
        });
      case actionType.SOCKET_CONNECT:
        socket && socket.disconnected && socket.connect();
      case actionType.SOCKET_CLOSE:
        socket && socket.connected && socket.colse();
        break;
      case actionType.SOCKET_OPEN:
        socket && socket.disconnected && socket.open();
      case actionType.SOCKET_SEND_MESSAGE:
        console.log('发送消息');
        socket && socket.emit('message', [action.payload]);
        break;
    }
    // if (action.type === type.SOCKET_CLOSE) {
    //   socket.emit('msg from client', action.msg);
    // } else if (action.type === 'NICKNAME_GET') {
    //   socket.emit('guest come', action.nickName);
    // } else if (action.type === 'NICKNAME_FORGET') {
    //   socket.emit('guest leave', store.getState().nickName);
    // }
    return next(action);
  };
}

export default createSocketMiddleware;
