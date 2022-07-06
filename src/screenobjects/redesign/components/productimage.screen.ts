import Button from '../../../elements/Button';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import { iOSPredicate, UISelector } from '../../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  SHARE_ICON: {
    ANDROID: new UISelector().id('share'),
    IOS: new iOSPredicate('...')
  },
};

class ProductImageScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get shareIcon (): Button {
      return new Button(SELECTORS.SHARE_ICON, 'Product Image Share Icon');
    }

    async navigateBackToProductListScreen (): Promise<void> {
      await driver.back();
      await driver.back();
    }
}

export default ProductImageScreen;
