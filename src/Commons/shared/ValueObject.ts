import {shallowEqual} from 'shallow-equal-object';

export abstract class ValueObject<T> {
  protected readonly _props: T;

  constructor(props: T) {
    this._props = props;
  }

  equals(object?: ValueObject<T>): boolean {
    if (object === undefined) {
      return false;
    }

    return shallowEqual(this._props, object._props);
  }
}
