import React from 'react';

const BicicletaType = React.createClass({

  getInitialState() {
    return {
      nombre: 'bicicleta',
    };
  },

  componentDidMount() {
    const tipo = {
      nombre: this.state.nombre,
    };
    this.props.onChangeTipo(tipo);
  },

  render() {
    return (
      <div>
        <div className="item">
          <div className="itemName">
            Tipo
          </div>
          <div className="itemValue">
            Bicicleta
          </div>
        </div>
      </div>
    );
  },

});

module.exports = BicicletaType;
