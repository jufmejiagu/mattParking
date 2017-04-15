import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/LoginConstants';
import Api from '../api';

const LoginActions = {

  onLogin(userData, userType, errorCallback) {
    Api.onCallAjaxPromise('/api/auth/login', 'POST', userData).then((response) => {
      if (!response.ok) {
        errorCallback(response.statusText);
        return;
      }
      response.json().then((jsonResponse) => {
        Dispatcher.handleViewAction({
          data: { userData: jsonResponse, userType },
          type: Constants.ON_LOGIN,
        });
      });
    }).catch(() => {
      errorCallback('Intentalo de nuevo.');
    });
  },

  onCreateUsuario(nuevoUsuario, errorCallback) {
    Api.onCallAjaxPromise('/api/users', 'POST', nuevoUsuario).then((response) => {
      if (!response.ok) {
        errorCallback(response.statusText);
        return;
      }
      response.json().then((jsonResponse) => {
        if (jsonResponse) {
          errorCallback();
        }
      });
    });
  },

  onLogout() {
    const type = Constants.ON_LOGOUT;
    Dispatcher.handleViewAction({ type });
  },


};

export default LoginActions;
