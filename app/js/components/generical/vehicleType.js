import React from 'react';

const VehicleType = React.createClass({
  render() {
    return (
      <div className="typeContainer">
        {Object.keys(this.props.type).map((key, index) =>
          <div className="itemType" key={`index-${index}-${Math.random()}`}>
            <div className="itemName">
              {key === 'nombre' ? 'Tipo' : key}:
            </div>
            <div className="itemValue">{this.props.type[key]}</div>
          </div>
        )}
      </div>
    );
  },
});

module.exports = VehicleType;
