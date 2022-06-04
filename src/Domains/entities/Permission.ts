import {Entity} from '../../Commons/shared/Entity';
import UniqueEntityId from '../../Commons/shared/UniqueEntityId';

interface PermissionProps {
  name: string;
  description: string;
}

export default class Permission extends Entity<PermissionProps> {
  private _name: string;
  private _description: string;

  private constructor(props: PermissionProps, id?: UniqueEntityId) {
    super(props, id);

    const {name, description} = this._props;
    this._name = name;
    this._description = description;
  }

  static create(props: PermissionProps, id?: UniqueEntityId) {
    return new Permission(props, id);
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }
}
