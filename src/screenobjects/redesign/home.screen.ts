import Button from '../../elements/Button';
import Element from '../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  POPUP_TAKE_CONTROL_IOS: {
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "CONTINUE"')
  },
  IOS_NATIVE_ALLOW: {
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "Allow"')
  },
  SEARCH_ICON: {
    ANDROID: new UISelector().id('action_search'),
    IOS: new iOSPredicate('...')
  },
  ASSET_HOLDER: {
    ANDROID: new UISelector().id('homepage_recycler_view'),
    IOS: new iOSPredicate('...')
  },
  TOOLBAR_LOGO: {
    ANDROID: new UISelector().id('toolbar').child(new UISelector().id('logo')),
    IOS: new iOSPredicate('...')
  }
};

class HomeScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get popUpContinue (): Button {
      return new Button(SELECTORS.POPUP_TAKE_CONTROL_IOS, 'Pop Up Take Control Continue');
    }

    get iOSNativeAllow (): Button {
      return new Button(SELECTORS.IOS_NATIVE_ALLOW, 'iOS Native Allow Option');
    }

    get searchIcon (): Button {
      return new Button(SELECTORS.SEARCH_ICON, 'Search Icon');
    }

    get assetsContainer (): Element {
      return new Element(SELECTORS.ASSET_HOLDER, 'Asset Holder Icon');
    }

    get toolbarLogo (): Element {
      return new Element(SELECTORS.TOOLBAR_LOGO, 'Asset Holder Icon');
    }
}

export default HomeScreen;
