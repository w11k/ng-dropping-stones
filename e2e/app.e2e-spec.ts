import { TetrisPage } from './app.po';

describe('tetris App', function() {
  let page: TetrisPage;

  beforeEach(() => {
    page = new TetrisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
