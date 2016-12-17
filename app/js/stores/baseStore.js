import Dispatcher from '../dispatcher/dispatcher';
import { EventEmitter } from 'events';
import autoBind from 'react-autobind';

const CHANGE_EVENT = 'change';

/**
* Generical class to extend in the stores, has the principal
* methods to work
*/
class BaseStore {

  constructor() {
    autoBind(this);
    this._emitter = new EventEmitter();
    if (this.handleDispatch) {
      this.dispatchToken = Dispatcher.register(this.handleDispatch);
    }
  }

  /**
  * empty method: Obligatory use in the store instance to receive the dispatcher payloads
  * @returns {Void}
  */
  handleDispatch(payload) { //eslint-disable-line
  }

  /**
  * when the stores changes call the callback function, set the listeners*
  * @param {Function} callback
  * @return {Object}
  */
  onChange(callback) {
    this._emitter.setMaxListeners(20);
    this._emitter.on(CHANGE_EVENT, callback);
    return {
      off: () => {
        this._emitter.removeListener(CHANGE_EVENT, callback);
      },
    };
  }

  /**
  * Emit the change to the subscripters
  * @param {Object} changeData
  * @returns {Void}
  */
  emitChange(changeData) {
    const data = changeData || {};
    data._store = this;
    this._emitter.emit(CHANGE_EVENT, data);
  }
}


module.exports = BaseStore;
