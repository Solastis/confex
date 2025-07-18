export class ValidationError extends Error {
  constructor(
    public readonly key: string | number,
    public readonly expected: string,
    public readonly actual: string | number | undefined,
  ) {
    super(`Invalid value for "${key}". Expected: ${expected}, got: ${actual}`);
    this.name = 'ValidationError';
  }
}
