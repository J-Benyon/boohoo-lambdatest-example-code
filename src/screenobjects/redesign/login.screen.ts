import Button from '../../elements/Button';
import Field from '../../elements/Field';
import Element from '../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  EMAIL_FIELD: {
    ANDROID: new UISelector().id('login_email_edit_text'),
    IOS: new XPath('//*[@name="Email"]/parent::*/XCUIElementTypeTextField')
  },
  PASSWORD_FIELD: {
    ANDROID: new UISelector().id('login_password_edit_text'),
    IOS: new XPath('//*[@name="Password"]/parent::*/XCUIElementTypeSecureTextField')
  },
  LOGIN_BUTTON: {
    ANDROID: new UISelector().id('login_button'),
    IOS: new XPath('//XCUIElementTypeScrollView/*/XCUIElementTypeButton[@name="LOG IN"]')
  },
  VIEW_PASSWORD_BUTTON: {
    ANDROID: new UISelector().id('login_password_toggle'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name = "hidePasswordIcon"')
  },
  UNABLE_TO_LOGIN_TEXT: {
    ANDROID: new UISelector().id('simple_dialog_message'),
    IOS: new iOSPredicate('...')
  },
  DONT_HAVE_AN_ACCOUNT_LINK: {
    ANDROID: new UISelector().id('register_button'),
    IOS: new iOSPredicate('...')
  },
  FORGOTTEN_PASSWORD_LINK: {
    ANDROID: new UISelector().id('forgotten_button'),
    IOS: new iOSPredicate('...')
  }

};

class LoginScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get emailField (): Field {
      return new Field(SELECTORS.EMAIL_FIELD, 'Email Field');
    }

    get passwordField (): Field {
      return new Field(SELECTORS.PASSWORD_FIELD, 'Password Field');
    }

    get loginButton (): Button {
      return new Button(SELECTORS.LOGIN_BUTTON, 'Login Button');
    }

    get viewPassword (): Button {
      return new Button(SELECTORS.VIEW_PASSWORD_BUTTON, 'View Password Toggle Button');
    }

    get unableToLoginAlertDialogText (): Element {
      return new Element(SELECTORS.UNABLE_TO_LOGIN_TEXT, 'Unable to login text');
    }

    get dontHaveAnAccount (): Button {
      return new Button(SELECTORS.DONT_HAVE_AN_ACCOUNT_LINK, 'Don\t have an account Button');
    }

    get forgottenPassword (): Button {
      return new Button(SELECTORS.FORGOTTEN_PASSWORD_LINK, 'Forgotten Password Link');
    }
}

export default LoginScreen;
