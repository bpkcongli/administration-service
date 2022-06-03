import {AggregateRoot} from '../AggregateRoot';
import UniqueEntityId from '../UniqueEntityId';
import {Event} from '../Event';

describe('AggregateRoot abstract class', () => {
  /**
   * Test Cases:
   * - Should have getter to get aggregate id
   * - Should have mechanisms to adding an event into single aggregate
   *   - Should have method to adding a new event to domain events array
   *   - Should have getter to get all registered events on this aggregate
   *   - Should have method to clear all registered events
   */
  it('Should have getter to get aggregate id', () => {
    class UserRegistration extends AggregateRoot<any> {}
    const userRegistration = new UserRegistration({username: 'test'});
    expect(userRegistration).toHaveProperty('id');
    expect(Reflect.getPrototypeOf(userRegistration.id)?.constructor.name)
        .toEqual(UniqueEntityId.name);
  });

  describe('Should have mechanisms to handle event on single aggregate', () => {
    class UserRegistration extends AggregateRoot<any> {
      save() {
        this.addDomainEvent({} as unknown as Event);
      }
    }

    let userRegistration: UserRegistration;
    beforeEach(() => {
      userRegistration = new UserRegistration({username: 'test'});
    });

    it(`Should have method to adding a new event to domain
      events array`, () => {
      expect(() => userRegistration.save()).not.toThrowError();
    });

    it('Should have method to get all registered events on aggregate', () => {
      userRegistration.save();
      expect(userRegistration.domainEvents).toHaveLength(1);
    });

    it('Should have method to clear all registered events', () => {
      userRegistration.save();
      expect(userRegistration.domainEvents).toHaveLength(1);
      const clearedEvents = userRegistration.clearEvents();
      expect(userRegistration.domainEvents).toHaveLength(0);
      expect(clearedEvents).toStrictEqual([{}]);
    });
  });
});
