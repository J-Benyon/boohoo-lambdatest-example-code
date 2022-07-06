import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';

const SELECTORS: TSelectorMap = {
  ACCEPT_ALL_COOKIES_BUTTON: {
    ANDROID: new UISelector().id('onetrust-accept-btn-handler'),
    IOS: new iOSPredicate('')
  },
  CLEARPAY_HEADER: {
    ANDROID: new XPath('//android.widget.TextView[@text="Clearpay"]'),
    IOS: new iOSPredicate('')
  },
  HARCODED_SCREEN: {
    ANDROID: new XPath('//android.webkit.WebView[@text="Clearpay | Let\'s get started!"]'),
    IOS: new iOSPredicate('')
  }
};

class ClearpayScreen {

    brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get acceptAllCookiesButton (): Button {
      return new Button(SELECTORS.ACCEPT_ALL_COOKIES_BUTTON, 'Clearpay Acccept Cookies Button');
    }

    get clearpayWebHeader (): Element {
      return new Element(SELECTORS.CLEARPAY_HEADER, 'Clearpay Webview Header');
    }

    get clearpayHardcodedScreen (): Element {
      return new Element(SELECTORS.HARCODED_SCREEN, 'Clearpay Screen');
    }

}

export default ClearpayScreen;
