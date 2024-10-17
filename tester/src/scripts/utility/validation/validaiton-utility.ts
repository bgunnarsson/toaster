import { IValidationType } from 'utility/validation/validation-interfaces'
import { dictionary } from 'utility/dictionary'

// Messages Enums
export const validationMessage = {
  default: dictionary('valFieldIsRequired'),
  ssn: dictionary('valSsnIsNotValid'),
  email: dictionary('valEmailIsNotValid'),
  zip: dictionary('valPostCodeNotValid'),
  telephone: dictionary('valPhoneNumberNotValid'),
  address: dictionary('valFieldIsRequired'),
  select: dictionary('valFieldIsRequired'),
  selection: dictionary('valFieldIsRequired'),
}

export enum validationType {
  default = 'default',
  ssn = 'ssn',
  email = 'email',
  zip = 'zip',
  telephone = 'telephone',
  address = 'address',
  select = 'select',
  selection = 'selection',
}

// Validation Types
export const validationTypes: IValidationType[] = [
  {
    id: validationType.default,
    min: 2,
    max: 0,
    pattern: null,
    overwrites: [],
    validate: [validationType.default],
    isValid: false,
    messages: [validationMessage.default],
  },
  {
    id: validationType.ssn,
    min: 10,
    max: 11,
    pattern: /^[0-9]{10}$/,
    overwrites: [' ', '-'],
    validate: [validationType.default, validationType.ssn],
    isValid: false,
    messages: [validationMessage.default, validationMessage.ssn],
  },
  {
    id: validationType.email,
    min: 1,
    max: 0,
    /* eslint-disable */
    // @ts-ignore
    pattern:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    /* eslint-disable */
    overwrites: [],
    validate: [validationType.default, validationType.email],
    isValid: false,
    messages: [validationMessage.default, validationMessage.email],
  },
  {
    id: validationType.zip,
    min: 3,
    max: 3,
    pattern: /^[0-9]{3}$/,
    overwrites: [' ', '-'],
    validate: [validationType.default, validationType.zip],
    isValid: false,
    messages: [validationMessage.default, validationMessage.zip],
  },
  {
    id: validationType.telephone,
    min: 1,
    max: 7,
    pattern: /^[0-9]{7}$/,
    overwrites: [],
    validate: [validationType.default, validationType.telephone],
    isValid: false,
    messages: [validationMessage.default, validationMessage.telephone],
  },
  {
    id: validationType.address,
    min: 1,
    max: 0,
    pattern: null,
    overwrites: [],
    validate: [validationType.default],
    isValid: false,
    messages: [validationMessage.default],
  },
  {
    id: validationType.select,
    min: 1,
    max: 0,
    pattern: null,
    overwrites: [],
    validate: [validationType.select],
    isValid: false,
    messages: [validationMessage.select],
  },
  {
    id: validationType.selection,
    min: 1,
    max: 0,
    pattern: null,
    overwrites: [],
    validate: [validationType.selection],
    isValid: false,
    messages: [validationMessage.selection],
  },
]

export const testRegex = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value)
}
