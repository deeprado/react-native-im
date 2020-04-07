import config from '../../config';
import fetchLocal from '../../util/fetchLocal';

import actionType from '../actions/actionType';

let getFriends = async (userId) => {
  let result = await fetchLocal(config.server + '/v1/user/online/list', {
    method: 'GET',
  });
  let friends = [];
  if (result && result.success) {
    friends = result.data;
  }
  return friends;
};

export async function initFriends(userId) {
  let friends = await getFriends(userId);
  return (dispatch) => {
    dispatch(onInitFriends(friends));
  };
}

function onInitFriends(friends) {
  return {
    type: actionType.RESTORE_FRIENDS,
    friends,
  };
}

export default {
  initFriends,
};
