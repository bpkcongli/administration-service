import UnauthorizedError from '../UnauthorizedError';

describe('UnauthorizedError class', () => {
  /**
   * Test Cases:
   * - Should have proper name, status code, and message
   */
  it('Should have proper name, status code, and message', () => {
    const message = 'an error occured';
    const unauthorizedError = new UnauthorizedError(message);

    expect(unauthorizedError.name).toEqual('UnauthorizedError');
    expect(unauthorizedError.statusCode).toEqual(401);
    expect(unauthorizedError.message).toEqual(message);
  });
});
