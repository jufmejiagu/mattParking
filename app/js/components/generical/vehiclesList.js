import React from 'react';
import ParkingStore from '../../stores/parkingStore';
import VehicleCard from './vehicleCard'; //eslint-disable-line
import CreateVehicleForm from './createVehicleForm'; //eslint-disable-line

const VehiclesList = React.createClass({

  getInitialState() {
    return {
      vehicles: [],
      createVehicleFormOpen: false,
    };
  },

  componentWillMount() {
    this.changeEmitter = ParkingStore.onChange(this.onChange);
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  onChange() {
    this.setState({
      vehicles: ParkingStore.getVehicles(),
    });
  },

  onOpenCreateVehicleForm() {
    this.setState({ createVehicleFormOpen: true });
  },

  onCloseVehicleForm() {
    this.setState({ createVehicleFormOpen: false });
  },

  render() {
    const context = this;
    if (this.state.vehicles.length === 0) {
      return (
        <div>
          {ParkingStore.getErrorMessage()}
          {!ParkingStore.getErrorMessage() &&
            <div className="createVehicleContainer">
              <span className="instructions">
                Puedes registrar un nuevo vehiculo
              </span>
              <button onClick={this.onOpenCreateVehicleForm}>
                Registrar vehiculo
              </button>
            </div>
          }
          {this.state.createVehicleFormOpen &&
            <CreateVehicleForm
              onCloseForm={this.onCloseVehicleForm}
            />
          }
        </div>
      );
    }
    return (
      <div className="vehiclesList">
        <div className="createVehicleContainer">
          <span className="instructions">
            Puedes registrar un nuevo vehiculo
          </span>
          <button onClick={this.onOpenCreateVehicleForm}>
            Registrar vehiculo
          </button>
        </div>
        {this.state.vehicles.map((vehicle, index) =>
          <VehicleCard
            vehicle={vehicle}
            key={`vehicle-${index}`}
            onRegisterParking={(data) => { context.props.onRegisterParking(data); }}
          />
        )}
        {this.state.createVehicleFormOpen &&
          <CreateVehicleForm
            onCloseForm={this.onCloseVehicleForm}
          />
        }
      </div>
    );
  },

});

module.exports = VehiclesList;
