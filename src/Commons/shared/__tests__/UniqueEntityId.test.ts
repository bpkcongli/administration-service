import UniqueEntityId from '../UniqueEntityId';

describe('UniqueEntityId class', () => {
  /**
   * Test Cases:
   * - Should successfully create UniqueEntityId object, it should have
   *   toString() method and should return a valid uuid
   * - Should successfully create UniqueEntityId object with an existing id
   * - Should have equals() method to check equality with another object
   */
  it(`Should successfully create UniqueEntityId object, it should have 
    toString() method and should return a valid uuid`, () => {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    const uuid = UniqueEntityId.create();
    expect(uuid).toHaveProperty('toString');
    expect(typeof uuid.toString()).toEqual('string');
    expect(uuidPattern.test(uuid.toString())).toEqual(true);
  });

  it(`Should successfully create UniqueEntityId object with
    an existing id`, () => {
    const id = 'abc123';
    const uuid = UniqueEntityId.create(id);
    expect(uuid.toString()).toEqual(id);
  });

  it(`Should have equals() method to check equality with 
    another object`, () => {
    const uuid1 = UniqueEntityId.create();
    const uuid2 = UniqueEntityId.create();
    expect(uuid1.equals(uuid2)).toEqual(false);

    const uuid3 = UniqueEntityId.create();
    const uuid4 = uuid3;
    expect(uuid3.equals(uuid4)).toEqual(true);
  });
});
