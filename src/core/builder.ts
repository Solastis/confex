import { Confex } from './Confex';
import type { Schema } from './types';

/**
 * A builder pattern for creating and configuring Confex instances
 * Provides a fluent API for more complex configuration scenarios
 */
export class ConfexBuilder<T extends Record<string, unknown> = {}> {
  private schema: Schema<T> = {} as Schema<T>;
  private prefix?: string;
  private strict: boolean = true;

  /**
   * Add a field to the configuration schema
   * @param key - The environment variable key
   * @param validator - The validator for this field
   * @returns The builder instance for chaining
   */
  field<K extends string, V>(
    key: K,
    validator: import('./validation').Validator<V>
  ): ConfexBuilder<T & Record<K, V>> {
    (this.schema as any)[key] = validator;
    return this as any;
  }

  /**
   * Set a prefix for all environment variables
   * @param prefix - The prefix to prepend to all keys
   * @returns The builder instance for chaining
   * @example
   * ```typescript
   * const config = new ConfexBuilder()
   *   .prefix('APP_')
   *   .field('PORT', num({ default: 3000 }))
   *   .build(); // Will look for APP_PORT
   * ```
   */
  withPrefix(prefix: string): this {
    this.prefix = prefix;
    return this;
  }

  /**
   * Configure strict mode (default: true)
   * In strict mode, unknown environment variables will cause validation to fail
   * @param strict - Whether to enable strict mode
   * @returns The builder instance for chaining
   */
  strictMode(strict: boolean = true): this {
    this.strict = strict;
    return this;
  }

  /**
   * Build the final Confex instance
   * @returns A configured Confex instance
   */
  build(): Confex<T> {
    // If prefix is set, modify the schema to use prefixed keys
    if (this.prefix) {
      const prefixedSchema = {} as Schema<T>;
      for (const [key, validator] of Object.entries(this.schema)) {
        (prefixedSchema as any)[this.prefix + key] = validator;
      }
      return new Confex(prefixedSchema);
    }
    
    return new Confex(this.schema);
  }
}

/**
 * Factory function to create a new configuration builder
 * @returns A new ConfexBuilder instance
 * @example
 * ```typescript
 * const config = confex()
 *   .field('DATABASE_URL', str())
 *   .field('PORT', num({ default: 3000 }))
 *   .field('DEBUG', bool({ default: false }))
 *   .build()
 *   .validate()
 *   .get();
 * ```
 */
export const confex = () => new ConfexBuilder();
