import Field from '../../../elements/Field';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import { iOSPredicate, UISelector } from '../../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  EMAIL_FIELD: {
    ANDROID: new UISelector().id('email_edit'),
    IOS: new iOSPredicate('...')
  },
  SEND_PASSWORD_BUTTON: {
    ANDROID: new UISelector().id('btn_forgotten'),
    IOS: new iOSPredicate('...')
  },
  EMAIL_SENT_CONFIRMATION_TEXT: {
    ANDROID: new UISelector().id('forgot_password_confirmation_text'),
    IOS: new iOSPredicate('')
  }

};

class ForgottenPasswordScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get emailField (): Field {
      return new Field(SELECTORS.EMAIL_FIELD, 'Email Field');
    }

    get sendPasswordButton (): Button {
      return new Button(SELECTORS.SEND_PASSWORD_BUTTON, 'Send Password Button');
    }

    get emailSentConfirmationText (): Element {
      return new Element(SELECTORS.EMAIL_SENT_CONFIRMATION_TEXT, 'Email Send Confirmation Message');
    }

    get backToLoginButton (): Button {
      return new Button(SELECTORS.SEND_PASSWORD_BUTTON, 'Back to Login Button');
    }

    async navigateBackToRegisterScreen (): Promise<void> {
      await driver.back(); 
    }

}

export default ForgottenPasswordScreen;
