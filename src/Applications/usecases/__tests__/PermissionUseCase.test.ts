import PermissionUseCase from '../PermissionUseCase';
import PermissionRepository from
  '../../../Domains/repositories/PermissionRepository';
import Permission from '../../../Domains/entities/Permission';

describe('PermissionUseCase', () => {
  /**
   * Test Cases:
   * - Should have method getAllPermissions() and should orchestrating
   *   get all permissions functionality correctly
   */
  it(`Should have method getAllPermissions and should orchestrating
    get all permissions functionality correctly`, async () => {
    const payload = {
      name: 'administration.users.add',
      description: 'Menambahkan user baru',
    };

    const permissionRepository = {
      getAll: jest.fn().mockImplementation(() => Promise.resolve(
          [Permission.create(payload)],
      )),
    };

    const permissionUseCase = new PermissionUseCase(
      permissionRepository as unknown as PermissionRepository,
    );

    expect(permissionUseCase).toHaveProperty('getAllPermissions');
    const permissions = await permissionUseCase.getAllPermissions();
    expect(permissionRepository.getAll).toBeCalledTimes(1);
    expect(permissions).toHaveLength(1);
  });
});
