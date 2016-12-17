import React from 'react';
import shoppingCartActions from '../actions/shoppingCartActions';

const BookCard = React.createClass({

  propTypes: {
    editable: React.PropTypes.bool,
    book: React.PropTypes.object,
  },

  onDeleteBook() {
    const confirmation = confirm('¿Quieres eliminarlo de tu carrito?'); //eslint-disable-line
    if (confirmation) {
      shoppingCartActions.onRemoveItemFromCart(this.props.book);
    }
  },

  onAddItemToCart() {
    shoppingCartActions.onAddItemToCart(this.props.book);
  },

  onReduceBookQuantity() {
    shoppingCartActions.onReduceItemQuantity(this.props.book);
  },

  render() {
    const deliveryDate = `${this.props.book.deliverDate}`;
    const deliveryPrice = `($${this.props.book.deliverPrice})`;
    const bookPrice = `$${this.props.book.price.toFixed(2)}`;
    const classToBook = this.props.book.quantity === 1 ? 'disabled' : '';
    return (
      <div className="bookCardContainer" ref="bookCard">
        <img className="bookImg" src={this.props.book.photoUrl} />
        <div className="bookContent">
          <div className="bookDescription">
            <div className="bookTitle">
              <h5>{this.props.book.name}</h5>
              <span className="autor">{this.props.book.autor}</span>
            </div>
            <div className="bookGeneralInformation">
              <div className="informationItem">
                <img src="assets/images/closed-book.svg" />
                <span>{this.props.book.format}</span>
              </div>
              <div className="informationItem">
                <img src="assets/images/translation.svg" />
                <span>{this.props.book.language}</span>
              </div>
              <div className="informationItem">
                <img className="deliveryImg" src="assets/images/delivery-truck.svg" />
                <span className="deliveryDate">{deliveryDate}</span>
                <span className="deliveryPrice">{deliveryPrice}</span>
              </div>
            </div>
          </div>
          <div className="bookMoneyDescription">
            <img className="deleteIcon" src="assets/images/close.svg" alt="close Img"
              onClick={this.onDeleteBook}
            />
            <div className="quantity">
              <button onClick={this.onReduceBookQuantity} className={classToBook}
              disabled={this.props.book.quantity === 1}
              >
                <img src="assets/images/minus.svg" />
              </button>
              <span className="count">
                {this.props.book.quantity}
              </span>
              <button onClick={this.onAddItemToCart}>
                <img src="assets/images/plus.svg" />
              </button>
            </div>
            <span className="bookPrice">{bookPrice}</span>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = BookCard;
