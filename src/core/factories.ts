import { StringValidator, BooleanValidator, NumberValidator, EnumValidator } from '../validators';
import type { StringOptions, BooleanOptions, NumberOptions, EnumOptions } from './types';

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
export const str = (opts: StringOptions = {}): StringValidator => {
  let validator = new StringValidator();
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default);
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
export const bool = (opts: BooleanOptions = {}): BooleanValidator => {
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
export const num = (opts: NumberOptions = {}): NumberValidator => {
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
export const enm = <T extends string>(
  values: T[],
  opts: EnumOptions<T> = {},
): EnumValidator<T> => {
  let validator = new EnumValidator(values);
  if (opts.optional) validator = validator.optional();
  if (opts.default !== undefined) validator = validator.default(opts.default);
  return validator;
};
