import { TElementOptions, TSelectorOptions } from '../helpers/Types';
import Element from './Element';

export default class Field extends Element {
  constructor (selector: TSelectorOptions, elementName: string, options?: { message: string }) {
    super(selector, elementName, options);
  }

  /**
     * Enter text into a textfield.
     *
     * @param {string} text     Text intended to be filled into the field.
     * @param {IElementOptions} options   Set of options from the IElementOptions interface to change functionality of method.
     */
  async sendText (text: string, opts: TElementOptions = {}): Promise<void> {
    opts = Object.assign({}, this.options, opts);
    const element = await $(this.selector);
    if (opts.scrollToElement) {
      await this.scrollIntoView();
    } 
    if (this.options.waitForElement) {
      await this.waitForExistance(opts);
    }
    await driver.pause(this.options.pause);
    await element.setValue(text);
    if (opts.textValidation) {
      await this.hideKeyboard({click: true});
    }
    if (opts.hideKeyboardAfter) {
      await this.hideKeyboard();
    }
  }

  /**
     * Appends a carriage return to the end of a field, this is used for iOS to validate forms.
     */
  async iOSCarriageReturn (): Promise<void> {
    if (driver.isIOS) {
      console.log('sending carriage return to text field for iOS');
      const element = await $(this.selector);
      await element.setValue(await element.getText() + '\n');
    } // Doesn't do anything if it's android... hence the name iOSCarriageReturn.
  }
}
