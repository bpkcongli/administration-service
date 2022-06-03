import UniqueEntityId from './UniqueEntityId';

export interface Event {
  timestamp: Date;
  getAggregateId(): UniqueEntityId
}

export interface EventHandler {
  setupSubscription(): void;
}
