import { ArtZoomerPage } from './app.po';

describe('real-trends App', () => {
  let page: ArtZoomerPage;

  beforeEach(() => {
    page = new ArtZoomerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
