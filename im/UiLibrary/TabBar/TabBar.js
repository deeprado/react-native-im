/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * TabBar 导航容器
 *
 * @flow
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import Layout from './Layout.js';
import Tab from './Tab.js';
import TabBarItem from './TabBarItem';
import MainScreen from './MainScreen';

export default class TabBar extends React.Component {
  static Item = TabBarItem;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex ? props.activeIndex : 0,
    };

    this.renderedSceneKeys = [];
  }

  render() {
    let {children} = this.props;
    // 渲染主视图
    let scenes = [];
    React.Children.forEach(children, (item, index) => {
      let sceneKey = `mainScreenKey-${index}`;

      // 检测是否需要渲染视图，懒加载代码
      if (
        !(this.state.activeIndex === index) &&
        !~this.renderedSceneKeys.indexOf(sceneKey)
      ) {
        return;
      }

      // 加入缓存列表
      if (!~this.renderedSceneKeys.indexOf(sceneKey)) {
        this.renderedSceneKeys.push(sceneKey);
      }

      let scene = (
        <MainScreen selected={this.state.activeIndex === index} key={sceneKey}>
          {item}
        </MainScreen>
      );
      scenes.push(scene);
    });

    return (
      <View style={[styles.container]}>
        {scenes}
        <View style={styles.bottomBar}>
          {React.Children.map(children, this._renderTab)}
        </View>
      </View>
    );
  }

  _renderTab = (children, index) => {
    let {onPress} = children.props;
    return (
      <Tab
        {...children.props}
        key={`tabKey-${index}`}
        selected={this.state.activeIndex === index}
        onPress={(event) => {
          this.setState({
            activeIndex: index,
          });
          onPress ? onPress(event) : null;
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    height: Layout.tabBarHeight,
    backgroundColor: '#F7F7F7',
    borderTopWidth: 1,
    borderTopColor: '#DCDBDC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
