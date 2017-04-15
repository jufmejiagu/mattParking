import React from 'react';
import { History } from 'react-router';
import LoginStore from '../../stores/loginStore';
import ParkingActions from '../../actions/parking-actions';
import TopBar from '../topbar/topBar'; //eslint-disable-line
import VehicleList from '../generical/vehiclesList'; //eslint-disable-line
import RegisterParkingModal from './registerParkingModal'; //eslint-disable-line
import InformesModal from './informesModal'; //eslint-disable-line

const initialState = {
  cedula: '',
  placa: '',
  error: null,
  actualVehicle: null,
  informesModalOpen: false,
};

const AdministrationContainer = React.createClass({

  mixins: [History],

  getInitialState() {
    return initialState;
  },

  componentWillMount() {
    this.changeEmitter = LoginStore.onChange(this.onChange);
    this.transitionToUseRoute();
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },


  onChange() {
    this.transitionToUseRoute();
  },

  transitionToUseRoute() {
    if (!LoginStore.getUser()) {
      if (this.history) {
        this.history.pushState(null, '/');
      }
    }
  },

  isValid() {
    if (this.state.cedula !== '' || this.state.placa !== '') {
      return true;
    }
    return false;
  },

  onSearch(event) {
    event.preventDefault();
    if (!this.isValid()) {
      this.setState({
        error: 'Debe ingresar un criterio de busqueda',
      });
      ParkingActions.onResetStore();
      return;
    }
    const actionData = {};
    if (this.state.placa !== '') {
      actionData.placa = this.state.placa;
    }
    if (this.state.cedula !== '') {
      actionData.cedula = this.state.cedula;
    }
    ParkingActions.onSearchVehicles(actionData, this.onSetError);
  },

  onSetError(errorText) {
    this.setState({ error: errorText });
  },

  onChangeInput(event) {
    const auxObject = {};
    const context = this;
    auxObject[event.target.name] = event.target.value;
    this.setState(auxObject, () => {
      if (context.isValid()) {
        context.setState({ error: '' });
      }
    });
  },

  onRegisterParking(vehicle) {
    this.setState({ actualVehicle: vehicle });
  },

  onCloseRegisterParkingModal() {
    this.setState({ actualVehicle: null });
  },

  onOpenInformesModal() {
    this.setState({ informesModalOpen: true });
  },

  onCloseInformesModal() {
    this.setState({ informesModalOpen: false });
  },


  render() {
    if (!LoginStore.getUser()) {
      return null;
    }
    const greatings = `Hola, ${LoginStore.getUser().nombres}`;
    return (
      <div className="administrationContainer" ref="administrationContainer">
        <TopBar />
        <div className="content">
          <div className="greatings">
            <h3>{greatings}</h3>
          </div>
          <button className="informes" onClick={this.onOpenInformesModal}>
            Informes mensuales
          </button>
          <div className="searchBar">
            <h2>Registrar Ingreso a Parqueadero</h2>
            <strong>
              Puedes registrar el ingreso de un vehiculo al Parqueadero
              con la placa del vehiculo o con la cedula del empleado.
            </strong>
            <form onSubmit={this.onSearch}>
              <div className="field">
                <label htmlFor="cedula">Cedula</label>
                <input type="text" id="cedula" name="cedula" value={this.state.cedula}
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="field">
                <label htmlFor="placa">Placa</label>
                <input type="text" id="placa" name="placa" value={this.state.placa}
                  onChange={this.onChangeInput}
                />
              </div>
              <button type="submit"> Buscar </button>
            </form>
            {this.state.error &&
              <div className="error">
                {this.state.error}
              </div>
            }
          </div>
          <VehicleList
            onRegisterParking={this.onRegisterParking}
            administration={true}
          />
          {this.state.actualVehicle &&
            <RegisterParkingModal
              actualVehicle={this.state.actualVehicle}
              onCloseRegisterParkingModal={this.onCloseRegisterParkingModal}
            />
          }
          {this.state.informesModalOpen &&
            <InformesModal
              onCloseInformesModal={this.onCloseInformesModal}
            />
          }
        </div>
      </div>
    );
  },

});

module.exports = AdministrationContainer;
