/* eslint-disable lines-around-comment */

import { DEFAULT_TIMEOUT, EXTREMELY_LARGE_WAIT } from '../constants';
import Element from '../elements/Element';
import { iOSPredicate, UISelector, XPath } from './Utilities';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'Default';

/* Single order, found in the order response in TestCustomer.getOrderHistory */
export type SingleOrder = {
  order_number: string;
  created_date: string;
  created_iso_date: string;
  created_iso_date_unformatted: string;
  order_status: string;
  order_total_formatted: string;
  order_total: number;
  ship_to: string;
  order_currency: 'GBP' | 'USD';
}

/* Response body for TestCustomer.getOrderHistory */
export type OrdersResponse = {
  orders: Array<SingleOrder>;
  total: number;
}

/* List of group brands by their respective API domains. Changing the values WILL cause issues. A lot of the framework revolves around this type. */
export enum GroupBrands {
  Boohoo = 'boohoo.com',
  BoohooMAN = 'boohooman.com',
  NastyGal = 'nastygal.com',
  KarenMillen = 'karenmillen.com',
  Coast = 'coastfashion.com',
  Warehouse = 'warehousefashion.com',
  Oasis = 'oasis-stores.com',
  DorothyPerkins = 'dorothyperkins.com',
  Burton = 'burton.co.uk',
  Wallis = 'wallis.co.uk',
  MissPap = 'misspap.com'
}

export type VerboseOrderDetails = {
  order_status: string;
  order_number: string;
  created_date: string;
  created_iso_date: string;
  promo_code: string;
  product_total_formatted: string;
  delivery_total_formatted: string;
  delivery_total: number;
  order_total_formatted: string;
  order_total: number;
  payment: {
    payment_method: string;
    card_type: string;
    last4_card_digits: string;
  };
  billing_address: {
    name: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
  };
  delivery: {
    delivery_address: {
      name: string;
      address: string;
      city: string;
      country: string;
      postal_code: string;
    };
    method: 'ukstandard' | string;
    earliest_delivery_date: string;
    expected_delivery_date: string;
  };
  status_id: 1 | 2 | 3 | 4 | 5 | 6;
  product_items: Array<{
    sku: string;
    name: string;
    color: string;
    size: string;
    price_formatted: string;
    price: number;
    quantity: number;
  }>;
};

/** This is the most generic we can get with our brand management system, it's basically a Record<GroupBrand, your_type>, where group brand is the URL.*/
export type GroupBrandsObject<T> = { [key in GroupBrands]: T };

/** Brand product map, must have an entry per brand in GroupBrands and value must be a ProductMap */
export type BrandProductMap = GroupBrandsObject<ProductMap>;

/** Enum for selecting how we sort results from produc searhces */
export enum ProductSort {
    LowToHigh = 'price-low-to-high',
    HighTolow = 'price-high-to-low'
}

/** Product map that contains all the information needed to drive tests. */
export type ProductMap = {
    defaultProduct: {
        sku: string;
        size: ProductSize;
        unavailableSize: ProductSize;
        name: string;
    };
    giftCertificateAmount: number;
    brandName: string;
    activeColourNode: RGBColour;
    inactiveColourNode: RGBColour;
    searchString: string;
}

/** Colour type for the colour assertion helpers */
export type RGBColour = {
  red: number;
  green: number;
  blue: number;
}

/* Selector map for POM pages, this should stop mistakes happening with wrong names/labels */
export type TSelectorMap = Record<string, TSelectorOptions>;

/* Grouped type for all product sizes, can be amended if appropriate. */
export type ProductSize = '' | '4' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | 'XS' | 'S' | 'M' | 'L' | 'XL';

/** Grouped types for any selector used for each platform. */
export type TSelector = iOSPredicate | UISelector | XPath;
export type TAndroidSelector = UISelector | XPath;
export type TAppleSelector = iOSPredicate | XPath;

/** Types for the API manager to limit input types. */
export type APIKeyType = 'Customer';

/** Type for mapping brands to a string. */
export type BrandMap = { [key in GroupBrands]: string };

/** Type for mapping brands to a payment providers. */
export type BrandPaymentProviderMap = { [key in GroupBrands]: PaymentProvider };

/** Enum for giving two explicit payment providers. */
export enum PaymentProvider {
    Adyen,
    Worldpay
}

// Doesn't match naming standards of starting with a T as it would be confusing to have TXY Cord.
export type XYCord = {
    x: number;
    y: number;
}

// Doesn't match naming standards of starting with a T as t would be confusing to have a double T.
export type TouchMap = {
    top: XYCord;
    bottom: XYCord;
}

/** Used as an arguement to populate the product search manager */
export type TProductQuery = {
    sort: ProductSort;
}

/** Used as a return type from the product manager responses. */
export type TProductHit = {
    currency: string;
    hit_type: string;
    orderable: boolean;
    price: number;
    prices: Record<string, number>;
    product_id: string;
    product_name: string;
    represented_product: {
        _type: string;
        id: string;
        link: string;
    };
}

/** Object that represents a Product for the product manager. */
export type TProduct = {
    sku: string;
    price: number;
    orderable: boolean;
}

/** Used as a return type from the product manager responses. */
export type TProductsResponse = {
    count: number;
    hits: Array<TProductHit>;
}

export type TSelectorOptions = {
    /** Android selector string */
    ANDROID?: TAndroidSelector;
    /** IOS selector string */
    IOS?: TAppleSelector;
}

export type TProductPurchaseOptions = {
    size: ProductSize;
    colourIndex: number;
}

export type TCustomerJSONResponse = {
    /** Response from the customer API with email. */
    email: string;
    /** Response from the customer API with customers ID. */
    customer_id: string;
    /** Response from the customer API with customers number. */
    customer_no: string;
}

export type TGiftCertificateResponse = {
    amount: number;
    currency: string;
    giftCertificateCode: string;
    creationDate: string;
    recipientEmail: string;
    recipientName: string;
    confirmation_email: string;
}

export type TElementOptions = {
  /** If set to true, automation will wait for the element to be visible and clickable before trying to click. */
  waitForElement?: boolean;
  /** Time in milliseconds it will wait for the element to become visible and clickable before trying to click, if this time elapses fully, the test will fail. */
  timeout?: number;
  /** If set to true, the automation will try to close the keyboard after text has been entered, this is because some fields will open the keyboard when entering text. */
  hideKeyboardAfter?: boolean;
  /** If set to true, the automation will validate the text by clicking the field and closing off it. */
  textValidation?: boolean;
  /** If set to true, it will try scan to page for the element first before it tries to click it. */
  scrollToElement?: boolean;
  /** If set to true, this action will only be attempted if the driver is running Android. */
  androidOnly?: boolean;
  /** If set to true, this action will only be attempted if the driver is running iOS., */
  iosOnly?: boolean;
  /** If set to any value above 0, this will delay the test from clicking until that time (in ms) has ellapsed. */
  pause?: number;
  /** If set to true, if this fail, step will continue. */
  ignoreFailures?: boolean;
  /** This will re-try the interaction until et */
  retryUntil?: RetryOptions;
}

/** This type is used in the TElementOptions to drive the retry functionality */
export type RetryOptions = {
  strategy: 'visible' | 'hidden';
  target: Element | Promise<Element>;
  interval: number;
  maxAttempts?: number;
}

export type TUserObject = {
    /** Email of the user */
    email: string;
    /** First name of the user */
    firstName: string;
    /** Last name of the user */
    lastName: string;
}

export type TAddressBody = {
    address_id: string;
    address1: string;
    city: string;
    country_code: string;
    first_name: string;
    full_name: string;
    last_name: string;
    phone: string;
    postal_code: string;
    preferred: boolean;
    title: string;
}

export type PaymentInstrumentResponse = {
    payment_card: Record<string, string>;
    payment_instrument_id: string;
    payment_method_id: string;
};

export type TGiftCertificateOptions = {
    /** The amount you want on the certificate */
    amount: number;
}

export type TUniqueCertificate = { 
    /** Unique ID and input code for the certificate */
    code: string;
    /** Amount on the gift certificate */
    amount: number;
};

/* Used to enforce properties on a query result from the DataTable class. */
export type TStorefrontMap = { 
    brand?: string; 
    realm?: string; 
    name?: string;
    currency?: string;
    site?: string;
    locale?: string;
    environment?: string;
};

export type TPaymentCard = {
    cardType: 'visa' | 'mastercard' | 'amex';
    /** Full 16 digit card number as string */
    cardNumber: string;
    /** Last 4 digits of card number, used for verification */
    cardLastFourNumbers: string;
    /** Name on card */
    cardName: string;
    /** Expiry month as string formmated as MM */
    cardExpiryMonth: string;
    /** Expiry year as string formatted as YY */
    cardExpiryYearShort: string;
    /** Expiry year as string formatted as YYYY */
    cardExpiryYearLong: string;
    /** Expiry month and year formatted as MM/YY  */
    cardExpiryFormatted: string;
    /** Card vertification value, usually 3 or 4 digits */
    cardCVV: string;
}

/** Lowercase locale of the country you want, used in the API managers. */
export type TLocale = 'uk' | 'us';

/** References for the builder method */
export type TSelectorReference = 'resourceId' | 'textContains' | 'index' | 'className' | 'childSelector' | 'description' | 'text' | 'resourceIdMatches' | 'textMatches';

/** Tuple containing  the selector reference and the value of the selector reference, used in the builder method. */
export type TBuildTuple = [TSelectorReference, string];

// Defaults
const worldpayVisa: TPaymentCard = {
  cardType: 'visa',
  cardNumber: '4444333322221111',
  cardLastFourNumbers: '1111',
  cardName: 'boohoo',
  cardExpiryMonth: '01',
  cardExpiryYearShort: '22',
  cardExpiryYearLong: '2022',
  cardExpiryFormatted: '01/25',
  cardCVV:'123'
};

const adyenVisa: TPaymentCard = {
  cardType: 'visa',
  cardNumber: '4444333322221111',
  cardLastFourNumbers: '1111',
  cardName: 'boohoo',
  cardExpiryMonth: '03',
  cardExpiryYearShort: '30',
  cardExpiryYearLong: '2030',
  cardExpiryFormatted: '03/30',
  cardCVV:'737'
};

const worldpayMastercard: TPaymentCard = {
  cardType: 'mastercard',
  cardNumber: '5454545454545454',
  cardLastFourNumbers: '5454',
  cardName: 'John',
  cardExpiryMonth: '01',
  cardExpiryYearShort: '22',
  cardExpiryYearLong: '2022',
  cardExpiryFormatted: '01/25',
  cardCVV:'123'
};

const adyenMastercard: TPaymentCard = {
  cardType: 'mastercard',
  cardNumber: '2222400070000005',
  cardLastFourNumbers: '0005',
  cardName: 'boohoo',
  cardExpiryMonth: '03',
  cardExpiryYearShort: '30',
  cardExpiryYearLong: '2030',
  cardExpiryFormatted: '03/30',
  cardCVV:'737'
};

const worldpayAmex: TPaymentCard = {
  cardType: 'amex',
  cardNumber: '343434343434343',
  cardLastFourNumbers: '4343',
  cardName: 'boohoo',
  cardExpiryMonth: '01',
  cardExpiryYearShort: '22',
  cardExpiryYearLong: '2022',
  cardExpiryFormatted: '01/25',
  cardCVV:'1234'
};

const adyenAmex: TPaymentCard = {
  cardType: 'amex',
  cardNumber: '370000000000002',
  cardLastFourNumbers: '0002',
  cardName: 'boohoo',
  cardExpiryMonth: '03',
  cardExpiryYearShort: '30',
  cardExpiryYearLong: '2030',
  cardExpiryFormatted: '03/30',
  cardCVV:'7373'
};

const boohooAddress: TAddressBody = {
  address_id: 'Boohoo',
  address1: '49-51 Dale St',
  city: 'Manchester',
  country_code: 'GB',
  first_name: 'John',
  full_name: 'John Doe',
  last_name: 'Doe',
  phone: '07961205849',
  postal_code: 'M12HG',
  preferred: true,
  title: 'Mr'
};

const alternativeAddress: TAddressBody = {
  address_id: 'Mcr Cathedral',
  address1: 'Manchester Cathedral, Victoria Street',
  city: 'Manchester',
  country_code: 'GB',
  first_name: 'Marc',
  full_name: 'Marc Jacobs',
  last_name: 'Jacobs',
  phone: '01618332220',
  postal_code: 'M31SX',
  preferred: true,
  title: 'Mr'
};

const germanyAddress: TAddressBody = {
  address_id: 'Lpz Prenzlauer',
  address1: 'Prenzlauer Allee 90',
  city: 'Leipzig',
  country_code: 'DE',
  first_name: 'Wolfgang',
  full_name: 'Wolfgang Wagner',
  last_name: 'Wagner',
  phone: '3041575665',
  postal_code: '04006',
  preferred: false,
  title: 'Mr'
};

const franceAddress: TAddressBody = {
  address_id: 'R. Decartes',
  address1: '70 rue Descartes',
  city: 'Strasbourg',
  country_code: 'FR',
  first_name: 'Emanuel',
  full_name: 'Emanuel Martin',
  last_name: 'Martin',
  phone: '+33700555946',
  postal_code: '67100',
  preferred: false,
  title: 'Mr'
};

const defaultGiftCertificateOptions: TGiftCertificateOptions = {
  amount: 15
};

const defaultElementOptions: TElementOptions = {
  waitForElement: true,
  timeout: DEFAULT_TIMEOUT,
  hideKeyboardAfter: false,
  scrollToElement: true,
  pause: 750
};

const appLoadWait: TElementOptions = { 
  timeout: EXTREMELY_LARGE_WAIT, 
  scrollToElement: false, 
  waitForElement: true,
  pause: 5000
};

export const defaults = {
  appLoadWait,
  defaultGiftCertificateOptions,
  defaultElementOptions,
  presetAddresses: {
    boohooAddress,
    alternativeAddress,
    germanyAddress,
    franceAddress
  },
  paymentCards: {
    worldpay: {
      visa: worldpayVisa,
      mastercard: worldpayMastercard,
      amex: worldpayAmex
    },
    adyen: {
      visa: adyenVisa,
      mastercard: adyenMastercard,
      amex: adyenAmex
    }
  }
};

/** Enum for giving specific locations on the captured screenshots. */
export enum PixelLocation {
  FirstPixel,
  MiddleOfCheckBox,
}