import Permission from '../Permission';

describe('Permission entity', () => {
  /**
   * Test Cases:
   * - When instantiating with the required payload and appropriate
   *   field, should create a Permission object
   */
  it(`When instantiating with the required payload and appropriate field,
    should create a Permission object`, () => {
    const payload = {
      name: 'administration.users.add',
      description: 'Menambahkan user baru',
    };

    const permission = Permission.create(payload);
    expect(typeof permission.id).toEqual('string');
    expect(permission.name).toEqual(payload.name);
    expect(permission.description).toEqual(payload.description);
  });
});
