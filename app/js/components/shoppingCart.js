import React from 'react';
import ShoppingCartStore from '../stores/shoppingCartStore';
import BookCard from './bookCard';
import SuggestedBookCard from './suggestedBookCard';
import _ from 'lodash';
import Immutable from 'immutable';
import classNames from 'classnames';
import { History } from 'react-router';

const ShoppingCart = React.createClass({

  mixins: [History],

  getStoreData() {
    const itemsInShoppingCart = new Immutable.Map({
      list: ShoppingCartStore.getItemsInShoppingCart(),
    });
    return {
      itemsInShoppingCart,
    };
  },

  getInitialState() {
    return this.getStoreData();
  },

  onChange() {
    this.setState(this.getStoreData());
  },

  componentWillMount() {
    this.changeEmitter = ShoppingCartStore.onChange(this.onChange);
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  /**
  * Reduce the values in the itemsInShoppingCart state, this values will be display to the
  * user
  * @param {String} valueToReduce
  * @returns {Int} value
  */
  reduceValueOfShoppingCart(valueToReduce) {
    const itemsInShoppingCart = this.state.itemsInShoppingCart.toJS().list;
    const value = _.reduce(itemsInShoppingCart, (acum, itemInCart) =>
      acum + (itemInCart[valueToReduce] * itemInCart.quantity)
      , 0);
    return value;
  },

  /**
  * transition to payment route
  * @returns {Void}
  */
  buy() {
    this.history.pushState(null, 'payment');
  },

  render() {
    const itemsInShoppingCart = this.state.itemsInShoppingCart.toJS().list;
    const buyPrice = this.reduceValueOfShoppingCart('price');
    const deliverPrice = this.reduceValueOfShoppingCart('deliverPrice');
    const valueToDeliveryFree = ShoppingCartStore.getValueToDeliveryFree();
    return (
      <article className="shoppingCart" ref="shoppingCart">
        <div className="header">
          <div className="navContainer">
            <img src="assets/images/close.svg" alt="close Img" />
          </div>
          <div className="titleContainer">
            <h6>
              Tu Carrito
            </h6>
          </div>
        </div>
        <div className="content">
          <ShoppingCart.Detail
            itemsInShoppingCart = {itemsInShoppingCart}
            buyPrice = {buyPrice}
            deliverPrice = {deliverPrice}
          />
          <ShoppingCart.BooksList
            itemsInShoppingCart = {itemsInShoppingCart}
          />
          <ShoppingCart.DeliveryPromo
            buyPrice = {buyPrice}
            valueToDeliveryFree = {valueToDeliveryFree}
          />
          <ShoppingCart.SuggestedBooks />
        </div>
        <div className="bottomBar">
          <button onClick={this.buy}>
            Hacer el pedido
          </button>
        </div>
      </article>
    );
  },
});

ShoppingCart.Detail = React.createClass({

  propTypes: {
    itemsInShoppingCart: React.PropTypes.array,
    buyPrice: React.PropTypes.number,
    deliverPrice: React.PropTypes.number,
  },

  render() {
    const count = _.reduce(this.props.itemsInShoppingCart, (acum, book) =>
      acum + (book.quantity)
      , 0);
    const bookCount = `${count} Libros`;
    const total = (this.props.buyPrice + this.props.deliverPrice).toFixed(2);
    return (
      <div className="shoppingCartDetailContainer">
        <div className="item">
          <strong className="description">{bookCount}</strong>
          <span className="price">${this.props.buyPrice.toFixed(2)}</span>
        </div>
        <div className="item">
          <strong className="description">Envío</strong>
          <span className="price">${this.props.deliverPrice.toFixed(2)}</span>
        </div>
        <hr />
        <div className="item">
          <strong className="description">Total</strong>
          <span className="total">${total}</span>
        </div>
      </div>
    );
  },
});

ShoppingCart.BooksList = React.createClass({

  propTypes: {
    itemsInShoppingCart: React.PropTypes.array,
  },

  render() {
    return (
      <div className="shoppingCartBookListContainer">
        <strong>
          LIBROS:
        </strong>
        <div className="bookCardsContainer">
          {this.props.itemsInShoppingCart.map((item, index) =>
              <BookCard
                key = {`book-card-${index}`}
                editable = {true}
                book = {item}
              />
          )}
        </div>
      </div>
    );
  },
});

ShoppingCart.DeliveryPromo = React.createClass({

  propTypes: {
    valueToDeliveryFree: React.PropTypes.number,
    buyPrice: React.PropTypes.number,
  },

  render() {
    const diference = (this.props.valueToDeliveryFree - this.props.buyPrice).toFixed(1);
    const isFree = diference < 0;
    const messageClass = classNames({
      isFree,
      noFree: !isFree,
    });
    const message = isFree ?
      <span> <strong>¡TU ENVÍO ES GRATIS!</strong> Agrega más libros</span> :
      <span>
        ¡Te faltan <b>${diference}</b> para <strong>ENVÍO GRATIS</strong>! Agrega más libros
      </span>;
    return (
      <div className="deliveryPromo">
        <div className={messageClass}>
          {message}
        </div>
      </div>
    );
  },
});

ShoppingCart.SuggestedBooks = React.createClass({


  getStoreData() {
    const suggestedBooks = new Immutable.Map({
      list: ShoppingCartStore.getSuggestedBooks(),
    });
    return {
      suggestedBooks,
    };
  },

  getInitialState() {
    return this.getStoreData();
  },

  onChange() {
    this.setState(this.getStoreData());
  },

  componentWillMount() {
    this.changeEmitter = ShoppingCartStore.onChange(this.onChange);
  },

  componentWillUnmount() {
    this.changeEmitter.off();
  },

  render() {
    const suggestedBooks = this.state.suggestedBooks.toJS().list;
    return (
      <div className="suggestedBooksContainer">
        {suggestedBooks.map((item, index) =>
            <SuggestedBookCard
              key = {`suggested-book-${index}`}
              book = {item}
            />
        )}
      </div>
    );
  },
});

module.exports = ShoppingCart;
