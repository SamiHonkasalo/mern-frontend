/* eslint-disable no-restricted-syntax */
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

interface ReturnString {
  type: string;
}

interface ReturnStrings {
  type: string;
  val: string;
}

interface ReturnStringNum {
  type: string;
  val: number;
}

export interface CustomValidator {
  type: string;
  val?: string | number;
}

export const VALIDATOR_REQUIRE = (): ReturnString => ({
  type: VALIDATOR_TYPE_REQUIRE,
});
export const VALIDATOR_FILE = (): ReturnString => ({
  type: VALIDATOR_TYPE_FILE,
});
export const VALIDATOR_MINLENGTH = (val: 5): ReturnStringNum => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val,
});
export const VALIDATOR_MAXLENGTH = (val: 5): ReturnStringNum => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val,
});
export const VALIDATOR_MIN = (val: number): ReturnStringNum => ({
  type: VALIDATOR_TYPE_MIN,
  val,
});
export const VALIDATOR_MAX = (val: number): ReturnStringNum => ({
  type: VALIDATOR_TYPE_MAX,
  val,
});
export const VALIDATOR_EMAIL = (): ReturnString => ({
  type: VALIDATOR_TYPE_EMAIL,
});

export const validate = (
  value: string | number,
  validators: CustomValidator[]
): boolean => {
  let isValid = true;
  for (const validator of validators) {
    if (
      validator.type === VALIDATOR_TYPE_REQUIRE &&
      typeof value === 'string'
    ) {
      isValid = isValid && value.trim().length > 0;
    }
    if (
      validator.type === VALIDATOR_TYPE_MINLENGTH &&
      typeof value === 'string' &&
      validator.val
    ) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (
      validator.type === VALIDATOR_TYPE_MAXLENGTH &&
      typeof value === 'string' &&
      validator.val
    ) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN && validator.val) {
      isValid = isValid && +value >= +validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX && validator.val) {
      isValid = isValid && +value <= +validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value.toString());
    }
  }
  return isValid;
};
