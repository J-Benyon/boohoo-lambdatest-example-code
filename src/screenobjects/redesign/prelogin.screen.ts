import Button from '../../elements/Button';
import { GroupBrands, TSelectorMap } from '../../helpers/Types';
import { iOSPredicate, UISelector } from '../../helpers/Utilities';
import Element from '../../elements/Element';

const SELECTORS: TSelectorMap = {
  LOGIN_BUTTON: {
    ANDROID: new UISelector().id('welcome_login_button'),
    IOS: new iOSPredicate('value == "LOG IN"')
  },
  REGISTER_BUTTON: {
    ANDROID: new UISelector().id('welcome_register_button'),
    IOS: new iOSPredicate('value == "CREATE ACCOUNT"')
  },
  SKIP_BUTTON: {
    ANDROID: new UISelector().id('welcome_guest_button'),
    IOS: new iOSPredicate('value CONTAINS "Skip"')
  },
  SPLASH_LOGO: {
    ANDROID: new UISelector().class('android.widget.ImageView').id('logo'),
    IOS: new iOSPredicate('...')
  },
  WELCOME_ASSET: {
    ANDROID: new UISelector().id('content_asset_image'),
    IOS: new iOSPredicate('...')
  },
};

class PreLoginScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get loginButton (): Button {
      return new Button(SELECTORS.LOGIN_BUTTON, 'Login Button');
    }

    get registerButton (): Button {
      return new Button(SELECTORS.REGISTER_BUTTON, 'Register Button');
    }

    get skipButton (): Button {
      return new Button(SELECTORS.SKIP_BUTTON, 'Skip Button');
    }

    get splashLogo (): Element {
      return new Element(SELECTORS.SPLASH_LOGO, 'Splash Logo');
    }

    get welcomeAsset (): Element {
      return new Element(SELECTORS.WELCOME_ASSET, 'Welcome Screen Banner');
    }
}

export default PreLoginScreen;
