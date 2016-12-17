import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/paymentConstants';

const PaymentActions = {

  onNavigationBack(actualState) {
    const type = Constants.ON_NAVIGATION_BACK;
    Dispatcher.handleViewAction({
      data: actualState,
      type,
    });
  },

  onAddDirection(newDirection) {
    const type = Constants.ADD_DIRECTION;
    Dispatcher.handleViewAction({
      data: newDirection,
      type,
    });
  },

  onAddPaymentMethod(newPaymentMethod) {
    const type = Constants.ADD_PAYMENT_METHOD;
    Dispatcher.handleViewAction({
      data: newPaymentMethod,
      type,
    });
  },

};

export default PaymentActions;
