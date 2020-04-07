/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 徽章计数组件
 *
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
// import PropTypes from 'prop-types';

class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorWidth: props.anchorWidth ? props.anchorWidth : 35,
      height: props.height ? props.height : 20,
      autoMarginRight: props.autoMarginRight ? props.autoMarginRight : false,
    };
  }

  // static defaultProps = {
  //   anchorWidth: 35,
  //   height: 20,
  //   autoMarginRight: false,
  // };

  // width + right = 35，保证左边起始点一致，最多支持 99+
  _computeWidthAndRight(number) {
    let {anchorWidth, height, autoMarginRight} = this.state;

    if (!number) {
      return {
        opacity: 0,
      };
    }
    let right = 0;

    if (number < 10) {
      right = anchorWidth - height;
    } else if (number < 100) {
      right = 8;
    } else {
      right = 0;
    }

    let styleObj = {
      fontSize: height - 6,
      width: anchorWidth - right,
      lineHeight: height,
      height: height,
      borderRadius: height / 2,
    };

    if (autoMarginRight) {
      Object.assign(styleObj, {
        right: right,
      });
    }

    return styleObj;
  }

  _renderText(number) {
    if (number > 99) {
      return '99+';
    }

    return number || null;
  }

  render() {
    let {unReadMessageCount} = this.props;
    return (
      <Text
        style={[
          styles.badge,
          this.props.style,
          this._computeWidthAndRight(unReadMessageCount),
        ]}>
        {this._renderText(unReadMessageCount)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#FFF',
    backgroundColor: '#ff0000',
    overflow: 'hidden',
    right: 0,
  },
});

// Badge.PropTypes = {
//   style: PropTypes.any,
//   unReadMessageCount: PropTypes.number,
//   height: PropTypes.number,
//   anchorWidth: PropTypes.number,
//   autoMarginRight: PropTypes.bool,
// };

export default Badge;
