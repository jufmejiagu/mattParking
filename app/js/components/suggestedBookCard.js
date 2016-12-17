import React from 'react';
import shoppingCartActions from '../actions/shoppingCartActions';

const SuggestedBookCard = React.createClass({

  propTypes: {
    book: React.PropTypes.object,
  },

  onAddItemToCart() {
    shoppingCartActions.onAddItemToCart(this.props.book);
  },

  render() {
    const bookPrice = `$${this.props.book.price.toFixed(2)}`;
    return (
      <div className="suggestedBookCardContainer" ref="suggestedBookCard">
        <img src={this.props.book.photoUrl} alt={this.props.book.name}/>
        <div className="moneyBar">
          <span>{bookPrice}</span>
          <img src="assets/images/add-to-cart.svg" onClick={this.onAddItemToCart}/>
        </div>
      </div>
    );
  },
});

module.exports = SuggestedBookCard;
