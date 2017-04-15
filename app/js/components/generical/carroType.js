import React from 'react';

const CarroType = React.createClass({

  getInitialState() {
    return {
      nombre: 'carro',
      modelo: '',
      numPuertas: '',
    };
  },

  componentDidMount() {
    this.onSendTipo();
  },

  onSendTipo() {
    const tipo = {
      nombre: this.state.nombre,
      modelo: this.state.modelo,
      numPuertas: this.state.numPuertas,
    };
    this.props.onChangeTipo(tipo);
  },

  onChangeInput(event) {
    const auxObject = {};
    const context = this;
    auxObject[event.target.name] = event.target.value;
    this.setState(auxObject, () => {
      context.onSendTipo();
    });
  },

  render() {
    return (
      <div>
        <div className="item">
          <div className="itemName">
            Tipo
          </div>
          <div className="itemValue">
            Carro
          </div>
        </div>
        <div className="item">
          <div className="itemName">
            Modelo
          </div>
          <div className="itemValue">
            <input value={this.state.modelo} name="modelo" onChange={this.onChangeInput}/>
          </div>
        </div>
        <div className="item">
          <div className="itemName">
            Numero de puertas
          </div>
          <div className="itemValue">
            <input type="number"
            value={this.state.numPuertas} name="numPuertas" onChange={this.onChangeInput}/>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = CarroType;
