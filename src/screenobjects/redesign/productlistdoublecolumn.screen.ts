import Button from '../../elements/Button';
import Element from '../../elements/Element';
import GenericMessages from '../../helpers/GenericMessages';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';
import TestProducts from '../../specs/config';

const SELECTORS: TSelectorMap = {
  PRODUCT_GRID_VIEW_BUTTON: {
    ANDROID: new UISelector().id('double_column'),
    IOS: new iOSPredicate('name == "2productgrid"')
  }, // First item in grid
  PRODUCT_GRID_FIRST_ITEM: {
    ANDROID: new XPath('//androidx.recyclerview.widget.RecyclerView/*[1]/*[1]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_FIRST_ITEM_IMAGE: {
    ANDROID: new UISelector().id('row_product_2x2_image'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_FIRST_ITEM_WISHLIST_ICON: {
    ANDROID: new UISelector().id('row_product_2x2_wishlist'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_FIRST_ITEM_NAME: {
    ANDROID: new UISelector().id('row_product_2x2_title'),
    IOS: new iOSPredicate('...')
  }, 
  PRODUCT_GRID_VIEW_FIRST_ITEM_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().id('price')),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_FIRST_ITEM_OLD_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().id('old_price')),
    IOS: new iOSPredicate('...')
  },
  NG_PRODUCT_GRID_VIEW_FIRST_ITEM_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().index(2)),
    IOS: new iOSPredicate('...')
  },
  NG_PRODUCT_GRID_VIEW_FIRST_ITEM_OLD_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().index(0)),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_FIRST_ITEM_PRICES: {
    ANDROID: new UISelector().id('row_product_2x2_price'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_FIRST_ITEM_COLOR_SWATCH: {
    ANDROID: new UISelector().id('swatch_image'), 
    IOS: new iOSPredicate('...')
  }, // Second item in grid
  PRODUCT_GRID_SECOND_ITEM: {
    ANDROID: new XPath('//androidx.recyclerview.widget.RecyclerView/*[2]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_SECOND_ITEM_IMAGE: {
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.ImageView[1]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_SECOND_ITEM_WISHLIST_ICON: {
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.ImageView[2]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_SECOND_ITEM_OVERLAY: {
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.TextView[1]'),
    IOS: new iOSPredicate('...')
  }, 
  PRODUCT_GRID_VIEW_SECOND_ITEM_NAME_WITH_OVERLAY: {
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.TextView[2]'),
    IOS: new iOSPredicate('...')
  }, 
  PRODUCT_GRID_VIEW_SECOND_ITEM_NAME_WITH_SALE_TAG: { 
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.TextView[3]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_SECOND_ITEM_PRICES: { 
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.LinearLayout[1]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_VIEW_SECOND_ITEM_COLOR_SWATCHES: {
    ANDROID: new XPath('//android.view.ViewGroup[2]/android.widget.LinearLayout[2]'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_GRID_OASIS_TEST_ITEM: {
    ANDROID: new UISelector().text(TestProducts['oasis-stores.com'].defaultProduct.name),
    IOS: new iOSPredicate('...')
  },
};

class ProductListDoubleColScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get doubleColumnViewButton (): Button {
      return new Button(SELECTORS.PRODUCT_GRID_VIEW_BUTTON, 'Product Grid View Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    // First item in grid related methods
    get firstProduct (): Button {
      if (this.brand === GroupBrands.Oasis) {
        return new Button(SELECTORS.PRODUCT_GRID_OASIS_TEST_ITEM, 'Oasis Test Product Grid Item');
      } else {
        return new Button(SELECTORS.PRODUCT_GRID_FIRST_ITEM, 'First Product Grid Item');
      }
    }

    get firstProductImage (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_FIRST_ITEM_IMAGE, 'First Product In Grid Image');
    }

    get firstProductWishlistIcon (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_FIRST_ITEM_WISHLIST_ICON, 'First Product In Grid Wishlist Icon');
    }

    get firstProductName (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_FIRST_ITEM_NAME, 'First Product In Grid Name');
    }

    get firstProductPrice (): Element {
      if (this.brand === GroupBrands.NastyGal) {
        return new Element(SELECTORS.NG_PRODUCT_GRID_VIEW_FIRST_ITEM_PRICE, 'NastyGal First Product In Grid Item Price');
      } else {
        return new Element(SELECTORS.PRODUCT_GRID_VIEW_FIRST_ITEM_PRICE, 'First Product In Grid Item Price');
      } 
    }

    get firstProductOldPrice (): Element {
      if (this.brand === GroupBrands.NastyGal) {
        return new Element(SELECTORS.NG_PRODUCT_GRID_VIEW_FIRST_ITEM_OLD_PRICE, 'NastyGal First Product In Grid Item Old Price');
      } else {
        return new Element(SELECTORS.PRODUCT_GRID_VIEW_FIRST_ITEM_OLD_PRICE, 'First Product In Grid Item Old Price');
      }
    }

    get firstProductPrices (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_FIRST_ITEM_PRICES, 'First Product In Grid Item Prices');
    }

    get firstProductColourSwatch (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_FIRST_ITEM_COLOR_SWATCH, 'First Product In Grid Colour Swatch');
    }

    async getFirstProductOldPrice (): Promise<string> {
      let oldPrice: string;
      try {
        oldPrice = await this.firstProductOldPrice.getAttribute('text');
      } catch {
        oldPrice = '';
      }
      return oldPrice;
    }

    // Second item in grid related methods
    get secondProduct (): Button {
      return new Button(SELECTORS.PRODUCT_GRID_SECOND_ITEM, 'Second Product In Grid Item');
    }

    get secondProductImage (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_SECOND_ITEM_IMAGE, 'Second Product In Grid Image');
    }

    get secondProductWishlistIcon (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_SECOND_ITEM_WISHLIST_ICON, 'Second Product In Grid Wishlist Icon');
    }

    get secondName (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_SECOND_ITEM_OVERLAY, 'Second Product In Grid Name (without Overlay)');
    }

    get secondNameVariation (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_SECOND_ITEM_NAME_WITH_OVERLAY, 'Second Product In Grid Name Variation (with Overlay)');
    }

    get secondNameOtherVariation (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_SECOND_ITEM_NAME_WITH_SALE_TAG, 'Second Product In Grid Name Variation (with Sale tag)');
    }

    async getSecondItemName (): Promise<Element> {
      let elementId = '';
      elementId = await this.secondName.getAttribute('resource-id');
      if (elementId.includes('row_product_2x2_title')) {
        return this.secondName;
      } 
      elementId = await this.secondNameVariation.getAttribute('resource-id');
      if (elementId.includes('row_product_2x2_title')) {
        return this.secondNameVariation;
      }
      elementId = await this.secondNameOtherVariation.getAttribute('resource-id');
      if (elementId.includes('row_product_2x2_title')) {
        return this.secondNameOtherVariation;
      }

    }

    get secondProductOldPrice (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_SECOND_ITEM_OLD_PRICE, 'Second Product In Grid Old Price');
    }
    
    async getSecondProductOldPrice (): Promise<string> {
      let oldPrice: string;
      try {
        oldPrice = await this.secondProductOldPrice.getAttribute('text');
      } catch {
        oldPrice = '';
      }
      return oldPrice;
    }

    get secondProductPrices (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_SECOND_ITEM_PRICES, 'Second Product In Grid Item Prices');
    }

    get secondProductColourSwatches (): Element {
      return new Element(SELECTORS.PRODUCT_GRID_VIEW_SECOND_ITEM_COLOR_SWATCHES, 'Second Product In Grid Colour Swatches');
    }

}

export default ProductListDoubleColScreen;
