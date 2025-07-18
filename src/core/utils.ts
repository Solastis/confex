/**
 * Utility functions for common configuration patterns
 */

import { str, num, bool, enm } from './factories';
import type { StringValidator, NumberValidator, BooleanValidator, EnumValidator } from '../validators';

/**
 * Common environment validation patterns
 */
export const patterns = {
  /**
   * Standard port number validator (1-65535)
   */
  port: (defaultPort = 3000): NumberValidator => 
    num({ min: 1, max: 65535, integer: true, default: defaultPort }),

  /**
   * Database URL validator with common protocols
   */
  databaseUrl: (): StringValidator => str(),

  /**
   * Standard environment validator (development, staging, production)
   */
  nodeEnv: (defaultEnv: 'development' | 'staging' | 'production' = 'development') => 
    enm(['development', 'staging', 'production'] as const, { default: defaultEnv }),

  /**
   * Boolean flag that accepts common truthy/falsy values
   */
  flag: (defaultValue = false): BooleanValidator => 
    bool({ default: defaultValue }),

  /**
   * URL validator with basic format checking
   */
  url: (): StringValidator => str(),

  /**
   * Email validator with basic format checking
   */
  email: (): StringValidator => str(),

  /**
   * Comma-separated list that gets parsed into an array
   */
  csvList: (defaultValues: string[] = []): StringValidator => 
    str({ default: defaultValues.join(',') }),

  /**
   * Secret/token validator (required, no default for security)
   */
  secret: (): StringValidator => str(),

  /**
   * Timeout in milliseconds
   */
  timeout: (defaultMs = 5000): NumberValidator => 
    num({ min: 0, integer: true, default: defaultMs }),

  /**
   * Log level validator
   */
  logLevel: (defaultLevel: 'error' | 'warn' | 'info' | 'debug' = 'info') =>
    enm(['error', 'warn', 'info', 'debug'] as const, { default: defaultLevel }),
};

/**
 * Utility to create optional variants of validators
 */
export const optional = {
  /**
   * Make any validator optional
   */
  of: <T>(validator: { optional(): T }): T => validator.optional(),
};

/**
 * Common validation helpers
 */
export const helpers = {
  /**
   * Check if running in development mode
   */
  isDevelopment: (env = process.env.NODE_ENV): boolean => 
    env === 'development',

  /**
   * Check if running in production mode
   */
  isProduction: (env = process.env.NODE_ENV): boolean => 
    env === 'production',

  /**
   * Parse a comma-separated string into an array
   */
  parseCSV: (value: string): string[] => 
    value.split(',').map(s => s.trim()).filter(Boolean),

  /**
   * Ensure a URL has a protocol
   */
  ensureProtocol: (url: string, defaultProtocol = 'https'): string => {
    if (url.includes('://')) return url;
    return `${defaultProtocol}://${url}`;
  },
};
