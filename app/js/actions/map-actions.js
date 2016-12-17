import Dispatcher from '../dispatcher/dispatcher.js';
import MapAPI from '../utils/map-api-utils';
import Constants from '../constants/map-constants';
import language from '../utils/es';
import { Observable } from 'rx';


const MapActions = {


  /**
  * Set in the store data the selected item
  * @param {object} feature
  * @returns {void}
  */

  onSetSelectedItem(feature, cb, state) {
    const newFeature = feature;
    newFeature.properties.metadata.selected = state;
    newFeature.id = newFeature.properties.metadata.id;
    Dispatcher.handleViewAction({
      type: Constants.SET_SELECTED_ITEM,
      feature: newFeature,
      callback: cb,
    });
  },

  /**
  * get the history of the actual item and call the display of the component
  * @param {object} item
  * @param {function} cb
  * @returns {void}
  */

  onGetHistoryItem(item, cb) {
    MapAPI.getHistoryItem(item.id, (err, res) => {
      if (err) {
        return null;
      } else {
        cb(res.data);
      }
      return true;
    });
  },


  /**
  * get the users
  * @return {void}
  */

  getUsers() {
    const example = Observable.create((observer) => {
      MapAPI.getUsers(observer);
    });
    example.subscribe(
      (data) => {
        Dispatcher.handleViewAction({
          type: Constants.GET_USERS,
          data,
        });
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        // console.log('Rx completed');
      }
    );
  },

  getPoints(callback, center, zoom, selectedItems) {
    let data = null;
    MapAPI.getPits(center, zoom, (err, res) => {
      if (err) {
        return null;
      } else {
        Dispatcher.handleViewAction({
          type: Constants.SET_MAP_DATA,
          data: res,
          callback: callback,
        });
      }
    });
  },

  /**
  * @param {object item}
  * @param {function} callback -> set the map with mapaData in Store
  * @return {void}
  */

  onRejectForm(data, item, callback) {

    MapAPI.onRejectForm(data, item.properties.metadata.id, (err, res)=> {
      if (err) {
        return null;
      } else {
        Dispatcher.handleViewAction({
          type: Constants.REJECT_FORM,
          data: res.data,
          callback: callback
        });
      }
    });
  },

  /**
  * on send video file
  * @param {function} callback -> Set the view
  * @param {object} item
  * @param {object} formData
  */

  onUploadVideo(item, formData, callback) {
    MapAPI.onUploadVideo(item, formData, (err, res) => {
      if (err) {
        return null;
      } else {
        Dispatcher.handleViewAction({
          type: Constants.UPLOAD_VIDEO,
          data: res,
          callback: callback,
        });
      }
    });
  },

  /**
  * @param {function} callback
  * @param {object} form
  */

  onUpdatePhoto(formData, item, itemId, name, cb, doubleKeyItem) {
    MapAPI.onUploadPhoto(formData, item, itemId, name, (err, res) => {
      if (err) {
        return null;
      } else {
        if (doubleKeyItem === 'first') {
          cb(JSON.parse(res).url, 'TO');
        } else if (doubleKeyItem === 'second') {
          cb(JSON.parse(res).url, 'FROM');
        } else {
          cb(JSON.parse(res).url, '');
        }
      }
    });
  },

  /**
  * search a item in the map
  * @param {string} id
  * @param {string} type
  * @return void
  */

  search(id, type, onOpenSlider, onFly, onShowSnackBar) {
    MapAPI.search(id, type, (err, res) => {
      if (err) {
        return null;
      } else {
        if (typeof res.features[0] === 'object') {
          onOpenSlider(res.features[0]);
          onFly(res.features[0].geometry.coordinates[0], res.features[0].geometry.coordinates[1]);
        } else {
          onShowSnackBar(language.search.error);
        }
      }
    });
  },


  /**
  * get item
  * @param {number} featureId
  */

  getItem(featureId, onOpenSlider) {
    MapAPI.getItem(featureId, (err, res) => {
      if (err) {
        return null;
      } else {
        onOpenSlider(res.data);
      }
    });
  },

  /**
  * @param {object} item
  * @param {function} callback -> set the map with mapaData in Store
  * @return {void}
  */

  onAcceptForm(item, callback) {
    MapAPI.onAcceptForm(item.properties.metadata.id, (err, res) => {
      if (err) {
      return null;
      } else {
        Dispatcher.handleViewAction({
          type: Constants.ACCEPT_FORM,
          data: res.data,
          callback: callback,
        });
      }
    });
  },

  /*
  * @param {array} newFields
  * @param {object} item
  * @param {function} cb
  */

  onSaveEditFields(newFields, item, cb, onShowSnackBar, checkedItems) {
    let newItem = item;
    for (let index in newItem.properties) {
      for (let indexNewFields in newFields) {
        if (newFields[indexNewFields].type === 'none') {
          if (index === newFields[indexNewFields].item
            && newFields[indexNewFields].newValue !== '') {
            newItem.properties[index] = newFields[indexNewFields].newValue;
          }
        } else {
          if (index === newFields[indexNewFields].type) {
            for (let inTypeItem in newItem.properties[index]) {
              if (inTypeItem === newFields[indexNewFields].item &&
              newFields[indexNewFields].newValue !== '') {
                newItem.properties[index][inTypeItem] = newFields[indexNewFields].newValue;
              }
            }
          }
        }
      }
    }
    newItem.properties.checkedItems = checkedItems;
    MapAPI.onSaveEditFields(newItem, (err, res) => {
      if (err) {
        return null;
      } else {
        Dispatcher.handleViewAction({
          type: Constants.SAVE_EDIT_FIELDS,
          data: res.data,
          callback: cb,
          onShowSnackBar,
        });
      }
    });
  },

};

export default MapActions;
