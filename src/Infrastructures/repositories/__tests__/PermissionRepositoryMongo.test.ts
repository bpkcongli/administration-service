import {createConnection} from '../../database/mongodb/createConnection';
import UniqueEntityId from '../../../Commons/shared/UniqueEntityId';
import PermissionModel from '../../database/mongodb/models/PermissionModel';
import Permission from '../../../Domains/entities/Permission';
import PermissionRepositoryMongo from '../PermissionRepositoryMongo';

describe('PermissionRepositoryMongo implementation', () => {
  /**
   * Test Cases:
   * - Should have method getAll() and should successfully get all permissions
   *   that are stored on the database
   * - Should have method getSpecificById() and should successfully get single
   *   permission by id that is stored on the database
   */
  const payload: {name: string, description: string, id?: string} = {
    name: 'administration.users.add',
    description: 'Menambahkan user baru',
  };
  createConnection();

  beforeEach(async () => {
    const uuid = UniqueEntityId.create();
    payload.id = uuid.toString();
    const model = new PermissionModel({
      id: uuid.toString(),
      ...payload,
    });
    await model.save();
  });

  it(`Should have method getAll() and should successfully get all permissions
    that are stored on the database`, async () => {
    const permissionRepository = new PermissionRepositoryMongo();
    const permissions: Permission[] = await permissionRepository.getAll();
    expect(permissions).toHaveLength(1);

    const [permission] = permissions;
    expect(permission.id).toEqual(payload.id);
    expect(permission.name).toEqual(payload.name);
    expect(permission.description).toEqual(payload.description);
  });

  it(`Should have method getSpecificById() and should successfully get single
    permission by id that is stored on the database`, async () => {
    const permissionRepository = new PermissionRepositoryMongo();
    const permission: Permission = await permissionRepository
        .getSpecificById(payload.id as string);
    expect(permission.id).toEqual(payload.id?.toString());
    expect(permission.name).toEqual(payload.name);
    expect(permission.description).toEqual(payload.description);
  });

  afterEach(async () => {
    await PermissionModel.deleteMany();
  });
});
