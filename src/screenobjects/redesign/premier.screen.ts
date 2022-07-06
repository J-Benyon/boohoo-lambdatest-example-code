import Button from '../../elements/Button';
import Field from '../../elements/Field';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  PREMIER_ADD_TO_BASKET_ANDROID: {
    ANDROID: new UISelector().id('fab')
  },
  PREMIER_CHECK_ELIGIBILITY: {
    ANDROID: new UISelector().id('premier_action_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "CHECK ELIGIBILITY"')
  },
  PREMIER_ELIGIBILITY_POSTCODE_FIELD: {
    ANDROID: new UISelector().id('postcode_input_edit'),
    IOS: new XPath('//*[@name="home"]/parent::*/XCUIElementTypeTextField')
  },
  PREMIER_LOOKUP_POSTCODE_BUTTON: {
    ANDROID: new UISelector().id('postcode_lookup_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "LOOK UP"')
  },
  PREMIER_ADD_TO_BAG_BUTTON: {
    ANDROID: new UISelector().id('premier_action_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "ADD AND PROCEED"')
  },
  PREMIER_CHECKOUT_BUTTON_ANDROID: {
    ANDROID: new UISelector().id('success_checkout_button')
  },
  PREMIER_ALREADY_APPLIED_BUTTON: {
    ANDROID: new UISelector().text('PREMIER ALREADY APPLIED'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "PREMIER ALREADY APPLIED"')
  },
  PREMIER_BACK_BUTTON: {
    ANDROID: new UISelector().id('toolbar').child(new UISelector().class('android.widget.ImageButton')),
    IOS: new iOSPredicate('')
  }
};

class PremierScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get premierAddToBasketButton (): Button {
      return new Button(SELECTORS.PREMIER_ADD_TO_BASKET_ANDROID, 'Premier Add To Basket');
    }

    get premierCheckEligibilityButton (): Button {
      return new Button(SELECTORS.PREMIER_CHECK_ELIGIBILITY, 'Premier Check Eligibility');
    }

    get premierPostCodeField (): Field {
      return new Field(SELECTORS.PREMIER_ELIGIBILITY_POSTCODE_FIELD, 'Premier Eligibility Postcode Field');
    }

    get premierPostCodeLookupButton (): Field {
      return new Field(SELECTORS.PREMIER_LOOKUP_POSTCODE_BUTTON, 'Premier Postcode Lookup Button');
    }

    get premierAddToBagButton (): Field {
      return new Field(SELECTORS.PREMIER_ADD_TO_BAG_BUTTON, 'Premier Final Add To Bag Button');
    }

    get premierCheckoutButton (): Button {
      return new Button(SELECTORS.PREMIER_CHECKOUT_BUTTON_ANDROID, 'Premier Checkout Button');
    }

    get premierAlreadyAppliedButton (): Button {
      return new Button(SELECTORS.PREMIER_ALREADY_APPLIED_BUTTON, 'Premier Already Applied Button');
    }

    get premierBackButton (): Button {
      return new Button(SELECTORS.PREMIER_BACK_BUTTON, 'Premier Back Button');
    }

    async purchasePremierWithAddress (postcode: string): Promise<void> {
      // await this.premierAddToBasketButton.click({ androidOnly: true }); 
      await this.premierCheckEligibilityButton.click();
      await this.premierPostCodeField.sendText(postcode);
      await this.premierPostCodeLookupButton.click({ pause: 5000 });
      await this.premierAddToBagButton.click({ pause: 5000 });
      // await this.premierCheckoutButton.click({ androidOnly: true, pause: 5000 });
    }
}

export default PremierScreen;
