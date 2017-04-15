import React from 'react';
import LoginActions from './../../actions/login-actions';

const TopBar = React.createClass({

  onLogout() {
    LoginActions.onLogout();
  },

  render() {
    return (
      <div className="topBar">
        <img
          className="headerLogo"
          src="https://www.mattelsa.net/skin/frontend/mattelsa/default/images/logo-mattelsa.png"
        />
        <h2>Parqueadero Mattelsa</h2>
        <h3 onClick={this.onLogout}>Salir</h3>
      </div>
    );
  },

});

module.exports = TopBar;
