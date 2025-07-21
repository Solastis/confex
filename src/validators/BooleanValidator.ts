import { Validator, ValidationError } from '@/core/validation';

export class BooleanValidator extends Validator<boolean> {
  protected parse(value: string | number): boolean {
    const stringValue = String(value).toLowerCase().trim();
    
    if (stringValue === 'true' || stringValue === '1') return true;
    if (stringValue === 'false' || stringValue === '0') return false;
    
    throw new ValidationError(
      'value', 
      'boolean ("true", "false", "1", or "0")', 
      value
    );
  }
}
