/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 */

import React from 'react';
import {StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';

import FontSize from '../FontSize';

class ListItemArrow extends React.Component {
  render() {
    let {style} = this.props;
    return (
      <Image
        style={[styles.arrow, style]}
        source={{
          uri: 'http://image-2.plusman.cn/app/im-client/arrow.png',
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 10,
    width: FontSize.Content,
    height: FontSize.Content,
  },
});

ListItemArrow.propTypes = {
  style: PropTypes.any,
};

export default ListItemArrow;
