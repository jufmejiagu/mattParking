import React from 'react';
import onClickOutside from 'react-onclickoutside';
import LoginActions from './../../actions/login-actions';

const initialState = {
  loginFormOpen: false,
  user: '',
  password: '',
  error: null,
};

const UserTypeSelector = React.createClass({

  getInitialState() {
    return initialState;
  },

  handleClickOutside() {
    this.setState(initialState);
  },

  onOpenLoginForm() {
    this.setState({
      loginFormOpen: true,
    });
  },

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.user === '' || this.state.password === '') {
      this.setState({
        error: 'Debe ingresar todos los campos',
      });
      return;
    }
    const userData = {
      cedula: this.state.user,
      password: this.state.password,
    };
    LoginActions.onLogin(userData, this.props.userType, this.onSetError);
  },

  onSetError(errorText) {
    this.setState({ error: errorText });
  },

  isValid() {
    if (this.state.user !== '' && this.state.password !== '') {
      return true;
    }
    return false;
  },

  onChangeInput(event) {
    const auxObject = {};
    auxObject[event.target.name] = event.target.value;
    if (this.isValid()) {
      auxObject.error = '';
    }
    this.setState(auxObject);
  },


  render() {
    return (
      <article className="userTypeSelector" onClick={this.onOpenLoginForm}>
        <img src={this.props.imgSrc} />
        <h2>
          {this.props.title}
        </h2>
        {this.state.loginFormOpen &&
          <form onSubmit={this.handleSubmit}>
            <input placeholder="Cedula" value={this.state.user} name="user"
              onChange={this.onChangeInput}
            />
            <input type="password" name="password" onChange={this.onChangeInput}
              placeholder="Clave de acceso"
              value={this.state.password}
            />
            <button type="submit"> Ingresar </button>
          </form>
        }
        {this.state.error &&
          <div className="error">
            {this.state.error}
          </div>
        }
      </article>
    );
  },
});

module.exports = onClickOutside(UserTypeSelector);
