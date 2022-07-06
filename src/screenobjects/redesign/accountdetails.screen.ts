import Button from '../../elements/Button';
import Checkbox from '../../elements/Checkbox';
import Field from '../../elements/Field';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  EMAIL_CHECKBOX: {
    ANDROID: new UISelector().id('offers_notify_email'),
    IOS: new iOSPredicate('...')
  },
  SAVE_BUTTON: {
    ANDROID: new UISelector().id('action_button'),
    IOS: new iOSPredicate('...')
  },
  DONE_BUTTON: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  },
  FIRST_NAME: {
    ANDROID: new UISelector().id('details_first_name_edit'),
    IOS: new iOSPredicate('...')
  },
  LAST_NAME: {
    ANDROID: new UISelector().id('details_last_name_edit'),
    IOS: new iOSPredicate('...')
  },
  FEMALE_CHECKBOX: {
    ANDROID: new UISelector().id('toggle_female'),
    IOS: new iOSPredicate('...')
  }
};

class AccountDetailsScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get genderFemaleCheckbox (): Checkbox {
      return new Checkbox(SELECTORS.FEMALE_CHECKBOX, 'Female Gender Checkbox');
    }

    get firstNameField (): Field {
      return new Field(SELECTORS.FIRST_NAME, 'First Name Field');
    }

    get lastNameField (): Field {
      return new Field(SELECTORS.LAST_NAME, 'Last Name Field');
    }

    get okButton (): Button {
      return new Button(SELECTORS.DONE_BUTTON, 'Done Button');
    }
    
    get saveButton (): Button {
      return new Button(SELECTORS.SAVE_BUTTON, 'Save Preferences Button');
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }
}

export default AccountDetailsScreen;
