import actionType from "./actionType"
import _ from 'lodash';

// import config from '../config';
// import fetchLocal from '../util/fetchLocal';

export function sendMessage(payload) {
  return {
    type: actionType.SEND_MESSAGE,
    payload,
  };
}

export function keepLocalMessage(payload) {
  return {
    type: actionType.KEEP_LOCAL_MESSAGE,
    payload,
  };
}




let _getPayloadKey = (payload) => {
  if (payload.localeExt) {
    return `${payload.from}-${payload.to}`;
  } else {
    return `${payload.to}-${payload.from}`;
  }
};

export function receiveMessage(payloads) {
  // 需要支持 payload 数组
  payloads = payloads.map((payload) => {
    return _.omit(payload, ['localeExt']);
  });

  return {
    type: actionType.RECEIVE_MESSAGE,
    payloads
  };
}
