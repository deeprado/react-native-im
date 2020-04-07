import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import {onThemeChange} from '../redux/actions/theme';

import TabBarComponent from '../components/TabBarComponent';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toInfo: props.toInfo ? props.toInfo : null,
      firstEnter: 0,
      ds: [],
      textInputHeight: 40,
      inputValue: '',
      refreshing: false,
    };
  }

  componentWillUnmount() {
  }

  // 不要和动画效果抢系统资源
  componentDidMount() {}

  render() {
    let {navigation} = this.props;
    return (
      <View>
        <Text>HomeScreen</Text>
        <TabBarComponent />
        <Button
          title="改变主题色"
          onPress={() => {
            // let {dispatch} = this.props.navigation;
            // dispatch(onThemeChange('red'))
            this.props.onThemeChange('red');
          }}
        />
        <Button
          title="去登录"
          onPress={() => {
            // let {dispatch} = this.props.navigation;
            // dispatch(onThemeChange('red'))
            navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onThemeChange: (themeColor) => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
