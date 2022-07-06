import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import GenericMessages from '../../../helpers/GenericMessages';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  NAVIGATION_BAR: {
    ANDROID: new UISelector().id('bottom_navigation'),
    IOS: new XPath('//XCUIElementTypeImage[@name="home"]/parent::*/parent::*/parent::*/parent::*/parent::*')
  },
  HOME_BUTTON: {
    ANDROID: new UISelector().id('nav_item_home'),
    IOS: new iOSPredicate('name=="home"')
  },
  SHOP_BUTTON: {
    ANDROID: new UISelector().id('nav_item_shop'),
    IOS: new iOSPredicate('name=="shop"')
  },
  CART_BUTTON: {
    ANDROID: new UISelector().id('nav_item_bag'),
    IOS: new iOSPredicate('name=="itemsIcon"')
  },
  WISHLIST_BUTTON: {
    ANDROID: new UISelector().id('nav_item_wishlist'),
    IOS: new iOSPredicate('name=="wishlist"')
  },
  PROFILE_BUTTON: {
    ANDROID: new UISelector().id('nav_item_profile'),
    IOS: new iOSPredicate('name=="Profile"')
  },
  NG_CART_NOTIFICATION: {
    ANDROID: new XPath('//*[@content-desc="Bag"]/android.widget.TextView'),
    IOS: new iOSPredicate('...')
  },
  NG_WISHLIST_NOTIFICATION: {
    ANDROID: new XPath('//*[@content-desc="Crushes"]/android.widget.TextView'),
    IOS: new iOSPredicate('...')
  },
  WISHLIST_NOTIFICATION: {
    ANDROID: new UISelector().id('nav_item_wishlist').child(new UISelector().id('menuItemBadge')),
    IOS: new iOSPredicate('...')
  },
  BAG_NOTIFICATION: {
    ANDROID: new UISelector().id('nav_item_bag').child(new UISelector().id('menuItemBadge')),
    IOS: new iOSPredicate('...')
  }
};

class NavigationBar {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get navigationBar (): Element {
      return new Element(SELECTORS.NAVIGATION_BAR, 'Navigation Bar', { message: GenericMessages.COULD_NOT_LOG_IN });
    }

    get homeButton (): Element {
      return new Button(SELECTORS.HOME_BUTTON, 'Home Button');
    }

    get shopButton (): Element {
      return new Button(SELECTORS.SHOP_BUTTON, 'Shop Button');
    }

    get cartButton (): Element {
      return new Button(SELECTORS.CART_BUTTON, 'Cart Button');
    }

    get wishlistButton (): Element {
      return new Button(SELECTORS.WISHLIST_BUTTON, 'Wishlist Button');
    }

    get profileButton (): Element {
      return new Button(SELECTORS.PROFILE_BUTTON, 'Profile Button');
    }

    get ngBagNotification (): Element {
      return new Button(SELECTORS.NG_CART_NOTIFICATION, 'NG Bag Notification');
    }

    get wishlistNotification (): Element {
      return new Button(SELECTORS.NG_WISHLIST_NOTIFICATION, 'NG Wishlist Notification');
    }

    async getWishlistNotificationTextREDESIGN (): Promise<string> {
      if (this.brand===GroupBrands.NastyGal) {
        return new Button(SELECTORS.NG_WISHLIST_NOTIFICATION, 'NG Wishlist Notification').getText();
      } else {
        return new Button(SELECTORS.WISHLIST_NOTIFICATION, 'Wishlist Notification').getText();
      }
    }

    async getBagNotificationREDESIGN (): Promise<string> {
      if (this.brand === GroupBrands.NastyGal) {
        return new Button(SELECTORS.NG_CART_NOTIFICATION, 'NG Cart Notification').getText();
      } else {
        return new Button(SELECTORS.BAG_NOTIFICATION, 'Cart Notification').getText();
      }    
    }
}

export default NavigationBar;
