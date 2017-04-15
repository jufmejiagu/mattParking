import BaseStore from './baseStore';
import Constants from '../constants/LoginConstants';
import _ from 'lodash';

class LoginStore extends BaseStore {

  /**
  * TODO Get the data from api (payment state can be different for a different users)
  */
  constructor() {
    super();
    if (window.localStorage.getItem('parkingMattelsaUser')) {
      const { userData, userType } = JSON.parse(window.localStorage.getItem('parkingMattelsaUser'));
      this.user = userData;
      this.userType = userType;
      return;
    }
    this.userType = null;
    this.user = null;
  }

  getUserType() {
    return _.cloneDeep(this.userType);
  }

  getUser() {
    return _.cloneDeep(this.user);
  }


  onLogin(payloadData) {
    const { userData, userType } = payloadData;
    this.user = userData;
    this.userType = userType;
    window.localStorage.setItem('parkingMattelsaUser', JSON.stringify(payloadData));
  }

  onLogout() {
    this.user = null;
    this.userType = null;
    window.localStorage.removeItem('parkingMattelsaUser');
  }

  handleDispatch(payload) {
    const action = payload.action;
    switch (action.type) {

      case Constants.ON_LOGIN:
        this.onLogin(action.data);
        this.emitChange();
        break;

      case Constants.ON_LOGOUT:
        this.onLogout();
        this.emitChange();
        break;

      default:
        break;
    }
  }
}


module.exports = new LoginStore();
