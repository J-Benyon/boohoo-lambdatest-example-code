import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import Field from '../../../elements/Field';

const SELECTORS: TSelectorMap = {
  ACCEPT_BUTTON: {
    ANDROID: new XPath('//android.widget.ToggleButton[@index="2"]'),
    IOS: new iOSPredicate('')
  },
  LOGIN_LINK: {
    ANDROID: new XPath('//*[@content-desc="Log In"]'),
    IOS: new iOSPredicate('')
  },
  EMAIL_FIELD: {
    ANDROID: new XPath('//android.widget.EditText[@password="false"]'),
    IOS: new iOSPredicate('')
  },
  PASSWORD_FIELD: {
    ANDROID: new XPath('//android.widget.EditText[@password="true"]'),
    IOS: new iOSPredicate('')
  },
  LOG_IN_BUTTON: {
    ANDROID: new XPath('//android.widget.Button[@text="Log in"]'),
    IOS: new iOSPredicate('')
  },
  BUY_NOW_BUTTON: {
    ANDROID: new XPath('//android.widget.Button[@text="Buy Now"]'),
    IOS: new iOSPredicate('')
  },
  PARTIAL_HOME_SCREEN_TEXT: {
    ANDROID: new UISelector().text('Complete your'),
    IOS: new iOSPredicate('')
  },
  LAYBUY_TOP_BAR_ICON: {
    ANDROID: new UISelector().id('app-bar-left-portal').child(new UISelector().class('android.widget.Image')),
    IOS: new iOSPredicate('')
  }
};

/**
 * A highly volitile area of concern as Laybuy can just change whenever they feel like it.
 */
class LaybuyScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get acceptButton (): Button {
      return new Button(SELECTORS.ACCEPT_BUTTON, 'Laybuy Accept Cookies Button');
    }

    get loginLink (): Element {
      return new Element(SELECTORS.LOGIN_LINK, 'Laybuy Log In Link');
    }

    get emailField (): Field {
      return new Field(SELECTORS.EMAIL_FIELD, 'Laybuy Email Field');
    }

    get passwordField (): Field {
      return new Field(SELECTORS.PASSWORD_FIELD, 'Laybuy Password Field');
    }

    get loginButton (): Button {
      return new Button(SELECTORS.LOG_IN_BUTTON, 'Laybuy Log in Button');
    }

    get buyNowButton (): Button {
      return new Button(SELECTORS.BUY_NOW_BUTTON, 'Laybuy Log in Button');
    }

    get partialScreenHomeText (): Element {
      return new Element(SELECTORS.PARTIAL_HOME_SCREEN_TEXT, 'Partial Home LayBuy Text');
    }

    get laybuyTopBarLeftIcon (): Element {
      return new Element(SELECTORS.LAYBUY_TOP_BAR_ICON, 'Laybuy Top Bar Left Icon');
    }
}

export default LaybuyScreen;
