import { iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';
import { GroupBrands, TSelectorMap } from '../../../helpers/Types';
import Button from '../../../elements/Button';
import Element from '../../../elements/Element';

const SELECTORS: TSelectorMap = {
  CLOSE_BUTTON: {
    ANDROID: new XPath('//*[@content-desc="Navigate up"]'),
    IOS: new iOSPredicate('...')
  },
  DOCUMENT_TITLE: {
    ANDROID: new UISelector().text('TERMS OF WEBSITE USE'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_DOCUMENT_TITLE: {
    ANDROID: new UISelector().text('TERMS AND CONDITIONS OF USE'),
    IOS: new iOSPredicate('...')
  },
  DOCUMENT_TEXT: {
    ANDROID: new UISelector().id('content_asset_text_view'),
    IOS: new iOSPredicate('...')
  },
  FIRST_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Information about us'),
    IOS: new iOSPredicate('...')
  },
  FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We are a limited company registered in England'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_FIRST_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('License'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_FIRST_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Unless otherwise stated, the copyright and other intellectual property rights'),
    IOS: new iOSPredicate('...')
  },
  SECOND_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Other applicable terms'),
    IOS: new iOSPredicate('...')
  },
  SECOND_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Should you wish to purchase any goods shown or advertised on our site'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_SECOND_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Service Access'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_SECOND_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('While we endeavor to ensure that this Website is available 24 hours a day'),
    IOS: new iOSPredicate('...')
  },
  THIRD_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Changes to these Terms of Use'),
    IOS: new iOSPredicate('...')
  },
  THIRD_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may revise these Terms of Use at any time by amending this page'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_THIRD_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Links and Advertisements'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_THIRD_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Links to third party websites on this Website are provided solely for your convenience'),
    IOS: new iOSPredicate('...')
  },
  FOURTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Access to our site'),
    IOS: new iOSPredicate('...')
  },
  FOURTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Our site is made available free of charge. We do not guarantee that our site'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_FOURTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Registration'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_FOURTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Each registration is for a single user only'),
    IOS: new iOSPredicate('...')
  },
  FIFTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Your account and password'),
    IOS: new iOSPredicate('...')
  },
  FIFTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You may access most areas of our site without registering your details with us, but certain areas'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_FIFTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Disclaimer'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_FIFTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('While we endeavor to ensure that the information on this Website is correct'),
    IOS: new iOSPredicate('...')
  },
  SIXTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Your use of our site'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_SIXTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Liability'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_SIXTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('The material displayed on our site is provided without any guarantees, conditions or'),
    IOS: new iOSPredicate('...')
  },
  SIXTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You may use our site only for lawful purposes'),
    IOS: new iOSPredicate('...')
  },
  SEVENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Interactive services'),
    IOS: new iOSPredicate('...')
  },
  SEVENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may from time to time provide interactive services to you on our site'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_SEVENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Indemnity'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_SEVENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You agree to indemnify, defend and hold harmless Boohoo.com UK Limited'),
    IOS: new iOSPredicate('...')
  },
  EIGHTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Content standards'),
    IOS: new iOSPredicate('...')
  },
  EIGHTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You must ensure that any and all information and material which you post to our site'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_EIGHTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Termination'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_EIGHTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may at any time terminate or suspend any part of the Website without notice to you'),
    IOS: new iOSPredicate('...')
  },
  NINTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Viruses, hacking and other offen'),
    IOS: new iOSPredicate('...')
  },
  NINTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We do not guarantee that our site will be secure or free from bugs or viruses'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_NINTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Governing law and jurisdiction'),
    IOS: new iOSPredicate('...')
  },
  BOOHOO_NINTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('These terms and conditions are to be construed in accordance with the laws of England'),
    IOS: new iOSPredicate('...')
  },
  TENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Intellectual property rights'),
    IOS: new iOSPredicate('...')
  },
  TENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('All intellectual property rights in our site, and in the material published on it, are owned by us and our licensors'),
    IOS: new iOSPredicate('...')
  },
  ELEVENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Our trade marks are registered'),
    IOS: new iOSPredicate('...')
  },
  ELEVENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You are not permitted to use these trade marks without our approval'),
    IOS: new iOSPredicate('...')
  },
  TWELFTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Changes to our site'),
    IOS: new iOSPredicate('...')
  },
  TWELFTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We may update our site from time to time'),
    IOS: new iOSPredicate('...')
  },
  THIRTEENTHT_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('No reliance on information'),
    IOS: new iOSPredicate('...')
  },
  THIRTEENTHT_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('The content on our site is provided for general information only'),
    IOS: new iOSPredicate('...')
  },
  FOURTEENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Limitation of our liability in respect of your use of our site'),
    IOS: new iOSPredicate('...')
  },
  FOURTEENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('We do not exclude or limit in any way our liability to you where it would be unlawful to do so'),
    IOS: new iOSPredicate('...')
  },
  FIFTEENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Our rights'),
    IOS: new iOSPredicate('...')
  },
  FIFTEENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('If We determine, in our discretion, that there has been a breach of these Terms of Use'),
    IOS: new iOSPredicate('...')
  },
  SIXTEENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Linking to our site'),
    IOS: new iOSPredicate('...')
  },
  SIXTEENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('You may link pages of our site to your personal social media accounts'),
    IOS: new iOSPredicate('...')
  },
  SEVENTEENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Third party links and resources in our site'),
    IOS: new iOSPredicate('...')
  },
  SEVENTEENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Where our site contains links to other sites and resources provided by third parties'),
    IOS: new iOSPredicate('...')
  },
  EIGHTEENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Applicable law'),
    IOS: new iOSPredicate('...')
  },
  EIGHTEENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('Please note that these Terms of Use or any dispute or claim arising out of or in connection with them'),
    IOS: new iOSPredicate('...')
  },
  NINETEENTH_PARAGRAPH_TITLE: {
    ANDROID: new UISelector().text('Contact us'),
    IOS: new iOSPredicate('...')
  },
  NINETEENTH_PARAGRAPH_LINE: {
    ANDROID: new UISelector().text('If you wish to contact us in respect of our site, please contact us at customerservices@'),
    IOS: new iOSPredicate('...')
  },
  BOOHOOMAN_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@boohoo.com'),
    IOS: new iOSPredicate('...')
  },
  NASTY_GAL_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@nastygal.com'),
    IOS: new iOSPredicate('...')
  },
  COAST_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@coastfashion.com'),
    IOS: new iOSPredicate('...')
  },
  OASIS_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@oasis-stores.com'),
    IOS: new iOSPredicate('...')
  },
  MISS_PAP_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@MissPap.com'),
    IOS: new iOSPredicate('...')
  },
  WAREHOUSE_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@warehousefashion.com'),
    IOS: new iOSPredicate('...')
  },
  KAREN_MILLEN_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@karenmillen.com'),
    IOS: new iOSPredicate('...')
  },
  WALLIS_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@wallis-style.com'),
    IOS: new iOSPredicate('...')
  },
  DOROTHY_PERKINS_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@dorothyperkins-fashion.com'),
    IOS: new iOSPredicate('...')
  },
  BURTON_CONTACT_EMAIL: {
    ANDROID: new UISelector().text('customerservices@burton.co.uk'),
    IOS: new iOSPredicate('...')
  }
};

class TermsOfUseScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get closeTermsOfUseButton (): Button {
      return new Button(SELECTORS.CLOSE_BUTTON, 'Close Terms of Use Button');
    }

    get documentTitle (): Element {
      return new Element(SELECTORS.DOCUMENT_TITLE, 'Document title');
    }

    get boohooDocumentTitle (): Element {
      return new Element(SELECTORS.BOOHOO_DOCUMENT_TITLE, 'Boohoo Document title');
    }

    get documentText (): Element {
      return new Element(SELECTORS.DOCUMENT_TEXT, 'Terms of Use Document Text');
    }

    get firstParagraphTitle (): Element {
      return new Element(SELECTORS.FIRST_PARAGRAPH_TITLE, 'First Paragraph Title');
    }

    get boohooFirstParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_FIRST_PARAGRAPH_TITLE, 'Boohoo First Paragraph Title');
    }

    get firstParagraphLine (): Element {
      return new Element(SELECTORS.FIRST_PARAGRAPH_LINE, 'BoohooMAN/Oasis/Coast/Warehouse/KarenMillen Paragraph Line');
    }

    get boohooFirstParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_FIRST_PARAGRAPH_LINE, 'Boohoo First Paragraph Line');
    }

    get secondParagraphTitle (): Element {
      return new Element(SELECTORS.SECOND_PARAGRAPH_TITLE, 'Second Paragraph Title');
    }

    get boohooSecondParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_SECOND_PARAGRAPH_TITLE, 'Boohoo Second Paragraph Title');
    }
    
    get secondParagraphLine (): Element {
      return new Element(SELECTORS.SECOND_PARAGRAPH_LINE, 'Second Paragraph Line');
    }

    get boohooSecondParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_SECOND_PARAGRAPH_LINE, 'Boohoo Second Paragraph Line');
    }
    
    get thirdParagraphTitle (): Element {
      return new Element(SELECTORS.THIRD_PARAGRAPH_TITLE, 'Third Paragraph Title');
    }

    get boohooThirdParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_THIRD_PARAGRAPH_TITLE, 'Boohoo Third Paragraph Title');
    }

    get thirdParagraphLine (): Element {
      return new Element(SELECTORS.THIRD_PARAGRAPH_LINE, 'Third Paragraph Line');
    }

    get boohooThirdParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_THIRD_PARAGRAPH_LINE, 'Boohoo Third Paragraph Line');
    }

    get fourthParagraphTitle (): Element {
      return new Element(SELECTORS.FOURTH_PARAGRAPH_TITLE, 'Fourth Paragraph Title');
    }

    get boohooFourthParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_FOURTH_PARAGRAPH_TITLE, 'Boohoo Fourth Paragraph Title');
    }

    get fourthParagraphLine (): Element {
      return new Element(SELECTORS.FOURTH_PARAGRAPH_LINE, 'Fourth Paragraph Line');
    }

    get boohooFourthParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_FOURTH_PARAGRAPH_LINE, 'Boohoo Fourth Paragraph Line');
    }

    get fifthParagraphTitle (): Element {
      return new Element(SELECTORS.FIFTH_PARAGRAPH_TITLE, 'Fifth Paragraph Title');
    }

    get boohooFifthParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_FIFTH_PARAGRAPH_TITLE, 'Boohoo Fifth Paragraph Title');
    }

    get fifthParagraphLine (): Element {
      return new Element(SELECTORS.FIFTH_PARAGRAPH_LINE, 'Fifth Paragraph Line');
    }

    get boohooFifthParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_FIFTH_PARAGRAPH_LINE, 'Boohoo Fifth Paragraph Line');
    }
  
    get sixthParagraphTitle (): Element {
      return new Element(SELECTORS.SIXTH_PARAGRAPH_TITLE, 'Sixth Paragraph Title');
    }

    get boohooSixthParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_SIXTH_PARAGRAPH_TITLE, 'Boohoo Sixth Paragraph Title');
    }

    get sixthParagraphLine (): Element {
      return new Element(SELECTORS.SIXTH_PARAGRAPH_LINE, 'Sixth Paragraph Line');
    }

    get boohooSixthParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_SIXTH_PARAGRAPH_LINE, 'Boohoo Sixth Paragraph Line');
    }

    get seventhParagraphTitle (): Element {
      return new Element(SELECTORS.SEVENTH_PARAGRAPH_TITLE, 'Seventh Paragraph Title');
    }

    get boohooSeventhParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_SEVENTH_PARAGRAPH_TITLE, 'Boohoo Seventh Paragraph Title');
    }

    get seventhParagraphLine (): Element {
      return new Element(SELECTORS.SEVENTH_PARAGRAPH_LINE, 'Seventh Paragraph Line');
    }

    get boohooSeventhParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_SEVENTH_PARAGRAPH_LINE, 'Boohoo Seventh Paragraph Line');
    }

    get eighthParagraphTitle (): Element {
      return new Element(SELECTORS.EIGHTH_PARAGRAPH_TITLE, 'Eighth Paragraph Title');
    }

    get boohooEighthParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_EIGHTH_PARAGRAPH_TITLE, 'Boohoo Eighth Paragraph Title');
    }

    get eighthParagraphLine (): Element {
      return new Element(SELECTORS.EIGHTH_PARAGRAPH_LINE, 'Eighth Paragraph Line');
    }

    get boohooEighthParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_EIGHTH_PARAGRAPH_LINE, 'Boohoo Eighth Paragraph Line');
    }

    get ninthParagraphTitle (): Element {
      return new Element(SELECTORS.NINTH_PARAGRAPH_TITLE, 'Ninth Paragraph Title');
    }

    get boohooNinthParagraphTitle (): Element {
      return new Element(SELECTORS.BOOHOO_NINTH_PARAGRAPH_TITLE, 'Boohoo Ninth Paragraph Title');
    }

    get ninthParagraphLine (): Element {
      return new Element(SELECTORS.NINTH_PARAGRAPH_LINE, 'Ninth Paragraph Line');
    }

    get boohooNinthParagraphLine (): Element {
      return new Element(SELECTORS.BOOHOO_NINTH_PARAGRAPH_LINE, 'Boohoo Ninth Paragraph Line');
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

    get thirteenthParagraphTitle (): Element {
      return new Element(SELECTORS.THIRTEENTHT_PARAGRAPH_TITLE, 'Thirteenth Paragraph Title');
    }

    get thirteenthParagraphLine (): Element {
      return new Element(SELECTORS.THIRTEENTHT_PARAGRAPH_LINE, 'Thirteenth Paragraph Line');
    }

    get fourteenthParagraphTitle (): Element {
      return new Element(SELECTORS.FOURTEENTH_PARAGRAPH_TITLE, 'Fourteenth Paragraph Title');
    }

    get fourteenthParagraphLine (): Element {
      return new Element(SELECTORS.FOURTEENTH_PARAGRAPH_LINE, 'Fourteenth Paragraph Line');
    }

    get fifteenthParagraphTitle (): Element {
      return new Element(SELECTORS.FIFTEENTH_PARAGRAPH_TITLE, 'Fifteenth Paragraph Title');
    }

    get fifteenthParagraphLine (): Element {
      return new Element(SELECTORS.FIFTEENTH_PARAGRAPH_LINE, 'Fifteenth Paragraph Line');
    }

    get sixteenthParagraphTitle (): Element {
      return new Element(SELECTORS.SIXTEENTH_PARAGRAPH_TITLE, 'Sixteenth Paragraph Title');
    }

    get sixteenthParagraphLine (): Element {
      return new Element(SELECTORS.SIXTEENTH_PARAGRAPH_LINE, 'Sixteenth Paragraph Line');
    }

    get seventeenthParagraphTitle (): Element {
      return new Element(SELECTORS.SEVENTEENTH_PARAGRAPH_TITLE, 'Seventeenth Paragraph Title');
    }

    get seventeenthParagraphLine (): Element {
      return new Element(SELECTORS.SEVENTEENTH_PARAGRAPH_LINE, 'Seventeenth Paragraph Line');
    }

    get eighteenthParagraphTitle (): Element {
      return new Element(SELECTORS.EIGHTEENTH_PARAGRAPH_TITLE, 'Eighteenth Paragraph Title');
    }

    get eighteenthParagraphLine (): Element {
      return new Element(SELECTORS.EIGHTEENTH_PARAGRAPH_LINE, 'Eighteenth Paragraph Line');
    }

    get nineteenthParagraphTitle (): Element {
      return new Element(SELECTORS.NINETEENTH_PARAGRAPH_TITLE, 'Nineteenth Paragraph Title');
    }

    get nineteenthParagraphLine (): Element {
      return new Element(SELECTORS.NINETEENTH_PARAGRAPH_LINE, 'Nineteenth Paragraph Line');
    }

    get boohooManContactEmail (): Element {
      return new Element(SELECTORS.BOOHOOMAN_CONTACT_EMAIL, 'BoohooMAN Contact Email');
    }

    get nastyGalContactEmail (): Element {
      return new Element(SELECTORS.NASTY_GAL_CONTACT_EMAIL, 'NastyGal Contact Email');
    }

    get coastContactEmail (): Element {
      return new Element(SELECTORS.COAST_CONTACT_EMAIL, 'Coast Contact Email');
    }

    get oasisContactEmail (): Element {
      return new Element(SELECTORS.OASIS_CONTACT_EMAIL, 'Oasis Contact Email');
    }

    get missPapContactEmail (): Element {
      return new Element(SELECTORS.MISS_PAP_CONTACT_EMAIL, 'MissPAP Contact Email');
    }

    get warehouseContactEmail (): Element {
      return new Element(SELECTORS.WAREHOUSE_CONTACT_EMAIL, 'Warehouse Contact Email');
    }

    get karenMillenContactEmail (): Element {
      return new Element(SELECTORS.KAREN_MILLEN_CONTACT_EMAIL, 'Karen Millen Contact Email');
    }

    get wallisContactEmail (): Element {
      return new Element(SELECTORS.WALLIS_CONTACT_EMAIL, 'Wallis Contact Email');
    }

    get dorothyPerkinsContactEmail (): Element {
      return new Element(SELECTORS.DOROTHY_PERKINS_CONTACT_EMAIL, 'Dorothy Perkins Contact Email');
    }

    get burtonContactEmail (): Element {
      return new Element(SELECTORS.BURTON_CONTACT_EMAIL, 'Burton Contact Email');
    }
  
}

export default TermsOfUseScreen;

