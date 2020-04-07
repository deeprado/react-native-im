/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 单条目编辑页
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Alert} from 'react-native';
import {connect} from 'react-redux';

import {Color, FontSize, Button, TextInput} from '../../../UiLibrary';
import {modifyProfile} from '../../redux/actions/profile';

// 为了动态改变 SAVE 按钮的可点击状态
class LeftComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaveDisabled: props.isSaveDisabled,
    };
  }

  render() {
    return (
      <View style={styles.leftComponent}>
        <Button
          isWithOutLine={false}
          onPress={this.props.handleSave}
          disabled={this.state.isSaveDisabled}
          textStyle={styles.saveButton}>
          保存
        </Button>
      </View>
    );
  }
}

class ProfileItemEdit extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  // componentWillMount() {
  //   // this.props.navigator.setRenderRightCompoent((sceneProps) => {
  //   //   return (
  //   //     <LeftComponent
  //   //       ref={(ref) => {
  //   //         this._leftComponent = ref;
  //   //       }}
  //   //       handleSave={this._handleSave}
  //   //       isSaveDisabled={!this.state.value}
  //   //     />
  //   //   );
  //   // });
  // }

  _handleSave = async () => {
    let {modifyUserInfo, profile, navigation} = this.props;
    let {value} = this.state;
    let result = await modifyUserInfo(profile.userInfo.userId, 'name', value);
    if (result.success) {
      navigation.goBack();
    } else {
      Alert.alert('修改失败！');
    }
  };

  _onChangeText = (text) => {
    this.setState({
      value: text,
    });

    // if (!this._leftComponent) {
    //   return;
    // }

    // if (text) {
    //   this._leftComponent.setState({
    //     isSaveDisabled: false,
    //   });
    // } else {
    //   this._leftComponent.setState({
    //     isSaveDisabled: true,
    //   });
    // }
  };

  render() {
    let {profile} = this.props;
    let name = profile.userInfo.name || 'test';
    return (
      <ScrollView style={styles.container}>
        <TextInput.Line value={name} onChangeText={this._onChangeText} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  leftComponent: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Color.BackgroundGrey,
    paddingTop: 20,
  },
  saveButton: {
    fontSize: FontSize.Content,
    color: Color.WechatGreen,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  modifyUserInfo: async (userId, field, value) =>
    dispatch(modifyProfile(userId, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItemEdit);
