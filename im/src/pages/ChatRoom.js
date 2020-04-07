/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 * 聊天室
 *
 * TODO: 聊天室有两次渲染问题
 */
import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Platform,
  View,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';

import {FontSize, Color, Button} from '../../UiLibrary';

import moment from 'moment';

import {v4 as uuidv4} from 'uuid';

import {fillChatRoom, sendMessage, saveLocal} from '../redux/actions/chat';
import {deleteSession, clearUnRead} from '../redux/actions/session';

import Popover from '../components/Popover';

const menus = [
  {name: '复制', onPress: () => alert('复制')},
  {name: '粘贴', onPress: () => alert('粘贴')},
];

// // 接收者 ID
// toInfo: Object;
// firstEnter: number;
// ds: Object;
// rows: Object[];
// state: Object;
// currentMaxRowId: number = 0;
// // 判断用户是否输入过
// _userHasBeenInputed: boolean = false;
// _userAtPage = 0;
// _userReachEnd = true;

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstEnter: 0,
      textInputHeight: 40,
      inputValue: '',
      refreshing: false,
      keyboardVerticalOffset: props.keyboardVerticalOffset || 64,
      currentMaxRowId: 0,
      _userHasBeenInputed: false, // 判断用户是否输入过
      _userAtPage: 0,
      _userReachEnd: true,
    };
    this.goBack = this.goBack.bind(this);
    this._scrollToBottom = this._scrollToBottom.bind(this);
    this._clearInput = this._clearInput.bind(this);
    this._onSubmitEditing = this._onSubmitEditing.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._onPullMessage = this._onPullMessage.bind(this);
  }

  // 不要和动画效果抢系统资源
  componentDidMount() {
    this.fetchChatHistory();
    this._scrollToBottom();
  }

  fetchChatHistory = () => {
    let {userInfo, toInfo, fillChatRoom} = this.props;
    let currentChatKey = `${userInfo.userId}-${toInfo.userId}`;
    fillChatRoom(currentChatKey);
  };

  componentWillUnmount() {
    let {userInfo, toInfo, clearUnRead} = this.props;
    let currentChatKey = `${userInfo.userId}-${toInfo.userId}`;
    clearUnRead(currentChatKey);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

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
    let {toInfo} = this.props;
    return (
      <View>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 24}}>
          {toInfo.name}
        </Text>
      </View>
    );
  }

  renderRightComponent() {
    return (
      <Icon
        name="more-horizontal"
        color="#9D9D9D"
        type="feather"
        onPress={this.goBack}
      />
    );
  }

  _scrollToBottom() {
    this.msgBox && this.msgBox.scrollToEnd();
  }

  _clearInput = () => {
    this.setState({inputValue: ''});
  };

  _onSubmitEditing = () => {
    this.setState({
      _userHasBeenInputed: true,
    });
    // 数据组装
    let {userInfo, toInfo, sendMessage, saveLocal} = this.props;
    let payload = {
      from: userInfo.userId,
      to: toInfo.userId,
      uuid: 'aaaaaa', //uuidv4(),
      msg: {
        type: 'txt',
        content: this.state.inputValue,
      },
      ext: {
        avatar: userInfo.avatar,
        name: userInfo.name,
        timestamp: moment().startOf('minute').fromNow(),
      },
    };
    console.log('payload', payload);

    // 清空输入
    this._clearInput();

    // 聊天滚动到底部
    // this._scrollToBottom();

    // 远程发送
    sendMessage(payload);

    // 本地会话列表更新
    saveLocal(
      Object.assign(
        {
          localeExt: {
            toInfo: toInfo,
          },
        },
        payload,
      ),
    );
  };

  _renderItem = ({item, index}) => {
    let {userInfo} = this.props;
    this.currentMaxRowId = +index;
    return (
      <MessageCell
        order={index}
        key={`cell-${index}`}
        currentUser={userInfo.userId}
        message={item}
      />
    );
  };

  _onPullMessage = async () => {
    this._userReachEnd = false;

    this.setState({
      refreshing: true,
    });

    // 历史消息推入
    // await socketStore.fillCurrentChatRoomHistory(++this._userAtPage, 8);

    this.setState({
      refreshing: false,
    });
  };

  _keyExtractor = (item, index) => index.toString();

  render() {
    let {currentChatRoomHistory} = this.props;
    let {refreshing, textInputHeight, keyboardVerticalOffset} = this.state;
    let content = (
      <View style={styles.container}>
        <Header
          backgroundColor={'#F2F2F2'}
          statusBarProps={{
            backgroundColor: '#F2F2F2',
            barStyle: 'dark-content',
          }}
          placement={'left'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />

        <FlatList
          ref={(msgBox) => (this.msgBox = msgBox)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onPullMessage}
            />
          }
          onEndReached={() => {
            this.setState({
              _userReachEnd: true,
            });
          }}
          onEndReachedThreshold={10}
          data={currentChatRoomHistory}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <View style={styles.bottomToolBar}>
          <TextInput
            style={[
              styles.input,
              {
                height: Math.max(
                  40,
                  textInputHeight < 180 ? textInputHeight : 180,
                ),
              },
            ]}
            multiline={true}
            controlled={true}
            underlineColorAndroid="transparent"
            returnKeyType="default"
            value={this.state.inputValue}
            placeholder="输入发送消息"
            // ios only
            enablesReturnKeyAutomatically={true}
            onContentSizeChange={(event) => {
              this.setState({
                textInputHeight: event.nativeEvent.contentSize.height,
              });
            }}
            onKeyPress={(event) => {
              // 聊天滚动到底部
              this._scrollToBottom();
            }}
            onChangeText={(text) => {
              this.setState({inputValue: text});
            }}
          />

          <Button
            style={styles.sendButton}
            textStyle={styles.sendButtonText}
            // disabled={!this.state.inputValue}
            onPress={this._onSubmitEditing}>
            发送
          </Button>
        </View>
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.KeyboardAvoidingView}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          {content}
        </KeyboardAvoidingView>
      );
    } else {
      return content;
    }
  }
}

class MessageCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refBtns = [];
  }
  render() {
    let {currentUser, message, order} = this.props;

    let differentStyle = {};
    let posPop = 1;
    if (message.from === currentUser) {
      differentStyle = {
        flexDirection: 'row-reverse',
        backgroundColor: '#92E649',
      };
    } else {
      posPop = 0;
      differentStyle = {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
      };
    }

    return (
      <View
        style={[
          styles.messageCell,
          {flexDirection: differentStyle.flexDirection},
        ]}>
        <Image
          source={{
            uri: message.ext.avatar,
          }}
          style={styles.avatar}
        />
        <TouchableOpacity
          ref={(ref) => (this.refBtns[order] = ref)}
          onPress={(e) => {
            this.refBtns[order].measure((ox, oy, width, height, px, py) => {
              Popover.show(
                menus,
                {
                  left: posPop
                    ? px < width
                      ? px + width
                      : px - width
                    : px - width / 2,
                  top: py < height ? py + height : py - height,
                },
                py < height,
              );
            });
          }}>
          <View
            style={[
              styles.contentView,
              {backgroundColor: differentStyle.backgroundColor},
            ]}>
            <Text style={styles.messageCellText}>{message.msg.content}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.endBlankBlock} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Color.BackgroundGrey,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Color.LittleGrey,
  },
  sendButton: {
    marginHorizontal: 10,
    backgroundColor: Color.WechatGreen,
    borderColor: Color.WechatGreen,
  },
  sendButtonText: {
    color: Color.White,
  },
  input: {
    flex: 1,
    color: Color.Black,
    fontSize: FontSize.Main,
    padding: 10,
  },
  messageCell: {
    marginTop: 5,
    marginBottom: 5,
  },
  messageCellText: {
    fontSize: FontSize.Content,
  },
  avatar: {
    borderRadius: 4,
    margin: 5,
    width: 40,
    height: 40,
  },
  contentView: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flex: 1,
    margin: 5,
    justifyContent: 'center',
  },
  endBlankBlock: {
    margin: 5,
    width: 50,
    height: 40,
  },
});

const mapStateToProps = (state) => ({
  ...state.profile,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  deleteSession: (key) => dispatch(deleteSession(key)),
  fillChatRoom: (key, page = 0, pageSize = 12) =>
    dispatch(fillChatRoom(key, page, pageSize)),
  clearUnRead: (key) => dispatch(clearUnRead(key)),
  sendMessage: (payload) => dispatch(sendMessage(payload)),
  saveLocal: (payload) => dispatch(saveLocal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
