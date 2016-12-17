import BaseStore from './baseStore';
import Constants from '../constants/shoppingCartConstants';
import Api from '../api';
import _ from 'lodash';

class ShoppingCartStore extends BaseStore {

  /**
  * Suggested Books it's duplied to reacreate the mockup data
  */
  constructor() {
    super();
    this.itemsInShoppingCart = Api.getUserItemsInShoppingCart();
    this.valueToDeliveryFree = Api.getUserValueToDeliveryFree();
    this.suggestedBooks = _.concat(Api.getUserSuggestedBooks(), Api.getUserSuggestedBooks());
  }

  /**
  * Return a copy from a items in shopping cart (to Avoid erorrs)
  * @returns {Array} itemsInShoppingCart
  */
  getItemsInShoppingCart() {
    return _.cloneDeep(this.itemsInShoppingCart);
  }

  /**
  * Return a copy from a value to delivery free (to Avoid erorrs)
  * @returns {Int} valueToDeliveryFree
  */
  getValueToDeliveryFree() {
    return _.cloneDeep(this.valueToDeliveryFree);
  }

  /**
  * Return a copy from a suggestedBooks list (to Avoid erorrs)
  * @returns {Array} suggestedBooks
  */
  getSuggestedBooks() {
    return _.cloneDeep(this.suggestedBooks);
  }

  /**
  * Remove item from shopping cart using lodash
  * @param {Object} bookToRemove
  * @returns {Void}
  */
  onRemoveItemFromCart(bookToRemove) {
    const newItemsInShoppingCart = this.getItemsInShoppingCart();
    _.remove(newItemsInShoppingCart, (item) =>
      item.id === bookToRemove.id
    );
    this.itemsInShoppingCart = newItemsInShoppingCart;
  }

  /**
  * add item to Shoping cart (If the item exists aument in 1 the quantity
  * push to the itemsInShoppingCart array)
  * @param {Object} bookToAdd
  * @returns {Void}
  */
  onAddItemToCart(bookToAdd) {
    let flag = true;
    const newItemsInShoppingCart = this.getItemsInShoppingCart().map((item) => {
      const book = item;
      if (bookToAdd.id === item.id) {
        book.quantity = book.quantity + 1;
        flag = false;
      }
      return book;
    });
    if (flag) {
      const newBook = bookToAdd;
      newBook.quantity = 1;
      newItemsInShoppingCart.push(newBook);
    }
    this.itemsInShoppingCart = newItemsInShoppingCart;
  }

  /**
  * reduce the quantity of item in a itemsInShoppingCart, if the item has quantity === 1
  * the quantity has been not reduced
  * @param {Object} itemToReduce
  * @returns {Void}
  */
  onReduceItemQuantity(itemToReduce) {
    const newItemsInShoppingCart = this.getItemsInShoppingCart().map((item) => {
      const book = item;
      if (book.id === itemToReduce.id && book.quantity > 1) {
        book.quantity = book.quantity - 1;
      }
      return book;
    });
    this.itemsInShoppingCart = newItemsInShoppingCart;
  }

  handleDispatch(payload) {
    const action = payload.action;

    switch (action.type) {

      case Constants.ADD_ITEM_TO_CART:
        this.onAddItemToCart(action.data);
        this.emitChange();
        break;

      case Constants.REMOVE_ITEM_FROM_CART:
        this.onRemoveItemFromCart(action.data);
        this.emitChange();
        break;

      case Constants.REDUCE_ITEM_QUANTITY:
        this.onReduceItemQuantity(action.data);
        this.emitChange();
        break;

      default:
        break;
    }
  }
}


module.exports = new ShoppingCartStore();
