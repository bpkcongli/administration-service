import Permission from '../../entities/Permission';
import PermissionMapper from '../PermissionMapper';

describe('PermissionMapper class', () => {
  /**
   * Test Cases:
   * - Should have mechanism to mapping raw result from persistence database
   *   into domain-like object
   */
  it(`Should have mechanism to mapping raw result from persistence database
    into domain-like object`, () => {
    const rawResult = {
      id: 'abc123',
      name: 'administration.users.add',
      description: 'Menambahkan user baru',
    };
    const permission: Permission = PermissionMapper.toDomain(rawResult);
    expect(permission.constructor.name).toEqual(Permission.name);
    expect(permission.id).toEqual(rawResult.id);
    expect(permission.name).toEqual(rawResult.name);
    expect(permission.description).toEqual(rawResult.description);
  });
});
