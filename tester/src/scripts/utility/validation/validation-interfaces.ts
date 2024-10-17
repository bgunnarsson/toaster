// Interfaces
export interface IValidationType {
  id: string
  min: number
  max: number
  pattern: RegExp
  overwrites: string[]
  validate: string[]
  isValid: boolean
  messages: string[]
}

export interface IValidationPlugin {
  // eslint-disable-next-line no-empty-pattern
  init({}: IValidationInitParameters): void
  validate(target: HTMLInputElement, item: HTMLInputElement, isReturn: boolean)
  validateForm(items: NodeListOf<HTMLInputElement>)
  validateDefault(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateSsn(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateEmail(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateZip(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateTelephone(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateAddress(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateSelect(target: HTMLInputElement, validation: IValidationType, isValid?: boolean, isReturn?: boolean)
  validateSelection(target: HTMLInputElement, isValid?: boolean, isReturn?: boolean)
  replacer(target: HTMLInputElement): void
  replaceDash(target: HTMLInputElement): void
  replaceSpace(target: HTMLInputElement): void
  set(target: HTMLInputElement, message: string): void
  reset(target: HTMLInputElement): void
}
export interface IValidationInitParameters {
  items: NodeListOf<HTMLInputElement>
  options?: IValidationInitOptions
}
export interface IValidationInitOptions {
  createElement: boolean
}
