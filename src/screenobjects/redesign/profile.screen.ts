import Button from '../../elements/Button';
import Field from '../../elements/Field';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';

const SELECTOR: TSelectorMap = {
  PAYMENT_METHODS: {
    ANDROID: new UISelector().id('wallet'),
    IOS: new iOSPredicate('name == "Payment Methods"')
  },
  ADDRESS_BOOK: {
    ANDROID: new UISelector().text('ADDRESS BOOK'),
    IOS: new iOSPredicate('name == "Address Book"')
  },
  ORDERS: {
    ANDROID: new UISelector().text('ORDERS'),
    IOS: new iOSPredicate('name == "Orders"')
  },
  CONTACT_PREFERENCES: {
    ANDROID: new UISelector().id('contact_prefs'),
    IOS: new iOSPredicate('...')
  },
  ACCOUNT_DETAILS: {
    ANDROID: new UISelector().textLowerUpper('Profile Details'),
    IOS: new iOSPredicate('...')
  },
  APP_SETTINGS: {
    ANDROID: new UISelector().text('APP SETTINGS'),
    IOS: new iOSPredicate('...')
  },
  CHANGE_PASSWORD: {
    ANDROID: new UISelector().id('password'),
    IOS: new iOSPredicate('...')
  },
  LOGIN_BUTTON: {
    ANDROID: new UISelector().id('login'),
    IOS: new iOSPredicate('...')  
  },
  LOGOUT_BUTTON: {
    ANDROID: new UISelector().class('android.widget.Button').text('LOG OUT'),
    IOS: new iOSPredicate('...')
  },
  LOGOUT_OK_BUTTON: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_ICON: {
    ANDROID: new UISelector().id('action_search'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_FIELD: {
    ANDROID:new UISelector().id('search_src_text'),
    IOS: new iOSPredicate('...')
  },
  HELP_SUPPORT_BUTTON: {
    ANDROID:new UISelector().id('help_button'),
    IOS: new iOSPredicate('...')
  },
  INBOX_BUTTON: {
    ANDROID:new UISelector().id('inbox'),
    IOS: new iOSPredicate('...')
  }
};

class ProfileScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get loginButton (): Button {
      return new Button(SELECTOR.LOGIN_BUTTON, 'Profile Login Button');
    }

    get accountDetailsButton (): Button {
      return new Button(SELECTOR.ACCOUNT_DETAILS, 'Profile Account Details Option');
    }

    get paymentMethodsButton (): Button {
      return new Button(SELECTOR.PAYMENT_METHODS, 'Profile Payment Methods Option');
    }

    get addressBookButton (): Button {
      return new Button(SELECTOR.ADDRESS_BOOK, 'Profile Address Book Option');
    }

    get ordersButton (): Button {
      return new Button(SELECTOR.ORDERS, 'Profile Orders Options');
    }

    get contactPreferencesButton (): Button {
      return new Button(SELECTOR.CONTACT_PREFERENCES, 'Profile Contact Preferences Option');
    }

    get appSettingsButtonREDESIGN (): Button {
      return new Button(SELECTOR.APP_SETTINGS, 'Profile App Settings Option');
    }

    get changePasswordButton (): Button {
      return new Button(SELECTOR.CHANGE_PASSWORD, 'Profile Change Password Option');
    }

    get logoutButton (): Button {
      return new Button(SELECTOR.LOGOUT_BUTTON, 'Logout Button');
    }

    get logoutConfirmButton (): Button {
      return new Button(SELECTOR.LOGOUT_OK_BUTTON, 'Logout Confirmation Button');
    }

    get searchIcon (): Button {
      return new Button(SELECTOR.SEARCH_ICON, 'Search Icon');
    }

    get searchTextField (): Field {
      return new Field(SELECTOR.SEARCH_FIELD, 'Search Field');
    }

    get helpAndSupportButton (): Button {
      return new Button(SELECTOR.HELP_SUPPORT_BUTTON, 'Help And Support Button');
    }

    get inboxButton (): Button {
      return new Button(SELECTOR.INBOX_BUTTON, 'Inbox Button');
    }

    async checkIfPasswordButtonIsVisible (): Promise<void> {
      if (this.changePasswordButton.checkIfDisplayed({timeout : 10 * 1000 })) {
        console.log('Password Section is visible');
      } else {
        console.warn('The Change Password button is not visible. Continuing with the test');
      }
    }
}

export default ProfileScreen;
