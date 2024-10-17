// constructor function
export default function Toaster(options) {
  if (document.querySelector('.toaster-root')) {
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
  rootDiv.className = 'toaster-root'
  rootDiv.style.position = 'fixed'

  const positionStyles = {
    'top right': { top: '0', right: this.options.offset.x },
    'top left': { top: '0', left: this.options.offset.x },
    'bottom left': { bottom: '0', left: this.options.offset.y },
    'bottom right': { bottom: '0', right: this.options.offset.y },
  }

  Object.assign(rootDiv.style, positionStyles[this.options.position])
  this.vars.rootElement.appendChild(rootDiv)

  this.createToast = (text) => {
    const div = document.createElement('div')
    div.className = 'toaster'
    div.innerHTML = text
    div.style.transition = 'transform 0.3s ease-in-out'

    // Determine the starting position for the animation based on this.options.position
    const isLeft = this.options.position.includes('left')
    div.style.transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)' // Start off-screen (left or right based on position)

    // Append to the DOM
    const toasterRoot = document.querySelector('.toaster-root')
    toasterRoot.insertBefore(div, toasterRoot.firstChild)

    // Access and update styles after appending to the DOM
    requestAnimationFrame(() => {
      // This allows the browser to paint the initial off-screen position before applying the next transform
      div.style.transform = 'translateX(0)' // Slide in
    })

    // Set a timeout for the toast to slide out and then remove it
    setTimeout(() => {
      // Slide out based on the original position
      div.style.transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)' // Slide out of view

      // Listen for the end of the transition to remove the toast
      div.addEventListener('transitionend', () => {
        div.remove() // Remove the toast from the DOM
      })
    }, this.options.duration) // Wait for the specified duration before sliding out

    // Optionally, add additional styles or actions here
    console.log('Toast created:', div)
  }
}
