import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import { EvidenceFileName } from '../../../specs/redesign/evidence/helpers/Types';

const SELECTORS: TSelectorMap = {
  HELP_WITH_THIS_ORDER_BUTTON: {
    ANDROID: new UISelector().id('order_details_help_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name CONTAINS "HELP"')
  },
  ORDER_DATE: {
    ANDROID: new UISelector().id('order_date_text'),
    IOS: new iOSPredicate('...')
  },
  ORDER_DATE_KM: {
    ANDROID: new UISelector().class('android.widget.TextView').id('order_date_text'),
    IOS: new iOSPredicate('...')
  },
  CARRIER: {
    ANDROID: new UISelector().id('carrier_label'),
    IOS: new iOSPredicate('...')
  },
  DELIVERED_TO_FIELD: {
    ANDROID: new UISelector().id('delivered_to'),
    IOS: new XPath('//*[@name="Delivered To:"]/parent::*/*/XCUIElementTypeStaticText[4]')
  },
  DELIVERY_METHOD: {
    ANDROID: new UISelector().id('delivery_method'),
    IOS: new XPath('...')
  },
  PAYMENT_METHOD: {
    ANDROID: new UISelector().id('payment_method_text'),
    IOS: new XPath('...')
  },
  NUMBER_OF_ITEMS: {
    ANDROID: new UISelector().id('items_text'),
    IOS: new XPath('...')
  },
  ORDER_NUMBER: {
    ANDROID: new UISelector().id('toolbar').child(new UISelector().class('android.widget.TextView')),
    IOS: new XPath('...')
  }, //
  FIVE_MOST_ASKED_QUESTIONS: {
    ANDROID: new UISelector().id('help_order_questions_button'),
    IOS: new XPath('...')
  },
  ORDERS_AND_DELIVERY: {
    ANDROID: new UISelector().id('help_order_orders_button'),
    IOS: new XPath('...')
  },
  RETURNS_AND_REFUNDS: {
    ANDROID: new UISelector().id('help_order_returns_button'),
    IOS: new XPath('...')
  },
  PAYMENT_AND_PROMOTIONS: {
    ANDROID: new UISelector().id('help_order_payments_button'),
    IOS: new XPath('...')
  }, 
  FACEBOOK_CONTACT: {
    ANDROID: new XPath('//android.widget.Button[@text="FACEBOOK"]'),
    IOS: new XPath('...')
  },
  TWITTER_CONTACT: {
    ANDROID: new XPath('//android.widget.Button[@text="TWITTER"]'),
    IOS: new XPath('...')
  },
  WHATSAPP_CONTACT: {
    ANDROID: new XPath('//android.widget.Button[@text="WHATSAPP"]'),
    IOS: new XPath('...')
  },
  ORDER_COLOUR_SIZE_QUANTITY: {
    ANDROID: new UISelector().id('product_ordered_extra'),
    IOS: new XPath('...')
  },
  ORDER_PRODUCT_IMAGE: {
    ANDROID: new UISelector().id('product_ordered_image'),
    IOS: new iOSPredicate('...')
  }
};

class OrderDetails {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get helpWithThisOrderButton (): Button {
      return new Button(SELECTORS.HELP_WITH_THIS_ORDER_BUTTON, 'Help With This Order Button');
    }

    get deliveredToField (): Element {
      return new Element(SELECTORS.DELIVERED_TO_FIELD, 'Delivered to Field Text');
    }

    get orderDate (): Element {
      if (this.brand === GroupBrands.KarenMillen) {
        return new Element(SELECTORS.ORDER_DATE_KM, 'Order Date Text For KarenMillen');
      } else {
        return new Element(SELECTORS.ORDER_DATE, 'Order Date Text');
      }
    }

    get orderCarrier (): Element {
      return new Element(SELECTORS.CARRIER, 'Order Carrier Text');
    }

    get deliveryMethod (): Element {
      return new Element(SELECTORS.DELIVERY_METHOD, 'Order Delivery Method Text');
    }

    get paymentMethod (): Element {
      return new Element(SELECTORS.PAYMENT_METHOD, 'Order Payment Method Text');
    }

    get numberOfItems (): Element {
      return new Element(SELECTORS.NUMBER_OF_ITEMS, 'Order Number Of Items Text');
    }

    get orderNumber (): Element {
      return new Element(SELECTORS.ORDER_NUMBER, 'Order Number Text');
    }

    get fiveMostAskedQuestion (): Button {
      return new Button(SELECTORS.FIVE_MOST_ASKED_QUESTIONS, 'FAQ 5 Most Asked Questions Button');
    }

    get ordersAndDelivery (): Button {
      return new Button(SELECTORS.ORDERS_AND_DELIVERY, 'FAQ Orders & Delivery Button');
    }

    get returnsAndRefunds (): Button {
      return new Button(SELECTORS.RETURNS_AND_REFUNDS, 'FAQ Returns & Refunds Button');
    }

    get paymentAndPromotions (): Button {
      return new Button(SELECTORS.PAYMENT_AND_PROMOTIONS, 'FAQ Payment & Promotions Button');
    }

    get contactViaFacebookButton (): Button {
      return new Button(SELECTORS.FACEBOOK_CONTACT, 'Facebook Button');
    }

    get contactViaTwitterButton (): Button {
      return new Button(SELECTORS.TWITTER_CONTACT, 'Twitter Button');
    }

    get contactViaWhatsappButton (): Button {
      return new Button(SELECTORS.WHATSAPP_CONTACT, 'Whatsapp Button');
    }

    get orderColourSizeQuantity (): Element {
      return new Element(SELECTORS.ORDER_COLOUR_SIZE_QUANTITY, 'Order Details: size, colour and quantity');
    }

    get orderProductImage (): Element {
      return new Element(SELECTORS.ORDER_PRODUCT_IMAGE, 'Order Details: order product image');
    }

    async checkIfOrderDetailsScreenIsOpened (): Promise<void> {
      if (this.helpWithThisOrderButton.checkIfDisplayed({timeout : 10 * 1000 })) {
        console.log('Order Details Screen is successfully opened');
      } else {
        throw new Error('The order is still being processed and cannot be opened. ' + EvidenceFileName.OrderDetailsScreen + ' screenshot will be skipped' );

      }
    }
}

export default OrderDetails;
