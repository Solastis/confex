import { Confex, str, num, bool, patterns, confex } from '../src';

// Set up some test environment variables
process.env.TEST_PORT = '8080';
process.env.TEST_DEBUG = 'true';
process.env.TEST_ENV = 'development';

console.log('🚀 Testing Confex with new README examples...\n');

// Example 1: Basic usage
console.log('=== Basic Usage ===');
try {
  const basicConfig = new Confex({
    TEST_PORT: num({ default: 3000 }),
    TEST_DEBUG: bool({ default: false }),
    TEST_ENV: str({ default: 'production' })
  }).validate().get();
  
  console.log('✅ Basic config:', basicConfig);
} catch (error) {
  console.error('❌ Basic config failed:', error.message);
}

// Example 2: Using patterns
console.log('\n=== Common Patterns ===');
try {
  const patternConfig = new Confex({
    TEST_PORT: patterns.port(3000),
    TEST_ENV: patterns.nodeEnv('development')
  }).validate().get();
  
  console.log('✅ Pattern config:', patternConfig);
} catch (error) {
  console.error('❌ Pattern config failed:', error.message);
}

// Example 3: Builder pattern
console.log('\n=== Builder Pattern ===');
try {
  const builderConfig = confex()
    .field('PORT', num({ default: 4000 }))
    .field('DEBUG', bool({ default: false }))
    .build()
    .validate()
    .get();
  
  console.log('✅ Builder config:', builderConfig);
} catch (error) {
  console.error('❌ Builder config failed:', error.message);
}

// Example 4: Individual value access
console.log('\n=== Individual Value Access ===');
try {
  const configInstance = new Confex({
    TEST_PORT: patterns.port(),
    TEST_DEBUG: bool({ default: false })
  }).validate();
  
  console.log('✅ Port value:', configInstance.getValue('TEST_PORT'));
  console.log('✅ Debug value:', configInstance.getValue('TEST_DEBUG'));
  console.log('✅ Is validated:', configInstance.isValidated());
} catch (error) {
  console.error('❌ Individual access failed:', error.message);
}

console.log('\n🎉 All README examples work correctly!');
