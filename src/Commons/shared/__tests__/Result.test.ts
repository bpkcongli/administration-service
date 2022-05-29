import Result from '../Result';

describe('Result class', () => {
  /**
   * Test Cases:
   * - Should have factory method ok() to create success Result object,
   *   it should have property with appropriate value
   * - Should have factory method fail() to create fail Result object,
   *   it should have property with appropriate value
   * - Should have method getValue()
   *   - When result is success, it should return a value
   *   - When result is fail, it should throw an error
   */
  class User {}
  const user = new User();
  const error = 'Failed to create User';

  it(`Should have factory method ok() to create success Result object, 
    it should have property with appropriate value`, () => {
    const result = Result.ok<User>();
    expect(result.isSuccess).toEqual(true);
    expect(result.isFailure).toEqual(false);
    expect(result.error).toEqual(null);
  });

  it(`Should have factory method fail() to create fail Result object,
    it should have property with appropriate value`, () => {
    const result = Result.fail<User>(error);
    expect(result.isSuccess).toEqual(false);
    expect(result.isFailure).toEqual(true);
    expect(result.error).toEqual(error);
  });

  describe('Should have method getValue()', () => {
    it('When result is success, it should return a value', () => {
      const result = Result.ok<User>(user);
      expect(result.getValue()).toStrictEqual(user);
    });

    it('When result is fail, it should throw an error', () => {
      const result = Result.fail<User>(error);
      expect(() => result.getValue())
          .toThrowError(`Can't retrieve the value from a failed result.`);
    });
  });
});
