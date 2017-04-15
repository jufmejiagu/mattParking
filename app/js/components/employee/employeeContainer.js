import React from 'react';
import { History } from 'react-router';
import LoginStore from '../../stores/loginStore';
import ParkingActions from '../../actions/parking-actions';
import TopBar from '../topbar/topBar'; //eslint-disable-line
import VehicleList from '../generical/vehiclesList'; //eslint-disable-line

const EmployeeContainer = React.createClass({

  mixins: [History],

  getInitialState() {
    return {
      actualVehicle: null,
    };
  },

  componentWillMount() {
    this.changeEmitter = LoginStore.onChange(this.onChange);
    this.transitionToUseRoute();
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  componentDidMount() {
    if (LoginStore.getUser()) {
      ParkingActions.onSearchVehicles({ cedula: LoginStore.getUser().cedula });
    }
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

  onViewCarDetail(vehicle) {
    this.setState({ actualVehicle: vehicle });
  },

  render() {
    const nombre = LoginStore.getUser() ? LoginStore.getUser().nombres : '';
    const greatings = `Hola, ${nombre}`;
    return (
      <div className="employeeContainer">
        <TopBar />
        <div className="content">
          <div className="greatings">
            <h3>{greatings}</h3>
          </div>
          <VehicleList
            onRegisterParking={this.onViewCarDetail}
          />
        </div>
      </div>
    );
  },
});

module.exports = EmployeeContainer;
