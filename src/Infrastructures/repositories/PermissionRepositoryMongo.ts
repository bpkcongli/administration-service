import Permission from '../../Domains/entities/Permission';
import PermissionRepository from
  '../../Domains/repositories/PermissionRepository';
import PermissionModel from '../database/mongodb/models/PermissionModel';
import PermissionMapper from '../../Domains/mappers/PermissionMapper';

export default class PermissionRepositoryMongo implements PermissionRepository {
  async getAll(): Promise<Permission[]> {
    const permissionsRes = await PermissionModel.find();
    return permissionsRes.map((permissionRes) => {
      return PermissionMapper.toDomain(permissionRes.toJSON());
    });
  }

  async getSpecificById(id: string): Promise<Permission> {
    const permissionRes = await PermissionModel.findOne({id});
    return PermissionMapper.toDomain(permissionRes.toJSON());
  }
}
