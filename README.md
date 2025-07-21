# Confex

[![npm version](https://badge.fury.io/js/confex.svg)](https://badge.fury.io/js/confex)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Type-safe configuration validation library for Node.js and TypeScript development environments.**

Confex provides a simple, powerful, and type-safe way to validate environment variables and configuration in your TypeScript applications. Define schemas with validators, get full type safety, and catch configuration errors early.

## ✨ Features

- 🛡️ **Type-safe**: Full TypeScript support with automatic type inference
- 🔧 **Flexible API**: Multiple patterns from simple to advanced use cases
- 🎯 **Rich Validators**: Built-in validators for strings, numbers, booleans, and enums
- 📋 **Common Patterns**: Pre-built validators for ports, URLs, environments, etc.
- 🔗 **Fluent Builder**: Chain validators and configuration with ease
- 🚨 **Clear Errors**: Descriptive error messages for debugging
- 🌳 **Tree-shakable**: Import only what you need
- 📦 **Zero Dependencies**: Lightweight and focused

## 📦 Installation

```bash
npm install confex
# or
yarn add confex
# or
pnpm add confex
```

## 🚀 Quick Start

```typescript
import { Confex, str, num, bool, enm } from 'confex';

// Define your configuration schema
const config = new Confex({
  PORT: num({ default: 3000, min: 1000, max: 9999 }),
  DATABASE_URL: str(),
  DEBUG: bool({ default: false }),
  NODE_ENV: enm(['development', 'staging', 'production'], { default: 'development' })
}).validate().get();

// Use with full type safety
console.log(config.PORT);        // number
console.log(config.DATABASE_URL); // string
console.log(config.DEBUG);       // boolean
console.log(config.NODE_ENV);    // 'development' | 'staging' | 'production'
```

## 📖 API Reference

### Core Classes

#### `Confex<T>`

The main configuration validation class.

```typescript
const confex = new Confex(schema);
const config = confex.validate().get();
```

**Methods:**
- `validate()`: Validates all environment variables according to the schema
- `get()`: Returns the validated configuration object
- `getValue(key)`: Gets a single configuration value by key
- `isValidated()`: Checks if validation has been performed

### Validator Functions

#### `str(options?)`

Creates a string validator.

```typescript
const name = str();                           // Required string
const optional = str({ optional: true });     // Optional string
const withDefault = str({ default: 'hello' }); // String with default
```

**Options:**
- `optional?: boolean` - Makes the field optional
- `default?: string` - Default value if not provided

#### `num(options?)`

Creates a number validator.

```typescript
const port = num({ min: 1000, max: 9999, integer: true });
const percentage = num({ min: 0, max: 100, default: 50 });
```

**Options:**
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `integer?: boolean` - Must be an integer
- `optional?: boolean` - Makes the field optional
- `default?: number` - Default value if not provided

#### `bool(options?)`

Creates a boolean validator.

```typescript
const debug = bool({ default: false });
const required = bool(); // Required boolean
```

**Options:**
- `optional?: boolean` - Makes the field optional
- `default?: boolean` - Default value if not provided

#### `enm(values, options?)`

Creates an enum validator.

```typescript
const env = enm(['dev', 'staging', 'prod'], { default: 'dev' });
const logLevel = enm(['error', 'warn', 'info', 'debug']);
```

**Parameters:**
- `values: T[]` - Array of allowed values
- `options.optional?: boolean` - Makes the field optional
- `options.default?: T` - Default value if not provided

## 🏗️ Advanced Usage

### Builder Pattern

For complex configurations, use the fluent builder API:

```typescript
import { confex, str, num, bool } from 'confex-ts';

const config = confex()
  .field('API_KEY', str())
  .field('REDIS_PORT', num({ default: 6379 }))
  .field('ENABLE_LOGGING', bool({ default: true }))
  .withPrefix('APP_') // All fields will be prefixed with APP_
  .build()
  .validate()
  .get();
```

### Common Patterns

Use pre-built validators for common use cases:

```typescript
import { Confex, patterns } from 'confex-ts';

const config = new Confex({
  PORT: patterns.port(8080),              // Port number (1-65535)
  NODE_ENV: patterns.nodeEnv(),           // development/staging/production
  LOG_LEVEL: patterns.logLevel('info'),   // error/warn/info/debug
  DATABASE_URL: patterns.databaseUrl(),   // Database connection string
  API_TIMEOUT: patterns.timeout(5000),    // Timeout in milliseconds
  DEBUG_FLAG: patterns.flag(false),       // Boolean flag
  JWT_SECRET: patterns.secret(),          // Required secret (no default)
}).validate().get();
```

### Individual Value Access

Access configuration values individually:

```typescript
const confexInstance = new Confex({
  PORT: num({ default: 3000 }),
  APP_NAME: str({ default: 'MyApp' }),
}).validate();

console.log('Port:', confexInstance.getValue('PORT'));
console.log('App Name:', confexInstance.getValue('APP_NAME'));
console.log('Is validated:', confexInstance.isValidated());
```

## 🚨 Error Handling

Confex provides clear, actionable error messages:

```typescript
try {
  const config = new Confex({
    REQUIRED_VALUE: str(),
    PORT: num({ min: 1000, max: 9999 }),
  }).validate().get();
} catch (error) {
  console.error(error.message);
  // Output:
  // Validation failed for "REQUIRED_VALUE" (environment variable is required but not set).
  //   Expected: a defined value
  //   Received: undefined
}
```

## 🛠️ Utility Functions

### Helpers

```typescript
import { helpers } from 'confex-ts';

// Environment checks
const isDev = helpers.isDevelopment();     // Check if NODE_ENV === 'development'
const isProd = helpers.isProduction();     // Check if NODE_ENV === 'production'

// String parsing
const items = helpers.parseCSV('a,b,c');   // ['a', 'b', 'c']

// URL handling
const url = helpers.ensureProtocol('example.com'); // 'https://example.com'
```

### Optional Wrapper

Make any validator optional:

```typescript
import { optional, str, num } from 'confex-ts';

const config = new Confex({
  REQUIRED_FIELD: str(),
  OPTIONAL_FIELD: optional.of(str()),
  OPTIONAL_PORT: optional.of(num({ min: 1000 })),
}).validate().get();
```

## 📝 Examples

### Basic Web Server Configuration

```typescript
import { Confex, str, num, bool, enm } from 'confex-ts';

const serverConfig = new Confex({
  PORT: num({ default: 3000, min: 1000, max: 65535 }),
  HOST: str({ default: 'localhost' }),
  NODE_ENV: enm(['development', 'staging', 'production'], { default: 'development' }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  ENABLE_CORS: bool({ default: true }),
  LOG_LEVEL: enm(['error', 'warn', 'info', 'debug'], { default: 'info' }),
}).validate().get();

console.log(`Server starting on ${serverConfig.HOST}:${serverConfig.PORT}`);
```

### Microservice Configuration with Prefix

```typescript
import { confex, patterns, str } from 'confex-ts';

const microserviceConfig = confex()
  .field('PORT', patterns.port(8080))
  .field('SERVICE_NAME', str({ default: 'user-service' }))
  .field('LOG_LEVEL', patterns.logLevel())
  .field('HEALTH_CHECK_PATH', str({ default: '/health' }))
  .withPrefix('USER_SERVICE_')
  .build()
  .validate()
  .get();
```

### Database Configuration

```typescript
import { Confex, str, num, bool } from 'confex-ts';

const dbConfig = new Confex({
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: num({ default: 5432, min: 1, max: 65535 }),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_SSL: bool({ default: false }),
  DB_POOL_SIZE: num({ default: 10, min: 1, max: 100 }),
}).validate().get();
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [npm package](https://www.npmjs.com/package/confex-ts)
- [GitHub repository](https://github.com/Solastis/confex)
- [TypeScript documentation](https://www.typescriptlang.org/)
