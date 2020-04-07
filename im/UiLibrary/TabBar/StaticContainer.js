/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 静态容器，当主屏幕不在当前 Tab 页面的时候，停止 render diff
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.shouldUpdate;
  }

  render() {
    let {children} = this.props;
    return children ? React.Children.only(children) : null;
  }
}

StaticContainer.propTypes = {
  shouldUpdate: PropTypes.bool,
};
