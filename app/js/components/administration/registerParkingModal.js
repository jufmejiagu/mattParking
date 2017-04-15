import React from 'react';
import _ from 'lodash';
import ParkingActions from '../../actions/parking-actions';

const RegisterParkingModal = React.createClass({

  getInitialState() {
    return {
      actualVehicle: _.cloneDeep(this.props.actualVehicle),
      celda: '',
      error: null,
    };
  },

  isValid() {
    if (this.state.celda !== '') {
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
        error: 'Debe ingresar una celda de parqueo',
      });
      return;
    }
    const nuevoRegistro = {
      numeroCelda: this.state.celda,
      placa: this.state.actualVehicle.placa,
      fechaEntrada: Date.now(),
    };
    const context = this;
    ParkingActions.onRegisterNewVehicleEntry(nuevoRegistro, (error) => {
      if (error) {
        this.setState({ error });
        return;
      }
      this.setState({ error: 'Registro ingresado correctamente, se cerrara la ventana' });
      setTimeout(() => {
        context.props.onCloseRegisterParkingModal();
      }, 5000);
    });
  },

  render() {
    return (
      <div className="registerParkingModal">
        <h3>Registrar ingreso a parqueadero</h3>
        <div className="vehicleInformation">
          <div className="item">
            <div className="itemName"> Empleado: </div>
            <div className="itemValue">{this.state.actualVehicle.cedulaUser}</div>
          </div>
          <div className="item">
            <div className="itemName"> Placa: </div>
            <div className="itemValue">{this.state.actualVehicle.placa}</div>
          </div>
          <img src={this.state.actualVehicle.fotografia} />
          {Object.keys(this.state.actualVehicle.tipo).map((key, index) =>
            <div className="item" key={`index-${index}-${Math.random()}`}>
              <div className="itemName">
                {key === 'nombre' ? 'Tipo' : key}:
              </div>
              <div className="itemValue">{this.state.actualVehicle.tipo[key]}</div>
            </div>
          )}
        </div>
        <strong className="instructions">
          Ingresa la celda de parqueo. La fecha y hora se agregarán
          automaticamente
        </strong>
        <div className="inputContainer">
          <label htmlFor="celda">Celda:</label>
          <input name="celda" placeholder="Celda de parqueo" id="celda"
            value={this.state.celda} onChange={this.onChangeInput}
          />
        </div>
        {this.state.error &&
          <div className="error">
            {this.state.error}
          </div>
        }
        <div className="buttonsContainer">
          <button onClick={() => {this.props.onCloseRegisterParkingModal(); }}>
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

module.exports = RegisterParkingModal;
