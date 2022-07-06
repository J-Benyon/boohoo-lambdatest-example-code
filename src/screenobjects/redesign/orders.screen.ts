import Button from '../../elements/Button';
import Element from '../../elements/Element';
import GenericMessages from '../../helpers/GenericMessages';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  TOP_ORDER_CONTAINER: {
    ANDROID: new XPath('//android.view.View[@index="5"]'),
    IOS: new iOSPredicate('type CONTAINS "Cell"')
  },
  ORDER_DATE: {
    ANDROID: new XPath('//android.view.View[@index="1"]'),
    IOS: new iOSPredicate('...')
  }, 
  ORDER_DATE_VARIATION: {
    ANDROID: new XPath('//android.view.ViewGroup//android.widget.TextView[2]'),
    IOS: new iOSPredicate('...')
  },
  ORDER_TOTAL: {
    ANDROID: new XPath('//android.view.View[@index="3"]'),
    IOS: new iOSPredicate('...')
  }, 
  ORDER_TOTAL_VARIATION: {
    ANDROID: new XPath('//android.view.ViewGroup//android.widget.TextView[4]'),
    IOS: new iOSPredicate('...')
  },
  ORDER_PRODUCT_IMAGE: {
    ANDROID: new XPath('//android.view.View[@index="5"]'),
    IOS: new iOSPredicate('...')
  },
  GO_SHOPPING_BUTTON: {
    ANDROID: new XPath('//*[@text="GO SHOPPING"]'),
    IOS: new iOSPredicate('...')
  }

}; 

class OrdersScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get topOrderContainer (): Button {
      return new Button(SELECTORS.TOP_ORDER_CONTAINER, 'First Order Container', { message: GenericMessages.NO_ORDER_IN_ORDER_LIST });
    }

    get orderDate (): Element {
      if (this.brand === GroupBrands.Boohoo) {
        return new Element(SELECTORS.ORDER_DATE, 'Order Date For Boohoo');
      } else {
        return new Element(SELECTORS.ORDER_DATE_VARIATION, 'Order Date For AllExceptBoohoo');
      }
    }

    get orderTotalPrice (): Element {
      if (this.brand === GroupBrands.Boohoo) {
        return new Element(SELECTORS.ORDER_TOTAL, 'Order Total Price For Boohoo');

      } else {
        return new Element(SELECTORS.ORDER_TOTAL_VARIATION, 'Order Total Price For AllExceptBoohoo');
      }
    }

    get topOrderProductImage (): Element {
      return new Element(SELECTORS.ORDER_PRODUCT_IMAGE, 'Order Product Image');
    }

    get goShoppingButton (): Button {
      return new Button(SELECTORS.GO_SHOPPING_BUTTON, 'Go Shopping Zero State Button');
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }

}

export default OrdersScreen;
