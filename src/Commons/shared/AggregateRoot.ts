import {Entity} from './Entity';
import {Event} from './Event';
import UniqueEntityId from './UniqueEntityId';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: Event[] = [];

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): Event[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: Event) {
    this._domainEvents.push(event);
  }

  clearEvents(): Event[] {
    return this._domainEvents.splice(0, this._domainEvents.length);
  }
}
