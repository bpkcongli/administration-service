import {ValueObject} from '../ValueObject';

describe('ValueObject abstract class', () => {
  /**
   * Test Cases:
   * - Should have equals() method
   *   - When two object have same value, it must be equal
   *   - When two object doesn't have same value, it must be not equal
   *   - When two object is refer to single-same value object, it must be equal
   *   - When an object is compare with undefined, it must be not equal
   */
  interface UsernameProps {
    value: string;
  }

  class Username extends ValueObject<UsernameProps> {}

  describe('Should have equals() method', () => {
    it('When two object have same value, it must be equal', () => {
      const username1 = new Username({value: 'username1'});
      const username2 = new Username({value: 'username1'});
      expect(username1.equals(username2)).toEqual(true);
    });

    it(`When two object doesn't have same value, it must be not equal`, () => {
      const username1 = new Username({value: 'username1'});
      const username2 = new Username({value: 'username2'});
      expect(username1.equals(username2)).toEqual(false);
    });

    it(`When two object is refer to single-same value object,
      it must be equal`, () => {
      const username1 = new Username({value: 'username1'});
      const username2 = username1;
      expect(username1.equals(username2)).toEqual(true);
    });

    it('When an object is compare with undefined, it must be not equal', () => {
      const username1 = new Username({value: 'username1'});
      expect(username1.equals()).toEqual(false);
    });
  });
});
