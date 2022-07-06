import Button from '../../elements/Button';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';
import { GroupBrands, TSelector, TSelectorMap, TSelectorOptions } from '../../helpers/Types';
import GenericMessages from '../../helpers/GenericMessages';
import Element from '../../elements/Element';

const SELECTORS: TSelectorMap = {
  ADD_TO_CART_BUTTON: {
    ANDROID: new UISelector().id('fab'),
    IOS: new iOSPredicate('name == "addtobag"')
  },
  SIZE_SELECTION: {
    ANDROID: new XPath('//*[contains(@resource-id, "size_border")][1]'),
    IOS: new iOSPredicate('type == "XCUIElementTypeButton" && name == "6"')
  },
  ADD_TO_CART_CONFIRM_BUTTON: {
    ANDROID: new UISelector().id('add_to_basket_button'),
    IOS: new iOSPredicate('type == "XCUIElementTypeButton" && name == "ADD TO BAG"')
  },
  ADD_TO_CART_CANCEL_BUTTON: {
    ANDROID: new UISelector().id('cancel_button'),
    IOS: new iOSPredicate('...')
  },
  NG_ADD_TO_CART_CANCEL_BUTTON: {
    ANDROID: new UISelector().id('close_cross'),
    IOS: new iOSPredicate('...')
  },
  BACK_BUTTON: {
    ANDROID: new XPath('//*[contains(@resource-id, "toolbar")]/android.widget.ImageButton'),
    IOS: new iOSPredicate('name == "back"')
  },
  COLOUR_SWATCHES: {
    ANDROID: new UISelector().id('swatch_image'),
    IOS: new iOSPredicate('...')
  },
  SIZES: {
    ANDROID: new UISelector().id('size_background'),
    IOS: new iOSPredicate('...')
  },
  NAME_LABEL: {
    ANDROID: new UISelector().id('name_label'),
    IOS: new iOSPredicate('...')
  },
  WISHLIST_BUTTON: {
    ANDROID: new UISelector().id('wishlist'),
    IOS: new iOSPredicate('...')
  },
  INCREMENT_QUANTITY_BUTTON: {
    ANDROID: new UISelector().id('increment'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().id('price_view').child(new UISelector().id('price'))),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_OLD_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().id('old_price')),
    IOS: new iOSPredicate('...')
  }, 
  NG_PRODUCT_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().id('price_view').child(new UISelector().index(2))),
    IOS: new iOSPredicate('...')
  },
  NG_PRODUCT_OLD_PRICE: {
    ANDROID: new UISelector().id('price_view').child(new UISelector().id('price_view').child(new UISelector().index(0))),
    IOS: new iOSPredicate('...')
  },
  STOCK_NUMBER: {
    ANDROID: new UISelector().id('basketDialogInStockTV'),
    IOS: new iOSPredicate('...')
  },
  RETURNS_TAB: {
    ANDROID: new UISelector().class('android.widget.Button').textLowerUpper('RETURNS'),
    IOS: new iOSPredicate('...')
  },
  PRODUCT_IMAGE: {
    ANDROID: new UISelector().id('image'),
    IOS: new iOSPredicate('...')
  }
};

class ProductScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }
    
    get wishlistButton (): Button {
      return new Button(SELECTORS.WISHLIST_BUTTON, 'Product Wishlist Button');
    }

    get nameLabel (): Element {
      return new Element(SELECTORS.NAME_LABEL, 'Product Name Label');
    }

    get addToBagButton (): Button {
      return new Button(SELECTORS.ADD_TO_CART_BUTTON, 'Add to Cart Button');
    }

    get sizeSelection (): Button {
      return new Button(SELECTORS.SIZE_SELECTION, 'First Size Selection Option');
    }

    get confirmAddToBagButton (): Button {
      return new Button(SELECTORS.ADD_TO_CART_CONFIRM_BUTTON, 'Add to Cart Confirmation', { message: GenericMessages.COULD_NOT_ADD_TO_BASKET });
    }

    get cancelAddToBagButton (): Button {
      if (this.brand === GroupBrands.NastyGal) {
        return new Button(SELECTORS.NG_ADD_TO_CART_CANCEL_BUTTON, 'Add to Cart NastuGal Cancelation');
      } else {
        return new Button(SELECTORS.ADD_TO_CART_CANCEL_BUTTON, 'Add to Cart Cancelation');
      }
    }

    get backButton (): Button {
      return new Button(SELECTORS.BACK_BUTTON, 'Back Button');
    }

    get colourSwatches (): Element {
      return new Element(SELECTORS.COLOUR_SWATCHES, 'Product Colour Swatches');
    }

    get incrementQuantityButton (): Button {
      return new Button(SELECTORS.INCREMENT_QUANTITY_BUTTON, 'Product Increment Quantity Arrow');
    }

    get price (): Element {
      if (this.brand === GroupBrands.NastyGal) {
        return new Element(SELECTORS.NG_PRODUCT_PRICE, 'Nasty Gal Product Item Price');
      } else {
        return new Element(SELECTORS.PRODUCT_PRICE, 'Product Item Price');
      }
    }

    get oldPrice (): Element {
      if (this.brand === GroupBrands.NastyGal) {
        return new Element(SELECTORS.NG_PRODUCT_OLD_PRICE, 'Nasty Gal Product Old Price');
      } else {
        return new Element(SELECTORS.PRODUCT_OLD_PRICE, 'Product Old Price');
      }
    }

    get stockStatus (): Element {
      return new Element(SELECTORS.STOCK_NUMBER, 'Product Stock Status Text');
    }

    get returnsTab (): Element {
      return new Element(SELECTORS.RETURNS_TAB, 'Returns Tab');
    }

    get productImage (): Element {
      return new Element(SELECTORS.PRODUCT_IMAGE, 'Product Image');
    }

    async getOldPrice (): Promise<string> {
      let oldPrice: string;
      try {
        oldPrice = await this.oldPrice.getAttribute('text');
      } catch {
        oldPrice = '';
      }
      return oldPrice;
    }

    async getSizeButtonByLabel (size: string): Promise<Button> {
      const BUTTON_BUILDER = {
        ANDROID: new UISelector().id('size_text').text(size),
        IOS: new iOSPredicate('...')
      };
      return new Button(BUTTON_BUILDER, `Product Size Button From Label ${size}`);
    }

    async iterateColours (): Promise<void> {
      const selector: TSelectorOptions = SELECTORS.COLOUR_SWATCHES;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const colourSwatches = await $$(platformSelector.build());

      for await (const element of colourSwatches) {
        await element.waitForExist();
        await element.waitForEnabled();
        await element.waitForDisplayed();
        await element.click();
      }
    }

    async iterateSizes (): Promise<void> {
      const selector: TSelectorOptions = SELECTORS.SIZES;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const colourSwatches = await $$(platformSelector.build());

      for await (const element of colourSwatches) {
        await element.waitForExist();
        await element.waitForEnabled();
        await element.waitForDisplayed();
        await element.click();
      }
    }
}

export default ProductScreen;