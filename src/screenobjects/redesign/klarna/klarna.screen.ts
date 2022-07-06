import { iOSPredicate, UISelector } from '../../../helpers/Utilities';
import Button from '../../../elements/Button';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import Element from '../../../elements/Element';

const SELECTORS: TSelectorMap = {
  PAY_NOW_BUTTON: {
    ANDROID: new UISelector().id('klarna_payment_button'),
    IOS: new iOSPredicate('')
  },
  KLARNA_HARDCODED_SCREEN: {
    ANDROID: new UISelector().id('klarna-some-hardcoded-instance-id-fullscreen'),
    IOS: new iOSPredicate('')
  }
};

class KlarnaScreen {

    brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get payNowButton (): Button {
      return new Button(SELECTORS.PAY_NOW_BUTTON, 'Klarna Pay Now Button');
    }

    get klarnaHardcodedScreenInstance (): Element {
      return new Element(SELECTORS.KLARNA_HARDCODED_SCREEN, 'Klarna Hardcoded Screen');
    }
}

export default KlarnaScreen;
