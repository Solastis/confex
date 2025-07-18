import { Validator } from '@/core/validation';

export class EnumValidator<T> extends Validator<T> {
  public readonly allowedValues: T[];

  constructor(allowedValues: T[]) {
    super();
    this.allowedValues = allowedValues;
  }

  oneOf(values: T[]): this {
    return this.clone({ allowedValues: values });
  }

  protected clone(props: { allowedValues?: T[] } = {}): this {
    const Ctor = this.constructor as new (allowedValues: T[]) => this;
    const copy = new Ctor(props.allowedValues ?? this.allowedValues) as this;
    Object.assign(copy, this, props);
    return copy;
  }

  parse(value: unknown): T {
    if (!this.allowedValues.includes(value as T)) {
      throw new Error(
        `Value ${value} is not one of: ${this.allowedValues.join(', ')}`,
      );
    }
    return value as T;
  }
}
