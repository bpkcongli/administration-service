import Permission from '../Permission';

describe('Permission entity', () => {
  /**
   * Test Cases:
   * - Should throw an error when instantiating without payload
   * - Should throw an error when instantiating with the required payload
   *   but mandatory field is missing
   * - Should throw an error when the required payload have a field
   *   but the data type is not match with the schema
   * - When instantiating with the required payload and appropriate
   *   field, should create a Permission object
   */

  it('Should throw an error when instantiating without payload', () => {
    expect(() => new Permission(null)).toThrowError('PERMISSION.NO_PAYLOAD');
  });

  it(`Should throw an error when instantiating with the required payload but
    mandatory field is missing`, () => {
    const payload = {
      id: 'permission-278190f92da1',
      name: 'administration.users.add',
    };

    expect(() => new Permission(payload))
        .toThrowError('PERMISSION.NOT_CONTAIN_MANDATORY_FIELD');
  });

  it(`Should throw an error when the required payload have a field but
    the data type is not match with the schema`, () => {
    const payload = {
      id: 'permission-278190f92da1',
      name: 'administration.users.add',
      description: true,
    };

    expect(() => new Permission(payload))
        .toThrowError('PERMISSION.DATA_TYPE_NOT_MATCH');
  });

  it(`When instantiating with the required payload and appropriate field,
    should create a Permission object`, () => {
    const payload = {
      id: 'permission-278190f92da1',
      name: 'administration.users.add',
      description: 'Menambahkan user baru',
    };

    const permission = new Permission(payload);
    expect(permission.id).toEqual(payload.id);
    expect(permission.name).toEqual(payload.name);
    expect(permission.description).toEqual(payload.description);
  });
});
