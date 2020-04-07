/**
 * 欢迎页
 * @flow
 * **/

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  InteractionManager,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';

import {restoreProfile} from '../redux/actions/profile';
import {
  connectSocket,
  restoreSessions,
  restoreMessages,
} from '../redux/actions/chat';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.restoreData = this.restoreData.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;

    // this.timer = setTimeout(() => {
    //   InteractionManager.runAfterInteractions(() => {
    //     navigation.navigate('AppPage', {
    //       theme: this.theme,
    //     });
    //   });
    // }, 1000);
    this.restoreData();
  }

  componentWillUnmount() {
    // this.timer && clearTimeout(this.timer);
  }

  restoreData = async () => {
    // 用户信息
    // this.props.restoreProfile();
  };

  render() {
    let {logined, navigation} = this.props;
    if (!logined) {
      navigation.navigate('Login');
      return null;
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image
          style={{flex: 1}}
          resizeMode="center"
          source={require('../assets/images/LaunchScreen.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => ({
  logined: state.profile.logined,
});

const mapDispatchToProps = (dispatch) => ({
  connectSocket: () => dispatch(connectSocket()),
  restoreProfile: () => dispatch(restoreProfile()),
  restoreMessages: () => dispatch(restoreMessages()),
  restoreSessions: () => dispatch(restoreSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
