import { Validator, ValidationError, ValidatorCloneProps } from '@/core/validation';

export class StringValidator extends Validator<string> {
  public readonly minLengthValue?: number;
  public readonly maxLengthValue?: number;
  public readonly regexPattern?: RegExp;

  protected parse(value: string | number): string {
    const str = String(value);

    if (this.minLengthValue != null && str.length < this.minLengthValue) {
      throw new ValidationError('value', `length >= ${this.minLengthValue}`, value);
    }

    if (this.maxLengthValue != null && str.length > this.maxLengthValue) {
      throw new ValidationError('value', `length <= ${this.maxLengthValue}`, value);
    }

    if (this.regexPattern && !this.regexPattern.test(str)) {
      throw new ValidationError('value', `matches ${this.regexPattern}`, value);
    }

    return str;
  }

  minLength(value: number): this {
    return this.clone({ minLengthValue: value });
  }

  maxLength(value: number): this {
    return this.clone({ maxLengthValue: value });
  }

  pattern(value: RegExp): this {
    return this.clone({ regexPattern: value });
  }

  protected clone(
    props: ValidatorCloneProps<string> & {
      minLengthValue?: number;
      maxLengthValue?: number;
      regexPattern?: RegExp;
    } = {},
  ): this {
    const Ctor = this.constructor as new () => this;
    const copy = new Ctor() as this;
    Object.assign(copy, this, props);
    return copy;
  }
  
}
