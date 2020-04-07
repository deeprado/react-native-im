/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 个人资料页
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';

import {ListItem, Button, Color, FontSize} from '../../../UiLibrary';
import {userLogout} from '../../redux/actions/profile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 24}}>
          个人中心
        </Text>
      </View>
    );
  }

  renderRightComponent() {
    return null;
  }

  _logout = async () => {
    let {profile, logout} = this.props;
    let userId = profile.userInfo.userId || 5;
    await logout(userId);
  };

  render() {
    let {profile, navigation} = this.props;
    if (!profile.logined) {
      navigation.navigate('Login');
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
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.block}>
            <ListItem.Label
              labelText="头像"
              rightComponent={() => {
                return (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: profile.userInfo.avatar,
                    }}
                  />
                );
              }}
            />

            <ListItem.Separator />

            <ListItem.Label
              onPress={() => {
                navigation.navigate('ProfileItemEdit');
              }}
              labelText="昵称"
              rightComponent={profile.userInfo.name}
            />

            <ListItem.Separator />

            <ListItem.Label
              labelText="手机号"
              rightComponent={profile.userInfo.phone}
            />

            <ListItem.Separator />

            <ListItem.Label
              labelText="socketId"
              rightComponent={profile.userInfo.socketId}
            />

            <ListItem.Separator />

            <ListItem.Label
              labelText="用户ID"
              rightComponent={profile.userInfo.userId}
            />
          </View>

          <ListItem.Header />

          <Button
            onPress={this._logout}
            isWithOutLine={false}
            style={styles.logoutButton}
            textStyle={styles.logoutTextStyle}>
            退出登录
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Color.BackgroundGrey,
    paddingTop: 20,
  },
  avatar: {
    borderWidth: 1,
    borderColor: Color.Grey,
    borderRadius: 6,
    height: 60,
    width: 60,
  },
  logoutButton: {
    borderColor: Color.LittleGrey,
    backgroundColor: Color.White,
    borderWidth: 1,
    paddingVertical: 5,
  },
  logoutTextStyle: {
    color: Color.Black,
    fontSize: FontSize.Main,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (userId) => dispatch(userLogout(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
