import BaseStore from './baseStore';
import Constants from '../constants/paymentConstants';
import _ from 'lodash';

class PaymentStore extends BaseStore {

  /**
  * TODO Get the data from api (payment state can be different for a different users)
  */
  constructor() {
    super();
    this.userDirections = [];
    this.paymentMethods = [];
    this.paymentState = this.getRecommendedPaymentState();
    this.allPaymentStates = [
      { order: 0, name: 'obtainDirection' },
      { order: 1, name: 'paymentMethod' },
      { order: 2, name: 'paymentConfirm' },
    ];
  }

  /**
  * get the recommended payment state for user (if has directions, etc..)
  * @returns {Void}
  */
  getRecommendedPaymentState() {
    let paymentState;
    if (this.userDirections.length === 0) {
      paymentState = 'obtainDirection';
    }
    return paymentState;
  }

  getActualPaymentState() {
    return _.cloneDeep(this.paymentState);
  }

  getUserDirections() {
    return _.cloneDeep(this.userDirections);
  }

  getAllPaymentStates() {
    return _.cloneDeep(this.allPaymentStates);
  }

  getPaymentMethods() {
    return _.cloneDeep(this.paymentMethods);
  }

  /**
  * get back in the navigation process, set paymentState element
  * @param {String} actualStateName
  * @returns {Void}
  */
  onNavigationBack(actualStateName) {
    const allPaymentStates = this.getAllPaymentStates();
    const actualState = _.find(allPaymentStates, { name: actualStateName });
    this.paymentState = allPaymentStates[actualState.order - 1].name;
  }

  onAddPaymentMethod(paymentMethod) {
    const newPaymentMethods = this.getPaymentMethods();
    newPaymentMethods.push(paymentMethod);
    this.paymentMethods = newPaymentMethods;
  }

  /**
  * add direction to user directions and change the actualpaymentstate
  * @param {String} newDirection
  * @returns {Void}
  */
  onAddDirection(newDirection) {
    const newDirections = this.getUserDirections();
    newDirections.push(newDirection);
    this.userDirections = newDirections;
    const allPaymentStates = this.getAllPaymentStates();
    const actualState = _.find(allPaymentStates, { name: this.getActualPaymentState() });
    this.paymentState = allPaymentStates[actualState.order + 1].name;
  }

  handleDispatch(payload) {
    const action = payload.action;
    switch (action.type) {

      case Constants.ADD_DIRECTION:
        this.onAddDirection(action.data);
        this.emitChange();
        break;

      case Constants.ON_NAVIGATION_BACK:
        this.onNavigationBack(action.data);
        this.emitChange();
        break;

      case Constants.ADD_PAYMENT_METHOD:
        this.onAddPaymentMethod(action.data);
        this.emitChange();
        break;

      default:
        break;
    }
  }
}


module.exports = new PaymentStore();
