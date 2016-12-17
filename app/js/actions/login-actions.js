import Dispatcher from '../dispatcher/dispatcher.js';
import history from '../router/history';
import LoginAPI from '../utils/login-api-utils';
import Constants from '../constants/login-constants';


const LoginActions = {

  transitionToMap(){
    history.pushState(null, `/map`);
  },

  transitionToLogin(){
    history.pushState(null, `/login`);
  },

  logOut(){
    Dispatcher.handleViewAction({
      type: Constants.LOGOUT,
      callback: this.transitionToLogin
    })
  },

  deleteSnackbarMessage(){
    Dispatcher.handleViewAction({
      type: Constants.DELETE_SNACKBAR_MESSAGE
    })
  },

  logIn(userData) {
    LoginAPI.login(userData, (err, res) => {
      if (err) {
        Dispatcher.handleViewAction({
        type: Constants.SET_SNACKBAR_MESSAGE
        });
        return;
      } else {
        Dispatcher.handleViewAction({
          type: Constants.SET_TOKEN
        });
      }
    });
  }
};

export default LoginActions;
