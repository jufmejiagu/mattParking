import React from 'react';
import LoginActions from '../../actions/login-actions';

const CreateUserForm = React.createClass({

  getInitialState() {
    return {
      error: null,
      nombres: '',
      cedula: '',
      password: '',
      apellidos: '',
    };
  },

  isValid() {
    if (this.state.nombres !== '' && this.state.cedula !== '' && this.state.pasword !== ''
    && this.state.apellidos !== ''
  ) {
      return true;
    }
    return false;
  },

  onChangeInput(event) {
    const auxObject = {};
    auxObject[event.target.name] = event.target.value;
    const context = this;
    this.setState(auxObject, () => {
      if (context.isValid()) {
        context.setState({ error: '' });
      }
    });
  },

  onSave() {
    if (!this.isValid()) {
      this.setState({
        error: 'Debe ingresar todos los campos',
      });
      return;
    }
    const nuevoUsuario = {
      nombres: this.state.nombres,
      cedula: this.state.cedula,
      apellidos: this.state.apellidos,
      password: this.state.password,
    };
    const context = this;
    LoginActions.onCreateUsuario(nuevoUsuario, (error) => {
      if (error) {
        context.setState({ error });
        return;
      }
      context.props.onCloseCreateUserForm();
    });
  },


  render() {
    return (
      <div className="registerParkingModal">
        <h3>Crear usuario</h3>
        <div className="vehicleInformation">
          <strong className="instructions">
            Ingresa la información del usuario
          </strong>
          <div className="item">
            <div className="itemName"> Nombres: </div>
            <div className="itemValue">
              <input name="nombres" placeholder="Nombres"
                value={this.state.celda} onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="item">
            <div className="itemName"> Apellidos: </div>
            <div className="itemValue">
              <input name="apellidos" placeholder="Apellidos"
                value={this.state.apellidos} onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="item">
            <div className="itemName"> Cedula: </div>
            <div className="itemValue">
              <input name="cedula" placeholder="Cedula"
                value={this.state.cedula} onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="item">
            <div className="itemName"> Password: </div>
            <div className="itemValue">
              <input name="password" placeholder="Password" type="password"
                value={this.state.password} onChange={this.onChangeInput}
              />
            </div>
          </div>
        </div>
        {this.state.error &&
          <div className="error">
            {this.state.error}
          </div>
        }
        <div className="buttonsContainer">
          <button onClick={() => {this.props.onCloseCreateUserForm(); }}>
            Cancelar
          </button>
          <button onClick={this.onSave}>
            Registrar
          </button>
        </div>
      </div>
    );
  },

});

module.exports = CreateUserForm;
