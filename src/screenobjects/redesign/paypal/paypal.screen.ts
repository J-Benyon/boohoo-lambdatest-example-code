import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import Field from '../../../elements/Field';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';

const SELECTORS: TSelectorMap = {
  EMAIL_LOGIN_FIELD: {
    ANDROID: new UISelector().absoluteId('email'),
    IOS: new iOSPredicate('value CONTAINS "Email address or mobile number"')
  },
  NEXT_BUTTON: {
    ANDROID: new UISelector().absoluteId('btnNext'),
    IOS: new XPath('//*[@name="main"]/XCUIElementTypeButton[@name="Next"]')
  },
  PASSWORD_FIELD: {
    ANDROID: new UISelector().absoluteId('password'),
    IOS: new iOSPredicate('type CONTAINS "SecureTextField"')
  },
  PAYPAL_LOGIN_BUTTON: {
    ANDROID: new UISelector().absoluteId('btnLogin'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "Log In"')
  },
  PAY_NOW_BUTTON: {
    ANDROID: new UISelector().absoluteId('payment-submit-btn'),
    IOS: new XPath('//*[@name="main"]/*/XCUIElementTypeButton[@name="Pay Now"][@enabled="true"]')
  },
  ACCEPT_ALL_COOKIES: {
    ANDROID: new UISelector().absoluteId('acceptAllButton'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "Accept Cookies"')
  },
  FIRST_CARD_OPTION: {
    ANDROID: new XPath('//android.widget.ListView/android.view.View[1]'),
    IOS: new iOSPredicate('')
  }
};

/**
 * A highly volitile area of concern as PayPal can just change whenever they feel like it.
 */
class PaypalScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get acceptAllCookies (): Button {
      return new Button(SELECTORS.ACCEPT_ALL_COOKIES, 'Paypal Accept All Cookies');
    }

    get emailLoginField (): Field {
      return new Field(SELECTORS.EMAIL_LOGIN_FIELD, 'Paypal Email Login Field');
    }

    get nextButton (): Button {
      return new Button(SELECTORS.NEXT_BUTTON, 'Paypal Next Button');
    }

    get passwordField (): Field {
      return new Field(SELECTORS.PASSWORD_FIELD, 'Paypal Password Field');
    }

    get loginButton (): Button {
      return new Button(SELECTORS.PAYPAL_LOGIN_BUTTON, 'Paypal Login Button');
    }

    get payNowButton (): Button {
      return new Button(SELECTORS.PAY_NOW_BUTTON, 'Paypal Pay Now Button');
    }

    get firstCardOption (): Element {
      return new Element(SELECTORS.FIRST_CARD_OPTION, 'Paypal First Card Option');
    }
}

export default PaypalScreen;
