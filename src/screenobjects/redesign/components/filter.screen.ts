import { iOSPredicate, UISelector } from '../../../helpers/Utilities';
import { TSelectorMap, GroupBrands, TSelectorOptions, TSelector } from '../../../helpers/Types';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';

const SELECTORS: TSelectorMap = {
  ALL_FILTER_LABELS: {
    ANDROID: new UISelector().id('filterLabelTV'),
    IOS: new iOSPredicate('...')
  },
  SIZE_LABEL: { 
    ANDROID: new UISelector().id('filterLabelTV').textLowerUpper('Size'),
    IOS: new iOSPredicate('...')
  },
  STYLE_LABEL: {
    ANDROID: new UISelector().id('filterLabelTV').textLowerUpper('Style'),
    IOS: new iOSPredicate('...')
  },
  COLOUR_LABEL: {
    ANDROID: new UISelector().id('filterLabelTV').textLowerUpper('Colour'),
    IOS: new iOSPredicate('...')
  },
  PRICE_LABEL: {
    ANDROID: new UISelector().id('filterLabelTV').textLowerUpper('Price'),
    IOS: new iOSPredicate('...')
  },
  SHOP_BY_FIT_LABEL: {
    ANDROID: new UISelector().id('filterLabelTV').textLowerUpper('Shop By Fit'),
    IOS: new iOSPredicate('...')
  },
  OCCASION_LABEL: {
    ANDROID: new UISelector().id('filterLabelTV').textLowerUpper('Occasion'),
    IOS: new iOSPredicate('...')
  },
  APPLY_FILTERS: {
    ANDROID: new UISelector().id('apply_button'),
    IOS: new iOSPredicate('...')
  },
  CANCEL_FILTERS: {
    ANDROID: new UISelector().id('clear_button'),
    IOS: new iOSPredicate('...')
  },
  FILTER_NAME_TEXT: {
    ANDROID: new UISelector().id('filter_name'),
    IOS: new iOSPredicate('...')
  }
};

class FilterScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand=brand;
    }

    get allFilterLabels (): Element {
      return new Element(SELECTORS.ALL_FILTER_LABELS, 'All Available Filter Labels');
    }

    get sizeLabel (): Button {
      return new Button(SELECTORS.SIZE_LABEL, 'Size Filter Label');
    }

    get styleLabel (): Button {
      return new Button(SELECTORS.STYLE_LABEL, 'Style Filter Label');
    }

    get colourLabel (): Button {
      return new Button(SELECTORS.COLOUR_LABEL, 'Colour Filter Label');
    }

    get priceLabel (): Button {
      return new Button(SELECTORS.PRICE_LABEL, 'Price Filter Label');
    }

    get shopByFitLabel (): Button {
      return new Button(SELECTORS.SHOP_BY_FIT_LABEL, 'Shop By Fit Filter Label');
    }

    get occasionLabel (): Button {
      return new Button(SELECTORS.OCCASION_LABEL, 'Occasion Filter Label');
    }

    get applyFilters (): Button {
      return new Button(SELECTORS.APPLY_FILTERS, 'Apply Filters Button');
    }

    get clearFilters (): Button {
      return new Button(SELECTORS.CANCEL_FILTERS, 'Clear Filters Button');
    }

    get filterNameText (): Element {
      return new Element(SELECTORS.FILTER_NAME_TEXT, 'Filter Name Text');
    }

    async getAllFilters (): Promise<WebdriverIO.ElementArray> {
      const selector: TSelectorOptions = SELECTORS.ALL_FILTER_LABELS;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const filters = await $$(platformSelector.build());
      return filters;
    }

    async getAllFiltersLabels (): Promise<Array<string>> {
      const selector: TSelectorOptions = SELECTORS.ALL_FILTER_LABELS;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const filters = await $$(platformSelector.build());
      const allFilters: Array<string> = [];
      for await (const element of filters) {
        allFilters.push(await element.getText());
      }
      return allFilters;
    }

    async getAllSubfiltersLabels (): Promise<Array<string>> {
      const selector: TSelectorOptions = SELECTORS.FILTER_NAME_TEXT;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const filters = await $$(platformSelector.build());
      const allFilters: Array<string> = [];
      for await (const element of filters) {
        allFilters.push(await element.getText());
      }
      return allFilters;
    }

    async getAllSubfilters (): Promise<WebdriverIO.ElementArray> {
      const selector: TSelectorOptions = SELECTORS.FILTER_NAME_TEXT;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const filters = await $$(platformSelector.build());
      return filters;
    }

    async selectFirstSubfilter (): Promise<void> {
      const subfilters = await this.getAllSubfilters();
      for await (const el of subfilters) {
        if (subfilters[0]) {
          el.click();
          break;
        }
      }
    }

    async getFirstSubfilterText (): Promise<string> {
      await driver.pause(10000);
      const subfilterLabels = await this.getAllSubfiltersLabels();
      for await (const el of subfilterLabels) {
        if (subfilterLabels[0]) {
          return el;
        }
      }
    }

    async getToPrice (): Promise<number> {
      const labels: Array<string> =(await this.getFirstSubfilterText()).split('-');
      return Number(labels[1].replace('£', ''));

    }

    async getFromPrice (): Promise<number> {
      const labels: Array<string> =(await this.getFirstSubfilterText()).split('-');
      return Number(labels[0].replace('£', ''));
    }

}

export default FilterScreen;