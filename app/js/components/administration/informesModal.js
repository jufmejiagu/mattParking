import React from 'react';
import ParkingStore from '../../stores/parkingStore';
import ParkingActions from '../../actions/parking-actions';

const InformesModal = React.createClass({

  getInitialState() {
    return {
      data: [],
      error: '',
      mes: '',
      cedula: '',
    };
  },

  componentWillMount() {
    this.changeEmitter = ParkingStore.onChange(this.onChange);
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  onChange() {
    this.setState({ data: ParkingStore.getInformeData() });
  },

  isValid() {
    if (this.state.cedula !== '' || this.state.mes !== '') {
      return true;
    }
    return false;
  },

  onChangeInput(event) {
    const auxObject = {};
    const context = this;
    if (event.target.name === 'mes' && (event.target.value > 12 || event.target.value < 1)
      && event.target.value !== ''
    ) {
      this.setState({ error: 'Ingrese un numero de mes valido' });
      return;
    }
    if (this.state.error === 'Ingrese un numero de mes valido') this.setState({ error: '' });
    auxObject[event.target.name] = event.target.value;
    this.setState(auxObject, () => {
      if (context.isValid()) {
        context.setState({ error: '' });
      }
    });
  },

  onSearchReport() {
    if (!this.isValid()) {
      this.setState({ error: 'Debe ingresar todos los campos' });
      return;
    }
    const url = `/api/users/${this.state.cedula}/parkings/${this.state.mes}`;
    const context = this;
    ParkingActions.onSearchReport(url, (error) => {
      if (error) {
        context.setState({ error });
        return;
      }
    });
  },

  render() {
    return (
      <div className="informeModal">
        <h3>Informe mensual</h3>
        <div className="instructions">
          Ingrese la cedula del empleado y el mes:
        </div>
        <div className="dataInformation">
          <div className="item">
            <div className="itemName">
              Cedula
            </div>
            <div className="itemValue">
              <input name="cedula" value={this.state.cedula} onChange={this.onChangeInput}
                placeholder="Cedula"
              />
            </div>
          </div>
          <div className="item">
            <div className="itemName">
              Numero del mes
            </div>
            <div className="itemValue">
              <input name="mes" value={this.state.mes} onChange={this.onChangeInput}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="buttonsContainer">
          <button onClick={() => {this.props.onCloseInformesModal(); }}>
            Cancelar
          </button>
          <button onClick={this.onSearchReport}>
            Buscar
          </button>
        </div>
        {this.state.error &&
          <div className="error">
            {this.state.error}
          </div>
        }
        {this.state.data.length !== 0 &&
          <table>
            <thead>
              <tr>
                 <th>Fecha entrada</th>
                 <th>Vehiculo (Placa)</th>
                 <th>Numero celda</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, index) =>
                <tr key={`${index}-table-element`}>
                  <td>{String(new Date(item.fechaEntrada))}</td>
                  <td>{item.placa}</td>
                  <td>{item.numeroCelda}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    );
  },
});

module.exports = InformesModal;
