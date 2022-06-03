import EventManager from '../EventManager';
import {AggregateRoot} from '../AggregateRoot';
import {Event} from '../Event';
import UniqueEntityId from '../UniqueEntityId';

describe('EventManager class', () => {
  /**
   * Test Cases:
   * - Should have mechanism to store aggregates that need to dispatch their
   *   events, registering event handler, and dispatch event
   */
  class UserCreated implements Event {
    timestamp: Date;
    private _userRegistration: UserRegistration;

    constructor(userRegistration: UserRegistration) {
      this.timestamp = new Date();
      this._userRegistration = userRegistration;
    }

    getAggregateId(): UniqueEntityId {
      return this._userRegistration.id;
    }
  }

  class UserRegistration extends AggregateRoot<any> {
    save() {
      this.addDomainEvent(new UserCreated(this));
    }
  }

  it(`Should have mechanism to store aggregates that need to dispatch their
    events, registering event handler, and dispatch event`, () => {
    const userRegistration = new UserRegistration({username: 'test'});
    userRegistration.save();
    EventManager.markAggregateForDispatch(userRegistration);

    const mockHandler = jest.fn();
    EventManager.register('UserCreated', mockHandler);
    EventManager.dispatchEventsFromSpecificAggregate(userRegistration.id);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(userRegistration.domainEvents).toHaveLength(0);
  });
});
