import * as fs from 'fs';
import { TINY_WAIT } from '../constants';
import { defaults, TElementOptions, TouchMap, TSelector, TSelectorOptions } from '../helpers/Types';

async function throwErrorIfAppClosed (message: string): Promise<void> {
  const appStatus = await driver.getCurrentActivity();
  const isBoohoo = appStatus.includes('boohoo');
  const isArcadia = appStatus.includes('arcadia');
  if (!(isBoohoo || isArcadia)) {
    throw new Error(message);
  }
}

export default class Element {
    selector: string;
    elementName: string;
    options: TElementOptions;
    message: string;

    /**
     * Create an element based off an object containing both android and iOS selectors, this class is abstract and should be extended by a child.
     *
     * @param {ISelectorOptions} selector       An object containing ANDROID and IOS keys, both strings. Or a string containing the selector.
     * @param {string} elementName              A string containing the name of the element. Optional.
     * @param {IElementOptions} options         An object containing two potential properties, waitForElement as boolean and timeout as a number.
     */
    constructor (selector: TSelectorOptions, elementName: string, options?: { message: string }) {
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      this.selector = platformSelector?.build?.();
      this.options = defaults.defaultElementOptions;
      this.elementName = elementName;
      this.message = options?.message;
    }

    /**
     * Small helper method to check if the element is visible.
     */
    async isVisible (): Promise<'hidden' | 'visible'> {
      const currentElement = await $(this.selector);
      const isDisplayed = await currentElement.isDisplayed();
      const visibilityStatus = isDisplayed ? 'visible' : 'hidden';
      return visibilityStatus;
    }
    
    /**
    * Clicks an element, will wait for the element to exist by default, can be changed in the options when instanciating the class.
    *
    * @param {IElementOptions}  opts IElementInterface options to change functionality of the method.
    */
    async click (opts: TElementOptions = {}): Promise<void> {

      try {
        try {

          // Nested try catches... nice. 
          opts = Object.assign({}, this.options, opts);
          if (opts.androidOnly && driver.isIOS) return;
          if (opts.iosOnly && driver.isAndroid) return;
          if (opts.pause) {
            await driver.pause(opts.pause);
          }
          const element = await $(this.selector);
          if (opts.scrollToElement) {
            await this.scrollIntoView();
          } 
          if (opts.waitForElement) {
            await this.waitForExistance(opts);
          }

          // Finally click the element.
          await element.click();

          // On falure, throw the error, unless stated otherwise.
        } catch (err) {
          if (!opts.ignoreFailures) {
            throw err;
          } else {
            console.warn('Ignoring failure of element: ' + this.elementName);
          }
        }

        // Hide keyboard if we have that option.
        if (opts.hideKeyboardAfter) {
          await this.hideKeyboard();
        }

      } catch (err) {
        console.log('App status: ', await driver.getCurrentActivity());
        throwErrorIfAppClosed('It seems like the app closed unexpectedly');
        throw err;
      }
      
      // Retry logic if the retry object exists in the TElementOptions {opts}
      // This is heavily experimental.
      if (opts.retryUntil) {
        const maxAttempts = opts.retryUntil.maxAttempts ?? 10;
        const targetElement = await opts.retryUntil.target;
        const strategy = opts.retryUntil.strategy;
        let attempts = 0;
        let retrying = true;
        while (retrying) {

          // Log for debugging.
          console.log(`retrying element ${this.elementName} as per options.`);

          // Wait for a small interval.
          await driver.pause(opts.retryUntil.interval);

          // If we're already matching the strategy, just exit and move along with the test.
          const visibilityStatus = await targetElement.isVisible();
          if (visibilityStatus === strategy) {
            retrying = false; break;
          } else {
            
            // Retry the click event but first check.
            const element = await $(this.selector);
            await element.waitForDisplayed({ timeout: 2000, timeoutMsg: `Timeout: Could not complete retry click for element '${this.elementName}'`});
            await element.click();
          }
        
          // Track attempts and throw at 10 attempts.
          attempts++;
          if (attempts > maxAttempts) {
            throw new Error(`MaxAttempts: Could not complete retry request of element '${this.elementName}'`);
          }
        }
      }
    }

    async takeScreenshot (fileName: string): Promise<string> {
      
      // Get brand name, which will be a domain URI i.e. 'boohoo.co.uk', then chop the first bit to get the brand as string i.e. 'boohoo'
      const brandName = driver.config['brand'] as string;
      const cleanBrandName = brandName.split('.')[0];
      const screenshotFolderPath = 'screenshots/' + cleanBrandName;
      const filePath = `${screenshotFolderPath}/${fileName}.png`;

      // Wait for element to be present, then wait a little longer to make sure elements stop changing/moving.
      await this.waitForExistance();
      await driver.pause(TINY_WAIT);

      // Create screenshots folder (it shouldn't be there so we will avoid doing a check to see if the folders there).
      fs.mkdirSync(screenshotFolderPath, { recursive: true });

      // Screenshot the element in the brand folder with the filename given.
      const element = await $(this.selector);
      await element.saveScreenshot(filePath);

      // Return relative path to file created.
      return filePath;
    }

    async hideKeyboard (options = {click: false}): Promise<void> {
      const element = await $(this.selector);
      if (options.click) {
        await element.click();
      }
      if (driver.isIOS) {
        console.warn('iOS does not support hideKeyboard on simulated devices. This is an XCUITest bug.');
      } else {
        try {
          await driver.hideKeyboard();
        } catch { 
          console.log('We had an isuse closing keyboard');
        }
      }
    }

    async scrollDirection (direction: 'down' | 'up', touchLocations: TouchMap): Promise<void> {
      const touchActionPromise = browser.touchPerform([
        { action: 'press', options: direction == 'up' ? touchLocations.bottom : touchLocations.top },
        { action: 'wait', options: { ms: 500 }},
        { action: 'moveTo', options: direction == 'up' ? touchLocations.top : touchLocations.bottom },
        { action: 'release' }
      ]);
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, 2000, 'Touch Action Timeout');
      });
      await Promise.race([touchActionPromise, timeoutPromise]);
    }

    async scrollIntoView (maximumScrolls = 30): Promise<void> {
      let element = await $(this.selector);
      let elementIsVisible = await element.isDisplayed();
      for (let scrolls = 0; scrolls < maximumScrolls; scrolls++) { // While we have a scroll in the queue, scroll.
        if (elementIsVisible) return; // If the element has been found, quit out. 
        const scrollDirection = scrolls < maximumScrolls / 2.5 ? 'down' : 'up';
        const { width, height } = await driver.getWindowRect(); // Get the height and width of the screen.

        // Create two points on the phone screen that we scroll from and too.
        const touchLocations: TouchMap = { 
          top: { x: width/2, y: height/3 }, 
          bottom: { x: width/2, y:  height/5 }
        };

        await this.scrollDirection(scrollDirection, touchLocations);
            
        element = await $(this.selector);
        elementIsVisible = await element.isDisplayed();
      }
      console.log('App status: ', await driver.getCurrentActivity());
      throwErrorIfAppClosed('It seems like the app closed unexpectedly');
      const defaultMessage = `Could not find screen element '${this.elementName}' while attempting to scroll the element into view, with the maximum retries of ${maximumScrolls}. Searching by selector: ${this.selector}`;
      throw Error((this.message ?? '%m').replace('%m', defaultMessage));
    }

    /**
    * Waits for an element to be visible, exist and enabled before proceeding, fails if cannot be found.
    *
    * @param {IElementOptions} opts IElementInterface options to change functionality of the method.
    */
    async waitForExistance (opts: TElementOptions = {}): Promise<void> {
      if (opts.pause && opts.pause > 0) {
        driver.pause(opts.pause);
      }
      if (opts.scrollToElement) {
        await this.scrollIntoView();
      }
      try {
        opts = Object.assign({}, this.options, opts);
        if (opts.androidOnly && await driver.isIOS) return;
        if (opts.iosOnly && await driver.isAndroid) return;

        const defaultMessage = `Could not find screen element '${this.elementName}' within the wait time of ${opts.timeout / 1000} seconds. Searching by selector: ${this.selector}`;
        
        // Now... we wait.
        const waitOptions = {
          timeout: opts.timeout,
          timeoutMsg: (this.message ?? '%m').replace('%m', defaultMessage)
        };
        const element = await $(this.selector);
        await element.waitForExist(waitOptions);
        await element.waitForEnabled(waitOptions);
        await element.waitForDisplayed(waitOptions);
      } catch (err) {
        console.log('App status: ', await driver.getCurrentActivity());
        throwErrorIfAppClosed('It seems like the app closed unexpectedly');
        throw err;
      }
    }
    
    /**
     * Gets the raw webdriverio element(s)
     * @param {boolean} asArray If true, this will return all elements matching that selector, default false.
     * @returns {Promise<WebdriverIO.Element | WebdriverIO.ElementArray>} The raw type webdriverio uses. Try to avoid using this.
     */
    async getRaw (asArray: boolean): Promise<WebdriverIO.Element | WebdriverIO.ElementArray>{
      return asArray
        ? await $(this.selector)
        : await $$(this.selector);
    }

    /**
     * Gets the value of the attribute 'text'
     * @param {IElementOptions} opts Optional parameters to change functionality of the method.
     * @returns {Promise<string>} The text value of the element.
     */
    async getText (opts: TElementOptions = this.options): Promise<string> {
      const element = await $(this.selector);
      if (opts.scrollToElement) {
        await this.scrollIntoView();
      } 
      if (opts.waitForElement) {
        await this.waitForExistance(opts);
      }
      return await element.getText();
    }

    /**
     * Checks if element is displayed on the page or not.
     * @param {IElementOptions} opts Optional parameter timeout- keep searching for provided number of milliseconds.
     * @returns {Promise<boolean>} Returns true if element is displayed and false if element is not displayed.
     */
    async checkIfDisplayed (opts: TElementOptions = this.options): Promise<boolean> {
      const element = await $(this.selector);
      let isDisplayed: boolean;
      if (opts.pause && opts.pause > 0) {
        driver.pause(opts.pause);
      }
      try {
        if (opts.timeout) {
          isDisplayed = await element.waitForDisplayed(opts);
        } else {
          isDisplayed = await element.waitForDisplayed();
        }
      } catch (err) {
        isDisplayed = false;
      }
      return isDisplayed;
    }

    /**
     * Checks the value of passed attribute
     * @param {string} key attribute (key) parameter which will be checked for its value
     * @param {IElementOptions} opts Optional parameters to change functionality of the method.
     * @returns {Promise<string>} Returns the string value of the attribute. 
     */
    async getAttribute (key: string, opts: TElementOptions = this.options): Promise<string> {
      const element = await $(this.selector);
      if (opts.scrollToElement) {
        await this.scrollIntoView();
      } 
      if (opts.waitForElement) {
        await element.waitForDisplayed(opts);
      }
      return await element.getAttribute(key);
    }

    /**
     * Gets element’s location on the page. The point (0, 0) refers to the upper-left corner of the page
     * @param {WebdriverIO.LocationParam} prop can be "x" or "y" to get a specific coordinate
     * @returns {Promise<number>} Returns the number of x/y coordinate 
     */
    async getLocation (prop: WebdriverIO.LocationParam): Promise<number> {
      const element = await $(this.selector);
      return (await element.getLocation(prop));
    }

    /**
     * Wait for an element for the provided amount of milliseconds not to be displayed.
     * Default time in ms (default: 500)
     * Default interval between checks (default: waitforInterval)
     */
    async waitToDissappear (): Promise<void> {
      const element = await $(this.selector);
      await element.waitForDisplayed({ reverse: true });
    }
}