/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 分割线
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../Color';

class Separator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : Color.White,
      lineHeight: props.lineHeight
        ? props.lineHeight
        : StyleSheet.hairlineWidth,
      lineColor: props.lineColor ? props.lineColor : Color.LightGrey,
      paddingLeft: props.paddingLeft ? props.paddingLeft : 15,
    };
  }
  // static defaultProps = {
  //   backgroundColor: Color.White,
  //   lineHeight: StyleSheet.hairlineWidth,
  //   lineColor: Color.LightGrey,
  //   paddingLeft: 15,
  // };

  render() {
    let {backgroundColor, lineHeight, lineColor, paddingLeft} = this.state;

    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          paddingLeft: paddingLeft,
        }}>
        <View
          style={{
            borderBottomWidth: lineHeight,
            borderBottomColor: lineColor,
          }}
        />
      </View>
    );
  }
}

Separator.propTypes = {
  backgroundColor: PropTypes.string,
  lineHeight: PropTypes.number,
  lineColor: PropTypes.string,
  paddingLeft: PropTypes.number,
};

export default Separator;
