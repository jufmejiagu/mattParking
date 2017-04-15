import React from 'react';
import CarroType from './carroType'; // eslint-disable-line
import MotoType from './motoType';  // eslint-disable-line
import BicicletaType from './bicicletaType';  // eslint-disable-line
import ParkingActions from '../../actions/parking-actions';


const CreateVehicleForm = React.createClass({

  getInitialState() {
    return {
      selectedType: 'carro',
      tipo: null,
      placa: '',
      fotografia: '',
      cedulaUser: '',
      error: null,
    };
  },

  onSelecType(type) {
    this.setState({ selectedType: type });
  },

  onChangeTipo(tipo) {
    const context = this;
    this.setState({ tipo }, () => {
      if (context.isValid) {
        this.setState({ error: null });
      }
    });
  },

  onChangeInput(event) {
    const auxObject = {};
    auxObject[event.target.name] = event.target.value;
    const context = this;
    this.setState(auxObject, () => {
      if (context.isValid) {
        this.setState({ error: null });
      }
    });
  },

  isValid() {
    const vehicle = {
      cedulaUser: this.state.cedulaUser,
      placa: this.state.placa,
      fotografia: this.state.fotografia,
      tipo: this.state.tipo,
    };
    if (vehicle.cedulaUser === '' || vehicle.placa === '' || vehicle.fotografia === '') {
      return false;
    }
    let flag = true;
    for (let key in vehicle.tipo) { //eslint-disable-line
      if (vehicle.tipo[key] === '') {
        flag = false;
      }
    }
    return flag;
  },

  onRegisterVehicle() {
    const vehicle = {
      cedulaUser: this.state.cedulaUser,
      placa: this.state.placa,
      fotografia: this.state.fotografia,
      tipo: this.state.tipo,
    };
    if (!this.isValid()) {
      this.setState({ error: 'Debe llenar todos los campos' });
      return;
    }
    const context = this;
    ParkingActions.onRegisterVehicle(vehicle, (error) => {
      if (error) {
        this.setState({ error });
        return;
      }
      context.props.onCloseForm();
    });
  },

  render() {
    const allTypes = {
      carro: <CarroType onChangeTipo={this.onChangeTipo} />,
      moto: <MotoType onChangeTipo={this.onChangeTipo} />,
      bicicleta: <BicicletaType onChangeTipo={this.onChangeTipo} />,
    };

    return (
      <div className="createVehicleForm">
        <h3>Registrar vehiculo</h3>
        <div className="vehicleInformation">
          <div className="item">
            <div className="itemName">
              Cedula Empleado
            </div>
            <div className="itemValue">
              <input value={this.state.cedulaUser} name="cedulaUser" onChange={this.onChangeInput}/>
            </div>
          </div>
          <div className="item">
            <div className="itemName">
              Placa
            </div>
            <div className="itemValue">
              <input value={this.state.placa} name="placa" onChange={this.onChangeInput}/>
            </div>
          </div>
          <div className="item">
            <div className="itemName">
              Link foto
            </div>
            <div className="itemValue">
              <input value={this.state.fotografia} name="fotografia" onChange={this.onChangeInput}/>
            </div>
          </div>
          <div className="buttonTypesContainer">
            <button onClick={() => { this.onSelecType('carro');}}>Carro</button>
            <button onClick={() => { this.onSelecType('moto');}}>Moto</button>
            <button onClick={() => { this.onSelecType('bicicleta');}}>Bicicleta</button>
          </div>
          {allTypes[this.state.selectedType]}
          {this.state.error &&
            <div className="error">
              {this.state.error}
            </div>
          }
          <button onClick={this.onRegisterVehicle}>Registrar</button>
          <button onClick={() => { this.props.onCloseForm();}}>Cancelar</button>
        </div>
      </div>
    );
  },
});

module.exports = CreateVehicleForm;
