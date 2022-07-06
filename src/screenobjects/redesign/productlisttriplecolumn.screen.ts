import Button from '../../elements/Button';
import Element from '../../elements/Element';
import GenericMessages from '../../helpers/GenericMessages';
import { GroupBrands, TSelector, TSelectorMap, TSelectorOptions } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  PRODUCT_NINE_TILE_BUTTON: {
    ANDROID: new UISelector().id('triple_column'),
    IOS: new iOSPredicate('...')
  },
  ALL_IMAGES: {
    ANDROID: new UISelector().id('row_3x4_image'),
    IOS: new iOSPredicate('...')
  },
  FIRST_ITEM: {
    ANDROID: new XPath('//android.view.ViewGroup[1]/android.widget.ImageView'),
    IOS: new iOSPredicate('...')
  },
  SIXTH_ITEM: {
    ANDROID: new XPath('//android.view.ViewGroup[6]/android.widget.ImageView'),
    IOS: new iOSPredicate('...')
  },
  NINTH_ITEM: {
    ANDROID: new XPath('//android.view.ViewGroup[9]/android.widget.ImageView'),
    IOS: new iOSPredicate('...')
  },
  ALL_PRICES: {
    ANDROID: new UISelector().id('price').index(0),
    IOS: new iOSPredicate('...')
  }
};

class ProductListTripleColScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get tripleColumnViewButton (): Button {
      return new Button(SELECTORS.PRODUCT_NINE_TILE_BUTTON, 'Nine Product Grid View Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get allPrices (): Element {
      return new Element(SELECTORS.ALL_PRICES, 'All Visible Prices');
    }

    get allImages (): Element {
      return new Element(SELECTORS.ALL_IMAGES, 'All Visible Images');
    }

    get firstItemInGrid (): Element {
      return new Element(SELECTORS.FIRST_ITEM, 'FIRST Item In Grid');
    }

    get sixthItemInGrid (): Element {
      return new Element(SELECTORS.SIXTH_ITEM, 'Sixth Item In Grid');
    }

    get ninthItemInGrid (): Element {
      return new Element(SELECTORS.NINTH_ITEM, 'Ninth Item In Grid');
    }

    async getPrices (): Promise<Array<number>> {
      const selector: TSelectorOptions = SELECTORS.ALL_PRICES;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const visiblePrices = await $$(platformSelector.build());
      const allPrices: Array<string> = [];
      for await (const element of visiblePrices) {
        allPrices.push(await element.getText());
      }
      let allActualPrices: Array<number> = [];
      allActualPrices = allPrices.toString().replace(/,,/g, ',').replace(/.00/g, '').replace(/£/g, '').split(',').map(Number);
    
      return allActualPrices;
    }

    async verifyVisiblePricesBetween (fromPrice: number, toPrice: number): Promise<void> {
      const prices = await this.getPrices(); 
      for await (const el of prices) {
        expect(el).withContext('The visible price is less than the expected fromPrice').toBeGreaterThanOrEqual(fromPrice);
        expect(el).withContext('The visible price is greater than the expected toPrice').toBeLessThanOrEqual(toPrice);
      }
    }

    async scrollToCloseNavigation (): Promise<void> {
      await browser.touchPerform([
        { action: 'press', options: { x: 550, y: 1608 }},
        { action: 'wait', options: { ms: 400}},
        { action: 'moveTo', options: { x: 550, y:  1400}},
        { action: 'release' }
      ]);
    }

}

export default ProductListTripleColScreen;
