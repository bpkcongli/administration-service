import Permission from '../../Domains/entities/Permission';
import PermissionRepository
  from '../../Domains/repositories/PermissionRepository';

export default class PermissionUseCase {
  private _repository: PermissionRepository;

  constructor(repository: PermissionRepository) {
    this._repository = repository;
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this._repository.getAll();
  }
}
