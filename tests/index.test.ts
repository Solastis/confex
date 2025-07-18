import { describe, it, expect } from 'vitest';
import { str, bool, num, enm } from '@/core/factories';
import { defineConfig } from '@/core/defineConfig';

describe('StringValidator', () => {
  it('returns default when input is undefined', () => {
    const v = str({ default: 'fallback' });
    expect(v.validate(undefined)).toBe('fallback');
  });

  it('throws if required and input is undefined', () => {
    const v = str();
    expect(() => v.validate(undefined)).toThrow();
  });

  it('validates allowed values with oneOf', () => {
    const v = str().oneOf(['a', 'b']);
    expect(v.validate('a')).toBe('a');
    expect(() => v.validate('x')).toThrow();
  });
});

describe('BooleanValidator', () => {
  it('parses boolean-like strings', () => {
    const v = bool();
    expect(v.validate('true')).toBe(true);
    expect(v.validate('0')).toBe(false);
  });
});

describe('NumberValidator', () => {
  it('parses numbers and enforces min/max', () => {
    const v = num({ min: 10, max: 20 });
    expect(v.validate(15)).toBe(15);
    expect(() => v.validate('5')).toThrow();
    expect(v.validate('20')).toBe(20);
    expect(() => v.validate('21')).toThrow();
  });

  it('validates number input', () => {
    const v = num();
    expect(v.validate('15')).toBe(15);
    expect(() => v.validate('abc')).toThrow();
  });
});

describe('defineConfig', () => {
  it('returns parsed config from environment', () => {
    process.env.PORT = '8080';
    process.env.DEBUG = 'true';

    const config = defineConfig({
      PORT: num(),
      DEBUG: bool(),
    });

    expect(config.PORT).toBe(8080);
    expect(config.DEBUG).toBe(true);
  });
});

describe('EnumValidator', () => {
  it('validates enum values', () => {
    const v = enm(['debug', 'info'] as const);
    expect(v.validate('info')).toBe('info');
    expect(() => v.validate('warn')).toThrow();
  });
});
