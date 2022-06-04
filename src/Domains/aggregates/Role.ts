import {AggregateRoot} from '../../Commons/shared/AggregateRoot';
import Permission from '../entities/Permission';

interface RoleProps {
  name: string;
  description: string;
  permissions: Permission[];
}

export default class Role extends AggregateRoot<RoleProps> {
  private _name: string;
  private _description: string;
  private _permissions: Permission[];

  private constructor(props: RoleProps) {
    super(props);
    this._name = this._props.name;
    this._description = this._props.description;
    this._permissions = this._props.permissions;
  }

  static create(props: RoleProps) {
    return new Role(props);
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }
}
