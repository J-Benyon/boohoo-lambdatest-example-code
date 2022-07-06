import Button from '../../../elements/Button';
import Element from '../../../elements/Element';
import Field from '../../../elements/Field';
import { GroupBrands, TSelectorMap, TSelectorOptions, TSelector } from '../../../helpers/Types';
import {iOSPredicate, UISelector, XPath } from '../../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  SEARCH_FIELD: {
    ANDROID:new UISelector().id('search_src_text'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_FIELD_BACK_BUTTON: {
    ANDROID:new XPath('//*[@content-desc="Collapse"]'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_SUGGESTIONS: {
    ANDROID:new XPath('//androidx.recyclerview.widget.RecyclerView/android.widget.TextView'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_RESULTS: {
    ANDROID: new UISelector().id('search_recycler'),
    IOS: new iOSPredicate('...')
  },
  SEARCH_SUGGESTION: {
    ANDROID: new UISelector().id('search_recycler').child(new UISelector().class('android.widget.TextView')),
    IOS: new iOSPredicate('...')
  },
  NEW_SEARCH_BUTTON: {
    ANDROID: new UISelector().id('zeroStateActionButton').text('NEW SEARCH'),
    IOS: new iOSPredicate('...')
  }
};

class SearchScreen {

    private brand: GroupBrands;

    constructor (brand: GroupBrands) {
      this.brand = brand;
    }

    get searchBackButton (): Element {
      return new Element(SELECTORS.SEARCH_FIELD_BACK_BUTTON, 'Search Back Button');
    }

    get searchResults (): Element {
      return new Element(SELECTORS.SEARCH_RESULTS, 'Search Results');
    }

    get firstSearchSuggestion (): Element {
      return new Button(SELECTORS.SEARCH_SUGGESTION, 'First Search Suggestions');
    }

    get searchTextField (): Field {
      return new Field(SELECTORS.SEARCH_FIELD, 'Search Field');
    }

    get newSearchButton (): Button {
      return new Button(SELECTORS.NEW_SEARCH_BUTTON, 'New Search Button');
    }

    async searchProduct (searchString: string): Promise<void>{
      await this.searchTextField.sendText(searchString, { scrollToElement: false, hideKeyboardAfter: true } );
      await this.searchTextField.iOSCarriageReturn(); // These android actions don't run on iOS, it just skips it and sends a warning to log.
    }

    async verifySearchSuggestionsContain (expectedString: string): Promise<void> {
      const selector: TSelectorOptions = SELECTORS.SEARCH_SUGGESTIONS;
      const platformSelector: TSelector = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      const suggestions = await $$(platformSelector.build());

      for await (const element of suggestions) {
        expect(await element.getText()).toContain(expectedString);
      }
        
    }
}

export default SearchScreen;
