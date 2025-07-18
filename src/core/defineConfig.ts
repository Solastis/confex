import { Validator } from './validation/Validator';

type Schema<T extends Record<string, unknown>> = {
  [K in keyof T]: Validator<T[K]>;
};

export function defineConfig<T extends Record<string, unknown>>(
  schema: Schema<T>,
): {
  [K in keyof T]: T[K];
} {
  const result = {} as { [K in keyof T]: T[K] };

  for (const key in schema) {
    const validator = schema[key];
    const raw = process.env[key];
    result[key] = validator.validate(raw) as T[typeof key];
  }

  return result;
}
