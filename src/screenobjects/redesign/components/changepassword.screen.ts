import { iOSPredicate, UISelector } from '../../../helpers/Utilities';
import { TSelectorMap, GroupBrands } from '../../../helpers/Types';
import Field from '../../../elements/Field';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';

const SELECTORS: TSelectorMap = {
  CURRENT_PASSWORD_FIELD: {
    ANDROID: new UISelector().id('current_password_input_edit_text'),
    IOS: new iOSPredicate('...')
  },
  NEW_PASSWORD_FIELD: {
    ANDROID: new UISelector().id('new_password_input_edit_text'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_NEW_PASSWORD_FIELD: {
    ANDROID: new UISelector().id('new_password_verify_edit_text'),
    IOS: new iOSPredicate('...')
  },
  SAVE_CHANGES_BUTTON: {
    ANDROID: new UISelector().id('action_button'),
    IOS: new iOSPredicate('...')
  },
  PASSWORD_CHANGED_TEXT: {
    ANDROID: new UISelector().id('simple_dialog_message'),
    IOS: new iOSPredicate('...')
  },
  PASSWORD_CHANGED_ALERT_OK_BUTTON: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  }
};

class ChangePasswordScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand=brand;
    }

    get currentPasswordField (): Field {
      return new Field(SELECTORS.CURRENT_PASSWORD_FIELD, 'Current Password Field');
    }

    get newPasswordField (): Field {
      return new Field(SELECTORS.NEW_PASSWORD_FIELD, 'New Password Field');
    }

    get confirmNewPasswordField (): Field {
      return new Field(SELECTORS.CONFIRM_NEW_PASSWORD_FIELD, 'Confirm New Password Field');
    }

    get saveChangesButton (): Button {
      return new Button(SELECTORS.SAVE_CHANGES_BUTTON, 'Save Password Button');
    }

    get passwordChangedAlertDialogText (): Element {
      return new Element(SELECTORS.PASSWORD_CHANGED_TEXT, 'Password Changed Text');
    }

    get confirmChangedPasswordAlert (): Button {
      return new Button(SELECTORS.PASSWORD_CHANGED_ALERT_OK_BUTTON, 'Confirm Password Changed Alert');
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }

}

export default ChangePasswordScreen;