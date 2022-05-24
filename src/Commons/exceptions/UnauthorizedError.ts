import ClientError from '../contracts/ClientError';

export default class UnauthorizedError extends Error implements ClientError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}
