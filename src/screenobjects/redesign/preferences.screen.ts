import Button from '../../elements/Button';
import Checkbox from '../../elements/Checkbox';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  EMAIL_CHECKBOX: {
    ANDROID: new UISelector().class('android.view.View').index(3),
    IOS: new iOSPredicate('...')
  },
  SMS_CHECKBOX: {
    ANDROID: new UISelector().class('android.view.View').index(5),
    IOS: new iOSPredicate('...')
  },
  POST_CHECKBOX: {
    ANDROID: new UISelector().class('android.view.View').index(7),
    IOS: new iOSPredicate('...')
  },
  THIRDPARTY_CHECKBOX: {
    ANDROID: new UISelector().class('android.view.View').index(10),
    IOS: new iOSPredicate('...')
  },
  SAVE_PREFS_BUTTON: {
    ANDROID: new UISelector().id('compose_view').child(new UISelector().class('android.view.View').textLowerUpper('SAVE PREFERENCES')),
    IOS: new iOSPredicate('...')
  },
  DONE_BUTTON: {
    ANDROID: new UISelector().class('android.widget.Button'),
    IOS: new iOSPredicate('...')
  }
};

class PreferencesScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get okButton (): Button {
      return new Button(SELECTORS.DONE_BUTTON, 'Done Button'); 
    }

    get emailCheckbox (): Checkbox {
      return new Checkbox(SELECTORS.EMAIL_CHECKBOX, 'Email Checkbox');
    }

    get smsCheckbox (): Checkbox {
      return new Checkbox(SELECTORS.SMS_CHECKBOX, 'SMS Checkbox');
    }

    get postCheckbox (): Checkbox {
      return new Checkbox(SELECTORS.POST_CHECKBOX, 'Post Checkbox');
    }

    get thirdPartyCheckbox (): Checkbox {
      return new Checkbox(SELECTORS.THIRDPARTY_CHECKBOX, 'Third Party Checkbox');
    }
    
    get savePreferencesButton (): Button {
      return new Button(SELECTORS.SAVE_PREFS_BUTTON, 'Save Preferences Button');
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }
}

export default PreferencesScreen;
