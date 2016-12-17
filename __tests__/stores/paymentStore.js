jest.dontMock('../../app/js/stores/baseStore');
jest.dontMock('../../app/js/constants/paymentConstants');
jest.dontMock('../../app/js/stores/paymentStore');
jest.dontMock('../../app/js/api');
jest.dontMock('object-assign');
jest.dontMock('lodash');
jest.dontMock('react-autobind');
jest.dontMock('../../app/js/dispatcher/dispatcher');

import Constants from '../../app/js/constants/paymentConstants';

describe('payment store', () => {
  let Dispatcher;
  let PaymentStore;

  const onAddDirectionAction = {
    type: Constants.ADD_DIRECTION,
    data: { newDirection: '' },
  };

  const onNavigationBackAction = {
    type: Constants.ON_NAVIGATION_BACK,
    data: 'paymentMethod',
  };

  const onAddPaymentMethodAction = {
    type: Constants.ADD_PAYMENT_METHOD,
    data: { newPaymentMethod: '' },
  };

  beforeEach(() => {
    Dispatcher = require('../../app/js/dispatcher/dispatcher');
    PaymentStore = require('../../app/js/stores/paymentStore');
  });

  it ('payment initializated with the correct data', () => {
    expect(PaymentStore.getUserDirections().length).toEqual(0);
  });

  it ('payment store update the directions when the user add it', () => {
    const oldDirectionsLength = PaymentStore.getUserDirections().length;
    Dispatcher.handleViewAction(onAddDirectionAction);
    const directionsLength = PaymentStore.getUserDirections().length;
    expect(directionsLength).toEqual(oldDirectionsLength + 1);
  });

  it ('payment store on navigation back, change the payment state', () => {
    Dispatcher.handleViewAction(onNavigationBackAction);
    expect(PaymentStore.getActualPaymentState()).toEqual('obtainDirection');
  });

  it ('payment store update the payment methos when the user add it', () => {
    const oldPaymentMethosLength = PaymentStore.getPaymentMethods().length;
    Dispatcher.handleViewAction(onAddPaymentMethodAction);
    const paymentMethodsLength = PaymentStore.getPaymentMethods().length;
    expect(paymentMethodsLength).toEqual(oldPaymentMethosLength + 1);
  });

});
