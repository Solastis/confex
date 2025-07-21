import { Validator, ValidationError } from '@/core/validation';

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

  protected parse(value: string | number): T {
    // Convert value to string for comparison since enums are typically strings
    const stringValue = String(value);
    
    if (!this.allowedValues.some(allowedValue => String(allowedValue) === stringValue)) {
      throw new ValidationError(
        'value',
        `one of: ${this.allowedValues.map(v => `"${String(v)}"`).join(', ')}`,
        value
      );
    }
    
    // Return the matching allowed value to maintain type consistency
    const matchedValue = this.allowedValues.find(allowedValue => String(allowedValue) === stringValue);
    return matchedValue!;
  }
}
