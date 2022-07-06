import Button from '../../elements/Button';
import Field from '../../elements/Field';
import { AndroidActions } from '../../helpers/Utilities';
import GenericMessages from '../../helpers/GenericMessages';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {

  TOP_LIST_ITEM: {
    ANDROID:new UISelector().id('row_menu_bg'),
    IOS: new iOSPredicate('..."')
  },

  SEARCH_ICON: {
    ANDROID: new UISelector().id('action_search'),
    IOS: new iOSPredicate('...')
  },

  SEARCH_FIELD: {
    ANDROID:new UISelector().id('search_src_text'),
    IOS: new iOSPredicate('...')
  },

  SALE_LIST_ITEM: {
    ANDROID: new XPath('//*[@text="SALE"]/parent::*'),
    IOS: new iOSPredicate('name == "SALE"')
  },

  ALL_SALE_LIST_ITEM: {
    ANDROID: new XPath('//*[@text="All Sale"]/parent::*'),
    IOS: new iOSPredicate('name == "All Sale"')
  },

  DRESSES: {
    ANDROID: new UISelector().textLowerUpper('Dresses'),
    IOS: new iOSPredicate('...')
  },

  ALL_DRESSES: {
    ANDROID: new UISelector().textLowerUpper('All Dresses'),
    IOS: new iOSPredicate('...')
  },

  CLOTHING: {
    ANDROID: new UISelector().textLowerUpper('Clothing'),
    IOS: new iOSPredicate('...')
  },

  TOPS: {
    ANDROID: new UISelector().textLowerUpper('Tops'),
    IOS: new iOSPredicate('...')
  },

  TRACKSUITS: {
    ANDROID: new UISelector().textLowerUpper('Tracksuits'),
    IOS: new iOSPredicate('...')
  },

  VIEW_ALL_CLOTHING: {
    ANDROID: new UISelector().textLowerUpper('View All Clothing'),
    IOS: new iOSPredicate('...')
  }
};

class ShopScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get topListItem (): Button {
      return new Button(SELECTORS.TOP_LIST_ITEM, 'All Clothings List Item', { message: GenericMessages.COULD_NOT_LOAD_SHOP_LIST });
    }

    get searchIcon (): Button {
      return new Button(SELECTORS.SEARCH_ICON, 'Search Icon');
    }

    get searchTextField (): Field {
      return new Field(SELECTORS.SEARCH_FIELD, 'Search Field');
    }
    
    get allSaleListItem (): Button {
      return new Button(SELECTORS.ALL_SALE_LIST_ITEM, 'Top List Item');
    }

    get saleListItem (): Button {
      return new Button(SELECTORS.SALE_LIST_ITEM, 'Top List Item');
    }

    get dresses (): Button {
      return new Button(SELECTORS.DRESSES, 'Dresses Category');
    }

    get allDresses (): Button {
      return new Button(SELECTORS.ALL_DRESSES, 'All Dresses Subcategory');
    }

    get clothing (): Button {
      return new Button(SELECTORS.CLOTHING, 'Clothing Category');
    }

    get tops (): Button {
      return new Button(SELECTORS.TOPS, 'Tops Subategory');
    }

    get tracksuits (): Button {
      return new Button(SELECTORS.TRACKSUITS, 'Tracksuits Subcategory');
    }

    get viewAllClothing (): Button {
      return new Button(SELECTORS.VIEW_ALL_CLOTHING, 'View All Clothing Subcategory');
    }

    async searchProduct (sku: string): Promise<void> {
      await this.searchTextField.sendText(sku, { scrollToElement: false, hideKeyboardAfter: true } );
      await this.searchTextField.iOSCarriageReturn();
      await AndroidActions.PerformAction('search'); // These android actions don't run on iOS, it just skips it and sends a warning to log.
    }

    async goToProductListPage (): Promise<void> {
      if (this.brand === GroupBrands.NastyGal ||this.brand === GroupBrands.Boohoo || this.brand === GroupBrands.Oasis || this.brand === GroupBrands.Coast || this.brand === GroupBrands.KarenMillen|| this.brand === GroupBrands.MissPap ) {    
        await this.dresses.click();
        await this.allDresses.click();
      } else if (this.brand === GroupBrands.Warehouse) {
        await this.clothing.click();
        await this.tops.click();
      }
      else if (this.brand === GroupBrands.BoohooMAN) {
        await this.clothing.click();
        await this.tracksuits.click();
      } else {
        await this.clothing.click();
        await this.viewAllClothing.click();
      }
    }

}

export default ShopScreen;