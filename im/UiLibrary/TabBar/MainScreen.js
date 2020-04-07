/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 主屏幕视图容器
 *
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import Layout from './Layout';
import StaticContainer from './StaticContainer';

export default class MainScreen extends Component {
  render() {
    let {selected} = this.props;

    return (
      <View
        pointerEvents={selected ? 'auto' : 'none'}
        removeClippedSubviews={!selected}
        style={[styles.container, selected ? null : styles.hideMainScreen]}>
        <StaticContainer shouldUpdate={selected}>
          {this.props.children}
        </StaticContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: Layout.tabBarHeight,
  },
  hideMainScreen: {
    overflow: 'hidden',
    opacity: 0,
  },
});

MainScreen.propTypes = {
  ...View.propTypes,
  selected: PropTypes.bool,
};
