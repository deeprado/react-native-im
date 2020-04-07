import React from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Image} from 'react-native';
import {connect} from 'react-redux';
import {Header, Avatar, Badge, Icon} from 'react-native-elements';

import {onThemeChange} from '../redux/actions/theme';

import SearchModal from './SearchModal';

const friendshipPng = require('../assets/images/friendship.png');

class Findings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toInfo: props.toInfo ? props.toInfo : null,
      textInputHeight: 40,
      refreshing: false,
      modalVisible: false,
    };
  }

  componentWillUnmount() {}

  // 不要和动画效果抢系统资源
  componentDidMount() {}

  renderLeftComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 20}}>发现</Text>
      </View>
    );
  }

  renderRightComponent() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{marginLeft: 24}}>
          <Icon
            name="search"
            color="#9D9D9D"
            type="feather"
            onPress={() => {
              this.openSearchModal();
            }}
          />
        </View>
        <View style={{marginLeft: 24}}>
          <Icon
            name="plus-circle"
            color="#9D9D9D"
            type="feather"
            onPress={() => {
              this.openMoreMenu();
            }}
          />
        </View>
      </View>
    );
  }

  openSearchModal = () => {
    this.setState({modalVisible: true});
  };

  // 关闭定位
  closeSearchModal = () => {
    this.setState({modalVisible: false});
  };

  openMoreMenu = () => {};

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
              width: 30,
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
            朋友圈
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

  renderTheme = () => {
    let {themeColor} = this.props;
    console.log('themeColor', themeColor);
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
              width: 30,
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
            主题色
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginRight: 15,
              backgroundColor: themeColor,
              width: 20,
              height: 20,
            }}
          />
          <Icon name="chevron-right" color="#9D9D9D" type="feather" />
        </View>
      </View>
    );
  };

  render() {
    let {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#F2F2F2'}
          placement={'left'}
          statusBarProps={{
            backgroundColor: '#F2F2F2',
            barStyle: 'dark-content',
          }}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView
          style={{flex: 1, backgroundColor: '#f5f5f9'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.renderFriendShip()}
          {this.renderSplitter()}
          {this.renderFriendShip()}
          {this.renderSplitter()}
          {this.renderTheme()}
        </ScrollView>

        {/* 搜索 */}
        <SearchModal
          modalVisible={this.state.modalVisible}
          closeModal={() => this.closeSearchModal()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => ({
  themeColor: state.theme.themeColor,
});

const mapDispatchToProps = (dispatch) => ({
  onThemeChange: (themeColor) => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Findings);
