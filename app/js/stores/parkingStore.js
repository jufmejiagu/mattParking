import BaseStore from './baseStore';
import Constants from '../constants/ParkingConstants';
import _ from 'lodash';

class ParkingStore extends BaseStore {

  constructor() {
    super();
    this.vehicles = [];
    this.informeData = [];
    this.errorMessage = null;
  }

  /**
  * Return a vehicles copy
  * @returns  {Array}
  */
  getVehicles() {
    return _.cloneDeep(this.vehicles);
  }

  /**
  * Return a vehicles copy
  * @returns {Array}
  */
  getInformeData() {
    return _.cloneDeep(this.informeData);
  }

  onSetVehicles(vehicles) {
    this.vehicles = vehicles;
  }

  onSetInformeData(data) {
    this.informeData = data;
  }

  onAddVehicle(vehicle) {
    this.vehicles = this.getVehicles().concat([vehicle]);
  }

  onSetError(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getErrorMessage() {
    return _.cloneDeep(this.errorMessage);
  }

  handleDispatch(payload) {
    const action = payload.action;
    switch (action.type) {

      case Constants.ON_SET_VEHICLES:
        this.onSetVehicles(action.data);
        this.emitChange();
        break;

      case Constants.ON_ADD_VEHICLE:
        this.onAddVehicle(action.data);
        this.emitChange();
        break;

      case Constants.ON_SEARCH_ERROR:
        this.onSetError(action.data);
        this.emitChange();
        break;

      case Constants.ON_RESET_STORE:
        this.onSetVehicles([]);
        this.emitChange();
        break;

      case Constants.ON_SET_INFORME_DATA:
        this.onSetInformeData(action.data);
        this.emitChange();
        break;

      default:
        break;
    }
  }
}


module.exports = new ParkingStore();
