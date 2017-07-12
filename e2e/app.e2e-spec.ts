import { HacPage } from './app.po';

describe('hac playground App', () => {
  let page: HacPage;

  beforeEach(() => {
    page = new HacPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Handy Angular Components playground');
  });
});
