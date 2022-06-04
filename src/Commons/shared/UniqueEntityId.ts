import {v4 as uuidv4} from 'uuid';

export default class UniqueEntityId {
  private _uuid: string;

  private constructor(id?: string) {
    this._uuid = id ? id : uuidv4();
  }

  static create(id?: string) {
    return new UniqueEntityId(id);
  }

  toString(): string {
    return this._uuid;
  }

  equals(object: UniqueEntityId): boolean {
    return this._uuid === object._uuid;
  }
}
