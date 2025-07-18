/**
 * Shared types used across the confex library
 */

// Import the Validator class for type definitions
import type { Validator } from './validation/Validator';

export interface BaseValidatorOptions {
  optional?: boolean;
}

export interface StringOptions extends BaseValidatorOptions {
  default?: string;
}

export interface BooleanOptions extends BaseValidatorOptions {
  default?: boolean;
}

export interface NumberOptions extends BaseValidatorOptions {
  min?: number;
  max?: number;
  integer?: boolean;
  default?: number;
}

export interface EnumOptions<T extends string> extends BaseValidatorOptions {
  default?: T;
}

/**
 * Schema type for configuration validation
 */
export type Schema<T extends Record<string, unknown>> = {
  [K in keyof T]: Validator<T[K]>;
};

/**
 * Re-export core validation types for convenience
 */
export type { ValidatorCloneProps } from './validation';
export { ValidationError } from './validation';
export type { Validator } from './validation';
