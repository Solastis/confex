import { Validator, ValidationError } from '@/core/validation';

export class StringValidator extends Validator<string> {
  protected parse(value: string): string {
    if (typeof value !== 'string') {
      throw new ValidationError('value', 'string', value);
    }
    return value;
  }
}
