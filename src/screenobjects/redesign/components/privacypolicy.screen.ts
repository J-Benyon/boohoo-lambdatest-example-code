import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import TestConfiguration from '../../../specs/config';

const brand = driver.config['brand'];
const brandName = TestConfiguration[brand].brandName;

const SELECTORS: TSelectorMap = {
  CLOSE_BUTTON: {
    ANDROID: new XPath('//*[@content-desc="Navigate up"]'),
    IOS: new iOSPredicate('...')
  },
  DOCUMENT_TITLE: {
    ANDROID: new UISelector().text('Privacy Notice'),
    IOS: new iOSPredicate('...')
  },
  DOCUMENT_TEXT: {
    ANDROID: new UISelector().id('content_asset_text_view'),
    IOS: new iOSPredicate('...')
  },
  FIRST_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Who is ' + brandName),
    IOS: new iOSPredicate('...')
  },
  MP_FIRST_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('WHO IS MISSPAP'),
    IOS: new iOSPredicate('...')
  },
  FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text(brandName + ' is a leading online fashion retail company'),
    IOS: new iOSPredicate('...')
  },
  BHM_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We design, source, market and sell menswear products targeted at 16-24 year-old consumers in almost every country in the world.'),
    IOS: new iOSPredicate('...')
  },
  DP_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Here at Dorothy Perkins, fashion isn\'t just what we know, it\'s what we love'),
    IOS: new iOSPredicate('...')
  },
  NG_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Nasty Gal was founded by Sophia Amoruso 10 years ago'),
    IOS: new iOSPredicate('...')
  },
  MP_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Founded in 2013, Misspap has rapidly become one of the'),
    IOS: new iOSPredicate('...')
  },
  BURTON_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Good value and style are Burton’s hallmark'),
    IOS: new iOSPredicate('...')
  },
  WALLIS_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Wallis offers stylish, exclusive and modern fashion aimed at women'),
    IOS: new iOSPredicate('...')
  },
  SECOND_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Our commitment to you'),
    IOS: new iOSPredicate('...')
  },
  SECOND_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We take the protection of your personal data seriously and will process your personal data fairly'),
    IOS: new iOSPredicate('...')
  },
  THIRD_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('How we keep your data safe and secure'),
    IOS: new iOSPredicate('...')
  },
  THIRD_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We have appropriate organisational safeguards and security measures in place to protect your data'),
    IOS: new iOSPredicate('...')
  },
  FOURTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('The personal data we collect'),
    IOS: new iOSPredicate('...')
  },
  FOURTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Personal data means any information about an individual from which that person can be identified'),
    IOS: new iOSPredicate('...')
  },
  FIFTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('How we collect your data'),
    IOS: new iOSPredicate('...')
  },
  FIFTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may collect personal data about you in the following ways'),
    IOS: new iOSPredicate('...')
  },
  SIXTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('How we use your data'),
    IOS: new iOSPredicate('...')
  },
  SIXTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We will only collect and process your personal data where we have a legal basis to do so'),
    IOS: new iOSPredicate('...')
  },
  SEVENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Marketing preferences, adverts and cookies'),
    IOS: new iOSPredicate('...')
  },
  SEVENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may send you marketing communications and promotional offers'),
    IOS: new iOSPredicate('...')
  },
  EIGHTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Links to other websites and third parties'),
    IOS: new iOSPredicate('...')
  },
  EIGHTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Our website may include links to and from the websites of our partner networks'),
    IOS: new iOSPredicate('...')
  },
  NINTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('How we share your data'),
    IOS: new iOSPredicate('...')
  },
  NINTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may disclose and share your personal data with the parties set out below'),
    IOS: new iOSPredicate('...')
  },
  TENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Your rights'),
    IOS: new iOSPredicate('...')
  },
  TENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You have several rights under the data privacy legislation'),
    IOS: new iOSPredicate('...')
  },
  ELEVENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Changes to this privacy notice'),
    IOS: new iOSPredicate('...')
  },
  ELEVENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('From time to time we may change this privacy notice'),
    IOS: new iOSPredicate('...')
  },
  TWELFTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('How to contact us'),
    IOS: new iOSPredicate('...')
  },
  TWELFTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We welcome feedback and are happy to answer any questions you may have about your data'),
    IOS: new iOSPredicate('...')
  },
  UK_VAT_NUMBER: {
    ANDROID: new UISelector().text('185 4874 61'),
    IOS: new iOSPredicate('...')
  },
};

class PrivacyPolicyScreen {
    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get closePrivacyPolicyButton (): Button {
      return new Button(SELECTORS.CLOSE_BUTTON, 'Close Privacy Policy Button');
    }

    get documentTitle (): Element {
      return new Element(SELECTORS.DOCUMENT_TITLE, 'Document title');
    }

    get documentText (): Element {
      return new Element(SELECTORS.DOCUMENT_TEXT, 'Privacy Policy Document Text');
    }

    get firstParagraphTitle (): Element {
      return new Element(SELECTORS.FIRST_PARAGRAPH_TITLE, 'First Paragraph Title');
    }

    get mpFirstParagraphTitle (): Element {
      return new Element(SELECTORS.MP_FIRST_PARAGRAPH_TITLE, 'MissPap First Paragraph Title');
    }

    get firstParagraphLine (): Element {
      return new Element(SELECTORS.FIRST_PARAGRAPH_LINE, 'BoohooMAN/Oasis/Coast/Warehouse/KarenMillen Paragraph Line');
    }

    get bhmFirstParagraphLine (): Element {
      return new Element(SELECTORS.BHM_FIRST_PARAGRAPH_LINE, 'BoohooMan First Paragraph Line');
    }

    get dpFirstParagraphLine (): Element {
      return new Element(SELECTORS.DP_FIRST_PARAGRAPH_LINE, 'Dorothy Perkins Paragraph Line');
    }

    get ngFirstParagraphLine (): Element {
      return new Element(SELECTORS.NG_FIRST_PARAGRAPH_LINE, 'NastyGal First Paragraph Line');
    }

    get mpFirstParagraphLine (): Element {
      return new Element(SELECTORS.MP_FIRST_PARAGRAPH_LINE, 'MissPap First Paragraph Line');
    }

    get burtonFirstParagraphLine (): Element {
      return new Element(SELECTORS.BURTON_FIRST_PARAGRAPH_LINE, 'Burton First Paragraph Line');
    }

    get wallisFirstParagraphLine (): Element {
      return new Element(SELECTORS.WALLIS_FIRST_PARAGRAPH_LINE, 'Wallis First Paragraph Line');
    }

    get secondParagraphTitle (): Element {
      return new Element(SELECTORS.SECOND_PARAGRAPH_TITLE, 'Second Paragraph Title');
    }
    
    get secondParagraphLine (): Element {
      return new Element(SELECTORS.SECOND_PARAGRAPH_LINE, 'Second Paragraph Line');
    }
    
    get thirdParagraphTitle (): Element {
      return new Element(SELECTORS.THIRD_PARAGRAPH_TITLE, 'Third Paragraph Title');
    }

    get thirdParagraphLine (): Element {
      return new Element(SELECTORS.THIRD_PARAGRAPH_LINE, 'Third Paragraph Line');
    }

    get fourthParagraphTitle (): Element {
      return new Element(SELECTORS.FOURTH_PARAGRAPH_TITLE, 'Fourth Paragraph Title');
    }

    get fourthParagraphLine (): Element {
      return new Element(SELECTORS.FOURTH_PARAGRAPH_LINE, 'Fourth Paragraph Line');
    }

    get fifthParagraphTitle (): Element {
      return new Element(SELECTORS.FIFTH_PARAGRAPH_TITLE, 'Fifth Paragraph Title');
    }

    get fifthParagraphLine (): Element {
      return new Element(SELECTORS.FIFTH_PARAGRAPH_LINE, 'Fifth Paragraph Line');
    }
  
    get sixthParagraphTitle (): Element {
      return new Element(SELECTORS.SIXTH_PARAGRAPH_TITLE, 'Sixth Paragraph Title');
    }

    get sixthParagraphLine (): Element {
      return new Element(SELECTORS.SIXTH_PARAGRAPH_LINE, 'Sixth Paragraph Line');
    }

    get seventhParagraphTitle (): Element {
      return new Element(SELECTORS.SEVENTH_PARAGRAPH_TITLE, 'Seventh Paragraph Title');
    }

    get seventhParagraphLine (): Element {
      return new Element(SELECTORS.SEVENTH_PARAGRAPH_LINE, 'Seventh Paragraph Line');
    }

    get eighthParagraphTitle (): Element {
      return new Element(SELECTORS.EIGHTH_PARAGRAPH_TITLE, 'Eighth Paragraph Title');
    }

    get eighthParagraphLine (): Element {
      return new Element(SELECTORS.EIGHTH_PARAGRAPH_LINE, 'Eighth Paragraph Line');
    }

    get ninthParagraphTitle (): Element {
      return new Element(SELECTORS.NINTH_PARAGRAPH_TITLE, 'Ninth Paragraph Title');
    }

    get ninthParagraphLine (): Element {
      return new Element(SELECTORS.NINTH_PARAGRAPH_LINE, 'Ninth Paragraph Line');
    }

    get tenthParagraphTitle (): Element {
      return new Element(SELECTORS.TENTH_PARAGRAPH_TITLE, 'Tenth Paragraph Title');
    }

    get tenthParagraphLine (): Element {
      return new Element(SELECTORS.TENTH_PARAGRAPH_LINE, 'Tenth Paragraph Line');
    }

    get eleventhParagraphTitle (): Element {
      return new Element(SELECTORS.ELEVENTH_PARAGRAPH_TITLE, 'Eleventh Paragraph Title');
    }

    get eleventhParagraphLine (): Element {
      return new Element(SELECTORS.ELEVENTH_PARAGRAPH_LINE, 'Eleventh Paragraph Line');
    }

    get twelfthParagraphTitle (): Element {
      return new Element(SELECTORS.TWELFTH_PARAGRAPH_TITLE, 'Twelfth Paragraph Title');
    }

    get twelfthParagraphLine (): Element {
      return new Element(SELECTORS.TWELFTH_PARAGRAPH_LINE, 'Twelfth Paragraph Line');
    }

    get ukVatNumber (): Element {
      return new Element(SELECTORS.UK_VAT_NUMBER, 'UK VAT Number');
    }
}

export default PrivacyPolicyScreen;
