/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 用户登录框
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';

import {FontSize, Button, Color, TextInput} from '../../UiLibrary';

import {userLogin} from '../redux/actions/profile';
import {connectSocket} from '../redux/actions/chat';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      disabled: true,
    };
  }

  componentDidMount() {
    this.checkConnect();
  }

  checkConnect() {
    let {socketId, connectSocket} = this.props;
    if (!socketId) {
      connectSocket();
    }
  }

  renderLeftComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 24}}>
          登录
        </Text>
      </View>
    );
  }

  renderRightComponent() {
    return null;
  }

  _login = async () => {
    let {name, phone} = this.state;
    let {socketId, userLogin} = this.props;
    try {
      await userLogin(name, phone, socketId);
      // toast
    } catch (e) {
      // toast
    }
  };

  _onChangeText = () => {
    let {name, phone} = this.state;
    let isCanLogin = true && name.length > 0 && phone.length === 11;
    this.setState({
      disabled: !isCanLogin,
    });
  };

  render() {
    let {name, phone, disabled} = this.state;
    let {profile, navigation} = this.props;
    if (profile.logined) {
      navigation.navigate('TabNavigator');
      return null;
    }
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <View
          style={{
            paddingTop: 70,
            paddingHorizontal: 20,
          }}>
          <TextInput.Label
            labelText="昵称"
            labelStyle={styles.labelStyle}
            autoCapitalize="none"
            placeholder="请填写昵称"
            onChangeText={(name) => {
              this.setState({name}, () => {
                this._onChangeText();
              });
            }}
            value={name}
            returnKeyType="done"
          />

          <TextInput.Label
            labelText="手机号"
            labelStyle={styles.labelStyle}
            autoCapitalize="none"
            placeholder="请填写11位手机号"
            onChangeText={(phone) => {
              this.setState({phone}, () => {
                this._onChangeText();
              });
            }}
            value={phone}
            returnKeyType="done"
          />

          <Button
            style={styles.loginButton}
            textStyle={styles.loginText}
            // disabled={disabled}
            onPress={this._login}>
            登录
          </Button>
          {/* <Button
          style={styles.loginButton}
          textStyle={styles.loginText}
          // disabled={disabled}
          onPress={() => {
            navigation.navigate('TabNavigator');
          }}>
          返回
        </Button> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loginButton: {
    marginVertical: 20,
    borderColor: Color.WechatGreen,
    backgroundColor: Color.WechatGreen,
  },
  loginText: {
    color: Color.White,
    fontSize: FontSize.Primary,
    paddingVertical: 10,
  },
  labelStyle: {
    textAlign: 'left',
    paddingHorizontal: 0,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
  socketId: state.chat.socketId,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, phone, socketId) =>
    dispatch(userLogin(name, phone, socketId)),
  connectSocket: () => dispatch(connectSocket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
