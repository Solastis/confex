import { Validator, ValidationError } from '@/core/validation';

export class TupleValidator<T extends any[]> extends Validator<T> {
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
        // Try to parse JSON if it's a string representation of an array
        let parsedValue: unknown = value;
        if (typeof value === 'string') {
            try {
                parsedValue = JSON.parse(value);
            } catch {
                // If JSON parsing fails, use the original value
                parsedValue = value;
            }
        }

        if (!this.allowedValues.some((allowedValue) => JSON.stringify(allowedValue) === JSON.stringify(parsedValue))) {
            throw new ValidationError(
                'value', 
                `one of: ${this.allowedValues.map(v => JSON.stringify(v)).join(', ')}`,
                value
            );
        }
        return parsedValue as T;
    }
}