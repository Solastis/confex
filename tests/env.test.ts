import { bool, Confex, num, str } from '../src';
import dotenv from 'dotenv';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';

describe('Environment Config (.env.test)', () => {
  const ENV_PATH = '.env.test';
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
    if (!fs.existsSync(ENV_PATH)) {
      throw new Error(`Missing ${ENV_PATH} file for test`);
    }
    dotenv.config({ path: ENV_PATH });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('loads all variables from .env.test', () => {
    const envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    const keys = envContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split('=')[0]);
    for (const key of keys) {
      expect(process.env[key]).toBeDefined();
    }
  });

  it('parses environment variables using defineConfig', () => {
    const config = new Confex({
      NODE_ENV: str().default('test'),
      DEBUG: bool().default(false),
      PORT: num().default(0),
    })
      .validate()
      .get();
    expect(config.NODE_ENV).toBe('test');
    expect(config.DEBUG).toBe(true);
    expect(config.PORT).toBe(3000);
    expect(typeof config.NODE_ENV).toBe('string');
    expect(typeof config.DEBUG).toBe('boolean');
    expect(typeof config.PORT).toBe('number');
  });

  it('uses defaults if variables are missing', () => {
    delete process.env.NODE_ENV;
    delete process.env.DEBUG;
    delete process.env.PORT;
    const config = new Confex({
      NODE_ENV: str().default('fallback_env'),
      DEBUG: bool().default(false),
      PORT: num().default(1234),
    })
      .validate()
      .get();
    expect(config.NODE_ENV).toBe('fallback_env');
    expect(config.DEBUG).toBe(false);
    expect(config.PORT).toBe(1234);
  });

  it('throws if required variable is missing and no default', () => {
    delete process.env.NODE_ENV;
    expect(
      () =>
        new Confex({
          NODE_ENV: str(),
        }).validate(),
    ).toThrow();
  });
});
