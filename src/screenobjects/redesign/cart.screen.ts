import Button from '../../elements/Button';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import Element from '../../elements/Element';
import { EvidenceFileName } from '../../specs/redesign/evidence/helpers/Types';

const SELECTORS: TSelectorMap = {
  CART_CHECKOUT_BUTTON: {
    ANDROID: new UISelector().id('checkout_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "CHECKOUT"')
  },
  DELETE_TOP_PRODUCT: {
    ANDROID: new UISelector().id('swipe_to_delete_label'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_DELETE_PRODUCT: {
    ANDROID: new UISelector().id('positive_button'),
    IOS: new iOSPredicate('...')
  },
  EMPTY_BASKET_TEXT: {
    ANDROID: new UISelector().id('zeroStateViewTV'),
    IOS: new iOSPredicate('...')
  },
  LOGIN_PROMPT_TEXT: {
    ANDROID: new UISelector().id('dialog_login_prompt_text'),
    IOS: new iOSPredicate('...')
  },
  PROMPT_LOGIN_BUTTON: {
    ANDROID: new UISelector().id('dialog_login_prompt_login_button'),
    IOS: new iOSPredicate('...')
  },
  START_SHOPPING_BUTTON: {
    ANDROID: new UISelector().text('START SHOPPING'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_WISHLIST_ICON: {
    ANDROID: new UISelector().id('wishlist_icon'),
    IOS: new iOSPredicate('...')
  },
  MOVE_TO_WISHLIST_PROMPT: {
    ANDROID: new UISelector().id('move_to_wishlist_text'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_MOVING_TO_WISHLIST: {
    ANDROID: new UISelector().id('move_to_wishlist_yes_button'),
    IOS: new iOSPredicate('...')
  },
  EDIT_TOP_PRODUCT_BUTTON: {
    ANDROID: new UISelector().id('edit_button'),
    IOS: new iOSPredicate('...')
  },
  TOP_PRODUCT_QUANTITY: {
    ANDROID: new UISelector().id('quantity'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_ICON: {
    ANDROID: new UISelector().id('action_search'),
    IOS: new iOSPredicate('...')
  }
};

class CartScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get startShoppingButton (): Button {
      return new Button(SELECTORS.START_SHOPPING_BUTTON, 'Start Shopping Button');
    }

    get cartCheckoutButton (): Button {
      return new Button(SELECTORS.CART_CHECKOUT_BUTTON, 'Cart Checkout Button');
    }

    get deleteFirstProductLabelREDESIGN (): Button {
      return new Button(SELECTORS.DELETE_TOP_PRODUCT, 'Delete First Product Button');
    }
    
    get confirmDeleteProductButton (): Button {
      return new Button(SELECTORS.CONFIRM_DELETE_PRODUCT, 'Confirm Delete Product Button');
    }

    get emptyBagText (): Element {
      return new Element(SELECTORS.EMPTY_BASKET_TEXT, 'Empty Basket Text');
    }

    get loginPromptText (): Element {
      return new Element(SELECTORS.LOGIN_PROMPT_TEXT, 'Login Prompt Text');
    }

    get promptLoginButton (): Button {
      return new Button(SELECTORS.PROMPT_LOGIN_BUTTON, 'Prompt login button');
    }

    get productWishlistIcon (): Element {
      return new Element(SELECTORS.PRODUCT_WISHLIST_ICON, 'Product Wishlist Icon');
    }

    get moveProductToWishlistPrompt (): Element {
      return new Element(SELECTORS.MOVE_TO_WISHLIST_PROMPT, 'Move Product to Wishlist Prompt');
    }

    get confirmMovingProductToWishlist (): Button {
      return new Button(SELECTORS.CONFIRM_MOVING_TO_WISHLIST, 'Move Product to Wishlist Prompt');
    }

    get editFirstProductButton (): Button {
      return new Button(SELECTORS.EDIT_TOP_PRODUCT_BUTTON, 'Edit First Product Button');
    }

    get firstProductQuantityREDESIGN (): Element {
      return new Element(SELECTORS.TOP_PRODUCT_QUANTITY, 'First Product Quantity Text');
    }

    get searchIcon (): Button {
      return new Button(SELECTORS.SEARCH_ICON, 'Search Icon');
    }

    async deleteFirstProductREDESIGN (): Promise<void> {
      await browser.touchPerform([
        { action: 'press', options: { x: 950, y: 830 }},
        { action: 'wait', options: { ms: 1000}},
        { action: 'moveTo', options: { x: 160, y:  800}},
        { action: 'release' }
      ]);
    }

    async checkIfCheckoutButtonIsVisible (): Promise<void> {
      if (this.cartCheckoutButton.checkIfDisplayed({timeout : 10 * 1000 })) {
        console.log('Product successfully added to Bag. Checkout button is visible');
      } else {
        console.warn('Product not in Bag. Checkout button in not visible. Taking screenshot of ' + EvidenceFileName.BasketWithItemScreen);
      }

    }

}

export default CartScreen;
