import { news } from '../../models/news';

describe('News', () => {
  it('should create an instance', () => {
    expect(new news()).toBeTruthy();
  });
});
