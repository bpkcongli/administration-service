export default class Result<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error: string | null;
  private _value?: T;

  private constructor(isSuccess: boolean, error: string | null, value?: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
  }

  static ok<U>(value?: U) {
    return new Result<U>(true, null, value);
  }

  static fail<U>(error: string) {
    return new Result<U>(false, error);
  }

  getValue(): T | undefined {
    if (!this.isSuccess) {
      throw new Error(`Can't retrieve the value from a failed result.`);
    }

    return this._value;
  }
}
