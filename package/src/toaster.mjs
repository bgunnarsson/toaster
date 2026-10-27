/**
 * @typedef {Object} ToasterOptions
 * @property {'top left' | 'top right' | 'bottom left' | 'bottom right'} [position]
 * @property {{ x: number, y: number }} [offset]
 * @property {string} [customClass]
 * @property {number} [duration]
 * @property {boolean} [clickable]
 * @property {boolean} [persist]
 * @property {boolean} [pause]
 */

/**
 * @typedef {Object} ToastOptions
 * @property {string} content
 * @property {number} [duration]
 * @property {boolean} [clickable]
 * @property {boolean} [persist]
 * @property {boolean} [pause]
 */

/** @type {Toaster | null} */
let globalToasterInstance = null

export default class Toaster {
  /** @param {ToasterOptions} options */
  constructor(options) {
    // Check for existing instance
    if (globalToasterInstance) {
      // biome-ignore lint/correctness/noConstructorReturn: every `new Toaster()` returns the one instance
      return globalToasterInstance
    }

    // DOM Check to prevent multiple `.toaster` elements
    if (document.querySelector('.toaster')) {
      console.warn('[Toaster] Only one instance of Toaster allowed at a time.')
      return
    }

    if (!options) {
      console.error('[Toaster] No options provided.')
      return
    }

    const toasterOptions = {
      position: options?.position || 'bottom right',
      offset: options?.offset || { x: 0, y: 0 },
      customClass: options?.customClass || '',
    }

    // Create toaster root element
    const rootDiv = document.createElement('div')
    rootDiv.className = `toaster ${toasterOptions.customClass}`
    rootDiv.style.position = 'fixed'
    const position = toasterOptions.position

    // Set position styles dynamically
    rootDiv.style[position.includes('top') ? 'top' : 'bottom'] = `${toasterOptions.offset.y}px`
    rootDiv.style[position.includes('right') ? 'right' : 'left'] = `${toasterOptions.offset.x}px`
    rootDiv.style.display = 'flex'
    rootDiv.style.flexDirection = 'column'
    document.body.appendChild(rootDiv)

    // Close toast logic
    const closeToast = (element, isLeft) => {
      const offsetX = toasterOptions.offset.x
      const transformValue = isLeft ? `translateX(calc(-100% - ${offsetX}px))` : `translateX(calc(100% + ${offsetX}px))`
      element.style.transform = transformValue // Slide out with offset
      element.addEventListener('transitionend', () => {
        element.remove()
        document.dispatchEvent(new CustomEvent('toaster:removed', { detail: { element } }))
      })
    }

    // Define the `toast` function
    /**
     * @this {Toaster}
     * @param {ToastOptions} toastOptions
     */
    function toast(toastOptions) {
      if (!toastOptions?.duration) {
        toastOptions.duration = 3000
      }
      const isPaused = toastOptions?.pause ?? true
      const isClickable = toastOptions?.clickable ?? true

      // Create the toast element
      const div = document.createElement(isClickable ? 'button' : 'div')
      div.className = `toaster__toast ${toasterOptions.customClass}__toast`

      if (isClickable) {
        div.style.cursor = 'pointer'
        div.setAttribute('type', 'button')
        div.title = 'Click to dismiss'
      }

      let toastTimeout

      div.insertAdjacentHTML('beforeend', toastOptions?.content)

      const offsetX = toasterOptions.offset.x
      div.style.transition = 'transform 0.2s ease-in'
      div.style.transform = position.includes('left')
        ? `translateX(calc(-100% - ${offsetX}px))`
        : `translateX(calc(100% + ${offsetX}px))` // Include offset in transform

      // Append to the DOM and slide in
      if (position.includes('top')) {
        rootDiv.insertBefore(div, rootDiv.firstChild)
      } else {
        rootDiv.appendChild(div)
      }

      requestAnimationFrame(() => {
        div.style.transform = 'translateX(0)' // Reset to the final position
      })

      const startTimeout = () => {
        toastTimeout = setTimeout(() => closeToast(div, position.includes('left')), toastOptions?.duration)
      }

      document.dispatchEvent(new CustomEvent('toaster:added', { detail: { toastOptions, element: div } }))

      if (!toastOptions.persist) {
        startTimeout()
      }

      if (isPaused && !toastOptions?.persist) {
        div.addEventListener('mouseenter', () => {
          clearTimeout(toastTimeout) // Pause timeout on hover
        })
        div.addEventListener('mouseleave', startTimeout) // Resume timeout on hover exit
      }

      if (isClickable) {
        div.addEventListener('click', () => closeToast(div, position.includes('left')))
      }

      this.currentToast = div
    }

    // Define the `dismiss` function
    /** @this {Toaster} */
    function dismiss() {
      if (this.currentToast) {
        closeToast(this.currentToast, position.includes('left'))
      }
    }

    // Define the `clearAllToasts` function
    function clearAllToasts() {
      rootDiv.innerHTML = '' // Clear all toasts from the DOM
    }

    /** @type {HTMLElement | undefined} */
    this.currentToast = undefined
    /** @type {(toastOptions: ToastOptions) => void} */
    this.toast = toast
    /** @type {() => void} */
    this.dismiss = dismiss
    /** @type {() => void} */
    this.clearAllToasts = clearAllToasts

    // Store the instance globally
    globalToasterInstance = this
  }
}
