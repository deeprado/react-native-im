/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 好友列表
 */

import React from 'react';
import {RefreshControl, StyleSheet, Text, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';

import {Color, ListItem} from '../../UiLibrary';

import {initFriends} from '../redux/actions/friend';
import {updateToInfo} from '../redux/actions/chat';
import {addSession} from '../redux/actions/session';

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    this.getFriends = this.getFriends.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
  }

  async componentDidMount() {
    // await this.getFriends();
  }

  renderLeftComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 24}}>
          通讯录
        </Text>
      </View>
    );
  }

  renderRightComponent() {
    return null;
  }

  _onRefresh = async () => {
    this.setState({
      refreshing: true,
    });

    await this.getFriends();

    this.setState({
      refreshing: false,
    });
  };

  _renderItem = ({item, index}) => {
    let {navigation, userInfo, swithToInfo, addSession} = this.props;
    let row = item;
    return (
      <ListItem.Label
        key={index}
        iconUrl={row.avatar}
        labelText={row.name}
        labelStyle={row.status === 'online' ? styles.online : ''}
        onPress={() => {
          swithToInfo(row);
          addSession(userInfo, row);
          navigation.push('ChatRoom');
        }}
      />
    );
  };

  _renderSectionHeader = () => {
    return <ListItem.Header title={'xxx'} />;
  };

  _renderSeparator() {
    return <ListItem.Separator />;
  }

  _keyExtractor = (item, index) => index.toString();

  getFriends = async () => {
    let {logined, userInfo, initFriends} = this.props;
    logined && (await initFriends(userInfo.userId));
  };

  filterFriends = () => {
    let {friends} = this.props;
    let elements = Object.keys(friends)
      .map((firstLetter) => {
        let letterFriends = friends[firstLetter];
        return letterFriends;
      })
      .reduce((prev, cur, index, arr) => {
        return prev.concat(cur);
      });
    return elements;
  };

  renderFriends = () => {
    let {refreshing} = this.state;
    let friends = this.filterFriends();
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
        }
        data={friends}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#F2F2F2'}
          statusBarProps={{
            backgroundColor: '#F2F2F2',
            barStyle: 'dark-content',
          }}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <View>{this.renderFriends()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  online: {
    color: Color.WechatGreen,
  },
});

const mapStateToProps = (state) => ({
  friends: state.friend.friends,
  userInfo: state.profile.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  initFriends: (userId) => dispatch(initFriends(userId)),
  swithToInfo: (toInfo) => dispatch(updateToInfo(toInfo)),
  addSession: (toInfo) => dispatch(addSession(toInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
