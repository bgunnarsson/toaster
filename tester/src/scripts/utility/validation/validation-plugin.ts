import { IValidationType, IValidationPlugin } from 'utility/validation/validation-interfaces'

import { validationTypes, validationType, testRegex } from 'utility/validation/validaiton-utility'

const validation: IValidationPlugin = {
  init({ items }): void {
    if (items) {
      Array.prototype.forEach.call(items, (item: HTMLInputElement) => {
        item.addEventListener('keyup', (e: Event & { target: HTMLInputElement }) => {
          this.validate(e.target, item, false)
        })
      })
    }
  },

  validateForm(items: NodeListOf<HTMLInputElement>) {
    let isValid = true

    Array.prototype.forEach.call(items, (item: HTMLInputElement) => {
      const validateValue = this.validate(item, item, true)

      if (!validateValue) {
        isValid = false
      }
    })

    return isValid
  },

  validate(target: HTMLInputElement, item: HTMLInputElement, isReturn = false) {
    const validation = validationTypes.find((o) => o.id === item.dataset.validate)

    const isValid = true

    if (target.value.length > 0 || !target.checked || target.value !== '') {
      switch (validation.id) {
        case validationType.default:
          if (isReturn) {
            return this.validateDefault(target, validation, isValid, isReturn)
          } else {
            this.validateDefault(target, validation, isValid, isReturn)
          }
          break
        case validationType.ssn:
          this.replacer(target)

          if (isReturn) {
            return this.validateSsn(target, validation, isValid, isReturn)
          } else {
            this.validateSsn(target, validation, isValid, isReturn)
          }
          break
        case validationType.email:
          this.replaceSpace(target)

          if (isReturn) {
            return this.validateEmail(target, validation, isValid, isReturn)
          } else {
            this.validateEmail(target, validation, isValid, isReturn)
          }

          break
        case validationType.zip:
          this.replacer(target)

          if (isReturn) {
            return this.validateZip(target, validation, isValid, isReturn)
          } else {
            this.validateZip(target, validation, isValid, isReturn)
          }
          break
        case validationType.telephone:
          this.replacer(target)

          if (isReturn) {
            return this.validateTelephone(target, validation, isValid, isReturn)
          } else {
            this.validateTelephone(target, validation, isValid, isReturn)
          }
          break
        case validationType.address:
          if (isReturn) {
            return this.validateAddress(target, validation, isValid, isReturn)
          } else {
            this.validateAddress(target, validation, isValid, isReturn)
          }
          break
        case validationType.select:
          if (isReturn) {
            return this.validateSelect(target, validation, isValid, isReturn)
          } else {
            this.validateSelect(target, validation, isValid, isReturn)
          }
          break
        case validationType.selection:
          if (isReturn) {
            return this.validateSelection(target, isValid, isReturn)
          } else {
            this.validateSelection(target, isValid, isReturn)
          }
          break
      }
    } else {
      this.set(target, validation.messages[0])
    }
  },

  // Validations
  validateDefault(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    if (target.value.length >= validation.min) {
      this.reset(target)
    } else {
      isValid = false
      this.set(target, validation.messages[0])
    }

    if (isReturn) {
      return isValid
    }
  },
  validateSsn(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    // TODO: Add kennitala package validation and use this one as fallback

    if (!testRegex(target.value, validation.pattern)) {
      this.set(target, validation.messages[1])
      isValid = false
    } else {
      this.reset(target)
    }

    if (isReturn) {
      return isValid
    }
  },
  validateEmail(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    if (!testRegex(target.value, validation.pattern)) {
      this.set(target, validation.messages[1])
      isValid = false
    } else {
      this.reset(target)
    }

    if (isReturn) {
      return isValid
    }
  },
  validateZip(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    if (!testRegex(target.value, validation.pattern)) {
      this.set(target, validation.messages[1])
      isValid = false
    } else {
      this.reset(target)
    }

    if (isReturn) {
      return isValid
    }
  },
  validateTelephone(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    if (!testRegex(target.value, validation.pattern)) {
      this.set(target, validation.messages[1])
      isValid = false
    } else {
      this.reset(target)
    }

    if (isReturn) {
      return isValid
    }
  },
  validateAddress(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    // TODO: Figure out a better way to validate addressess
    if (target.value.length >= validation.min) {
      this.reset(target)
    } else {
      isValid = false
      this.set(target, validation.messages[1])
    }

    if (isReturn) {
      return isValid
    }
  },
  validateSelect(target: HTMLInputElement, validation: IValidationType, isValid: boolean, isReturn = false) {
    if (target.value !== '') {
      this.reset(target)
    } else {
      isValid = false
      this.set(target, validation.messages[0])
    }

    if (isReturn) {
      return isValid
    }
  },
  validateSelection(target: HTMLInputElement, isValid: boolean, isReturn = false) {
    const parent = <HTMLElement>target.parentNode

    if (target.checked) {
      parent.classList.remove('input-group--error')
    } else {
      isValid = false
      parent.classList.add('input-group--error')
    }

    if (isReturn) {
      return isValid
    }
  },

  // Replacers
  replacer(target: HTMLInputElement): void {
    this.replaceDash(target)
    this.replaceSpace(target)
  },
  replaceDash(target: HTMLInputElement): void {
    if (target.value.includes('-')) {
      target.value = target.value.replace('-', '')
    }
  },
  replaceSpace(target: HTMLInputElement): void {
    if (target.value.includes(' ')) {
      target.value = target.value.replace(' ', '')
    }
  },

  // Setters
  set(target: HTMLInputElement, message: string): void {
    let parent = <HTMLElement>target.parentNode

    if (parent.classList.contains('input-group__wrap')) {
      parent = <HTMLElement>target.parentNode.parentNode
    }

    const error = parent.querySelector<HTMLElement>('.input-group__error')

    parent.classList.add('input-group--error')
    error.classList.remove('hide')
    error.innerHTML = message
  },
  reset(target: HTMLInputElement): void {
    let parent = <HTMLElement>target.parentNode

    if (parent.classList.contains('input-group__wrap')) {
      parent = <HTMLElement>target.parentNode.parentNode
    }

    const error = parent.querySelector<HTMLElement>('.input-group__error')

    parent.classList.remove('input-group--error')
    error.classList.add('hide')
    error.innerHTML = ''
  },
}

export default validation
