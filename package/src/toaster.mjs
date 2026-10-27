/**
 * @typedef {Object} ToasterOptions
 * @property {'top left' | 'top right' | 'bottom left' | 'bottom right'} [position]
 * @property {{ x: number, y: number }} [offset]
 * @property {string} [customClass]
 * @property {number} [duration]
 * @property {boolean} [clickable]
 * @property {boolean} [persist]
 * @property {boolean} [pause]
 * @property {boolean} [stack]
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

// How far each toast behind the front one peeks out, how much smaller it gets, and how many show
const STACK_PEEK = 10
const STACK_SCALE = 0.05
const STACK_VISIBLE = 3

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
      stack: options?.stack ?? true,
    }

    // Create toaster root element
    const rootDiv = document.createElement('div')
    rootDiv.className = `toaster ${toasterOptions.customClass}`
    rootDiv.style.position = 'fixed'
    const position = toasterOptions.position
    const isTop = position.includes('top')

    // Set position styles dynamically
    rootDiv.style[isTop ? 'top' : 'bottom'] = `${toasterOptions.offset.y}px`
    rootDiv.style[position.includes('right') ? 'right' : 'left'] = `${toasterOptions.offset.x}px`
    if (toasterOptions.stack) {
      // Every toast shares one grid cell, so they overlap and the root takes the size of the largest
      rootDiv.style.display = 'grid'
    } else {
      rootDiv.style.display = 'flex'
      rootDiv.style.flexDirection = 'column'
    }
    document.body.appendChild(rootDiv)

    /** @type {HTMLElement[]} Toasts on screen, oldest first. A closing toast leaves it straight away. */
    const toasts = []

    /** @type {Map<HTMLElement, { start: () => void, stop: () => void }>} Timers of the toasts that pause on hover */
    const timers = new Map()
    let isHovered = false

    // Hovering the toaster pauses every toast, and leaving it starts them all again
    rootDiv.addEventListener('mouseenter', () => {
      isHovered = true
      for (const timer of timers.values()) {
        timer.stop()
      }
    })
    rootDiv.addEventListener('mouseleave', () => {
      isHovered = false
      for (const timer of timers.values()) {
        timer.start()
      }
    })

    // Lay the toasts out as a deck: the newest in front, each older one smaller and peeking out behind it
    const restack = () => {
      if (!toasterOptions.stack) {
        return
      }

      const front = toasts[toasts.length - 1]
      if (front) {
        front.style.height = ''
        front.style.boxSizing = ''
        front.style.overflow = ''
      }
      const frontHeight = front ? `${front.offsetHeight}px` : ''

      toasts.forEach((element, index) => {
        const depth = toasts.length - 1 - index
        const step = Math.min(depth, STACK_VISIBLE - 1)
        element.style.zIndex = `${index + 1}`
        element.style.translate = `0 ${(isTop ? 1 : -1) * step * STACK_PEEK}px`
        element.style.scale = `${1 - step * STACK_SCALE}`
        element.style.opacity = depth < STACK_VISIBLE ? '' : '0'
        // Only the front toast takes the mouse, so the ones behind it cannot be clicked away
        element.style.pointerEvents = depth ? 'none' : ''

        // A toast behind the front one takes its height, so only the strip peeking out of the deck shows
        if (depth) {
          element.style.height = frontHeight
          element.style.boxSizing = 'border-box'
          element.style.overflow = 'hidden'
        }
      })
    }

    // Close toast logic
    const closeToast = (element, isLeft) => {
      const index = toasts.indexOf(element)
      if (index === -1) {
        return
      }
      toasts.splice(index, 1)
      timers.delete(element)
      restack()

      const offsetX = toasterOptions.offset.x
      const transformValue = isLeft ? `translateX(calc(-100% - ${offsetX}px))` : `translateX(calc(100% + ${offsetX}px))`
      element.style.transform = transformValue // Slide out with offset
      element.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'transform') {
          return
        }
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
      if (toasterOptions.stack) {
        div.style.transition += ', translate 0.2s ease-in, scale 0.2s ease-in, opacity 0.2s ease-in'
        div.style.gridArea = '1 / 1'
        div.style.alignSelf = isTop ? 'start' : 'end'
        // Scaling from the edge the older toasts peek out of keeps each peek exactly STACK_PEEK deep
        div.style.transformOrigin = isTop ? 'bottom' : 'top'
      }
      div.style.transform = position.includes('left')
        ? `translateX(calc(-100% - ${offsetX}px))`
        : `translateX(calc(100% + ${offsetX}px))` // Include offset in transform

      // Append to the DOM and slide in
      if (isTop) {
        rootDiv.insertBefore(div, rootDiv.firstChild)
      } else {
        rootDiv.appendChild(div)
      }
      toasts.push(div)
      restack()

      requestAnimationFrame(() => {
        div.style.transform = 'translateX(0)' // Reset to the final position
      })

      const startTimeout = () => {
        toastTimeout = setTimeout(() => closeToast(div, position.includes('left')), toastOptions?.duration)
      }

      document.dispatchEvent(new CustomEvent('toaster:added', { detail: { toastOptions, element: div } }))

      if (!toastOptions.persist) {
        if (isPaused) {
          timers.set(div, { start: startTimeout, stop: () => clearTimeout(toastTimeout) })
        }
        // A toast that pauses on hover waits while the toaster is hovered
        if (!isPaused || !isHovered) {
          startTimeout()
        }
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
      toasts.length = 0
      timers.clear()
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
