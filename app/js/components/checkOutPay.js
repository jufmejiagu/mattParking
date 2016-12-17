import React from 'react';
import PaymentStore from '../stores/paymentStore';
import Immutable from 'immutable';
import { History } from 'react-router';
import paymentActions from '../actions/paymentActions';
import classNames from 'classnames';
import Api from '../api';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import _ from 'lodash';

const CheckOutPay = React.createClass({

  getActualPaymentState() {
    const actualPaymentState = new Immutable.Map({
      state: PaymentStore.getActualPaymentState(),
    });
    return { actualPaymentState };
  },

  getInitialState() {
    return this.getActualPaymentState();
  },

  onChange() {
    this.setState(this.getActualPaymentState());
  },

  componentWillMount() {
    this.changeEmitter = PaymentStore.onChange(this.onChange);
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  /**
  * init the inputs js (to animate it) use the example, and change the JS to work correctly with
  * strings (Generical strings can be put in the imgs sources)
  * @returns {Void}
  */
  initInputs() {
    const classie = window.classie;

    const onInputFocus = (ev) => {
      const img = ev.target.parentNode.getElementsByTagName('img')[0];
      if (img !== undefined) {
        const currentSrc = img.src;
        const newImg = currentSrc.includes('-gray') ? currentSrc.replace('-gray.svg', '.png') :
          currentSrc;
        img.src = newImg;
      }
      classie.add(ev.target.parentNode, 'input--filled');
    };

    const onInputBlur = (ev) => {
      if (ev.target.value.trim() === '') {
        const img = ev.target.parentNode.getElementsByTagName('img')[0];
        if (img !== undefined) {
          const currentSrc = img.src;
          const newImg = currentSrc.includes('-gray.svg') ? currentSrc :
            img.src.slice(0, img.currentSrc.length - 4).concat('-gray.svg');
          img.src = newImg;
        }
        classie.remove(ev.target.parentNode, 'input--filled');
      }
    };

    [].slice.call(document.querySelectorAll('select.input__field')).forEach((inputEl) => {
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--filled');
        const img = inputEl.parentNode.getElementsByTagName('img')[0];
        if (img !== undefined) {
          const newImg = img.src.replace('-gray.svg', '.png');
          img.src = newImg;
        }
      }
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    [].slice.call(document.querySelectorAll('input.input__field')).forEach((inputEl) => {
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--filled');
        const img = inputEl.parentNode.getElementsByTagName('img')[0];
        if (img !== undefined) {
          const newImg = img.src.replace('-gray.svg', '.png');
          img.src = newImg;
        }
        classie.add(inputEl.parentNode, 'input--filled');
      }
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });
  },

  componentDidMount() {
    this.initInputs();
  },

  componentDidUpdate() {
    this.initInputs();
  },

  /**
  * get the possible states to the shopping cart
  * Pseudo implementation of pattern state
  * @TODO make the state to returning buyer (When has direction and pay method)
  * @return {Object}
  */
  onGetCheckOutPayPossibleStates() {
    return {
      obtainDirection: <CheckOutPay.obtainDirection
        initInputs={this.initInputs}
      />,
      paymentMethod: <CheckOutPay.paymentMethod />,
      paymentConfirm: <CheckOutPay.paymentConfirm />,
    };
  },

  render() {
    const actualPaymentState = this.state.actualPaymentState.toJS().state;
    const checkOutPayPossibleStates = this.onGetCheckOutPayPossibleStates();
    return (
      <article className="checkOutPay" ref="checkOutPay">
        <CheckOutPay.header
          actualPaymentState = { actualPaymentState }
        />
        {checkOutPayPossibleStates[actualPaymentState]}
      </article>
    );
  },
});

CheckOutPay.header = React.createClass({

  mixins: [History],

  propTypes: {
    actualPaymentState: React.PropTypes.string,
  },

  /**
  * Go back in the payment process, if the actual state is the first state go to the shopping cart
  * route
  * @returns {Void}
  */
  onNavigationBack() {
    if (this.props.actualPaymentState === 'obtainDirection') {
      this.history.pushState(null, '/');
    } else {
      paymentActions.onNavigationBack(this.props.actualPaymentState);
    }
  },

  render() {
    const navigationTitles = {
      obtainDirection: 'Dirección de envío',
      paymentMethod: 'Método de pago',
    };
    return (
      <div className="header">
        <div className="navContainer">
          <div
            className="closeElement" onClick={this.onNavigationBack}>
          </div>
        </div>
        <div className="titleContainer">
          <h6>
            {navigationTitles[this.props.actualPaymentState]}
          </h6>
        </div>
      </div>
    );
  },
});

/**
* Dont put the inputs in generical component:
* - Saving more component lifeCycle bubble
* - HTML dynamic is very low (few classNames and 1 conditional state)
* - Dont have more information about the possible uses of the inputs in differents forms
*   (Make generical something with few information is a bad practice, double job refactoring code
*   when the information appear)
*/
CheckOutPay.obtainDirection = React.createClass({

  mixins: [LinkedStateMixin],

  propTypes: {
    initInputs: React.PropTypes.func,
  },

  getInitialState() {
    const userDirections = PaymentStore.getUserDirections();
    const emptyDirection = {
      name: '',
      email: '',
      street: '',
      zipCode: '',
      colony: '',
      state: '',
      street1: '',
      street2: '',
      phone: '',
      city: '',
      zipCodeIsValid: '',
    };
    const userDirection = userDirections.length === 0 ? emptyDirection : userDirections[0];
    return (
      userDirection
    );
  },

  componentDidUpdate() {
    this.props.initInputs();
  },

  onAddDirection() {
    paymentActions.onAddDirection(this.state);
  },

  validateZip() {
    const actualZip = this.state.zipCode;
    const data = Api.validateZipCode(actualZip);
    const isValid = typeof(data) === 'object';
    this.setState({ zipCodeIsValid: isValid });
    if (isValid) {
      this.setState({
        city: data.city,
        state: data.stateId,
      });
    }
  },

  /**
  * Check if the form is totally complete and the email comprobation
  * the email validations was made with
  * http://www.w3schools.com/js/tryit.asp?filename=tryjs_form_validate_email
  * @returns {Bool}
  */
  validForm() {
    let flag = true;
    let key;
    for (key in this.state) {
      if ({}.hasOwnProperty.call(this.state, key)) {
        if (this.state[key] === '') {
          flag = false;
        }
        if (key === 'email') {
          const email = this.state[key];
          const atpos = email.indexOf('@');
          const dotpos = email.indexOf('.');
          if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            flag = false;
          }
        }
      }
    }
    return flag;
  },

  /**
  * Custom handler to zip input (When the input of zip code changes, its necesary revalidate
  * the zipcode) and the data asociate to the direction
  * @param {Event} evt
  * @returns {Void}
  */
  onChangeZipInput(evt) {
    this.setState({
      zipCode: evt.target.value,
      zipCodeIsValid: '',
      colony: '',
      street1: '',
      street2: '',
    });
  },

  render() {
    const isValid = this.validForm();
    const buttonClass = classNames({ active: isValid, disabled: !isValid });
    const zipCodeIsValid = this.state.zipCodeIsValid;
    let validatorClass;
    let validatorMessage;
    let invalidClassToZip;
    if (zipCodeIsValid) {
      validatorClass = 'validator true';
      validatorMessage = 'VÁLIDO';
      invalidClassToZip = '';
    } else {
      validatorClass = 'validator';
      validatorMessage = 'VALIDAR';
      invalidClassToZip = zipCodeIsValid !== '' ? 'invalidClassToZip' : '';
    }
    return (
      <div className="obtainDirection">
        <div className="sliderContainer">
          <ol className="progress-track">
            <li className="progress-done width-10-item">
              <center>
                <div className="icon-wrap">
                  <i className="fa fa-check icon-item-inside-li" aria-hidden="true"></i>
                </div>
              </center>
            </li>
            <li className="progress-todo width-44-item">
              <center>
                <div className="icon-wrap">
                </div>
              </center>
            </li>
            <li className="progress-todo">
              <center>
                <div className="icon-wrap left-item">
                </div>
              </center>
            </li>
          </ol>
        </div>
        <div className="form">
          <div className="inputContainer">
            <span className="input input--fumi">
              <input className="input__field input__field--fumi" type="text" id="name"
                valueLink={this.linkState('name')}
              />
              <label className="input__label input__label--fumi" htmlFor="name">
                <img className="icon--fumi" src="assets/images/happy-gray.svg" />
                <span className="input__label-content input__label-content--fumi">
                  Nombre y apellido
                </span>
              </label>
            </span>
          </div>
          <div className="inputContainer">
            <span className="input input--fumi">
              <input className="input__field input__field--fumi" type="email" id="email"
                valueLink={this.linkState('email')}
              />
              <label className="input__label input__label--fumi" htmlFor="email">
                <img className="icon--fumi" src="assets/images/email-gray.svg" />
                <span className="input__label-content input__label-content--fumi">
                  Correo electrónico
                </span>
              </label>
            </span>
          </div>
          <div className="inputContainer">
            <span className="input input--fumi">
              <input className="input__field input__field--fumi" type="text" id="street"
              valueLink={this.linkState('street')} />
              <label className="input__label input__label--fumi" htmlFor="street">
                <img className="icon--fumi" src="assets/images/street-gray.svg" />
                <span className="input__label-content input__label-content--fumi">
                  Calle y número
                </span>
              </label>
            </span>
          </div>
          <div className="inputContainer">
            <span className={`input input--fumi ${invalidClassToZip}`}>
              <input className="input__field input__field--fumi"
              type="number" id="zipCode" value={this.state.zipCode}
              onChange={this.onChangeZipInput}/>
              {this.state.zipCode !== '' &&
                <button className={validatorClass} onClick={this.validateZip}
                  disabled={zipCodeIsValid}>
                  {validatorMessage}
                </button>
              }
              <label className="input__label input__label--fumi" htmlFor="zipCode">
                <img className="icon--fumi" src="assets/images/zip-gray.svg" />
                <span className="input__label-content input__label-content--fumi">
                  Código postal
                </span>
              </label>
            </span>
          </div>
          {this.state.zipCodeIsValid === true &&
            <div className="formSecondPart">
              <div className="inputContainer">
                <span className="input input--fumi">
                  <input className="input__field input__field--fumi"
                  valueLink={this.linkState('city')}
                  type="text" id="city" />
                  <label className="input__label input__label--fumi" htmlFor="city">
                    <img className="icon--fumi" src="assets/images/city.png" />
                    <span className="input__label-content input__label-content--fumi">
                      Ciudad
                    </span>
                  </label>
                </span>
              </div>
              <div className="inputContainer">
                <span className="input input--fumi">
                  <select className="input__field input__field--fumi" type="text" id="state"
                    valueLink={this.linkState('state')}
                    >
                    <option disabled value=""></option>
                    <option value={1}>Aguascalientes</option>
                    <option value={2}>Baja California</option>
                    <option value={3}>Colima</option>
                  </select>
                  <div className="arrowDown"></div>
                  <label className="input__label input__label--fumi" htmlFor="state">
                    <img className="icon--fumi" src="assets/images/state.png" />
                    <span className="input__label-content input__label-content--fumi">
                      Estado
                    </span>
                  </label>
                </span>
              </div>
              <div className="inputContainer">
                <span className="input input--fumi">
                  <select className="input__field input__field--fumi" type="text" id="colony"
                  valueLink={this.linkState('colony')}
                  >
                    <option disabled value=""></option>
                    <option value={1}>Colonia 1</option>
                    <option value={2}>Colonia 2</option>
                    <option value={3}>Colonia 3</option>
                  </select>
                  <div className="arrowDown"></div>
                  <label className="input__label input__label--fumi" htmlFor="colony">
                    <img className="icon--fumi" src="assets/images/colony.png" />
                    <span className="input__label-content input__label-content--fumi">
                      Colonia
                    </span>
                  </label>
                </span>
              </div>
              <div className="doubleInputContainer">
                <span className="input input--fumi street1">
                  <input className="input__field input__field--fumi" type="text" id="street1"
                  valueLink={this.linkState('street1')}/>
                  <label className="input__label input__label--fumi" htmlFor="street1">
                    <img className="icon--fumi" src="assets/images/street1-gray.svg" />
                    <span className="input__label-content input__label-content--fumi">
                      Entre calle 1
                    </span>
                  </label>
                </span>
                <span className="conector">y</span>
                <span className="input input--fumi inputPseudo">
                  <input className="input__field input__field--fumi street2input"
                  type="text" id="street2"
                  valueLink={this.linkState('street2')} />
                  <label className="input__label input__label--fumi street2" htmlFor="street2">
                    <span className="input__label-content input__label-content--fumi">
                      Calle 2
                    </span>
                  </label>
                </span>
              </div>
              <div className="inputContainer">
                <span className="input input--fumi">
                  <input className="input__field input__field--fumi" type="text" id="phone"
                  valueLink={this.linkState('phone')} />
                  <label className="input__label input__label--fumi" htmlFor="phone">
                    <img className="icon--fumi" src="assets/images/phone-gray.svg" />
                    <span className="input__label-content input__label-content--fumi">
                      Teléfono
                    </span>
                  </label>
                </span>
              </div>
            </div>
          }
        </div>
        <div className="bottomBar">
          <button onClick={this.onAddDirection} className={buttonClass}
          disabled={this.validForm() === false} >
            Finalizar pedido
          </button>
        </div>
      </div>
    );
  },
});


/**
* TODO Implement pattern state with microstate to use tabs (Separate cash in a differente component)
* and create credit card component
* todo outside test project scope
*/
CheckOutPay.paymentMethod = React.createClass({

  /**
  * Get the cash payment shops, this will be made with the direction of the userDirection
  * and return the cash payment shops that the user has available
  * Api.getCashPaymentsShops(PaymentStore.getUserDirections()[0]) or any similar
  */
  getInitialState() {
    const cashPaymentsShops = Api.getCashPaymentsShops();
    return (
      { cashPaymentsShops,
        selectedPaymentMethod: null,
      }
    );
  },

  onSelectcashPaymentShop(event) {
    const selectedPaymentMethod = _.find(this.state.cashPaymentsShops,
      { id: event.target.value });
    this.setState({ selectedPaymentMethod });
  },

  onAddPaymentMethod() {
    paymentActions.onAddPaymentMethod(this.state.selectedPaymentMethod);
  },


  render() {
    const existsPaymentOption = this.state.selectedPaymentMethod !== null;
    const buttonClass = classNames({ active: existsPaymentOption, disabled: !existsPaymentOption });
    return (
      <div className="paymentMethod">
      <div className="sliderContainer">
        <ol className="progress-track">
          <li className="progress-done width-10-item">
            <center>
              <div className="icon-wrap">
                <i className="fa fa-check icon-item-inside-li" aria-hidden="true"></i>
              </div>
            </center>
          </li>
          <li className="progress-done width-44-item">
            <center>
              <div className="icon-wrap">
                <i className="fa fa-check icon-item-inside-li" aria-hidden="true"></i>
              </div>
            </center>
          </li>
          <li className="progress-todo">
            <center>
              <div className="icon-wrap left-item">
              </div>
            </center>
          </li>
        </ol>
      </div>
      <div className="payMethodTabContainer">
        <div className="tab disabled">
          <img src="assets/images/tarjeta.png" alt="tarjeta de crédito " />
          <span>Tarjeta</span>
        </div>
        <div className="tab enable">
          <img src="assets/images/efectivo.svg" alt="efectivo" />
          <span>Efectivo</span>
        </div>
      </div>
      <div className="cashInformationContainer">
        <p className="selectShopsText">
          Selecciona una tienda para realizar tu pago:
        </p>
        <div className="shopsListContainer">
          {this.state.cashPaymentsShops.map((cashPaymentShop, index) =>
            <article className="alt" id={`shop-${index}`} key={`shop-${index}`}>
              <input type="radio" name="selection" value={cashPaymentShop.id}
                onClick={this.onSelectcashPaymentShop}
              />
              <div className="marked" title={cashPaymentShop.name}></div>
              <img src={cashPaymentShop.photoUrl}/>
              <span className="circle"></span>
            </article>
          )}
        </div>
        <p className="giveOrdenText">
          💬 Te daremos una <strong>orden de pago</strong> para que pagues en la tienda.
          En cuanto pagues, tu libro <strong>se envía automáticamente.</strong>
        </p>
      </div>
      <div className="bottomBar">
          <button className={buttonClass} disabled={existsPaymentOption === false}
          onClick={this.onAddPaymentMethod}>
            Siguiente
          </button>
        </div>
      </div>
    );
  },
});

/**
* TODO implement paymentConfirm
* Aliment from payment and shoppingCart store
*/
CheckOutPay.paymentConfirm = React.createClass({
  render() {
    return (
      <div>
        paymentConfirmComponent
      </div>
    );
  },
});

module.exports = CheckOutPay;
