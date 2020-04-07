import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';
import Sessions from '../../pages/Sessions';
import Contacts from '../../pages/Contacts';
import Findings from '../../pages/Findings';

import ChatRoom from '../../pages/ChatRoom';

import Login from '../../pages/Login';

import Mine from '../../pages/Mine';
import Setting from '../../pages/mine/Setting';
import Profile from '../../pages/mine/Profile';
import ProfileItemEdit from '../../pages/mine/ProfileItemEdit';

const switchNavigationOptions = {
  gesturesEnabled: true,
  headerTitle: null,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: false,
};

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    // 添加badge
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    Sessions: {
      screen: Sessions,
      navigationOptions: () =>
        bottomTabOptions('会话', {
          iconName: 'social-pinterest',
          typeName: 'foundation',
        }),
    },
    Contacts: {
      screen: Contacts,
      navigationOptions: () =>
        bottomTabOptions('通讯录', {
          iconName: 'torsos-all',
          typeName: 'foundation',
        }),
    },
    Findings: {
      screen: Findings,
      navigationOptions: () =>
        bottomTabOptions('发现', {iconName: 'compass', typeName: 'foundation'}),
    },
    Mine: {
      screen: Mine,
      navigationOptions: () =>
        bottomTabOptions('我的', {iconName: 'torso', typeName: 'foundation'}),
    },
  },
  {
    initialRouteName: 'Sessions',
    tabBarOptions: {
      activeTintColor: '#02DE6C',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: commonNavigationOptions,
    },
    Login: {
      screen: Login,
      navigationOptions: commonNavigationOptions,
    },
    Setting: {
      screen: Setting,
      navigationOptions: commonNavigationOptions,
    },
    Profile: {
      screen: Profile,
      navigationOptions: commonNavigationOptions,
    },
    ProfileItemEdit: {
      screen: ProfileItemEdit,
      navigationOptions: commonNavigationOptions,
    },
    ChatRoom: {
      screen: ChatRoom,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'qimao://';

export default SplashStack;
