import React from 'react'

require('./index.less');

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        （京)-经营性-2017-0020 京公网安备11000002000001号 京ICP证030173号
      </div>
    )
  }
}

export default Footer;
