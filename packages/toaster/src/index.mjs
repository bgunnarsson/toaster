export default function Toaster(options) {
  if (document.querySelector('.toaster')) {
    console.warn('[Toaster] Only one instance of Toaster allowed at a time. Disregarding second activation.')
    return
  }

  if (!options) {
    console.error('[Toaster] No options provided.')
    return
  }

  this.options = {
    position: options?.position || 'bottom right',
    offset: options?.offset || { x: 0, y: 0 },
    customClass: options?.customClass || '',
  }

  // Cache the root toaster element
  const rootDiv = document.createElement('div')
  rootDiv.className = `toaster ${options?.customClass}`
  rootDiv.style.position = 'fixed'
  const position = this.options.position

  // Set position styles dynamically
  rootDiv.style[position.includes('top') ? 'top' : 'bottom'] = `${this.options.offset.y}px`
  rootDiv.style[position.includes('right') ? 'right' : 'left'] = `${this.options.offset.x}px`
  rootDiv.style.display = 'flex'
  rootDiv.style.flexDirection = 'column'

  document.body.appendChild(rootDiv)

  const closeToast = (element, isLeft) => {
    const offsetX = this.options.offset.x
    const transformValue = isLeft ? `translateX(calc(-100% - ${offsetX}px))` : `translateX(calc(100% + ${offsetX}px))`
    element.style.transform = transformValue // Slide out with offset
    element.addEventListener('transitionend', () => {
      element.remove() // Remove after animation
      document.dispatchEvent(new CustomEvent('toaster:removed', { detail: { element } })) // Dispatch custom 'toaster:removed' event
    })
  }

  this.toast = (toastData) => {
    if (!toastData?.duration) {
      toastData.duration = 3000
    }
    const isPaused = toastData?.pause ?? true
    const isClickable = toastData?.clickable ?? true
    // Create either a 'button' or a 'div' based on the clickable option
    const div = document.createElement(isClickable ? 'button' : 'div')
    div.className = `toaster__toast ${options?.customClass}__toast`

    if (isClickable) {
      div.style.cursor = 'pointer'
      div.type = 'button'
      div.title = 'Click to dismiss'
    }

    let toastTimeout

    // Check if content is HTML or text
    // const content = document.createElement('div') // Separate container for content
    // content.innerHTML =
    //   typeof toastData.content === 'string' && toastData.content.includes('<')
    //     ? toastData.content
    //     : `<span>${toastData.content}</span>`

    // Append content after the close button
    // div.appendChild(content)

    div.insertAdjacentHTML('beforeend', toastData?.content)

    const offsetX = this?.options?.offset?.x
    div.style.transition = 'transform 0.2s ease-in'
    div.style.transform = position.includes('left')
      ? `translateX(calc(-100% - ${offsetX}px))`
      : `translateX(calc(100% + ${offsetX}px))` // Include offset in transform

    // Append to the DOM and slide in
    if (options?.position?.includes('top')) {
      rootDiv.insertBefore(div, rootDiv.firstChild)
    }
    if (options?.position?.includes('bottom')) {
      rootDiv.appendChild(div)
    }
    requestAnimationFrame(() => {
      div.style.transform = 'translateX(0)' // Reset to the final position
    })

    // Function to set the auto-close timeout
    const startTimeout = () => {
      // Only apply the timeout if stay is false
      toastTimeout = setTimeout(() => closeToast(div, position.includes('left')), toastData?.duration)
    }

    // Dispatch custom 'toaster:added' event when a toast is created
    document.dispatchEvent(new CustomEvent('toaster:added', { detail: { toastData, element: div } }))

    // Start the auto-close timeout if stay is not true
    if (!toastData.persist) {
      startTimeout()
    }

    // Pause the timeout on hover
    if (isPaused && !toastData?.persist) {
      div.addEventListener('mouseenter', () => {
        clearTimeout(toastTimeout) // Clear the timeout to pause the closing
      })

      // Resume the timeout when mouse leaves
      div.addEventListener('mouseleave', () => {
        startTimeout() // Restart the timeout when the user stops hovering
      })
    }

    // If the toast is clickable, set a click event listener
    if (isClickable) {
      div.addEventListener('click', () => {
        closeToast(div, position?.includes('left')) // Optionally close the toast when clicked
      })
    }
  }
}
