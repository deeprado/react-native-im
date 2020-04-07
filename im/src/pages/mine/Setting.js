/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 用户设置页面
 */

import React from 'react';
import {ScrollView, StyleSheet, Text, View, Switch} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';

import {ListItem} from '../../../UiLibrary';

import {modifyProfile} from '../../redux/actions/profile';

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
          设置
        </Text>
      </View>
    );
  }

  renderRightComponent() {
    return null;
  }

  _renderSwitch = () => {
    let {profile, modifyUserInfo} = this.props;
    let colorTrueSwitchIsOn = profile.userInfo.vibration || true;
    let userId = profile.userInfo.userId || 5;
    return (
      <Switch
        onValueChange={(value) => {
          modifyUserInfo(userId, 'vibration', value ? 1 : 0);
        }}
        value={colorTrueSwitchIsOn}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView>
          <ListItem.Header title="消息提醒设置" />
          <ListItem.Label
            labelText="新消息震动"
            rightComponent={this._renderSwitch}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  modifyUserInfo: async (userId, field, value) =>
    dispatch(modifyProfile(userId, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
