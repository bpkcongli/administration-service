import Permission from '../entities/Permission';

interface PermissionRepository {
  getAll(): Promise<Permission[]>;
  getSpecificById(id: string): Promise<Permission>;
}

export default PermissionRepository;
