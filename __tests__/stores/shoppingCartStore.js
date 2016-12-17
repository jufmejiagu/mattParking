jest.dontMock('../../app/js/stores/baseStore');
jest.dontMock('../../app/js/constants/shoppingCartConstants');
jest.dontMock('../../app/js/stores/shoppingCartStore');
jest.dontMock('../../app/js/api');
jest.dontMock('object-assign');
jest.dontMock('lodash');
jest.dontMock('react-autobind');
jest.dontMock('../../app/js/dispatcher/dispatcher');

import Constants from '../../app/js/constants/shoppingCartConstants';

const boldBook = {
  name: 'Bold',
  price: 89.99,
  deliverPrice: 44,
  autor: 'Peter H Diamonds',
  format: 'Tapa blanda',
  photoUrl: 'assets/images/bold.jpg',
  deliverDate: 'nov 4 - nov 6',
  language: 'Inglés',
  id: 'book3',
};

const despuesBook = {
  name: 'Yo antes de ti',
  price: 340.00,
  deliverPrice: 44,
  autor: 'Joyo Moyes',
  format: 'Tapa blanda',
  photoUrl: 'assets/images/yo_antes_de_ti.jpg',
  deliverDate: 'nov 4 - nov 6',
  language: 'Español',
  id: 'book1',
};

describe('shoppingCartStore', () => {
  let Dispatcher;
  let ShoppingCartStore;

  const onAddItemToCartAction = {
    type: Constants.ADD_ITEM_TO_CART,
    data: boldBook,
  };

  const onRemoveItemFromCartAction = {
    type: Constants.REMOVE_ITEM_FROM_CART,
    data: despuesBook,
  };

  const onReduceQuantityAction = {
    type: Constants.REDUCE_ITEM_QUANTITY,
    data: despuesBook,
  };

  const onAumentQuantityAction = {
    type: Constants.ADD_ITEM_TO_CART,
    data: despuesBook,
  };

  beforeEach(() => {
    Dispatcher = require('../../app/js/dispatcher/dispatcher');
    ShoppingCartStore = require('../../app/js/stores/shoppingCartStore');
  })

  it ('ShoppingCartStore initializated with the correct data', () => {
    expect(ShoppingCartStore.getItemsInShoppingCart().length).toEqual(2);
  });

  it ('ShoppingCartStore add book to cart', () => {
    const oldLength = ShoppingCartStore.getItemsInShoppingCart().length;
    Dispatcher.handleViewAction(onAddItemToCartAction);
    expect(ShoppingCartStore.getItemsInShoppingCart().length).toEqual(oldLength + 1);
  });

  it ('shoppingCartStore remove book from cart', () => {
    const oldLength = ShoppingCartStore.getItemsInShoppingCart().length;
    Dispatcher.handleViewAction(onRemoveItemFromCartAction);
    expect(ShoppingCartStore.getItemsInShoppingCart().length).toEqual(oldLength - 1);
  });

  it ('shoppingCartStore reduce quantity book from cart', () => {
    let oldQuantity;
    let newQuantity;
    Dispatcher.handleViewAction(onAumentQuantityAction);
    ShoppingCartStore.getItemsInShoppingCart().forEach((book) => {
      if (book.id === despuesBook.id) {
        oldQuantity = book.quantity;
      }
    });
    Dispatcher.handleViewAction(onAumentQuantityAction);
    ShoppingCartStore.getItemsInShoppingCart().forEach((book) => {
      if (book.id === despuesBook.id) {
        newQuantity = book.quantity;
      }
    });
    expect(oldQuantity).toEqual(1);
    expect(newQuantity).toEqual(2);
  });
});
