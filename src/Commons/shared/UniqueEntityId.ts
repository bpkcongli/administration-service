import {v4 as uuidv4} from 'uuid';

export default class UniqueEntityId {
  private _uuid: string;

  constructor() {
    this._uuid = uuidv4();
  }

  toString(): string {
    return this._uuid;
  }

  equals(object: UniqueEntityId): boolean {
    return this._uuid === object._uuid;
  }
}
