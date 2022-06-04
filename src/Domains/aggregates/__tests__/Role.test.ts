import Permission from '../../entities/Permission';
import Role from '../Role';

describe('Role aggregate', () => {
  /**
   * Test Cases:
   * - When instantiating with the required payload and appropriate
   *   field, should create a Role object
   */
  const permissionProps = [
    {name: 'permission-a', description: 'Permission A'},
    {name: 'permission-b', description: 'Permission B'},
  ];

  const permissions = permissionProps.map((prop) => {
    return Permission.create(prop);
  });

  it(`When instantiating with the required payload and appropriate field,
    should create a Role object`, () => {
    const payload = {
      name: 'Role A',
      description: 'Role for test',
      permissions,
    };

    const role = Role.create(payload);
    expect(typeof role.id.toString()).toEqual('string');
    expect(role.name).toEqual('Role A');
    expect(role.description).toEqual('Role for test');
    expect(role.permissions).toHaveLength(permissions.length);

    role.permissions.forEach((permission: Permission, i: number) => {
      expect(permission.equals(permissions[i])).toEqual(true);
    });
  });
});
