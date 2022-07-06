import Element from '../../elements/Element';
import Button from '../../elements/Button';
import { GroupBrands, TSelectorMap} from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';

const SELECTOR: TSelectorMap = {
  FIRST_PRODUCT_TEXT: {
    ANDROID: new UISelector().id('wishlist_product_name'),
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
  DELETE_TOP_PRODUCT: {
    ANDROID: new UISelector().id('swipe_to_delete_label'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_DELETE_PRODUCT: {
    ANDROID: new UISelector().id('positive_button'),
    IOS: new iOSPredicate('...')
  },
  CANCEL_PRODUCT_DELETED_PROMPT: {
    ANDROID: new UISelector().id('wishListFooterCloseIV'),
    IOS: new iOSPredicate('...')
  },
  EMPTY_WISHLIST_TEXT: {
    ANDROID: new UISelector().id('zeroStateViewTV'),
    IOS: new iOSPredicate('...')
  },
  START_SHOPPING_BUTTON: {
    ANDROID: new UISelector().id('zeroStateActionButton'),
    IOS: new iOSPredicate('...')
  },
  FIRST_PRODUCT_ADD_TO_BAG_BUTTON: {
    ANDROID: new UISelector().id('add_to_bag_image'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_MOVED_TO_BAG_ALERT_TEXT: {
    ANDROID: new UISelector().id('simple_dialog_message'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_PRODUCT_MOVED_TO_BAG_ALERT_DIALOG: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_IMAGE: {
    ANDROID: new UISelector().id('wishlist_product'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_PRICES: {
    ANDROID: new UISelector().id('wishlist_product_price'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_COLOR_SIZE_QUANTITY: {
    ANDROID: new UISelector().id('wishlist_color_size_qty_text'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_ICON: {
    ANDROID: new UISelector().id('action_search'),
    IOS: new iOSPredicate('...')
  }
};

class WishlistScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get firstProductText (): Element {
      return new Element(SELECTOR.FIRST_PRODUCT_TEXT, 'First Product Text');
    }

    get loginPromptText (): Element {
      return new Element(SELECTOR.LOGIN_PROMPT_TEXT, 'Login Prompt Text');
    }

    get promptLoginButton (): Button {
      return new Button(SELECTOR.PROMPT_LOGIN_BUTTON, 'Prompt login button');
    }

    get deleteFirstProductLabelREDESIGN (): Element {
      return new Element(SELECTOR.DELETE_TOP_PRODUCT, 'Delete First Product Label');
    }

    get confirmDeleteProductButton (): Button {
      return new Button(SELECTOR.CONFIRM_DELETE_PRODUCT, 'Confirm Delete Product Button');
    }

    get cancelProductDeletedPrompt (): Button {
      return new Button(SELECTOR.CANCEL_PRODUCT_DELETED_PROMPT, 'Cancel Product Deleted Prompt');
    }

    get emptyWishlistText (): Element {
      return new Element(SELECTOR.EMPTY_WISHLIST_TEXT, 'Empty Basket Text');
    }

    get startShoppingButton (): Button {
      return new Button(SELECTOR.START_SHOPPING_BUTTON, 'Start Shopping Button');
    }

    get addFirstItemToBagREDESIGN (): Button {
      return new Button(SELECTOR.FIRST_PRODUCT_ADD_TO_BAG_BUTTON, 'First Product Add To Bag Button');
    }

    get productAddedToBagAlertText (): Element {
      return new Button(SELECTOR.PRODUCT_MOVED_TO_BAG_ALERT_TEXT, 'Product Added To Bag Alert Text');
    }

    get confirmProductAddedToBagAlert (): Element {
      return new Button(SELECTOR.CONFIRM_PRODUCT_MOVED_TO_BAG_ALERT_DIALOG, 'Confirm Product Added To Bag Alert Dialog');
    }

    get ngWishlistNotification (): Element {
      return new Button(SELECTOR.NG_WISHLIST_NOTIFICATION, 'NG Wishlist Notification');
    }

    get topProductImage (): Element {
      return new Button(SELECTOR.PRODUCT_IMAGE, 'Top Product Image');
    }

    get topProductPrices (): Element {
      return new Button(SELECTOR.PRODUCT_PRICES, 'Top Product Prices');
    }

    get topProductColorSizeQuantity (): Element {
      return new Button(SELECTOR.PRODUCT_COLOR_SIZE_QUANTITY, 'Top Product Color Size Quantity');
    }

    get searchIcon (): Button {
      return new Button(SELECTOR.SEARCH_ICON, 'Search Icon');
    }

    async deleteFirstProductREDESIGN (): Promise<void> {
      await browser.touchPerform([
        { action: 'press', options: { x: 989, y: 1030 }},
        { action: 'wait', options: { ms: 1000}},
        { action: 'moveTo', options: { x: 170, y:  1030}},
        { action: 'release' }
      ]);
    }

    async checkIfProductIsInWishlist (): Promise<void> {
      if (this.topProductImage.checkIfDisplayed({timeout : 10 * 1000 })) {
        console.log('Product is in the Wishlist');
      } else {
        console.warn('The product is not in the wishlist. Continuing with the test');
      }
    }
 
}

export default WishlistScreen;