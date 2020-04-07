/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../Color';
import FontSize from '../FontSize';

export default class ListHeader extends React.Component {
  render() {
    let {title} = this.props;

    return (
      <View style={[styles.container, title ? null : styles.height20]}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    );
  }
}

ListHeader.propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.BackgroundGrey,
  },
  textStyle: {
    color: Color.LightBlack,
    fontSize: FontSize.Annotation,
  },
  height20: {
    height: 20,
  },
});
