import {AggregateRoot} from './AggregateRoot';
import {Event} from './Event';
import UniqueEntityId from './UniqueEntityId';

type EventHandler = (event: Event) => any;

export default class EventManager {
  private static _markedAggregates: AggregateRoot<any>[] = [];
  private static _handlersMap: Record<string, EventHandler[]> = {};

  static markAggregateForDispatch(aggregate: AggregateRoot<any>) {
    const aggregateFound = !!this._findMarkedAggregateById(aggregate.id);
    if (!aggregateFound) {
      this._markedAggregates.push(aggregate);
    }
  }

  static register(eventName: string, handler: EventHandler) {
    const registeredEventName = Object.keys(this._handlersMap);
    if (!registeredEventName.includes(eventName)) {
      this._handlersMap[eventName] = [];
    }

    this._handlersMap[eventName].push(handler);
  }

  static dispatchEventsFromSpecificAggregate(id: UniqueEntityId) {
    const aggregate = this._findMarkedAggregateById(id);
    if (aggregate) {
      this._dispatch(aggregate);
      aggregate.clearEvents();
      this._removeMarkedAggregateById(id);
    }
  }

  private static _findMarkedAggregateById(id: UniqueEntityId) {
    const targetAggregate = this._markedAggregates.find((markedAggregate) => {
      return markedAggregate.id.equals(id);
    });

    return targetAggregate;
  }

  private static _removeMarkedAggregateById(id: UniqueEntityId) {
    this._markedAggregates = this._markedAggregates
        .filter((aggregate) => !aggregate.id.equals(id));
  }

  private static _dispatch(aggregate: AggregateRoot<any>) {
    aggregate.domainEvents.forEach((event) => {
      const eventName = event.constructor.name;
      if (eventName) {
        this._handlersMap[eventName].forEach((handler) => {
          handler(event);
        });
      }
    });
  }
}
