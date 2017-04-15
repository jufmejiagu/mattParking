import React from 'react';

const MotoType = React.createClass({

  getInitialState() {
    return {
      nombre: 'moto',
      cilindraje: '',
      tiempos: '',
    };
  },

  componentDidMount() {
    this.onSendTipo();
  },

  onSendTipo() {
    const tipo = {
      nombre: this.state.nombre,
      cilindraje: this.state.cilindraje,
      tiempos: this.state.tiempos,
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
            Moto
          </div>
        </div>
        <div className="item">
          <div className="itemName">
            Cilindraje
          </div>
          <div className="itemValue">
            <input value={this.state.cilindraje} name="cilindraje" onChange={this.onChangeInput}/>
          </div>
        </div>
        <div className="item">
          <div className="itemName">
            Tiempos
          </div>
          <div className="itemValue">
            <input value={this.state.tiempos} name="tiempos" onChange={this.onChangeInput}/>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = MotoType;
