import Button from '../../elements/Button';
import Element from '../../elements/Element';
import GenericMessages from '../../helpers/GenericMessages';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  SINGLE_PROD_VIEW_BUTTON: {
    ANDROID: new UISelector().id('single_column'),
    IOS: new iOSPredicate('...')
  }, // First item in grid
  PRODUCT_GRID_FIRST_ITEM: {
    ANDROID: new XPath('//androidx.recyclerview.widget.RecyclerView/*[1]/*[1]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_FIRST_ITEM_IMAGE: {
    ANDROID: new XPath('//android.view.ViewGroup[1]/android.widget.ImageView[1]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_SECOND_ITEM_IMAGE: {
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.ImageView[1]'),
    IOS: new iOSPredicate('...')
  }
};

class ProductListSingleColScreen {

  private brand: GroupBrands;

  constructor (brand: GroupBrands) {
    this.brand = brand;
  }

  get singleColumnViewButton (): Button {
    return new Button(SELECTORS.SINGLE_PROD_VIEW_BUTTON, 'Single Product View Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
  }

  get firstProductImage (): Element {
    return new Element(SELECTORS.PRODUCT_GRID_FIRST_ITEM_IMAGE, 'First Product In Single Grid Image');
  }

  get secondProductImage (): Element {
    return new Element(SELECTORS.PRODUCT_GRID_SECOND_ITEM_IMAGE, 'Second Product In Single Grid Image');
  }

  async scrollToCloseNavigation (): Promise<void> {
    await browser.touchPerform([
      { action: 'press', options: { x: 550, y: 1608 } },
      { action: 'wait', options: { ms: 400 } },
      { action: 'moveTo', options: { x: 550, y: 1400 } },
      { action: 'release' }
    ]);
  }
}

export default ProductListSingleColScreen;
