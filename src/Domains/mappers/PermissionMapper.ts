import UniqueEntityId from '../../Commons/shared/UniqueEntityId';
import Permission from '../entities/Permission';

export default class PermissionMapper {
  static toDomain(raw: any): Permission {
    const {id, name, description} = raw;
    const uuid = UniqueEntityId.create(id);
    return Permission.create({name, description}, uuid);
  }
}
