import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Platform, AppState} from 'react-native';

import AppWithNavigationState from './redux/navigator/AppNavigators';
import store from './redux/store';

import {closeSocket, connectSocket} from './redux/actions/chat';
import {saveSessions} from './redux/actions/session';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
    this._handleAppStateChange = this._handleAppStateChange();
  }

  componentDidMount() {
    // AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    // AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    let {appState} = this.state;
    console.log('appState', appState);
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // 打开连接
      console.log('打开连接');
      store.dispatch(connectSocket());
    } else {
      if (Platform.OS === 'ios' && appState === 'inactive') {
        store.dispatch(closeSocket());
        store.dispatch(saveSessions());
      }
      if (Platform.OS === 'android' && appState === 'background') {
        store.dispatch(closeSocket());
        store.dispatch(saveSessions());
      }
    }
    this.setState({appState: nextAppState});
  };

  render() {
    /**
     * 将store传递给App框架
     */
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
