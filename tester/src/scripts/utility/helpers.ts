/**
 * @type variable
 * @description Used to check if the current environment is a production environment.
 */
export const isProduction = process.env.NODE_ENV === 'production'

/**
 * @type interface
 * @description Here we are extending the Window interface with the grecaptcha property.
 */
declare let grecaptcha: any

/**
 * @type Function
 * @description This is a companion function that is used in "handleRecaptcha", can also be used as a standalone.
 * @returns A boolean value that indicates if the recaptcha is valid or not.
 * @example if (validateRecaptcha()) { // Do something }
 */
export function validateRecaptcha(): boolean {
  const v = grecaptcha.getResponse()

  if (v.length === 0) {
    return false
  }

  return true
}

/**
 * @type Function
 * @param  {Event} event
 * @param  {HTMLElement} element
 * @description This is the function that is used to validate the recaptcha and handles the error message as well.
 * @return void. It will prevent the default event if the recaptcha is not valid.
 * @example handleRecaptcha(event, element)
 */

export function handleRecaptcha(event: Event, element: HTMLElement): void {
  if (element) {
    if (!element.classList.contains('hide')) {
      element.classList.add('hide')
    }

    if (!validateRecaptcha()) {
      event.preventDefault()
      element.classList.remove('hide')
    }
  }
}
