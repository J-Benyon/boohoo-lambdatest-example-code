import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';
import { GroupBrands, TPaymentCard, TElementOptions, TSelectorMap } from '../../helpers/Types';
import Button from '../../elements/Button';
import Field from '../../elements/Field';
import Element from '../../elements/Element';
import GenericMessages from '../../helpers/GenericMessages';
import { SMALL_WAIT } from '../../constants';

// TODO needs to be seperated into 3 catagories, delivery, payment and confirmation.
const SELECTORS: TSelectorMap = {
  PROGRESS_BAR_DELIVERY: {
    ANDROID: new UISelector().id('breadcrumbs').child(new UISelector().text('Delivery')),
    IOS: new iOSPredicate('...')
  },
  PROGRESS_BAR_DELIVERY_STEP: {
    ANDROID: new UISelector().id('checkout_delivery_breadcrumb').child(new UISelector().id('step')),
    IOS: new iOSPredicate('...')
  },
  PROGRESS_BAR_PAYMENT: {
    ANDROID: new UISelector().id('breadcrumbs').child(new UISelector().text('Payment')),
    IOS: new iOSPredicate('...')
  },
  PROGRESS_BAR_PAYMENT_STEP: {
    ANDROID: new UISelector().id('checkout_payment_breadcrumb').child(new UISelector().id('step')),
    IOS: new iOSPredicate('...')
  },
  PROGRESS_BAR_CONFIRMATION: {
    ANDROID: new UISelector().id('breadcrumbs').child(new UISelector().text('Confirmation')),
    IOS: new iOSPredicate('...')
  },
  PROGRESS_BAR_CONFIRMATION_STEP: {
    ANDROID: new UISelector().id('checkout_confirmation_breadcrumb').child(new UISelector().id('step')),
    IOS: new iOSPredicate('...')
  },
  PROCEED_TO_PAYMENT: {
    ANDROID: new UISelector().id('order_payment_button'),
    IOS: new iOSPredicate('name == "PROCEED TO PAYMENT"')
  },
  SELECT_CARD_PAYMENT: {
    ANDROID: new UISelector().id('payment_option_text').text('Card'),
    IOS: new iOSPredicate('name == "Card"')
  },
  SELECT_PAYPAL_PAYMENT: {
    ANDROID: new UISelector().text('PayPal'),
    IOS: new iOSPredicate('name == "PayPal"')
  },
  CARD_NUMBER_FIELD: {
    ANDROID: new UISelector().id('ccInputEdit'),
    IOS: new XPath('//*[@name="Card Number"]/parent::*/XCUIElementTypeTextField')
  },
  CARD_NAME_FIELD: {
    ANDROID: new UISelector().id('nameInputEdit'),
    IOS: new XPath('//*[@name="Name on Card:"]/parent::*/XCUIElementTypeTextField')
  },
  CARD_EXPIRY_FIELD: {
    ANDROID: new UISelector().id('ccExpiryDateInputEdit'),
    IOS: new XPath('//*[@name="Expiry date"]/parent::*/XCUIElementTypeTextField')
  },
  CARD_SECURITY_CODE_FIELD: {
    ANDROID: new UISelector().id('ccSecurityCodeInputEdit'),
    IOS: new XPath('//*[@name="Security Code"]/parent::*/XCUIElementTypeTextField')
  },
  PAY_NOW_BUTTON: {
    ANDROID: new UISelector().class('android.widget.Button').text('PAY NOW'),
    IOS: new iOSPredicate('name == "PAY NOW"')
  },
  CONFIRM_PAYMENT_BUTTON: {
    IOS: new iOSPredicate('name == "CONFIRM"')
  },
  PRE_SAVED_CARD_CVC_FIELD: {
    ANDROID: new UISelector().id('cvcInputEdit'),
    IOS: new XPath('//XCUIElementTypeStaticText[contains(@name, "Name on Card")]/parent::*/*/*/XCUIElementTypeTextField')
  },
  ADDRESS_TEXT: {
    ANDROID: new UISelector().id('basic_address_overview'),
    IOS: new XPath('//*[@name="Change"]/parent::*/XCUIElementTypeStaticText[4]')
  },
  ADDRESS_CHANGE_BUTTON: {
    ANDROID: new UISelector().id('basic_address_change_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "Change"')
  },
  EDIT_DEFAULT_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('address_edit_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "Edit"')
  },
  CHECKOUT_ADDRESS_HOUSE_STREET: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(0).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
  },
  CHECKOUT_ADDRESS_CITY: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(2).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[@name="City"]/parent::*/XCUIElementTypeTextField')
  },
  CHECKOUT_ADDRESS_POSTCODE: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(5).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[@name="Postcode"]/parent::*/XCUIElementTypeTextField')
  },
  CHECKOUT_ADDRESS_NUMBER: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(6).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[@name="phone"]/parent::*/XCUIElementTypeTextField')
  },
  CHECKOUT_PAYMENT_DELIVERY_ADDRESS_TEXT: {
    ANDROID: new UISelector().id('delivery_address_label'),
    IOS: new XPath('//*[@name="BILLING ADDRESS"]/parent::*/XCUIElementTypeStaticText[5]')
  },
  CHECKOUT_PAYMENT_GIFT_CERTIFICATE_FIELD: {
    ANDROID: new UISelector().id('gift_card_edit_text'),
    IOS: new XPath('//*[@name="giftvoucher"]/parent::*/XCUIElementTypeTextField')
  },
  CHECKOUT_PAYMENT_GIFT_CERTIFICATE_APPLY_BUTTON: {
    ANDROID: new UISelector().id('apply_promo_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "APPLY"')
  },
  CHECKOUT_PAYMENT_GIFT_CERTIFICATE_TEXT_BOX: {
    ANDROID: new UISelector().id('gift_card_recycler').child(new UISelector().class('android.widget.TextView').index(0)),
    IOS: new iOSPredicate('name BEGINSWITH "****"')
  },
  DELIVERY_CLICK_AND_COLLECT_BUTTON: {
    ANDROID: new UISelector().textLowerUpper('Click & Collect'),
    IOS: new iOSPredicate('type == "XCUIElementTypeButton" && name == "CLICK & COLLECT"')
  },
  DELIVERY_FREE_WITH_PREMIER_STANDARD: {
    ANDROID: new UISelector().class('android.view.ViewGroup').index(0).child(new UISelector().id('delivery_option_premier_button')),
    IOS: new XPath('...')
  },
  DELIVERY_DISCOUNT_TEXT: {
    ANDROID: new UISelector().id('payment_discount_label'),
    IOS: new iOSPredicate('...')
  },
  EDIT_BASKET_BUTTON: {
    ANDROID: new UISelector().id('bag_overview_edit_button'),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_LEAVE_CHECKOUT_BUTTON: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('...')
  },
  BREADCRUMBS_BANNER: {
    ANDROID: new UISelector().id('breadcrumbs'),
    IOS: new iOSPredicate('...')
  },
  CVC_ICON: {
    ANDROID: new UISelector().id('cvc_icon'),
    IOS: new iOSPredicate('...')
  },
  SELECT_KLARNA_PAYMENT: {
    ANDROID: new UISelector().text('Klarna'),
    IOS: new iOSPredicate('...')
  },
  SELECT_CLEARPAY_PAYMENT: {
    ANDROID: new UISelector().text('Clearpay'),
    IOS: new iOSPredicate('...')
  },
  SELECT_LAYBUY_PAYMENT: {
    ANDROID: new UISelector().text('Laybuy'),
    IOS: new iOSPredicate('...')
  },
  SELECT_ZIPPAY_PAYMENT: {
    ANDROID: new UISelector().text('Zip'),
    IOS: new iOSPredicate('...')
  },
  TERMS_OF_USE_BUTTON: {
    ANDROID: new UISelector().id('terms_button'),
    IOS: new iOSPredicate('...')
  },
  PRIVACY_POLICY_BUTTON: {
    ANDROID: new UISelector().id('privacy_button'),
    IOS: new iOSPredicate('...')
  }, 
  CHANGE_BILLING_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('change_billing_address_button'),
    IOS: new iOSPredicate('...')
  }, 
  CHANGE_DELIVERY_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('change_delivery_address_button'),
    IOS: new iOSPredicate('...')
  },
  UK_STANDARD_DELIVERY: {
    ANDROID: new UISelector().text('UK Standard Delivery'),
    IOS: new iOSPredicate('...')
  },
  UK_NEXT_DAY_DELIVERY: {
    ANDROID: new UISelector().text('UK Next Day Delivery'),
    IOS: new iOSPredicate('...')
  },
  DPD_PRECISE_DELIVERY: {
    ANDROID: new UISelector().text('DPD Precise Delivery'),
    IOS: new iOSPredicate('...')
  },
  DE_STANDARD_DELIVERY: {
    ANDROID: new UISelector().text('German Standard Delivery'),
    IOS: new iOSPredicate('...')
  },
  DE_EXPRESS_DELIVERY: {
    ANDROID: new UISelector().text('German Express Delivery'),
    IOS: new iOSPredicate('...')
  },
  FR_STANDARD_DELIVERY: {
    ANDROID: new UISelector().text('French Standard Delivery'),
    IOS: new iOSPredicate('...')
  },
  FR_EXPRESS_DELIVERY: {
    ANDROID: new UISelector().text('French Express Delivery'),
    IOS: new iOSPredicate('...')
  },
  EUROPE_AND_INTERNATIONAL_DELIVERY: {
    ANDROID: new UISelector().text('Europe and International Delivery'),
    IOS: new iOSPredicate('...')
  },
  UK_SUPER_SAVER_DELIVERY: {
    ANDROID: new UISelector().text('UK Super Saver'),
    IOS: new iOSPredicate('...')
  }, 
  UK_EXPRESS: {
    ANDROID: new UISelector().text('UK Express'),
    IOS: new iOSPredicate('...')
  } ,
  SUPER_SAVER_DELIVERY: {
    ANDROID: new UISelector().text('Super Saver'),
    IOS: new iOSPredicate('...')
  },
  PAYPAL_INFO: {
    ANDROID: new UISelector().id('tv_pp'),
    IOS: new iOSPredicate('...')
  },
  KLARNA_INFO: {
    ANDROID: new UISelector().id('klarna_info'),
    IOS: new iOSPredicate('...')
  },
  CLEARPAY_INFO: {
    ANDROID: new UISelector().id('afterpay_payment_warning'),
    IOS: new iOSPredicate('...')
  },
  LAYBUY_INFO: {
    ANDROID: new UISelector().id('laybuy_warning_text'),
    IOS: new iOSPredicate('...')
  }
};

class CheckoutScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get breadcrumbsBanner (): Element {
      return new Element(SELECTORS.BREADCRUMBS_BANNER, 'Breadcrumbs Banner');
    }

    get editBasketButton (): Button {
      return new Button(SELECTORS.EDIT_BASKET_BUTTON, 'Edit Basket Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get confirmEditBasketButton (): Button {
      return new Button(SELECTORS.CONFIRM_LEAVE_CHECKOUT_BUTTON, 'Confirm Edit Basket Button');
    }

    get proceeedToPaymentButton (): Button {
      return new Button(SELECTORS.PROCEED_TO_PAYMENT, 'Procceed to Payment Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get selectCardPaymentButtonREDESIGN (): Button {
      return new Button(SELECTORS.SELECT_CARD_PAYMENT, 'Select Card Payment Button');
    }

    get selectPaypalPaymentButton (): Button {
      return new Button(SELECTORS.SELECT_PAYPAL_PAYMENT, 'Select Paypal Payment Button');
    }

    get cardNumberField (): Field {
      return new Field(SELECTORS.CARD_NUMBER_FIELD, 'Credit Card Number Field');
    }

    get cardNameField (): Field {
      return new Field(SELECTORS.CARD_NAME_FIELD, 'Credit Card Name Field');
    }

    get cardExpiryField (): Field {
      return new Field(SELECTORS.CARD_EXPIRY_FIELD, 'Credit Card Expiry Field');
    }

    get cardSecurityField (): Field {
      return new Field(SELECTORS.CARD_SECURITY_CODE_FIELD, 'Credit Card Security Number Field');
    }

    get payNowButton (): Button {
      return new Button(SELECTORS.PAY_NOW_BUTTON, 'Pay Now Button');
    }

    get confirmPayment (): Button {
      return new Button(SELECTORS.CONFIRM_PAYMENT_BUTTON, 'Confirm Payment Button');
    }

    get preSavedCardCVCField (): Field {
      return new Field(SELECTORS.PRE_SAVED_CARD_CVC_FIELD, 'Saved Card CVC Field');
    }

    get addressText (): Element {
      return new Element(SELECTORS.ADDRESS_TEXT, 'Checkout Address Text', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get editAddressButton (): Button {
      return new Button(SELECTORS.ADDRESS_CHANGE_BUTTON, 'Checkout Address Change Button');
    }

    get editDefaultAddressButton (): Button {
      return new Button(SELECTORS.EDIT_DEFAULT_ADDRESS_BUTTON, 'Edit Default Address Button');
    }

    get checkoutAddressHouseStreetField (): Field {
      return new Field(SELECTORS.CHECKOUT_ADDRESS_HOUSE_STREET, 'Checkout Address House Street Field', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get checkoutAddressCityField (): Field {
      return new Field(SELECTORS.CHECKOUT_ADDRESS_CITY, 'Checkout Address City Field');
    }

    get checkoutAddressPostcodeField (): Field {
      return new Field(SELECTORS.CHECKOUT_ADDRESS_POSTCODE, 'Checkout Address Postcode Field');
    }

    get checkoutAddressNumberField (): Field {
      return new Field(SELECTORS.CHECKOUT_ADDRESS_NUMBER, 'Checkout Address Number Field');
    }

    get paymentDeliveryAddressText (): Element {
      return new Element(SELECTORS.CHECKOUT_PAYMENT_DELIVERY_ADDRESS_TEXT, 'Checkout Payment Delivery Address Text ');
    }

    get giftVoucherField (): Field {
      return new Field(SELECTORS.CHECKOUT_PAYMENT_GIFT_CERTIFICATE_FIELD, 'Checkout Payment Gift Certificate Field');
    }

    get giftVoucherApplyButton (): Button {
      return new Button(SELECTORS.CHECKOUT_PAYMENT_GIFT_CERTIFICATE_APPLY_BUTTON, 'Checkout Payment Gift Certificate Apply Button');
    }

    get giftVoucherTextBox (): Element {
      return new Element(SELECTORS.CHECKOUT_PAYMENT_GIFT_CERTIFICATE_TEXT_BOX, 'Checkout Payment Gift Certificate Text Box');
    }

    get clickAndCollectButton (): Button {
      return new Button(SELECTORS.DELIVERY_CLICK_AND_COLLECT_BUTTON, 'Delivery Click and Collect Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get deliveryFreeWithPremierButton (): Button {
      return new Button(SELECTORS.DELIVERY_FREE_WITH_PREMIER_STANDARD, 'Delivery Free With Premier Button', { message: GenericMessages.ITEM_OUT_OF_STOCK });
    }

    get deliveryPremierDiscountText (): Element {
      return new Element(SELECTORS.DELIVERY_DISCOUNT_TEXT, 'Delivery Premier Discount Text');
    }

    async fillCardDetails (paymentCard: TPaymentCard): Promise<void> {
      const textValidateOptions: TElementOptions = { textValidation: true, pause: 1000 };
      await this.cardNumberField.sendText(paymentCard.cardNumber, textValidateOptions);
      await this.cardNameField.sendText(paymentCard.cardName, textValidateOptions);
      await this.cardExpiryField.sendText(paymentCard.cardExpiryFormatted, textValidateOptions);
      await this.cardSecurityField.sendText(paymentCard.cardCVV, textValidateOptions);
      await this.cardSecurityField.iOSCarriageReturn();
    }

    get cvcIcon (): Element {
      return new Element(SELECTORS.CVC_ICON, 'CVC icon');
    }

    get selectKlarnaPaymentButton (): Button {
      return new Button(SELECTORS.SELECT_KLARNA_PAYMENT, 'Select Klarna Payment Button');
    }

    get selectClearPayPaymentButton (): Button {
      return new Button(SELECTORS.SELECT_CLEARPAY_PAYMENT, 'Select Clearpay Payment Button');
    }

    get selectLaybuyPaymentButton (): Button {
      return new Button(SELECTORS.SELECT_LAYBUY_PAYMENT, 'Select Laybuy Payment Button');
    }

    get selectZippayPaymentButton (): Button {
      return new Button(SELECTORS.SELECT_ZIPPAY_PAYMENT, 'Select Laybuy Payment Button');
    }

    get progressBarDeliveryNode (): Element {
      return new Element(SELECTORS.PROGRESS_BAR_DELIVERY, 'Progress Bar Node 1: Delivery');
    }

    get progressBarDeliveryNodeStep (): Element {
      return new Element(SELECTORS.PROGRESS_BAR_DELIVERY_STEP, 'Progress Bar Delivery Node Step Number');
    }

    get progressBarPaymentNode (): Element {
      return new Element(SELECTORS.PROGRESS_BAR_PAYMENT, 'Progress Bar Node 2: Payment');
    }

    get progressBarPaymentNodeStep (): Element {
      return new Element(SELECTORS.PROGRESS_BAR_PAYMENT_STEP, 'Progress Bar Payment Node Step Number');
    }

    get progressBarConfirmationNode (): Element {
      return new Element(SELECTORS.PROGRESS_BAR_CONFIRMATION, 'Progress Bar Node 3: Confirmation');
    }

    get progressBarConfirmationNodeStep (): Element {
      return new Element(SELECTORS.PROGRESS_BAR_CONFIRMATION_STEP, 'Progress Bar Confirmation Node Step Number');
    }
    
    get termsOfUseButton (): Button {
      return new Button(SELECTORS.TERMS_OF_USE_BUTTON, 'Terms of Use Button');
    }

    get privacyPolicyButton (): Button {
      return new Button(SELECTORS.PRIVACY_POLICY_BUTTON, 'Privacy Policy Button');
    }

    get changeBillingAddressButton (): Button {
      return new Button(SELECTORS.CHANGE_BILLING_ADDRESS_BUTTON, 'Change Billing Address Button');
    }

    get changeDeliveryButton (): Button {
      return new Button(SELECTORS.CHANGE_DELIVERY_ADDRESS_BUTTON, 'Change Delivery Address Button');
    }

    get ukStandardDelivery (): Element {
      return new Element(SELECTORS.UK_STANDARD_DELIVERY, 'UK Standard Delivery');
    }

    get ukNextDayDelivery (): Element {
      return new Element(SELECTORS.UK_NEXT_DAY_DELIVERY, 'UK Next Day Delivery');
    }

    get dpdPreciseDelivery (): Element {
      return new Element(SELECTORS.DPD_PRECISE_DELIVERY, 'UK DPD Precise Delivery');
    }

    get ukSuperSaverDelivery (): Element {
      return new Element(SELECTORS.UK_SUPER_SAVER_DELIVERY, 'UK Super Saver Delivery');
    }

    get ukExpress (): Element {
      return new Element(SELECTORS.UK_EXPRESS, 'UK Express Delivery');
    }

    get superSaverDelivery (): Element {
      return new Element(SELECTORS.SUPER_SAVER_DELIVERY, 'UK Super Saver Delivery');
    }

    async verifyUkDeliveryMethods (): Promise<void> {
      if (this.brand === GroupBrands.Coast) {
        await this.ukSuperSaverDelivery.waitForExistance({scrollToElement: true});
        await this.ukStandardDelivery.waitForExistance({scrollToElement: true});
        await this.ukNextDayDelivery.waitForExistance({scrollToElement: true});
        await this.dpdPreciseDelivery.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Oasis || this.brand === GroupBrands.Warehouse) {
        await this.superSaverDelivery.waitForExistance({scrollToElement: true});
        await this.ukExpress.waitForExistance({scrollToElement: true});
        await this.ukStandardDelivery.waitForExistance({scrollToElement: true});
        await this.ukNextDayDelivery.waitForExistance({scrollToElement: true});
        await this.dpdPreciseDelivery.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Boohoo || this.brand === GroupBrands.BoohooMAN || this.brand === GroupBrands.NastyGal || this.brand === GroupBrands.KarenMillen || this.brand === GroupBrands.MissPap) {
        await this.ukStandardDelivery.waitForExistance({scrollToElement: true});
        await this.ukNextDayDelivery.waitForExistance({scrollToElement: true});
        await this.dpdPreciseDelivery.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Wallis || this.brand === GroupBrands.Burton || this.brand === GroupBrands.DorothyPerkins) {
        await this.ukStandardDelivery.waitForExistance({scrollToElement: true});
        await this.ukNextDayDelivery.waitForExistance({scrollToElement: true});
        await this.ukExpress.waitForExistance({scrollToElement: true});
        await this.ukSuperSaverDelivery.waitForExistance({scrollToElement: true});
      }
    }

    async verifyUkPaymentMethods (): Promise<void> {
      await driver.pause(SMALL_WAIT); // We need this in order to wait for the delivery methods to get refreshed. Think of something better!
      if (this.brand === GroupBrands.Boohoo || this.brand === GroupBrands.MissPap) {
        await this.selectLaybuyPaymentButton.waitForExistance({scrollToElement: true});
        await this.selectZippayPaymentButton.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Coast || this.brand === GroupBrands.KarenMillen || this.brand === GroupBrands.Oasis || this.brand === GroupBrands.Warehouse) {
        await this.selectLaybuyPaymentButton.waitForExistance({scrollToElement: true});
      } else {
        await this.selectZippayPaymentButton.waitForExistance({scrollToElement: true});
      }
      await this.selectCardPaymentButtonREDESIGN.waitForExistance({scrollToElement: true});
      await this.selectPaypalPaymentButton.waitForExistance({scrollToElement: true});
      await this.selectKlarnaPaymentButton.waitForExistance({scrollToElement: true});
      await this.selectClearPayPaymentButton.waitForExistance({scrollToElement: true});
    }

    get germanStandardDelivery (): Element {
      return new Element(SELECTORS.DE_STANDARD_DELIVERY, 'German Standard Delivery');
    }

    get germanExpressDelivery (): Element {
      return new Element(SELECTORS.DE_EXPRESS_DELIVERY, 'German Express Delivery');
    }

    get europeAndInternationalDelivery (): Element {
      return new Element(SELECTORS.EUROPE_AND_INTERNATIONAL_DELIVERY, 'Europe and International Delivery');
    }

    async verifyGermanDeliveryMethods (): Promise<void> {
      await driver.pause(SMALL_WAIT); // We need this in order to wait for the delivery methods to get refreshed. Think of something better!
      if (this.brand === GroupBrands.Boohoo) {
        await this.germanStandardDelivery.waitForExistance({scrollToElement: true});
        await this.germanExpressDelivery.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.KarenMillen) {
        await this.germanStandardDelivery.waitForExistance({scrollToElement: true});
        await this.europeAndInternationalDelivery.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Coast) {
        await this.europeAndInternationalDelivery.waitForExistance({scrollToElement: true});
        await this.dpdPreciseDelivery.waitForExistance({scrollToElement: true});
        await this.germanStandardDelivery.waitForExistance({scrollToElement: true});
        await this.germanExpressDelivery.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Oasis) {
        await this.germanStandardDelivery.waitForExistance({scrollToElement: true});
        await this.germanExpressDelivery.waitForExistance({scrollToElement: true});
        await this.superSaverDelivery.waitForExistance({scrollToElement: true});
        await this.ukExpress.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Warehouse) {
        await this.superSaverDelivery.waitForExistance({scrollToElement: true});
        await this.ukExpress.waitForExistance({scrollToElement: true});
      } else if (this.brand === GroupBrands.Wallis || this.brand === GroupBrands.Burton || this.brand === GroupBrands.DorothyPerkins) {
        await this.germanStandardDelivery.waitForExistance({scrollToElement: true});
        await this.ukExpress.waitForExistance({scrollToElement: true});
        await this.ukSuperSaverDelivery.waitForExistance({scrollToElement: true});
      } else {
        await this.europeAndInternationalDelivery.waitForExistance({scrollToElement: true});
      }
    }

    async verifyGermanPaymentMethods (): Promise<void> {
      await this.payNowButton.scrollIntoView();
      if (this.brand === GroupBrands.Wallis || this.brand === GroupBrands.Burton) {
        await this.selectCardPaymentButtonREDESIGN.waitForExistance({scrollToElement: true});
        await this.selectPaypalPaymentButton.waitForExistance({scrollToElement: true});
      } else {
        await this.selectCardPaymentButtonREDESIGN.waitForExistance({scrollToElement: true});
        await this.selectPaypalPaymentButton.waitForExistance({scrollToElement: true});
        await this.selectClearPayPaymentButton.waitForExistance({scrollToElement: true});
      }
      expect(await this.selectKlarnaPaymentButton.checkIfDisplayed({timeout: 2 * 1000})).toEqual(false);
      expect(await this.selectLaybuyPaymentButton.checkIfDisplayed({timeout: 2 * 1000})).toEqual(false);
      expect(await this.selectZippayPaymentButton.checkIfDisplayed({timeout: 2 * 1000})).toEqual(false);
    }

    get frenchStandardDelivery (): Element {
      return new Element(SELECTORS.FR_STANDARD_DELIVERY, 'French Standard Delivery');
    }

    get frenchExpressDelivery (): Element {
      return new Element(SELECTORS.FR_EXPRESS_DELIVERY, 'French Express Delivery');
    }

    async verifyFrenchDeliveryMethods (): Promise<void> {
      await this.frenchStandardDelivery.waitForExistance({scrollToElement: true});
      await this.frenchExpressDelivery.waitForExistance({scrollToElement: true});
    }

    get confirmLeaveCheckout (): Button {
      return new Button(SELECTORS.CONFIRM_LEAVE_CHECKOUT_BUTTON, 'Confirm Leave Checkout Button');
    }

    get paypalExpandedInfo (): Element {
      return new Element(SELECTORS.PAYPAL_INFO, 'Paypal Expanded Info Message');
    }

    get klarnaExpandedInfo (): Element {
      return new Element(SELECTORS.KLARNA_INFO, 'Klarna Expanded Info Message');
    }

    get clearpayExpandedInfo (): Element {
      return new Element(SELECTORS.CLEARPAY_INFO, 'Clearpay Expanded Info Message');
    }
    
    get laybuyExpandedInfo (): Element {
      return new Element(SELECTORS.LAYBUY_INFO, 'Laybuy Expanded Info Message');
    }

    async leaveCheckout (): Promise<void> {
      await driver.back();
      await driver.pause(SMALL_WAIT);
      await driver.back();
      await this.confirmLeaveCheckout.click();
    }

}

export default CheckoutScreen;
