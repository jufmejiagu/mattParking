import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/ParkingConstants';
import Api from '../api';

const ParkingActions = {

  onSearchVehicles(actionData, errorCallback) {
    const url = actionData.cedula ? `/api/users/${actionData.cedula}/vehicles` :
    `/api/vehicles/${actionData.placa}`;
    this.onResetStore();
    Api.onCallAjaxPromise(url).then((response) => {
      if (!response.ok) {
        errorCallback(response.statusText);
        return;
      }
      response.json().then((jsonResponse) => {
        const dataToStore = !Array.isArray(jsonResponse) ? [jsonResponse] : jsonResponse;
        const type = Constants.ON_SET_VEHICLES;
        Dispatcher.handleViewAction({
          data: dataToStore,
          type,
        });
      });
    });
  },

  onRegisterVehicle(actionData, errorCallback) {
    const url = '/api/vehicles';
    Api.onCallAjaxPromise(url, 'POST', actionData).then((response) => {
      if (!response.ok) {
        errorCallback(response.statusText);
        return;
      }
      errorCallback();
      response.json().then((jsonResponse) => {
        const type = Constants.ON_ADD_VEHICLE;
        Dispatcher.handleViewAction({
          data: jsonResponse,
          type,
        });
      });
    });
  },

  onRegisterNewVehicleEntry(actionData, errorCallback) {
    const url = '/api/parking';
    Api.onCallAjaxPromise(url, 'POST', actionData).then((response) => {
      if (!response.ok) {
        errorCallback(response.statusText);
        return;
      }
      errorCallback();
    });
  },

  onSearchReport(url, errorCallback) {
    Api.onCallAjaxPromise(url, 'GET').then((response) => {
      if (!response.ok) {
        errorCallback(response.statusText);
        return;
      }
      response.json().then((jsonResponse) => {
        if (jsonResponse.length === 0) {
          errorCallback('No hay registros asociados a este usuario en el mes buscado');
        }
        const type = Constants.ON_SET_INFORME_DATA;
        Dispatcher.handleViewAction({
          data: jsonResponse,
          type,
        });
      });
    });
  },

  onResetStore() {
    const type = Constants.ON_RESET_STORE;
    Dispatcher.handleViewAction({
      type,
    });
  },

};

export default ParkingActions;
