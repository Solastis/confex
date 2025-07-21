/**
 * Shared types used across the confex library
 */

// Import the Validator class for type definitions
import type { Validator } from './validation/Validator';

/**
 * Base options for all validators
 */
export interface BaseValidatorOptions<T = unknown> {
  /**
   * Whether the field is optional (can be undefined)
   * @default false
   */
  optional?: boolean;
  /**
   * Default value to use when field is undefined and optional is true
   */
  default?: T;
}

/**
 * String validator specific options
 */
export interface StringValidatorOptions extends BaseValidatorOptions<string> {
  /**
   * Minimum length of the string
   */
  minLength?: number;
  /**
   * Maximum length of the string
   */
  maxLength?: number;
  /**
   * Regular expression pattern the string must match
   */
  pattern?: RegExp;
}

/**
 * Boolean validator specific options
 */
export interface BooleanValidatorOptions extends BaseValidatorOptions<boolean> {
  // Boolean validator currently has no specific options beyond base
}

/**
 * Number validator specific options
 */
export interface NumberValidatorOptions extends BaseValidatorOptions<number> {
  /**
   * Minimum allowed value (inclusive)
   */
  min?: number;
  /**
   * Maximum allowed value (inclusive)
   */
  max?: number;
  /**
   * Whether the number must be an integer
   * @default false
   */
  integer?: boolean;
}

/**
 * Enum validator options for string-based enums
 */
export interface EnumValidatorOptions<T extends readonly string[]> 
  extends BaseValidatorOptions<T[number]> {
  /**
   * Array of allowed enum values
   */
  allowedValues: T;
}

/**
 * Tuple validator options for fixed-length arrays
 */
export interface TupleValidatorOptions<T extends readonly unknown[]> 
  extends BaseValidatorOptions<T> {
  /**
   * Array of allowed tuple values
   */
  allowedValues: readonly T[];
}

/**
 * Schema type for configuration validation
 * Maps object keys to their corresponding validators
 */
export type ConfigurationSchema<T extends Record<string, unknown> = Record<string, unknown>> = {
  [K in keyof T]: Validator<T[K]>;
};

/**
 * More flexible schema type that accepts any validator
 */
export type FlexibleSchema = Record<string, Validator<any>>;

/**
 * Utility type to extract the validated type from a schema
 */
export type InferSchemaType<T extends ConfigurationSchema<any>> = {
  [K in keyof T]: T[K] extends Validator<infer U> ? U : never;
};

/**
 * Utility type for validator factory functions
 */
export type ValidatorFactory<T, O extends BaseValidatorOptions<T> = BaseValidatorOptions<T>> = 
  (options?: O) => Validator<T>;

/**
 * Type guard to check if a value is a valid validator options object
 */
export type ValidatorOptionsUnion = 
  | StringValidatorOptions
  | NumberValidatorOptions  
  | BooleanValidatorOptions
  | EnumValidatorOptions<readonly string[]>
  | TupleValidatorOptions<readonly unknown[]>;

/**
 * Re-export core validation types for convenience
 */
export type { ValidatorCloneProps } from './validation';
export { ValidationError } from './validation';
export type { Validator } from './validation';
