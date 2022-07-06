import Button from '../../elements/Button';
import Field from '../../elements/Field';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  USE_LOCATION_NOT_NOW: {
    ANDROID: new UISelector().class('android.widget.Button').text('NOT NOW'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "NOT NOW"')
  },
  POST_CODE_FIELD: {
    ANDROID: new UISelector().id('lookup_edit_text'),
    IOS: new XPath('//*[contains(@name, "Postcode")]/parent::*/XCUIElementTypeTextField')
  },
  LOOK_UP_BUTTON: {
    ANDROID: new UISelector().id('click_collect_lookup_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "LOOK UP"')
  },
  LIST_TAB_BUTTON: {
    ANDROID: new UISelector().text('List'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "LIST"')
  },
  FIRST_CLICK_AND_COLLECT_LOCATION: {
    ANDROID: new UISelector().id('click_collect_list_recycler').child(new UISelector().class('android.widget.RelativeLayout').index(0)),
    IOS: new iOSPredicate('name CONTAINS "Piccadilly Gardens, Manchester"')
  },
  SELECT_AND_CONTINUE: {
    ANDROID: new UISelector().id('click_collect_select_continue_button'),
    IOS: new iOSPredicate('type CONTAINS "Button" && name == "SELECT AND CONTINUE"')
  },
  SOMETHING_WENT_WRONG_ALERT: {
    ANDROID: new UISelector().id('simple_dialog_message'),
    IOS: new iOSPredicate('...')
  },
};

class ClickAndCollectScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get clickAndCollectConfirmNoLocationButton (): Button {
      return new Button(SELECTORS.USE_LOCATION_NOT_NOW, 'Delivery Click and Collect Confirm Not Now Button');
    }

    get postCodeField (): Field {
      return new Field(SELECTORS.POST_CODE_FIELD, 'Click and Collect Postcode Field');
    }

    get lookupButton (): Button {
      return new Button(SELECTORS.LOOK_UP_BUTTON, 'Click and Collect Postcode Field');
    }
    
    get listTab (): Button {
      return new Button(SELECTORS.LIST_TAB_BUTTON, 'List Tab Button');
    }

    get firstClickAndCollectLocation (): Button {
      return new Button(SELECTORS.FIRST_CLICK_AND_COLLECT_LOCATION, 'First Click and Collect Location');
    }

    get selectAndContinueButton (): Button {
      return new Button(SELECTORS.SELECT_AND_CONTINUE, 'Click and Collect Select and Continue Button');
    }

    get acceptSomethingWentWrongAlert (): Button {
      return new Button(SELECTORS.SOMETHING_WENT_WRONG_ALERT, 'Something Went Wrong Button');
    }

    async navigateBackToDeliveryAddress (): Promise<void> {
      await driver.back();
    }
}

export default ClickAndCollectScreen;