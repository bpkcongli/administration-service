import {Entity} from '../Entity';
import UniqueEntityId from '../UniqueEntityId';

describe('Entity abstract class', () => {
  /**
   * Test Cases:
   * - Should have equals() method
   *   - When two object have same value except their id, it must be not equal
   *   - When two object have same value and same id, it must be equal
   *   - When two object is refer to single-same entity object, it must be equal
   *   - When an object is compare with undefined, it must be not equal
   */
  interface UserProps {
    username: string;
  }

  class User extends Entity<UserProps> {}

  describe('Should have equals() method', () => {
    it(`When two object have same value except their id, it must be
      not equal`, () => {
      const user1 = new User({username: 'user1'});
      const user2 = new User({username: 'user2'});
      expect(user1.equals(user2)).toEqual(false);
    });

    it('When two object have same value and same id, it must be equal', () => {
      const uuid = UniqueEntityId.create();
      const user1 = new User({username: 'user1'}, uuid);
      const user2 = new User({username: 'user2'}, uuid);
      expect(user1.equals(user2)).toEqual(true);
    });

    it(`When two object is refer to single-same entity object,
      it must be equal`, () => {
      const user1 = new User({username: 'user1'});
      const user2 = user1;
      expect(user1.equals(user2)).toEqual(true);
    });

    it(`When an object is compare with undefined, it must be not equal`, () => {
      const user1 = new User({username: 'user1'});
      expect(user1.equals()).toEqual(false);
    });
  });
});
