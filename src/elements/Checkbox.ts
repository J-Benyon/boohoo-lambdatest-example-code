import { TElementOptions, TSelectorOptions } from '../helpers/Types';
import Element from './Element';

export default class Checkbox extends Element {
  constructor (selector: TSelectorOptions, elementName: string, options?: { message: string }) {
    super(selector, elementName, options);
  }

  /**
     * Checks the checkbox, will wait for the element to exist by default, can be changed in the options when instanciating the class.
     *
     * @param {IElementOptions}  opts Set of instructions to configure the checking action.
     */
  async check (opts: TElementOptions = {}): Promise<void> {
    opts = Object.assign({}, this.options, opts);
    const element = await $(this.selector);
    if (opts.scrollToElement) {
      this.scrollIntoView();
    } 
    if (opts.waitForElement) {
      await this.waitForExistance(opts);
    }
    await element.click();
  }

  async isChecked (opts: TElementOptions = {}): Promise<boolean> {
    opts = Object.assign({}, this.options, opts);
    const element = await $(this.selector);
    if (opts.scrollToElement) {
      this.scrollIntoView();
    } 
    if (opts.waitForElement) {
      await this.waitForExistance(opts);
    }
    const valueToCheckForBasedOnOS = await driver.isIOS ? 'value' : 'checked';
    const valueToAssertBasedOnOS = await driver.isIOS ? 'checked' : 'true';
    return (await element.getAttribute(valueToCheckForBasedOnOS)) === valueToAssertBasedOnOS;
  }
}
