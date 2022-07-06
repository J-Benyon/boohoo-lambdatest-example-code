import { BrandPaymentProviderMap, defaults, GroupBrands, TPaymentCard, PaymentProvider, TBuildTuple, RGBColour, PixelLocation } from './Types';
import Jimp from 'jimp';

/**
 * This will retrn the current date in UK (en-GB) format, example: 22 April 2022
 * @returns the current date as a string
 */ 
export function getCurrentUKDate (): string {
  return new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric'});
}

/**
 * This restarts the AUT (puts it in backgound for 5 secs and then activates it again to make new server calls)
 */
export async function restartWithSameSession (): Promise<void> {
  const caps = await driver.getCurrentPackage();
  await driver.closeApp();
  await driver.pause(5 * 1000);
  await driver.activateApp(caps);
}

/**
 * Gets the average red green and blue values from a file generated from a screenshot.
 * @param filePath Takes in relative file path to the binary execution location, i.e. screenshots/brand/filename.png
 * @param location Takes the pixel that we want to get the value from.
 * @returns Promise of an RGB colour, this is an object containing red, green and blue values.
 */
export async function getRBGFromFile (filePath: string, location: PixelLocation): Promise<RGBColour>{
  let pixelHex: Array<number> | number = [0, 0] || 0;
  const colour = await Jimp.read(filePath);
  if (location == PixelLocation.FirstPixel) {
    pixelHex = [1, 1];
  } if (location == PixelLocation.MiddleOfCheckBox) {
    pixelHex = [colour.getHeight() / 2, colour.getHeight() / 2];
  }
  pixelHex = colour.getPixelColor(pixelHex[0], pixelHex[1]);
  const rgb = Jimp.intToRGBA(pixelHex);
  return {
    red: rgb.r,
    green: rgb.g,
    blue: rgb.b,
  };
}

/**
 * Static class for making actions only done on android, does nothing if run on iOS.
 */
export class AndroidActions {
  static async PerformAction (action: string): Promise<void> {
    if (driver.isAndroid) {
      await browser.execute( 'mobile: performEditorAction', { 'action': action } );
    } else {
      console.warn('Skipping android action as were running iOS');
    }
  }
}

/**
 * Generic method to build project names, build names and suite names so they all keep a consistant pattern.
 * @param brand Brand string name, i.e. Boohoo
 * @param platform Platform type, i.e. iOS or Android
 * @param production Production or not as string from env variable
 * @param rerun Boolean if it's a rerun or not, if true it wont generate one it'll pick a suitename from rerun instance.
 */
export function SuiteName (brand: string, platform: string, production: string, rerun = false): {
        project: string; 
        build: string; 
        name: string;
    } {
  if (rerun) {

    // We want to return the reruns name if its a rerun.
    return {
      project: process.env.PROJECT,
      build: process.env.BUILD,
      name:process.env.NAME
    };
  }

  // Generate suite
  const isTeamCity = !!process.env.TEAMCITY_VERSION;
  const time = new Date().toLocaleString();
  const productionPrefix = production ? '[Production] ' : '';
  return {
    project: `${brand} ${platform} App Smoke`,
    build: productionPrefix + `${!isTeamCity ? '[Manual Run] ' : ''}${brand} ${platform} ${time}`,
    name: `${(production ? 'prod_' : '')}${ String(brand.toLowerCase().replace(/ /g, '_' )) }_${ String(platform.toLowerCase()) }_app_smoke_suite`
  };
}

export function generateRandomEmail (): string {
  return `testemail${Date.now()}${Math.floor(Math.random() * 100)}@boohoo.com`;
}

/** All builder classes must contain a build method even if it simply returns the builder value. */
abstract class Builder {
    abstract build (): string;
}

export class iOSPredicate implements Builder {
    private buildString: string;
    private buildType = '';

    constructor (value: string) {
      this.buildString = value;
    }

    asType (value: string): iOSPredicate {
      this.buildType = `type CONTAINS "${value}" && `;
      return this;
    }

    build (): string {
      
      // Could be just "ios=${string}"
      return `-ios predicate string:${this.buildType}${this.buildString}`;
    }
}

export class XPath implements Builder {
    private buildString: string;

    constructor (value = '') {
      this.buildString = value;
    }

    build (): string {
      return this.buildString;
    }
}

/**
 * This turns text into capitalized text
 * @param words Takes text that we want to capitalize
 * @returns text wich is capitalized
 */
function capitalise (words: string): string {
  if (words.includes(' ')) {
    const splitWords = words.split(' ');
    return splitWords[0][0].toUpperCase() + splitWords[0].slice(1).toLowerCase() + ' ' + splitWords[1][0].toUpperCase() + splitWords[1].slice(1).toLowerCase();
  } else {
    return words[0].toUpperCase() + words.slice(1).toLowerCase() as string;
  }
}

/**
 * Used to build UISelector strings and improve readability.
 */
export class UISelector implements Builder {
    private buildMap: Array<TBuildTuple> = [];

    id (value: string): UISelector {
      this.buildMap.push(['resourceIdMatches', `".*${value}.*"`]);
      return this;
    }

    textLowerUpper (value: string): UISelector {
      this.buildMap.push(['textMatches', `"${value.toUpperCase()}|${value.toLowerCase()}|${value}|${capitalise(value)}"`]);
      return this;
    }

    absoluteId (value: string): UISelector {
      this.buildMap.push(['resourceId', `"${value}"`]);
      return this;
    }

    text (value: string): UISelector {
      this.buildMap.push(['textContains', `"${value}"`]);
      return this;
    }

    absoluteText (value: string): UISelector {
      this.buildMap.push(['text', `"${value}"`]);
      return this;
    }

    class (value: string): UISelector {
      this.buildMap.push(['className', `"${value}"`]);
      return this;
    }

    child (value: UISelector): UISelector {
      this.buildMap.push(['childSelector', `${value.build(false)}`]);
      return this;
    }

    index (value: number): UISelector {
      this.buildMap.push(['index', value.toString()]);
      return this;
    }

    description (value: string): UISelector {
      this.buildMap.push(['description', `"${value}"`]);
      return this;
    }

    build (prefix = true): string {
      let builtString = '';
      this.buildMap.forEach((buildTuple: TBuildTuple) => {
        builtString += `.${buildTuple[0]}(${buildTuple[1]})`;
      });
      return (prefix ? 'android=new UiSelector()' : 'new UiSelector()') + builtString;
    }
}

/**
 * Find's the payment provider for specific brand.
 * @param {GroupBrands} brand Brand from specific GroupBrands enum.
 * @returns {PaymentProvider} Returns payment provider as enum, this can be used in conjuction with getCardByPaymentProvider to return a PaymentCard.
 */
export function GetPaymentProvider (brand: GroupBrands): PaymentProvider {
  const brandPaymentProviderMap: BrandPaymentProviderMap = {
    'boohoo.com': PaymentProvider.Worldpay,
    'boohooman.com': PaymentProvider.Worldpay,
    'nastygal.com': PaymentProvider.Worldpay,
    'karenmillen.com': PaymentProvider.Worldpay,
    'coastfashion.com': PaymentProvider.Worldpay,
    'warehousefashion.com': PaymentProvider.Adyen,
    'oasis-stores.com': PaymentProvider.Adyen,
    'dorothyperkins.com': PaymentProvider.Worldpay,
    'burton.co.uk': PaymentProvider.Worldpay,
    'wallis.co.uk': PaymentProvider.Worldpay,
    'misspap.com': PaymentProvider.Worldpay
  };
  return brandPaymentProviderMap[brand];
}

export function getCardByPaymentProvider (paymentProvider: PaymentProvider): { visa?: TPaymentCard; mastercard?: TPaymentCard; amex?: TPaymentCard } {
  switch (paymentProvider) {
  case PaymentProvider.Adyen:
    return defaults.paymentCards.adyen;
  case PaymentProvider.Worldpay:
    return defaults.paymentCards.worldpay;
  }
}

/**
 * Merges Utilities.getPaymentProvider and Utilities.getCardByPaymentProvider into one method.
 * @param brand Brand from specific GroupBrands enum.
 * @returns Returns basic object containing either a visa, mastercard, amex or all three.
 */
export function GetPaymentCardByBrand (brand: GroupBrands): { visa?: TPaymentCard; mastercard?: TPaymentCard; amex?: TPaymentCard } {
  return getCardByPaymentProvider(GetPaymentProvider(brand));
}

/**
 * Merges Utilities.getPaymentProvider and Utilities.getCardByPaymentProvider into one method.
 * @param filePath Takes in relative file path to the binary execution location, i.e. screenshots/brand/filename.png
 * @returns Returns true if the checkbox is checked (middle pixel is black), returns false if the checkbox is unchecked (middle pixel is white)
 */
export async function isCheckedBasedOnImg (filePath: string): Promise<boolean> {
  const elementRGB = await getRBGFromFile(filePath, PixelLocation.MiddleOfCheckBox);
  if (elementRGB.red === 255 && elementRGB.green === 255 && elementRGB.blue === 255) {
    return false;
  }
  if (elementRGB.red === 0 && elementRGB.green === 0 && elementRGB.blue === 0) {
    return true;
  } else {
    throw Error('Unable to determine is the checkbox checked or not based on the provided screenshot');
  }
}
