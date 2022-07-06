import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import Field from '../../../elements/Field';
import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import { GroupBrands, TAddressBody, TSelectorMap } from '../../../helpers/Types';

const SELECTORS: TSelectorMap = {
  ADDRESS_BOOK_HOME_EDIT_DEFAULT_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('address_edit_button'),
    IOS: new iOSPredicate('value == "Edit"')
  },
  DELETE_FIRST_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('recycler').child(new UISelector().index(0)).child(new UISelector().id('button_container')).child(new UISelector().id('address_delete_button')),
    IOS: new iOSPredicate('...')
  },
  DELETE_SECOND_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('recycler').child(new UISelector().index(1)).child(new UISelector().id('button_container')).child(new UISelector().id('address_delete_button')),
    IOS: new iOSPredicate('...')
  },
  CONFIRM_DELETE_ADDRESS_BUTTON: {
    ANDROID: new UISelector().id('simple_dialog_ok_btn'),
    IOS: new iOSPredicate('value == "Edit"')
  },
  CANNOT_DELETE_DEFAULT_ADDRESS_ALERT: {
    ANDROID: new UISelector().id('simple_dialog_message'),
    IOS: new iOSPredicate('...')
  },
  ADDRESS_BOOK_HOME_ADD_NEW_ADDRESS: {
    ANDROID: new UISelector().class('android.widget.Button').text('NEW ADDRESS'),
    IOS: new iOSPredicate('label == "ADD NEW ADDRESS" AND value != "ADD NEW ADDRESS"')
  },
  ADDRESS_BOOK_HOME_TOP_ADDRESS_TEXT: {
    ANDROID: new UISelector().id('address_preview_label'),
    IOS: new XPath('//XCUIElementTypeButton[contains(@name, "NEW ADDRESS")]/parent::*/XCUIElementTypeCell/*[3]')
  },
  ADDRESS_BOOK_HOME_SECOND_ADDRESS_TEXT: {
    ANDROID: new UISelector().id('recycler').child(new UISelector().index(1)).child(new UISelector().id('address_preview_label')),
    IOS: new iOSPredicate('label == "ADD NEW ADDRESS" AND value != "ADD NEW ADDRESS"')
  },
  FIRST_NAME_FIELD: {
    ANDROID: new UISelector().id('first_name_input').child(new UISelector().id('first_name')),
    IOS: new XPath('//*[@name="First Name"]/parent::*/XCUIElementTypeTextField')
  },
  LAST_NAME_FIELD: {
    ANDROID: new UISelector().id('last_name_input').child(new UISelector().id('last_name')),
    IOS: new XPath('//*[@name="Last Name"]/parent::*/XCUIElementTypeTextField')
  },
  HOUSE_NUMBER_AND_STREET_FIELD: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(0).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[contains(@name,"and street")]/parent::*/XCUIElementTypeTextField')
  },
  CITY_FIELD: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(2).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[@name="City"]/parent::*/XCUIElementTypeTextField')
  },
  POSTAL_CODE_FIELD: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(5).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[@name="Postcode"]/parent::*/XCUIElementTypeTextField')
  },
  PHONE_NUMBER_FIELD: {
    ANDROID: new UISelector().id('addresses_manual_input_container').child(new UISelector().index(6).child(new UISelector().id('field_input_layout'))).child(new UISelector().id('field_input_edit')),
    IOS: new XPath('//*[@name="phone"]/parent::*/XCUIElementTypeTextField')
  },
  SAVE_BUTTON: {
    ANDROID: new UISelector().id('add_address_save_button'),
    IOS: new iOSPredicate('name == "SAVE CHANGES"')
  },
  BACK_BUTTON: {
    ANDROID: new UISelector().description('Navigate up'),
    IOS: new iOSPredicate('name == "Address Book"')
  },
  ADDRESS_GERMANY: {
    ANDROID: new UISelector().text('Leipzig'),
    IOS: new iOSPredicate('...')
  },
  ADDRESS_FRANCE: {
    ANDROID: new UISelector().text('Strasbourg'),
    IOS: new iOSPredicate('...')
  },
  ZERO_STATE_BUTTON: {
    ANDROID: new UISelector().id('zeroStateActionButton').textLowerUpper('ADD NEW ADDRESS'),
    IOS: new iOSPredicate('...')
  }
};

class AddressesScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }
   
    get editAddressButton (): Button {
      return new Button(SELECTORS.ADDRESS_BOOK_HOME_EDIT_DEFAULT_ADDRESS_BUTTON, 'Edit Address Button');
    }

    get deleteFirstAddressButton (): Button {
      return new Button(SELECTORS.DELETE_FIRST_ADDRESS_BUTTON, 'Delete First Address Button');
    }

    get deleteSecondAddressButton (): Button {
      return new Button(SELECTORS.DELETE_SECOND_ADDRESS_BUTTON, 'Delete Second Address Button');
    }

    get confirmDeleteAddressButton (): Button {
      return new Button(SELECTORS.CONFIRM_DELETE_ADDRESS_BUTTON, 'Confirm Delete Address Button');
    }

    get cannotDeleteDefaultAddressAlert (): Element {
      return new Element(SELECTORS.CANNOT_DELETE_DEFAULT_ADDRESS_ALERT, 'Cannot Delete Default Address Alert');
    }

    get firstNameField (): Field {
      return new Field(SELECTORS.FIRST_NAME_FIELD, 'First Name Field');
    }

    get lastNameField (): Field {
      return new Field(SELECTORS.LAST_NAME_FIELD, 'Last Name Field');
    }

    get houseNumberAndStreetField (): Field {
      return new Field(SELECTORS.HOUSE_NUMBER_AND_STREET_FIELD, 'House Number And Street Field');
    }

    get cityField (): Field {
      return new Field(SELECTORS.CITY_FIELD, 'City Field');
    }

    get postalCodeField (): Field {
      return new Field(SELECTORS.POSTAL_CODE_FIELD, 'Postal Code Field');
    }

    get phoneNumberField (): Field {
      return new Field(SELECTORS.PHONE_NUMBER_FIELD, 'Phone Number Field');
    }

    get saveButton (): Button {
      return new Button(SELECTORS.SAVE_BUTTON, 'Save Button');
    }

    get backButton (): Button {
      return new Button(SELECTORS.BACK_BUTTON, 'Back Button');
    }

    get addressText (): Element {
      return new Element(SELECTORS.ADDRESS_BOOK_HOME_TOP_ADDRESS_TEXT, 'Top Address Text');
    }

    get secondAddressText (): Element {
      return new Element(SELECTORS.ADDRESS_BOOK_HOME_SECOND_ADDRESS_TEXT, 'Second Address Text');
    }

    get addNewAddressButton (): Button {
      return new Button(SELECTORS.ADDRESS_BOOK_HOME_ADD_NEW_ADDRESS, 'Add New Address Button');
    }

    get addressInGermany (): Element {
      return new Element(SELECTORS.ADDRESS_GERMANY, 'Address Card with Address In Germany');
    }

    get addressInFrance (): Element {
      return new Element(SELECTORS.ADDRESS_FRANCE, 'Address Card with Address In France');
    }

    get zeroStateButton (): Button {
      return new Button(SELECTORS.ZERO_STATE_BUTTON, 'Add New Address Zero State Button');
    }

    async fillFields (address: TAddressBody): Promise<void> {
      await this.firstNameField.sendText(address.first_name);
      await this.lastNameField.sendText(address.last_name);
      await this.houseNumberAndStreetField.sendText(address.address1);
      await this.cityField.sendText(address.city);
      await this.postalCodeField.sendText(address.postal_code);
      await this.phoneNumberField.sendText(address.phone, { hideKeyboardAfter: true });
      await this.phoneNumberField.iOSCarriageReturn();
    }

    async navigateBackToProfileScreen (): Promise<void> {
      await driver.back();
    }

    async checkIfAddNewAddressButtonIsVisible (): Promise<void> {
      if (this.addNewAddressButton.checkIfDisplayed({timeout : 10 * 1000 })) {
        console.log('Add New Address Button is visible');
      } else {
        console.warn('The address is not saved in the Address Book. Continuing with the test');
      }
    }

}

export default AddressesScreen;
