import { TupleValidator } from '@/validators/TupleValidator';
import { StringValidator, BooleanValidator, NumberValidator, EnumValidator } from '../validators';
import type { 
  StringValidatorOptions, 
  BooleanValidatorOptions, 
  NumberValidatorOptions, 
  EnumValidatorOptions, 
  TupleValidatorOptions 
} from './types';

/**
 * Creates a string validator with optional configuration
 * @param opts - Configuration options for the string validator
 * @returns A configured StringValidator instance
 * @example
 * ```typescript
 * const name = str({ default: 'John', optional: true });
 * const required = str(); // Required string with no default
 * ```
 */
export const str = (opts: StringValidatorOptions = {}): StringValidator => {
  let validator = new StringValidator();
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default);
  if (opts.minLength !== undefined) validator = validator.minLength(opts.minLength);
  if (opts.maxLength !== undefined) validator = validator.maxLength(opts.maxLength);
  if (opts.pattern) validator = validator.pattern(opts.pattern);
  return validator;
};

/**
 * Creates a boolean validator with optional configuration
 * @param opts - Configuration options for the boolean validator
 * @returns A configured BooleanValidator instance
 * @example
 * ```typescript
 * const isEnabled = bool({ default: false });
 * const isRequired = bool(); // Required boolean
 * ```
 */
export const bool = (opts: BooleanValidatorOptions = {}): BooleanValidator => {
  let validator = new BooleanValidator();
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default);
  return validator;
};

/**
 * Creates a number validator with optional configuration
 * @param opts - Configuration options for the number validator
 * @returns A configured NumberValidator instance
 * @example
 * ```typescript
 * const port = num({ min: 1000, max: 9999, integer: true });
 * const percentage = num({ min: 0, max: 100, default: 0 });
 * ```
 */
export const num = (opts: NumberValidatorOptions = {}): NumberValidator => {
  let validator = new NumberValidator();
  if (opts.min !== undefined) validator = validator.min(opts.min);
  if (opts.max !== undefined) validator = validator.max(opts.max);
  if (opts.integer) validator = validator.integer();
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default);
  return validator;
};

/**
 * Creates an enum validator with optional configuration
 * @param values - Array of allowed string values
 * @param opts - Configuration options for the enum validator
 * @returns A configured EnumValidator instance
 * @example
 * ```typescript
 * const env = enm(['development', 'staging', 'production'], { default: 'development' });
 * const role = enm(['admin', 'user']); // Required enum
 * ```
 */
export const enm = <T extends readonly string[]>(
  values: T,
  opts: Partial<Omit<EnumValidatorOptions<T>, 'allowedValues'>> = {}
): EnumValidator<T[number]> => {
  let validator = new EnumValidator([...values]); // Convert readonly to mutable array
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default);
  return validator;
};

/**
 * Creates a tuple validator with optional configuration
 * @param values - Array of allowed tuple values
 * @param opts - Configuration options for the tuple validator
 * @returns A configured TupleValidator instance
 * @example
 * ```typescript
 * const tuple = tpl([[1, 'a'], [2, 'b']]);
 * const customTuple = tpl([[true, 42], [false, 0]], { default: [true, 42] });
 * ```
 */
export const tpl = <T extends any[]>(
  values: T[],
  opts: Partial<Pick<TupleValidatorOptions<readonly T[]>, 'optional' | 'default'>> = {}
): TupleValidator<T> => {
  let validator = new TupleValidator(values);
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default as T);
  return validator;
};
