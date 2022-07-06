import Field from '../../elements/Field';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  ZERO_STATE_ICON: {
    ANDROID: new UISelector().id('zeroStateViewLottieView'),
    IOS: new XPath('//*[@name="Email"]/parent::*/XCUIElementTypeTextField')
  }
};

class InboxScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get zeroStateIcon (): Field {
      return new Field(SELECTORS.ZERO_STATE_ICON, 'Inbox Zero State Icon');
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }

}

export default InboxScreen;
