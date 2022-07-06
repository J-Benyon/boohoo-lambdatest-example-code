// These are default error messages, any %m will be replaced by the error message that should have normally been there.

export default {
  COULD_NOT_ADD_TO_BASKET: 'Could not add this product to basket, most likely the size or colour is out of stock. %m',
  ITEM_OUT_OF_STOCK: 'Could not find expected element, product may be out of stock. %m',
  PAYMENT_ISSUE: 'Order confirmation could not be found, there is most likely a payment issue. %m',
  NO_ORDER_IN_ORDER_LIST: 'Could not find order in order list. %m',
  COULD_NOT_LOAD_SHOP_LIST: 'Could not load the Shop list. Check API\'s are functional. %m',
  COULD_NOT_LOG_IN: 'Could not find navigation bar after login, check credentials are correct and app loads correctly. %m'
};
