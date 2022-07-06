import { TUserObject, defaults, TPaymentCard, GroupBrands } from '../../helpers/Types';
import { LARGE_WAIT, MEDIUM_WAIT, VERY_LARGE_WAIT, SMALL_WAIT } from '../../constants';
import LoginScreen from '../../screenobjects/redesign/login.screen';
import PreLoginScreen from '../../screenobjects/redesign/prelogin.screen';
import HomeScreen from '../../screenobjects/redesign/home.screen';
import NavigationBar from '../../screenobjects/redesign/components/navigationbar.screen';
import RegisterScreen from '../../screenobjects/redesign/register.screen';
import ShopScreen from '../../screenobjects/redesign/shop.screen';
import ProductListDoubleColScreen from '../../screenobjects/redesign/productlistdoublecolumn.screen';
import ProductScreen from '../../screenobjects/redesign/product.screen';
import CartScreen from '../../screenobjects/redesign/cart.screen';
import CheckoutScreen from '../../screenobjects/redesign/checkout.screen';
import PremierScreen from '../../screenobjects/redesign/premier.screen';
import PaypalScreen from '../../screenobjects/redesign/paypal/paypal.screen';
import LaybuyScreen from '../../screenobjects/redesign/laybuy/laybuy.screen';

class CommonSteps {

    brand: GroupBrands
    LoginScreen: LoginScreen;
    PreLoginScreen: PreLoginScreen;
    HomeScreen: HomeScreen;
    NavigationBar: NavigationBar;
    RegisterScreen: RegisterScreen;
    ShopScreen: ShopScreen;
    ProductListDoubleColScreen: ProductListDoubleColScreen;
    ProductScreen: ProductScreen;
    CartScreen: CartScreen;
    CheckoutScreen: CheckoutScreen;
    PremierScreen: PremierScreen;
    PaypalScreen: PaypalScreen;
    LaybuyScreen: LaybuyScreen;

    constructor (brand: GroupBrands) {
      this.brand = brand;
      this.PreLoginScreen = new PreLoginScreen(brand);
      this.LoginScreen = new LoginScreen(brand);
      this.HomeScreen = new HomeScreen(brand);
      this.NavigationBar = new NavigationBar(brand);
      this.RegisterScreen = new RegisterScreen(brand);
      this.ShopScreen = new ShopScreen(brand);
      this.ProductListDoubleColScreen = new ProductListDoubleColScreen(brand);
      this.ProductScreen = new ProductScreen(brand);
      this.CartScreen = new CartScreen(brand);
      this.CheckoutScreen = new CheckoutScreen(brand);
      this.PremierScreen = new PremierScreen(brand);
      this.PaypalScreen = new PaypalScreen(brand);
      this.LaybuyScreen = new LaybuyScreen(brand);
    }

    async splashPageSignIn (email: string, password: string): Promise<void> {
      await this.PreLoginScreen.loginButton.click(defaults.appLoadWait);
      await this.LoginScreen.emailField.sendText(email);
      await this.LoginScreen.passwordField.click({ iosOnly: true }); // Secure text boxes need to be clicked before text can be entered. 
      await this.LoginScreen.passwordField.sendText(password, { textValidation: true });
      await this.LoginScreen.loginButton.click();
      await this.HomeScreen.popUpContinue.click({ iosOnly: true });
      await this.HomeScreen.iOSNativeAllow.click({ iosOnly: true });
      await this.NavigationBar.navigationBar.waitForExistance({ timeout: LARGE_WAIT });
    }
    
    async splashPageRegister (randomUser: TUserObject): Promise<void> {
      await this.PreLoginScreen.registerButton.click(defaults.appLoadWait);
      await this.RegisterScreen.firstNameField.sendText(randomUser.firstName);
      await this.RegisterScreen.lastNameField.sendText(randomUser.lastName);
      await this.RegisterScreen.dateOfBirthDropdown.click();
      await this.RegisterScreen.dateOfBirthConfirmButton.click({ androidOnly: true });
      await this.RegisterScreen.emailField.sendText(randomUser.email, { hideKeyboardAfter: true });
      await this.RegisterScreen.confirmEmailField.click();
      await this.RegisterScreen.confirmEmailField.sendText(randomUser.email, { hideKeyboardAfter: true });
      await this.RegisterScreen.passwordField.sendText('Password10');
      await this.RegisterScreen.passwordDoneButton.click({ iosOnly: true });
      await this.RegisterScreen.createAccountButton.click({ timeout: MEDIUM_WAIT });
      await this.HomeScreen.popUpContinue.click({ iosOnly: true });
      await this.HomeScreen.iOSNativeAllow.click({ iosOnly: true });
      await this.NavigationBar.navigationBar.waitForExistance();
    }

    // We want to go grab a product from the listings instead if we're doing a production run, this should be refined ASAP.
    async addProductToBag (sku: string, size = ''): Promise<void> {
      if (process.env.PRODUCTION) {
        await this.prodProductToBag();
      } else {
        await this.uatProductToBag(sku, size);
      }
    }

    async paypalPayment (): Promise<void> {
      await this.PaypalScreen.acceptAllCookies.click({ ignoreFailures: true });
      await this.PaypalScreen.emailLoginField.sendText('test.user@boohoo.com');
      await this.PaypalScreen.nextButton.click();
      await this.PaypalScreen.passwordField.sendText('boohoo123', { scrollToElement: false });
      await this.PaypalScreen.loginButton.click();
      await this.PaypalScreen.firstCardOption.waitForExistance();
      await this.PaypalScreen.acceptAllCookies.click({ ignoreFailures: true, timeout: 5000 });
      await this.PaypalScreen.payNowButton.click();
    }

    async proceedToPaymentByCard (paymentCard: TPaymentCard): Promise<void> {
      if (paymentCard.cardNumber === '' || paymentCard.cardNumber == null) {
        throw Error('Test customer does not have card details on their setup.');
      } 
      await this.CheckoutScreen.proceeedToPaymentButton.click();
      await this.CheckoutScreen.selectCardPaymentButtonREDESIGN.click();
      await this.CheckoutScreen.fillCardDetails(paymentCard);

      // TODO click element above to remove focus from field.
      await this.CheckoutScreen.payNowButton.click();
    }

    async laybuyPayment (): Promise<void> {
      await this.LaybuyScreen.partialScreenHomeText.waitForExistance();
      await this.LaybuyScreen.acceptButton.click({ timeout: SMALL_WAIT, ignoreFailures: true });
      await this.LaybuyScreen.loginLink.click();
      await this.LaybuyScreen.emailField.sendText('euboohoo+uklaybuy@gmail.com');
      await this.LaybuyScreen.passwordField.sendText('Boohoo!23');
      await this.LaybuyScreen.loginButton.click();
      await this.LaybuyScreen.laybuyTopBarLeftIcon.waitForExistance();
      await this.LaybuyScreen.buyNowButton.click();
    }

    private async prodProductToBag (): Promise<void> {
      await this.NavigationBar.shopButton.click();
      await this.ShopScreen.topListItem.waitForExistance();
      await this.ShopScreen.saleListItem.click();
      await this.ShopScreen.allSaleListItem.click();
      await this.ProductListDoubleColScreen.doubleColumnViewButton.click();
      await this.ProductListDoubleColScreen.firstProduct.click();
      await this.ProductScreen.colourSwatches.waitForExistance();
      await this.ProductScreen.addToBagButton.click();
      await this.ProductScreen.iterateColours();
      await this.ProductScreen.iterateSizes();
      await this.ProductScreen.confirmAddToBagButton.click();
      await this.ProductScreen.backButton.click();
      await this.NavigationBar.cartButton.click({ pause: 10 * 1000 }); // Adding 10 second wait just to let API's get it's stuff in order.
      await this.CartScreen.cartCheckoutButton.click();   
      await this.CheckoutScreen.breadcrumbsBanner.waitForExistance({ scrollToElement: false, timeout: VERY_LARGE_WAIT});
      await driver.pause(3000); // This wait is temporarily here until we fix the delivery options 'popping in' problem.
    }

    private async uatProductToBag (sku: string, size = ''): Promise<void> {
      await this.NavigationBar.shopButton.click();
      await this.ShopScreen.topListItem.waitForExistance();
      await this.ShopScreen.searchIcon.click({ scrollToElement: false });
      await this.ShopScreen.searchProduct(sku);
      await this.ProductListDoubleColScreen.doubleColumnViewButton.click();
      await this.ProductListDoubleColScreen.firstProduct.click();
      await this.ProductScreen.colourSwatches.waitForExistance();

      let isConfirmAddToBagVisible: string;
      let times = 0;
      do {
        await this.ProductScreen.addToBagButton.click();
        isConfirmAddToBagVisible = await this.ProductScreen.confirmAddToBagButton.isVisible();
        times++;
        if (times == 5) {
          throw Error('AddToBagMenu failed unexpectedly: confirmAddToBagButton is not visible');
        }
      } while (isConfirmAddToBagVisible != 'visible');

      const productSizeButtonBasedOnSizeLabel = await this.ProductScreen.getSizeButtonByLabel(size);
      await productSizeButtonBasedOnSizeLabel.click({ pause: 2000 });
      await this.ProductScreen.confirmAddToBagButton.click();
      await this.ProductScreen.backButton.click();
      await this.NavigationBar.cartButton.click({ pause: 10 * 1000 }); // Adding 10 second wait just to let API's get it's stuff in order.
      await this.CartScreen.cartCheckoutButton.click();   
      await this.CheckoutScreen.breadcrumbsBanner.waitForExistance({ scrollToElement: false, timeout: VERY_LARGE_WAIT});
      // await driver.pause(3000); // This wait is temporarily here until we fix the delivery options 'popping in' problem.
      const isEditAddrVisible = await this.CheckoutScreen.editAddressButton.checkIfDisplayed({pause: LARGE_WAIT});
      if (isEditAddrVisible) {
        await this.CheckoutScreen.deliveryFreeWithPremierButton.waitForExistance();
      }
    }
}

export default CommonSteps;
