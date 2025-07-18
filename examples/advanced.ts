import { Confex, str, num, bool, enm, confex, patterns } from '../src';

/**
 * Example 1: Traditional approach with direct instantiation
 */
console.log('=== Traditional Approach ===');
const traditionalConfig = new Confex({
  DATABASE_URL: str(),
  PORT: num({ default: 3000, min: 1000, max: 9999 }),
  DEBUG: bool({ default: false }),
  NODE_ENV: enm(['development', 'production'], { default: 'development' }),
}).validate().get();

console.log('Traditional config:', traditionalConfig);

/**
 * Example 2: Builder pattern for complex configurations
 */
console.log('\n=== Builder Pattern ===');
const builderConfig = confex()
  .field('API_KEY', str())
  .field('REDIS_PORT', num({ default: 6379 }))
  .field('ENABLE_LOGGING', bool({ default: true }))
  .withPrefix('APP_')
  .build()
  .validate()
  .get();

console.log('Builder config:', builderConfig);

/**
 * Example 3: Using common patterns
 */
console.log('\n=== Common Patterns ===');
const patternConfig = new Confex({
  PORT: patterns.port(8080),
  NODE_ENV: patterns.nodeEnv('development'),
  LOG_LEVEL: patterns.logLevel('info'),
  DATABASE_URL: patterns.databaseUrl(),
  API_TIMEOUT: patterns.timeout(10000),
}).validate().get();

console.log('Pattern config:', patternConfig);

/**
 * Example 4: Error handling and validation
 */
console.log('\n=== Error Handling ===');
try {
  const invalidConfig = new Confex({
    REQUIRED_VALUE: str(), // This will fail if not set
    INVALID_NUMBER: num({ min: 100 }), // This might fail validation
  }).validate().get();
} catch (error) {
  console.log('Validation error caught:', error.message);
}

/**
 * Example 5: Individual value access
 */
console.log('\n=== Individual Value Access ===');
const configInstance = new Confex({
  APP_NAME: str({ default: 'MyApp' }),
  VERSION: str({ default: '1.0.0' }),
}).validate();

console.log('App name:', configInstance.getValue('APP_NAME'));
console.log('Version:', configInstance.getValue('VERSION'));
console.log('Is validated:', configInstance.isValidated());
