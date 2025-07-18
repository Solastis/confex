import { Validator, ValidationError } from '@/core/validation';

export class BooleanValidator extends Validator<boolean> {
  protected parse(value: string): boolean {
    const normalized = value.toLowerCase().trim();
    if (normalized === 'true' || normalized === '1') return true;
    if (normalized === 'false' || normalized === '0') return false;
    throw new ValidationError('value', '"true", "false", "1", or "0"', value);
  }
}
