import React from 'react';
import VehicleType from './VehicleType'; //eslint-disable-line

const VehicleCard = React.createClass({

  onRegisterParking() {
    this.props.onRegisterParking(this.props.vehicle);
  },

  render() {
    return (
      <div className="vehicleCard" onClick={this.onRegisterParking}>
        <div className="placaContainer">
          {this.props.vehicle.placa}
        </div>
        <div className="cedulaContainer">
          <strong>Empleado:</strong>
          <span>{this.props.vehicle.cedulaUser}</span>
        </div>
        <VehicleType
          type={this.props.vehicle.tipo}
        />
      </div>
    );
  },

});

module.exports = VehicleCard;
