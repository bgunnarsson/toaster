// constructor function
export default function Toaster(options) {
  if (document.querySelector('.toaster')) {
    console.warn('[Toaster] Only one instance of Toster allowed at a time. Disregarding second activation.')
    return
  }
  if (!options) {
    console.error('[Toaster] No options provided.')
    return
  }

  this.options = {
    position: options?.position || 'top right',
    duration: options?.duration || 3000,
    clickable: options?.clickable || false,
    offset: { x: 0, y: 0 } || options?.offset,
    class: 'toaster' || options?.class,
  }

  console.log('[Toaster] Provided options', options)
  console.log('[Toaster] Options', this.options)

  const rootDiv = document.createElement('div')
  rootDiv.className = 'toaster'
  rootDiv.style.position = 'fixed'

  const positionStyles = {
    'top right': { top: '0', right: this.options.offset.x },
    'top left': { top: '0', left: this.options.offset.x },
    'bottom left': { bottom: '0', left: this.options.offset.y },
    'bottom right': { bottom: '0', right: this.options.offset.y },
  }

  Object.assign(rootDiv.style, positionStyles[this.options.position])
  document.body.appendChild(rootDiv)

  const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 4 L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 4 L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`

  this.createToast = (toastData) => {
    const div = document.createElement('div')
    div.className = 'toaster__toast'

    // Create the close button
    const closeButton = document.createElement('button')
    closeButton.className = 'toaster__close'
    closeButton.innerHTML = closeSvg // This adds a '×' symbol

    // Check if toastData.content is HTML or text
    if (typeof toastData.content === 'string' && toastData.content.includes('<')) {
      // It's HTML, so use innerHTML
      div.innerHTML = toastData.content
    } else {
      // It's plain text, use textContent
      const textNode = document.createTextNode(toastData.content)
      div.appendChild(textNode)
    }

    if (this.options.clickable) {
      div.appendChild(closeButton)
    }

    div.style.transition = 'transform 0.3s ease-in-out'

    // Determine the starting position for the animation based on this.options.position
    const isLeft = this.options.position.includes('left')
    div.style.transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)' // Start off-screen (left or right based on position)

    // Append to the DOM
    const toasterRoot = document.querySelector('.toaster')
    toasterRoot.insertBefore(div, toasterRoot.firstChild)

    // Slide-in animation
    requestAnimationFrame(() => {
      div.style.transform = 'translateX(0)' // Slide in
    })

    // Close button click handler
    closeButton.addEventListener('click', () => {
      closeToast(div, isLeft)
    })

    // Set a timeout for automatic removal
    setTimeout(() => {
      closeToast(div, isLeft)
    }, this.options.duration) // Wait for the specified duration

    // Function to handle closing the toast
    const closeToast = (element, isLeft) => {
      element.style.transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)' // Slide out of view

      // Listen for the end of the transition to remove the toast
      element.addEventListener('transitionend', () => {
        element.remove() // Remove the toast from the DOM
      })
    }

    // Optionally, add additional styles or actions here
    console.log('Toast created:', div)
  }
}
