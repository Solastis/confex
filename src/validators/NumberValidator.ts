import {
  Validator,
  ValidationError,
  ValidatorCloneProps,
} from '@/core/validation';

export class NumberValidator extends Validator<number> {
  public readonly minValue?: number;
  public readonly maxValue?: number;
  public readonly mustBeInteger: boolean = false;

  protected parse(value: string | number): number {
    const num = Number(value);
    if (isNaN(num)) throw new ValidationError('value', 'number', value);

    if (this.mustBeInteger && !Number.isInteger(num)) {
      throw new ValidationError('value', 'integer', value);
    }

    if (this.minValue != null && num < this.minValue) {
      throw new ValidationError('value', `>= ${this.minValue}`, value);
    }

    if (this.maxValue != null && num > this.maxValue) {
      throw new ValidationError('value', `<= ${this.maxValue}`, value);
    }

    return num;
  }

  min(value: number): this {
    return this.clone({ minValue: value });
  }

  max(value: number): this {
    return this.clone({ maxValue: value });
  }

  integer(): this {
    return this.clone({ mustBeInteger: true });
  }

  protected clone(
    props: ValidatorCloneProps<number> & {
      minValue?: number;
      maxValue?: number;
      mustBeInteger?: boolean;
    },
  ): this {
    const Ctor = this.constructor as new (...allowedValues: number[]) => this;
    const copy = new Ctor() as this;
    Object.assign(copy, this, props);
    return copy;
  }
}
