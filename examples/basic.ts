import { str, bool, num, enm, Confex } from '../src';

/**
 * Example: Defining and validating a configuration schema.
 *
 * This schema describes the following config options:
 * - name: string, optional, defaults to "John"
 * - age: number, optional, must be between 18 and 100
 * - isAdmin: boolean, optional, defaults to false
 * - role: enum ("admin" | "user"), optional, defaults to "user"
 *
 * Values are loaded from environment variables. If a variable is not set,
 * the default value is used (if provided). All values are validated according
 * to their type and constraints. The resulting config object is returned.
 */
const config = new Confex({
  name: str().default('John'),
  age: num().min(18).max(100),
  isAdmin: bool().default(false),
  role: enm(['admin', 'user']).default('user'),
})
  .validate()
  .get();

console.log(config);
