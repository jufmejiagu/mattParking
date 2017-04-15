import React from 'react';
import UserTypeSelector from './userTypeSelector'; //eslint-disable-line
import CreateUserForm from './createUserForm'; //eslint-disable-line
import LoginStore from '../../stores/loginStore';
import { History } from 'react-router';

const LoginContainer = React.createClass({

  mixins: [History],

  getInitialState() {
    return {
      createUserOpen: false,
    };
  },

  componentWillMount() {
    this.changeEmitter = LoginStore.onChange(this.onChange);
    this.transitionToUseRoute();
  },

  onChange() {
    this.transitionToUseRoute();
  },

  transitionToUseRoute() {
    if (LoginStore.getUser()) {
      const userType = LoginStore.getUserType();
      const route = userType === 'Administrador' ? 'administration' : 'employee';
      this.history.pushState(null, route);
    }
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  onOpenCreateUserForm() {
    this.setState({ createUserOpen: true });
  },

  onCloseCreateUserForm() {
    this.setState({ createUserOpen: false });
  },

  render() {
    return (
      <div className="loginContainer" ref="loginContainer">
        <img
          className="logo"
          src="https://www.mattelsa.net/skin/frontend/mattelsa/default/images/logo-mattelsa.png"
          onClick={this.onOpenCreateUserForm}
        />
        <UserTypeSelector
          imgSrc={"http://1.bp.blogspot.com/-Xpxnid5ljSc/UEO6VWcFN0I/AAAAAAAAAG4/0Ds5DS-qYkU/s200/vigilante.png"}
          title={"Administrador parqueadero"}
          userType="Administrador"
        />
        <UserTypeSelector
          imgSrc={"https://www.mattelsa.net/media/catalog/product/cache/1/small_image/306x364/9df78eab33525d08d6e5fb8d27136e95/1/8/18772-1.jpg"}
          title={"Empleados Mattelsa"}
          userType="Empleado"
        />
        {this.state.createUserOpen &&
          <CreateUserForm
            onCloseCreateUserForm={this.onCloseCreateUserForm}
          />
        }
      </div>
    );
  },

});

module.exports = LoginContainer;
