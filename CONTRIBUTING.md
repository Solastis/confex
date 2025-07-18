# Contributing to Confex

We welcome contributions to Confex! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Solastis/confex.git
   cd confex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write your code
   - Add tests for new functionality
   - Update documentation if needed

3. **Run the test suite:**
   ```bash
   npm test
   npm run lint
   npm run format
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style

We use ESLint and Prettier for code formatting. Run `npm run format` before committing.

## Submitting Issues

When submitting an issue, please include:

- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- TypeScript version and environment details

## Pull Request Guidelines

- Include tests for any new functionality
- Update documentation for API changes
- Follow the existing code style
- Write clear commit messages
- Keep pull requests focused on a single feature/fix

## Testing

- Write unit tests for new validators
- Add integration tests for complex features
- Ensure all tests pass before submitting

## Documentation

- Update the README.md for new features
- Add JSDoc comments for public APIs
- Include usage examples

Thank you for contributing to Confex! 🎉
