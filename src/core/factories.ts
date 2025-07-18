import { StringValidator } from '@/validators/StringValidator';
import { BooleanValidator } from '@/validators/BooleanValidator';
import { NumberValidator } from '@/validators/NumberValidator';
import { EnumValidator } from '@/validators/EnumValidator';

export type StringOptions = { optional?: boolean; default?: string };
export type BooleanOptions = { optional?: boolean; default?: boolean };
export type NumberOptions = {
  min?: number;
  max?: number;
  integer?: boolean;
  optional?: boolean;
  default?: number;
};
export type EnumOptions<T extends string> = { optional?: boolean; default?: T };

export const str = (opts: StringOptions = {}) => {
  let v = new StringValidator();
  if (opts.optional) v = v.optional();
  if (opts.default !== undefined) v = v.default(opts.default);
  return v;
};

export const bool = (opts: BooleanOptions = {}) => {
  let v = new BooleanValidator();
  if (opts.optional) v = v.optional();
  if (opts.default !== undefined) v = v.default(opts.default);
  return v;
};

export const num = (opts: NumberOptions = {}) => {
  let v = new NumberValidator();
  if (opts.min !== undefined) v = v.min(opts.min);
  if (opts.max !== undefined) v = v.max(opts.max);
  if (opts.integer) v = v.integer();
  if (opts.optional) v = v.optional();
  if (opts.default !== undefined) v = v.default(opts.default);
  return v;
};

export const enm = <T extends string>(
  values: T[],
  opts: EnumOptions<T> = {},
) => {
  let v = new EnumValidator(values);
  if (opts.optional) v = v.optional();
  if (opts.default !== undefined) v = v.default(opts.default);
  return v;
};
