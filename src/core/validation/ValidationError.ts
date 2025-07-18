export class ValidationError extends Error {
  constructor(
    public readonly key: string | number,
    public readonly expected: string,
    public readonly actual: string | number | undefined,
    public readonly context?: string,
  ) {
    const formattedKey = key ? `"${key}"` : 'value';
    const formattedActual = actual === undefined ? 'undefined' : `"${actual}"`;
    const contextPart = context ? ` (${context})` : '';
    
    super(
      `Validation failed for ${formattedKey}${contextPart}.\n` +
      `  Expected: ${expected}\n` +
      `  Received: ${formattedActual}`
    );
    
    this.name = 'ValidationError';
  }

  /**
   * Creates a ValidationError for missing required environment variables
   */
  static missingRequired(key: string): ValidationError {
    return new ValidationError(
      key,
      'a defined value',
      undefined,
      'environment variable is required but not set'
    );
  }

  /**
   * Creates a ValidationError for type mismatches
   */
  static typeMismatch(key: string, expectedType: string, actual: any): ValidationError {
    return new ValidationError(
      key,
      expectedType,
      actual,
      'type validation failed'
    );
  }

  /**
   * Creates a ValidationError for range/constraint violations
   */
  static constraintViolation(key: string, constraint: string, actual: any): ValidationError {
    return new ValidationError(
      key,
      constraint,
      actual,
      'constraint validation failed'
    );
  }
}
