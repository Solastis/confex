import type { Schema } from './types';

/**
 * Main configuration validation class
 * 
 * Confex provides type-safe environment variable validation with a fluent API.
 * Define a schema using validators, then validate and access your configuration.
 * 
 * @template T - The shape of the configuration object
 * 
 * @example
 * ```typescript
 * const config = new Confex({
 *   PORT: num({ default: 3000 }),
 *   DATABASE_URL: str(),
 *   DEBUG: bool({ default: false })
 * }).validate().get();
 * 
 * console.log(config.PORT); // number
 * console.log(config.DATABASE_URL); // string
 * console.log(config.DEBUG); // boolean
 * ```
 */
export class Confex<T extends Record<string, unknown>> {
  private validated = false;
  private config: { [K in keyof T]: T[K] } | null = null;

  /**
   * Create a new Confex instance with the given schema
   * @param schema - Object mapping environment variable names to validators
   */
  constructor(private schema: Schema<T>) {}

  /**
   * Validate all environment variables according to the schema
   * 
   * This method reads process.env and validates each value according to
   * the corresponding validator in the schema. Must be called before get().
   * 
   * @returns This instance for method chaining
   * @throws {ValidationError} If any environment variable fails validation
   */
  validate(): this {
    const result = {} as { [K in keyof T]: T[K] };

    for (const key in this.schema) {
      const validator = this.schema[key];
      const raw = process.env[key];
      result[key] = validator.validate(raw, key) as T[typeof key];
    }

    this.config = result;
    this.validated = true;
    return this;
  }

  /**
   * Get the validated configuration object
   * 
   * @returns The validated and typed configuration object
   * @throws {Error} If validate() has not been called yet
   */
  get(): {
    [K in keyof T]: T[K];
  } {
    if (!this.validated || !this.config) {
      throw new Error(
        'Configuration must be validated before calling get(). Call validate() first.',
      );
    }
    return this.config;
  }

  /**
   * Get a single configuration value by key
   * 
   * @param key - The configuration key to retrieve
   * @returns The typed value for the given key
   * @throws {Error} If validate() has not been called yet
   */
  getValue<K extends keyof T>(key: K): T[K] {
    const config = this.get();
    return config[key];
  }

  /**
   * Check if the configuration has been validated
   * @returns True if validate() has been called successfully
   */
  isValidated(): boolean {
    return this.validated;
  }
}
