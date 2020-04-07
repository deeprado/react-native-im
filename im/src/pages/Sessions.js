/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 聊天会话窗口
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
import {SwipeAction} from '@ant-design/react-native';

import {FontSize, Color, Badge, ListItem} from '../../UiLibrary';
import {updateToInfo} from '../redux/actions/chat';
import {deleteSession, initSessions} from '../redux/actions/session';

const noDataPng = require('../assets/images/nodata.png');

class Sessions extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {}

  getSessions = async () => {
    let {logined, userInfo, initSessions} = this.props;
    logined && (await initSessions(userInfo.userId));
  };

  renderLeftComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 24}}>
          会话
        </Text>
      </View>
    );
  }

  renderRightComponent() {
    return null;
  }

  _renderItem = ({item, index}) => {
    let {deleteSession, swithToInfo, navigation} = this.props;
    let row = item;
    return (
      <View style={{marginTop: 10}} key={index}>
        <SwipeAction
          autoClose
          style={{backgroundColor: 'transparent'}}
          left={[
            {
              text: '删除',
              onPress: () => deleteSession(row.key),
              style: {backgroundColor: 'red', color: 'white'},
            },
          ]}
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}>
          <ConversationCell
            avatar={row.avatar}
            unReadMessageCount={row.unReadMessageCount}
            name={row.name}
            latestTime={row.latestTime}
            latestMessage={row.latestMessage}
            onPress={() => {
              swithToInfo(row.toInfo);
              navigation.navigate('ChatRoom');
            }}
          />
        </SwipeAction>
      </View>
    );
  };

  _renderEmpty = () => {
    return (
      <View style={styles.emptyMessage}>
        <Image source={noDataPng} style={styles.emptyMessageImage} />
        <Text style={styles.emptyMessageText}>暂无会话</Text>
      </View>
    );
  };
  _renderSeparator() {
    return <ListItem.Separator paddingLeft={10} />;
  }

  _keyExtractor = (item, index) => index.toString();

  _onRefresh = async () => {
    this.setState({
      refreshing: true,
    });

    await this.getSessions();

    this.setState({
      refreshing: false,
    });
  };

  render() {
    let {refreshing} = this.state;
    let {sessionList} = this.props;
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
        <View style={styles.mainContainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            }
            data={sessionList}
            ListEmptyComponent={this._renderEmpty}
            ItemSeparatorComponent={this._renderSeparator}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}

class ConversationCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      avatar,
      unReadMessageCount,
      name,
      latestTime,
      latestMessage,
      onPress,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={styles.ConversationCell}>
          <View style={styles.leftBox}>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatar}
            />

            <Badge
              style={styles.cellBadge}
              unReadMessageCount={unReadMessageCount}
              height={18}
            />
          </View>
          <View style={styles.boxRight}>
            <View style={styles.boxCeil}>
              <Text style={styles.sessionName} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.latestTime}>{latestTime}</Text>
            </View>
            <Text style={styles.boxFloor} numberOfLines={1}>
              {latestMessage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// ConversationCell.propTypes = {
//   avatar: PropTypes.string.isRequired,
//   name: PropTypes.any.isRequired,
//   latestTime: PropTypes.string.isRequired,
//   latestMessage: PropTypes.string.isRequired,
//   onPress: PropTypes.func.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    // backgroundColor: Color.BackgroundGrey,
  },
  ConversationCell: {
    flexDirection: 'row',
    backgroundColor: Color.White,
  },
  leftBox: {
    padding: 6,
  },
  avatar: {
    borderRadius: 4,
    width: 50,
    height: 50,
  },
  cellBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
  },
  boxRight: {
    flex: 1,
    padding: 10,
  },
  boxCeil: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionName: {
    fontSize: FontSize.Content,
    color: Color.Black,
  },
  boxFloor: {
    fontSize: FontSize.Annotation,
    color: '#9A9A9A',
  },
  latestTime: {
    fontSize: FontSize.Annotation,
    color: '#B3B3B3',
  },
  emptyMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageImage: {
    width: 90,
    height: 90,
    opacity: 0.6,
  },
  emptyMessageText: {
    color: Color.LightBlack,
    fontSize: FontSize.Annotation,
  },
});

const mapStateToProps = (state) => ({
  ...state.session,
  logined: state.profile.logined,
  userInfo: state.profile.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  initSessions: (userId) => dispatch(initSessions(userId)),
  deleteSession: (key) => dispatch(deleteSession(key)),
  swithToInfo: (toInfo) => dispatch(updateToInfo(toInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
