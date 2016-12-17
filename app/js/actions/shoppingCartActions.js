import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/shoppingCartConstants';

const ShoppingCartActions = {

  onRemoveItemFromCart(item) {
    const type = Constants.REMOVE_ITEM_FROM_CART;
    Dispatcher.handleViewAction({
      type,
      data: item,
    });
  },

  onAddItemToCart(item) {
    const type = Constants.ADD_ITEM_TO_CART;
    Dispatcher.handleViewAction({
      type,
      data: item,
    });
  },

  onReduceItemQuantity(item) {
    const type = Constants.REDUCE_ITEM_QUANTITY;
    Dispatcher.handleViewAction({
      type,
      data: item,
    });
  },
};

export default ShoppingCartActions;
