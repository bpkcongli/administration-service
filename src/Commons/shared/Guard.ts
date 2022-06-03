interface IGuardArgument {
  argumentName: string;
  argument: any;
}

interface IGuardResult {
  succeed: boolean;
  message?: string;
}

type IGuardArgumentBulk = IGuardArgument[];

export default class Guard {
  static combine(results: IGuardResult[]): IGuardResult {
    for (const result of results) {
      if (!result.succeed) return result;
    }

    return {
      succeed: true,
    };
  }

  static againstNullOrUndefined(arg: IGuardArgument): IGuardResult {
    if (arg.argument === null || arg.argument === undefined) {
      return {
        succeed: false,
        message: `'${arg.argumentName}' is null or undefined`,
      };
    }

    return {
      succeed: true,
    };
  }

  static againstNullOrUndefinedBulk(args: IGuardArgumentBulk): IGuardResult {
    for (const arg of args) {
      const guardResult = this.againstNullOrUndefined(arg);
      if (!guardResult.succeed) return guardResult;
    }

    return {
      succeed: true,
    };
  }

  static isOneOf(
      value: any,
      validValues: any[],
      argumentName: string,
  ): IGuardResult {
    if (!validValues.includes(value)) {
      return {
        succeed: false,
        message: `'${argumentName}' isn't one of the correct types in ` +
          `${JSON.stringify(validValues)}. Got '${value}'`,
      };
    }

    return {
      succeed: true,
    };
  }

  static inRange(
      value: number,
      min: number,
      max: number,
      argumentName: string,
  ): IGuardResult {
    if (value < min || value > max) {
      return {
        succeed: false,
        message: `'${argumentName}' is not within range ${min} to ${max}. ` +
          `Got '${value}'`,
      };
    }

    return {
      succeed: true,
    };
  }

  static isMatchPattern(
      value: string,
      pattern: RegExp,
      argumentName: string,
  ): IGuardResult {
    if (!pattern.test(value)) {
      return {
        succeed: false,
        message: `'${argumentName}' is not fulfill the desired pattern. ` +
          `Got '${value}'`,
      };
    }

    return {
      succeed: true,
    };
  }
}
