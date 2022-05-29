import UniqueEntityId from './UniqueEntityId';

export abstract class Entity<T> {
  protected readonly _props: T;
  protected readonly _id: UniqueEntityId;

  constructor(props: T, id?: UniqueEntityId) {
    this._props = props;
    this._id = id ? id : new UniqueEntityId();
  }

  equals(object?: Entity<T>) {
    if (object === undefined) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
