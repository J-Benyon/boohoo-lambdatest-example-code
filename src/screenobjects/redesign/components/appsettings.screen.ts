import { iOSPredicate, UISelector } from '../../../helpers/Utilities';
import { TSelectorMap, GroupBrands } from '../../../helpers/Types';
import Element from '../../../elements/Element';
import Button from '../../../elements/Button';

const SELECTORS: TSelectorMap = {
  COUNTRY_DROPDOWN: {
    ANDROID: new UISelector().id('settings_store_edit_text'),
    IOS: new iOSPredicate('...')
  },
  SWEDEN_STORE: {
    ANDROID: new UISelector().text('Sweden'),
    IOS: new iOSPredicate('...')
  },
  IRELAND_STORE: {
    ANDROID: new UISelector().text('Ireland'),
    IOS: new iOSPredicate('...')
  },
  UNITED_STATES_STORE: {
    ANDROID: new UISelector().text('United States'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_LOCALE_CHANGE: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  },
  DEV_LABEL: {
    ANDROID: new UISelector().textLowerUpper('--- Development settings ---'),
    IOS: new iOSPredicate('...')
  }
};

class AppSettingsScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand=brand;
    }

    get countryDropdownREDESIGN (): Element {
      return new Element(SELECTORS.COUNTRY_DROPDOWN, 'Country (store) Selection Drop Down');
    }

    get swedenStore (): Element {
      return new Element(SELECTORS.SWEDEN_STORE, 'Sweden Country Button');
    }

    get irelandStore (): Element {
      return new Element(SELECTORS.IRELAND_STORE, 'Ireland Country Button');
    }

    get unitedStatesStore (): Element {
      return new Element(SELECTORS.UNITED_STATES_STORE, 'United States Country Button');
    }

    get confirmLocaleChange (): Button {
      return new Button(SELECTORS.CONFIRM_LOCALE_CHANGE, 'Confirm Locale Change Button');
    }

    get devLabel (): Button {
      return new Button(SELECTORS.DEV_LABEL, 'Development Label');
    }

    async selectRandomStoreREDESIGN (): Promise<void> {
      const el = await $('.android.view.ViewGroup');
      driver.touchAction({
        action: 'tap',
        x: 360,
        y: 500,
        element: el
      });
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }
}

export default AppSettingsScreen;