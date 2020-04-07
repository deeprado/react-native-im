import config from "../config"
import fetchLocal from "../util/fetchLocal"

import actionType from "./actionType"

let getFriends = async () => {
  let result = await fetchLocal(config.server + "/v1/user/online/list", {
    method: "GET",
  })
  console.log("friends", result)
  let friends = []
  if (result && result.success) {
    friends = result.data
  }
  return friends
}

export async function initFriends() {
  let friends = await getFriends()
  return {
    type: actionType.RESTORE_FRIENDS,
    friends,
  }
}

export default {
  initFriends,
}
