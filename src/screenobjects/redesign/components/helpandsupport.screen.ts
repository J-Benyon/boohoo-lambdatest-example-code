import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import { TSelectorMap, GroupBrands, TSelectorOptions, TSelector } from '../../../helpers/Types';
import Element from '../../../elements/Element';
import Button from '../../../elements/Button';
import { getScreenshotsFolderPath } from '../../../specs/redesign/evidence/helpers/Utilities';

const SELECTORS: TSelectorMap = {
  FACEBOOK_BUTTON: {
    ANDROID: new XPath('//android.widget.Button[@text="FACEBOOK"]'),
    IOS: new iOSPredicate('...')
  },
  MOST_ASKED_QUESTIONS: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(0)),
    IOS: new iOSPredicate('...')
  },
  ORDERS_AND_DELIVERY: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(1)),
    IOS: new iOSPredicate('...')
  },
  RETURNS_AND_REFUNDS: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(2)),
    IOS: new iOSPredicate('...')
  },
  PAYMENTS_AND_PROMOTIONS: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(3)),
    IOS: new iOSPredicate('...')
  },
  MANAGING_MY_ACCOUNT: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(4)),
    IOS: new iOSPredicate('...')
  },
  PRODUCTS: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(5)),
    IOS: new iOSPredicate('...')
  },
  LEGAL_AND_DATA_PROTECTION: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(6)),
    IOS: new iOSPredicate('...')
  },
  APP_FEEDBACK: {
    ANDROID: new UISelector().id('help_menu_recycler').child(new UISelector().class('android.widget.LinearLayout').index(7)),
    IOS: new iOSPredicate('...')
  },
  SUBCATEGORIES_ARROWS: {
    ANDROID: new UISelector().id('expand'),
    IOS: new iOSPredicate('...')
  },
  SUBCATEGORIES_LABELS: {
    ANDROID: new UISelector().id('help_title'),
    IOS: new iOSPredicate('...')
  },
  TOOLBAR_TITLE: {
    ANDROID: new UISelector().id('toolbar').child(new UISelector().class('android.widget.TextView')),
    IOS: new iOSPredicate('...')
  }
};

class HelpAndSupportScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get facebookButton (): Button {
      return new Button(SELECTORS.FACEBOOK_BUTTON, 'Facebook Button');
    }

    get mostAskedQuestions (): Button {
      return new Button(SELECTORS.MOST_ASKED_QUESTIONS, 'Most Asked Questions Button');
    }

    get ordersAndDelivery (): Button {
      return new Button(SELECTORS.ORDERS_AND_DELIVERY, 'Orders And Delivery Button');
    }

    get returnsAndRefunds (): Button {
      return new Button(SELECTORS.RETURNS_AND_REFUNDS, 'Returns And Refunds Button');
    }

    get paymentsAndPromotions (): Button {
      return new Button(SELECTORS.PAYMENTS_AND_PROMOTIONS, 'Payments And Promotions Button');
    }

    get managingMyAccount (): Button {
      return new Button(SELECTORS.MANAGING_MY_ACCOUNT, 'Managing My Account Button');
    }

    get products (): Button {
      return new Button(SELECTORS.PRODUCTS, 'Products Button');
    }

    get legalAndDataProtection (): Button {
      return new Button(SELECTORS.LEGAL_AND_DATA_PROTECTION, 'Legal And Data Protection Button');
    }

    get appFeedback (): Button {
      return new Button(SELECTORS.APP_FEEDBACK, 'App Feedback Button');
    }

    get subcategoriesLabels (): Element {
      return new Element(SELECTORS.SUBCATEGORIES_LABELS, 'Subcategories Labels');
    }

    get toolBarTitle (): Element {
      return new Element(SELECTORS.TOOLBAR_TITLE, 'Subcategory Toolbar Title');
    }

    async takeScreenshotOfallSubcategories (): Promise<void> {
      const selectorr: TSelectorOptions = SELECTORS.SUBCATEGORIES_LABELS;
      const platformSelectorr: TSelector = selectorr[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const titles = await $$(platformSelectorr.build());
      const toolbar = await this.toolBarTitle.getText();
      const rootFolder = getScreenshotsFolderPath();
      for await (const element of titles) {
        const name = (await element.getText()).replace(/ /g, '_').replace(/,/g, '').replace('?', '');
        const filePath = rootFolder + `/${toolbar}_${name}.png`;
        await element.click();
        await driver.pause(2000);
        await driver.saveScreenshot(filePath);
        await element.click();
        await driver.pause(1000);
      }
    }

    async navigateBackToMainCategories (): Promise<void> {
      await driver.back();
    }
}

export default HelpAndSupportScreen;