import Button from '../../elements/Button';
import Element from '../../elements/Element';
import GenericMessages from '../../helpers/GenericMessages';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';
import { EvidenceFileName } from '../../specs/redesign/evidence/helpers/Types';

const SELECTORS: TSelectorMap = {
  ORDER_CONFIRMATION_TEXT: {
    ANDROID: new UISelector().id('order_confirmation_email_info'),
    IOS: new iOSPredicate('name CONTAINS "An email confirming your order"')
  },
  CONTINUE_SHOPPING: {
    ANDROID: new UISelector().textLowerUpper('CONTINUE SHOPPING'),
    IOS: new iOSPredicate('name == "CONTINUE SHOPPING"')
  },
  NUMBER_OF_ITEMS: {
    ANDROID: new UISelector().id('in_the_bag'),
    IOS: new iOSPredicate('...')
  },
  DELIVERY_ADDRESS: {
    ANDROID: new UISelector().id('delivery_address'),
    IOS: new iOSPredicate('...')
  },
  DATE_OF_ORDER: {
    ANDROID: new UISelector().id('date_of_order'),
    IOS: new iOSPredicate('...')
  },
  PAYMENT_METHOD: {
    ANDROID: new UISelector().id('payment_method'),
    IOS: new iOSPredicate('...')
  },
  DELIVERY_OPTIONS: {
    ANDROID: new UISelector().id('deliver_option'),
    IOS: new iOSPredicate('...')
  }, 
  CONTINUE: {
    ANDROID: new XPath('//android.widget.TextView[@text="Continue"]'),
    IOS: new iOSPredicate('...')
  }
};

class OrderConfirmationScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get orderConfirmationText (): Element {
      return new Element(SELECTORS.ORDER_CONFIRMATION_TEXT, 'Order Confirmation Text', { message: GenericMessages.PAYMENT_ISSUE });
    }

    get continueShoppingButton (): Button {
      return new Button(SELECTORS.CONTINUE_SHOPPING, 'Order Confirmation Continue Button');
    }

    get numberOfItems (): Element {
      return new Element(SELECTORS.NUMBER_OF_ITEMS, 'Order Confirmation Number Of Items');
    }

    get deliveryAddress (): Element {
      return new Element(SELECTORS.DELIVERY_ADDRESS, 'Order Confirmation Delivery Address');
    }

    get dateOfOrder (): Element {
      return new Element(SELECTORS.DATE_OF_ORDER, 'Order Confirmation Date Of ORder');
    }

    get paymentMethod (): Element {
      return new Element(SELECTORS.PAYMENT_METHOD, 'Order Confirmation Payment Method');
    }

    get deliveryOptions (): Element {
      return new Element(SELECTORS.DELIVERY_OPTIONS, 'Order Confirmation Delivery Options');
    }

    get continueToPartnerProgramme (): Button {
      return new Button(SELECTORS.CONTINUE, 'Continue Button To Join Partner Programme');
    }

    async getUserEmailAddress (emailAddress: string): Promise<Element> {
      const ELEMENT_BUILDER = {
        ANDROID: new XPath(`//*[@text="${emailAddress}"]`),
        IOS: new iOSPredicate('...')
      };
      return new Element(ELEMENT_BUILDER, `User Email Address with email address: ${emailAddress}`);
    }

    async checkIfOrderConfirmationScreenIsVisible (): Promise<void> {
      // We are throwing an error if there's a problem and payment doesn't go through
      if (await this.continueShoppingButton.checkIfDisplayed({timeout: 20 * 1000})) {
        console.log('No payment issues');
      } else {
        console.log('Skipping following screenshots: ' + EvidenceFileName.OrderConfirmationScreenTop + ', ' + EvidenceFileName.OrderConfirmationScreenBottom + ', ' + EvidenceFileName.PaymentMethodsWithCreditCard + ', ' + EvidenceFileName.OrdersWithOrderScreen + 'and ' + EvidenceFileName.OrderDetailsScreen);
        throw new Error('Payment issue. Not redirected to Order Confirmation screen.');
      }
    }

    async waitForOrderConfirmationScreen (): Promise<void> {
      try {
        await this.continueToPartnerProgramme.waitForExistance({timeout: 5000});
      } catch {
        await this.continueShoppingButton.waitForExistance();
      }
    }
}

export default OrderConfirmationScreen;
