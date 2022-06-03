import Guard from '../Guard';

describe('Guard class', () => {
  /**
   * Test Cases:
   * - Should have static method againstNullOrUndefined()
   *   - When test value is null or undefined
   *   - When test value is not null or not undefined
   * - Should have static method againstNullOrUndefinedBulk()
   *   - When list of test values contains null or undefined
   *   - When list of test values does not contain null or undefined
   * - Should have static method isOneOf()
   *   - When test value is not included in valid value
   *   - When test value is included in valid value
   * - Should have static method inRange()
   *   - When test value is not fall into permitted range
   *   - When test value is fall into permitted range
   * - Should have static method isMatchPattern()
   *   - When test value is not match with the desired pattern
   *   - When test value is match with the desired pattern
   * - Should have static method combine()
   *   - When there is unsucceed guard result
   *   - When there is not unsucceed guard result
   */
  describe('Should have static method againstNullOrUndefined()', () => {
    it('When test value is null or undefined', () => {
      const guardResult = Guard.againstNullOrUndefined({
        argumentName: 'username',
        argument: null,
      });
      expect(guardResult).toStrictEqual({
        succeed: false,
        message: `'username' is null or undefined`,
      });
    });

    it('When test value is not null or not undefined', () => {
      const guardResult = Guard.againstNullOrUndefined({
        argumentName: 'username',
        argument: 'username1',
      });
      expect(guardResult).toStrictEqual({
        succeed: true,
      });
    });
  });

  describe('Should have static method againstNullOrUndefinedBulk()', () => {
    const guardProps: {argument: any, argumentName: string}[] = [
      {argument: 'username1', argumentName: 'username'},
      {argument: 'supersecret', argumentName: 'password'},
      {argument: 'Andrian', argumentName: 'fullname'},
    ];
    const argumentName = 'email';

    it('When list of test values contains null or undefined', () => {
      const props = guardProps.concat({argument: undefined, argumentName});
      const guardResult = Guard.againstNullOrUndefinedBulk(props);
      expect(guardResult).toStrictEqual({
        succeed: false,
        message: `'${argumentName}' is null or undefined`,
      });
    });

    it('When list of test values does not contain null or undefined', () => {
      const props = guardProps.concat({
        argument: 'andrian8367@gmail.com',
        argumentName,
      });
      const guardResult = Guard.againstNullOrUndefinedBulk(props);
      expect(guardResult).toStrictEqual({
        succeed: true,
      });
    });
  });

  describe('Should have static method isOneOf()', () => {
    const validValues = ['small', 'medium', 'large'];
    const argumentName = 'size';

    it('When test value is not included in valid value', () => {
      const value = 'x-large';
      const guardResult = Guard.isOneOf(value, validValues, argumentName);
      expect(guardResult).toStrictEqual({
        succeed: false,
        message: `'${argumentName}' isn't one of the correct types in ` +
          `${JSON.stringify(validValues)}. Got '${value}'`,
      });
    });

    it('When test value is included in valid value', () => {
      const value = 'large';
      const guardResult = Guard.isOneOf(value, validValues, argumentName);
      expect(guardResult).toStrictEqual({
        succeed: true,
      });
    });
  });

  describe('Should have static method inRange()', () => {
    const min = 25000;
    const max = 1000000;
    const argumentName = 'savingAccount';

    it('When test value is not fall into permitted range', () => {
      const value = 1050000;
      const guardResult = Guard.inRange(value, min, max, argumentName);
      expect(guardResult).toStrictEqual({
        succeed: false,
        message: `'${argumentName}' is not within range ${min} to ${max}. ` +
          `Got '${value}'`,
      });
    });

    it('When test value is fall into permitted range', () => {
      const value = 500000;
      const guardResult = Guard.inRange(value, min, max, argumentName);
      expect(guardResult).toStrictEqual({
        succeed: true,
      });
    });
  });

  describe('Should have static method isMatchPattern()', () => {
    const pattern = /^https?:\/\//;
    const argumentName = 'website';

    it('When test value is not match with the desired pattern', () => {
      const value = 'not a website';
      const guardResult = Guard.isMatchPattern(value, pattern, argumentName);
      expect(guardResult).toStrictEqual({
        succeed: false,
        message: `'${argumentName}' is not fulfill the desired pattern. ` +
          `Got '${value}'`,
      });
    });

    it('When test value is match with the desired pattern', () => {
      const value = 'https://www.youtube.com';
      const guardResult = Guard.isMatchPattern(value, pattern, argumentName);
      expect(guardResult).toStrictEqual({
        succeed: true,
      });
    });
  });

  describe('Should have static method combine()', () => {
    const pattern = /^https?:\/\//;
    const email = 'andrian8367@gmail.com';
    const badWebsite = 'not a website';
    const goodWebsite = 'https://www.youtube.com';

    it('When there is unsucceed guard result', () => {
      const guardResultEmail = Guard
          .againstNullOrUndefined({argument: email, argumentName: 'email'});
      const guardResultWebsite = Guard
          .isMatchPattern(badWebsite, pattern, 'website');
      const guardResult = Guard.combine([guardResultEmail, guardResultWebsite]);
      expect(guardResult.succeed).toEqual(false);
    });

    it('When there is not unsucceed guard result', () => {
      const guardResultEmail = Guard
          .againstNullOrUndefined({argument: email, argumentName: 'email'});
      const guardResultWebsite = Guard
          .isMatchPattern(goodWebsite, pattern, 'website');
      const guardResult = Guard.combine([guardResultEmail, guardResultWebsite]);
      expect(guardResult.succeed).toEqual(true);
    });
  });
});
