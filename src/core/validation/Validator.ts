import { ValidationError, ValidatorCloneProps } from './';

export abstract class Validator<T> {
  public readonly allowedValues?: T[];
  public readonly defaultValue?: T;
  public readonly required: boolean = true;

  protected abstract parse(value: string | number): T;

  protected getErrorMessage?(key: string | number): string;

  validate(input: string | number | undefined, key: string = ''): T {
    if (input === undefined) {
      if (!this.required && this.defaultValue !== undefined)
        return this.defaultValue;

      throw new ValidationError(key, this.describeExpected(), input);
    }

    const parsed = this.parse(input);

    if (this.allowedValues && !this.allowedValues.includes(parsed))
      throw new ValidationError(key, this.describeExpected(), input);

    return parsed;
  }

  private describeExpected(): string {
    return (
      this.allowedValues?.map((v) => `"${String(v)}"`).join(' | ') ??
      'valid value'
    );
  }

  oneOf(values: T[]): this {
    return this.clone({ allowedValues: values });
  }

  default(value: T): this {
    return this.clone({ defaultValue: value, required: false });
  }

  optional(): this {
    return this.clone({ required: false });
  }

  protected clone(props: ValidatorCloneProps<T>): this {
    const Ctor = this.constructor as new () => this;
    const copy = new Ctor();
    Object.assign(copy, this, props);
    return copy;
  }
}
