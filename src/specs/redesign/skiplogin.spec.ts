import { LARGE_WAIT } from '../../constants';
import PreLoginScreen from '../../screenobjects/redesign/prelogin.screen';
import NavigationBar from '../../screenobjects/redesign/components/navigationbar.screen';

const describeHeader = driver.config['header'];
const brand = driver.config['brand'];
const preLoginScreen = new PreLoginScreen(brand);
const navigationBar = new NavigationBar(brand);

describe(describeHeader, () => {
  it('should be able to skip the login via the start up page', async function () {
    await preLoginScreen.skipButton.click({ timeout: LARGE_WAIT });
    await navigationBar.navigationBar.waitForExistance();
  });
});
