import { GetPaymentProvider, iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';
import Element from '../../elements/Element';
import Button from '../../elements/Button';
import Field from '../../elements/Field';
import { GroupBrands, TPaymentCard, PaymentProvider, TSelectorMap } from '../../helpers/Types';

const SELECTORS: TSelectorMap = {
  FIRST_PAYMENT_METHOD_CARD_NUMBER: {
    ANDROID: new XPath('//android.view.View[2]/android.view.View[1]'),
    IOS: new iOSPredicate('name BEGINSWITH "****"')
  },
  ADD_NEW_CARD_BUTTON: {
    ANDROID: new UISelector().class('android.widget.Button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "ADD NEW CARD"')
  },
  ZERO_STATE_TEXT: {
    ANDROID: new XPath('//*[contains(@text, "You don\'t have any saved cards yet")]'),
    IOS: new iOSPredicate('...')
  },
  CARD_NUMBER_FIELD: {
    ANDROID: new UISelector().text('Card Number'),
    IOS: new XPath('//*[@name="Card Number"]/parent::*/XCUIElementTypeTextField')
  },
  CARD_NAME_FIELD: {
    ANDROID: new UISelector().text('Name on Card'),
    IOS: new XPath('//*[@name="Name on Card:"]/parent::*/XCUIElementTypeTextField')
  },
  CARD_EXPIRE_FIELD: {
    ANDROID: new UISelector().text('Expiry date'),
    IOS: new XPath('//*[@name="Expiry date"]/parent::*/XCUIElementTypeTextField')
  },
  CARD_CVV_FIELD: {
    ANDROID: new UISelector().id('security_code_edit_text'),
    IOS: new XPath('...')
  },
  CONFIRM_ADD_CARD_BUTTON: {
    ANDROID: new UISelector().text('ADD CARD'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "SAVE CHANGES"')
  },
  BACK_BUTTON: {
    ANDROID: new XPath('//android.widget.ImageButton[@content-desc="Navigate up"]'),
    IOS: new iOSPredicate('name == "Payment Methods"')
  },
  ADD_EXTRA_NEW_CARD_BUTTON: {
    ANDROID: new XPath('//android.view.View[1]/android.widget.Button'),
    IOS: new iOSPredicate('...')
  },
  DELETE_CARD_BUTTON: {
    ANDROID: new XPath('//android.view.View[@text="DELETE"]'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_DELETE_CARD_BUTTON: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  }
};

class PaymentMethodsScreen {

  private brand: GroupBrands;

  constructor (brand: GroupBrands) {
    this.brand = brand;
  }

  get addExtraNewCardButton (): Button {
    return new Button(SELECTORS.ADD_EXTRA_NEW_CARD_BUTTON, 'Add Extra New Card Button');
  }

  get firstPaymentMethodCardNumber (): Element {
    return new Element(SELECTORS.FIRST_PAYMENT_METHOD_CARD_NUMBER, 'First Payment Method Card Number');
  }

  get addNewCardButton (): Button {
    return new Button(SELECTORS.ADD_NEW_CARD_BUTTON, 'Add New Card Button');
  }

  get cardNumberField (): Field {
    return new Field(SELECTORS.CARD_NUMBER_FIELD, 'Card Number Field');
  }

  get cardNameField (): Field {
    return new Field(SELECTORS.CARD_NAME_FIELD, 'Card Name Field');
  }

  get cardExpiryField (): Field {
    return new Field(SELECTORS.CARD_EXPIRE_FIELD, 'Card Expiry Field');
  }

  get cardSecurityCode (): Field {
    return new Field(SELECTORS.CARD_CVV_FIELD, 'Payment Security Code');
  }

  get confirmAddCardButton (): Field {
    return new Field(SELECTORS.CONFIRM_ADD_CARD_BUTTON, 'Confirm Add Card Button');
  }

  get backButton (): Button {
    return new Button(SELECTORS.BACK_BUTTON, 'Payment Back Button');
  }

  get deleteCardButton (): Button {
    return new Button(SELECTORS.DELETE_CARD_BUTTON, 'Delete Credit Card Button');
  }

  get confirmCardDeletionAlert (): Button {
    return new Button(SELECTORS.CONFIRM_DELETE_CARD_BUTTON, 'Confirm Credit Card Deletion');
  }

  get zeroStateText (): Element {
    return new Button(SELECTORS.ZERO_STATE_TEXT, 'Zero State Credit Card Partial Text');
  }

  async fillCardDetails (paymentCard: TPaymentCard): Promise<void> {
    await this.cardNumberField.sendText(paymentCard.cardNumber);
    await this.cardNameField.sendText(paymentCard.cardName);
    await this.cardExpiryField.sendText(paymentCard.cardExpiryFormatted);

    // Adyen require a CVC to add saved card details for security.
    if (GetPaymentProvider(this.brand) == PaymentProvider.Adyen) {
      await this.cardSecurityCode.sendText(paymentCard.cardCVV, { textValidation: true });
    }
  }

  async navigateBackToProfileScreen (): Promise<void> {
    await driver.back();
  }

  async checkIfDeleteButtonIsVisible (): Promise<void> {
    if (this.deleteCardButton.checkIfDisplayed({timeout : 10 * 1000 })) {
      console.log('Delete Payment Method Button is visible');
    } else {
      console.warn('The Credit Card used for the purchase was not saved in Payment Method section. Continuing with the test');
    }
  }
}

export default PaymentMethodsScreen;
