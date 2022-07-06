import Button from '../../elements/Button';
import Element from '../../elements/Element';
import Field from '../../elements/Field';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  FIRST_NAME_FIELD: {
    ANDROID: new UISelector().id('register_first_name_edit'),
    IOS: new XPath('//*[@name="First Name"]/parent::*/XCUIElementTypeTextField')
  },
  LAST_NAME_FIELD: {
    ANDROID: new UISelector().id('register_last_name_edit'),
    IOS: new XPath('//*[@name="Last Name"]/parent::*/XCUIElementTypeTextField')
  },
  DATE_OF_BIRTH_DROPDOWN_FIELD: {
    ANDROID: new UISelector().id('text_input_end_icon'),
    IOS: new XPath('//*[@name="Date Of Birth"]/parent::*/XCUIElementTypeTextField')
  },
  DATE_OF_BIRTH_CONFIRM_SELECTION_BUTTON: {
    ANDROID: new UISelector().id('android:id/button1')
  },

  EMAIL_FIELD: {
    ANDROID: new UISelector().id('login_email_edit_text'),
    IOS: new XPath('//*[@name="Email"]/parent::*/XCUIElementTypeTextField')
  },
  CONFIRM_EMAIL_FIELD: {
    ANDROID: new UISelector().id('confirm_email_edit_text'),
    IOS: new XPath('//*[@name="Confirm Email"]/parent::*/XCUIElementTypeTextField')
  },
  PASSWORD_FIELD: {
    ANDROID: new UISelector().id('login_password_edit_text'),
    IOS: new XPath('//*[@name="Password"]/parent::*/XCUIElementTypeSecureTextField')
  },
  PASSWORD_DONE_BUTTON: {
    IOS: new XPath('//*[@name="Done"]')
  },
  CREATE_ACCOUNT_BUTTON: {
    ANDROID: new UISelector().id('do_register'),
    IOS: new iOSPredicate('name == "CREATE ACCOUNT"')
  },
  PASSWORD_TOGGLE_BUTTON: {
    ANDROID: new UISelector().id('login_password_toggle'),
    IOS: new iOSPredicate('name == "hidePasswordIcon"')
  },
  PRIVACY_POLICY_BUTTON: {
    ANDROID: new UISelector().id('privacy_button'),
    IOS: new iOSPredicate('...')
  },
  ALREADY_HAVE_ACCOUNT_LINK: {
    ANDROID: new UISelector().id('register_login_underline_button'),
    IOS: new iOSPredicate('...')
  }
};

class RegisterScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get firstNameField (): Field {
      return new Field(SELECTORS.FIRST_NAME_FIELD, 'First Name Field');
    }

    get lastNameField (): Field {
      return new Field(SELECTORS.LAST_NAME_FIELD, 'Last Name Field');
    }

    get dateOfBirthDropdown (): Button {
      return new Button(SELECTORS.DATE_OF_BIRTH_DROPDOWN_FIELD, 'Date of Birth Dropdown Button');
    }

    get dateOfBirthConfirmButton (): Button {
      return new Button(SELECTORS.DATE_OF_BIRTH_CONFIRM_SELECTION_BUTTON, 'Date of Birth Confirm Button');
    }

    get emailField (): Field {
      return new Field(SELECTORS.EMAIL_FIELD, 'Email Field');
    }

    get confirmEmailField (): Field {
      return new Field(SELECTORS.CONFIRM_EMAIL_FIELD, 'Confirm Email Field');
    }

    get passwordField (): Field {
      return new Field(SELECTORS.PASSWORD_FIELD, 'Password Field');
    }

    get createAccountButton (): Button {
      return new Button(SELECTORS.CREATE_ACCOUNT_BUTTON, 'Create Account Button');
    }

    get passwordToggleButton (): Button {
      return new Button(SELECTORS.PASSWORD_TOGGLE_BUTTON, 'View Password Toggle Button');
    }

    get passwordDoneButton (): Button {
      return new Button(SELECTORS.PASSWORD_DONE_BUTTON, 'Password Done Button iOS');
    }

    get privacyPolicyButton (): Button {
      return new Button(SELECTORS.PRIVACY_POLICY_BUTTON, 'Privacy Policy Button');
    }

    get alreadyHaveAccountLink (): Element {
      return new Element(SELECTORS.ALREADY_HAVE_ACCOUNT_LINK, 'Already Have Account Link');
    }
    
    async navigateBackToHomeScreen (): Promise<void> {
      await driver.back();
      await driver.back();
    }
}

export default RegisterScreen;
