import utilities from '../../utilities';

import replacePending from './replacepending';

const { fakeServices, nonZeroDigitToString } = utilities;

describe('#replacePending state handler helper', () => {
  describe('passing ComputedState with undefined pendingOperation', () => {
    it('returns expected ComputedState', () => {
      pending();
    });
  });

  describe('passing ComputedState with defined pendingOperation', () => {
    it('returns expected ComputedState', () => {
      pending();
    });
  });
});
