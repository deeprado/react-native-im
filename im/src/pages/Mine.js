import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {Header, Avatar, Badge, Icon} from 'react-native-elements';

import {onThemeChange} from '../redux/actions/theme';

import {Color, FontSize} from '../../UiLibrary';

const friendshipPng = require('../assets/images/friendship.png');
const qrcodePng = require('../assets/images/qrcode.png');

class Mine extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLeftComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 20}}>我的</Text>
      </View>
    );
  }

  renderRightComponent() {
    return null;
  }

  renderFriendShip = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 40,
            }}>
            <Image
              source={friendshipPng}
              style={{
                width: 22,
                height: 22,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: '#666',
            }}>
            支付
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginRight: 10,
            }}>
            <Avatar
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
              }}
              size="small"
            />
            <Badge
              status="error"
              containerStyle={{position: 'absolute', top: -4, right: -4}}
            />
          </View>
          <Icon name="chevron-right" color="#9D9D9D" type="feather" />
        </View>
      </View>
    );
  };

  renderSplitter = () => {
    return (
      <View
        style={{
          height: 15,
          backgroundColor: '#f2f2f2',
        }}
      />
    );
  };

  renderSetting = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Setting');
        }}
        activeOpacity={1}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#fff',
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 40,
                alignItems: 'flex-start',
              }}>
              <Icon type="feather" name="settings" size={18} color="#23ABF2" />
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#666',
              }}>
              设置
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="chevron-right" color="#9D9D9D" type="feather" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderProfile = () => {
    let {userInfo, navigation} = this.props;
    return (
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: '#fff',
        }}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View style={[styles.cell]}>
            <View style={styles.leftBox}>
              <View
                style={
                  {
                    // backgroundColor: 'red',
                  }
                }>
                <Image
                  source={{
                    uri: userInfo.avatar,
                  }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.userInfo}>
                <View
                  style={{
                    paddingBottom: 5,
                  }}>
                  <Text style={styles.name}>{userInfo.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={styles.info}>手机号: {userInfo.phone}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        marginRight: 20,
                      }}>
                      <Image
                        source={qrcodePng}
                        style={{
                          width: 16,
                          height: 16,
                          opacity: 0.5,
                        }}
                      />
                    </View>
                    <View>
                      <Icon
                        name="chevron-right"
                        color="#9D9D9D"
                        type="feather"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          statusBarProps={{
            backgroundColor: '#fff',
            barStyle: 'dark-content',
          }}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView
          style={{flex: 1, backgroundColor: '#f2f2f2'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.renderProfile()}
          {this.renderSplitter()}

          {this.renderFriendShip()}
          {this.renderSplitter()}
          {this.renderFriendShip()}

          {this.renderFriendShip()}
          {this.renderFriendShip()}
          {this.renderFriendShip()}
          {this.renderFriendShip()}
          {this.renderFriendShip()}
          {this.renderSplitter()}
          {this.renderSetting()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cell: {
    backgroundColor: Color.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    borderRadius: 6,
    height: 60,
    width: 60,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  info: {
    fontSize: FontSize.Annotation,
    color: '#666',
  },
});

const mapStateToProps = (state) => ({
  userInfo: state.profile.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onThemeChange: (themeColor) => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
