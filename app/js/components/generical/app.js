import React from 'react';

const APP = React.createClass({
  render() {
    return (
      this.props.children
    );
  },
});

module.exports = APP;
