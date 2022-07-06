import Element from '../../elements/Element';
import Button from '../../elements/Button';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  TOOLBAR: {
    ANDROID: new UISelector().id('toolbar').child(new UISelector().class('android.widget.TextView')),
    IOS: new iOSPredicate('...')
  },
  SORT: {
    ANDROID: new UISelector().id('plp_sort'),
    IOS: new iOSPredicate('...')
  },
  FILTER: {
    ANDROID: new UISelector().id('plp_filter'),
    IOS: new iOSPredicate('...')
  }
};

class ProductListScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get toolbar (): Element {
      return new Element(SELECTORS.TOOLBAR, 'Toolbar Text');
    }

    get sort (): Button {
      return new Button(SELECTORS.SORT, 'Sort Button');
    }

    get filter (): Button {
      return new Button(SELECTORS.FILTER, 'Filter Button');
    }

}

export default ProductListScreen;