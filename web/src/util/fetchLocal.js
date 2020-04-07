/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 网络层封装
 */

async function fetchLocal(url, params) {
  console.log('url', url)
  try {
    let result = await fetch(url, params);
    let resultJson = await result.json();

    if (!resultJson.success) {
      Alert.alert('ImServer Error', resultJson.data.message);
    }
    return resultJson;
  } catch (e) {
    // Alert.alert('Fetch Error', e);
    throw new Error(e);
  }
}
export default fetchLocal;
