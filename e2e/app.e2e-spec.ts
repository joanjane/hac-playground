import { HacPage } from './app.po';

describe('hac playground App', () => {
  let page: HacPage;

  beforeEach(() => {
    page = new HacPage();
  });

  it('should display languages', () => {
    page.navigateTo();
    expect(page.getFirstLanguage()).toEqual('en');
  });
});
