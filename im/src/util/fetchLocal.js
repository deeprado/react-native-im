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

import {Alert} from 'react-native';

async function fetchLocal(url, params) {
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
