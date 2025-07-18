# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-07-18

### Added
- **Builder Pattern API**: New `confex()` builder for fluent configuration setup
- **Common Patterns**: Pre-built validators (`patterns.port()`, `patterns.nodeEnv()`, etc.)
- **Enhanced Type System**: Centralized type definitions in `src/core/types.ts`
- **Utility Functions**: Helper functions for common validation scenarios
- **Individual Value Access**: `getValue(key)` method for accessing single configuration values
- **Better Error Messages**: Enhanced `ValidationError` with context and formatting
- **Comprehensive Documentation**: Full JSDoc comments with examples
- **Advanced Examples**: Multiple usage patterns and real-world scenarios

### Enhanced
- **Barrel Exports**: Complete barrel export system for clean imports
- **Factory Functions**: Improved type safety and documentation
- **Core Classes**: Better API with additional methods (`isValidated()`, `getValue()`)
- **Test Coverage**: Fixed test suite and added comprehensive examples

### Changed
- **Package Keywords**: Updated for better discoverability
- **README**: Complete rewrite with comprehensive documentation and examples
- **Project Structure**: Improved organization with better separation of concerns

### Developer Experience
- **Type Safety**: Full TypeScript support with automatic type inference
- **IDE Support**: Better autocompletion and inline documentation
- **Error Handling**: More descriptive error messages with context
- **Flexible API**: Multiple patterns from simple to advanced use cases

## [1.1.2] - Previous

### Features
- Basic configuration validation
- String, number, boolean, and enum validators
- Default values and optional fields
- Type-safe configuration objects
