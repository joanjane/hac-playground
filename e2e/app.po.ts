import { browser, by, element } from 'protractor';

export class HacPage {
  navigateTo() {
    return browser.get('/');
  }

  getFirstLanguage() {
    return element(by.css('app-root .hp-langselector-button')).getText();
  }
}
