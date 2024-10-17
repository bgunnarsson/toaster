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
    position: options?.position || 'top right',
    duration: options?.duration || 3000,
    clickable: options?.clickable || false,
    offset: options?.offset || { x: 0, y: 0 },
    class: options?.class || 'toaster',
  }

  console.log('[Toaster] Provided options', options)
  console.log('[Toaster] Options', this.options)

  // Cache the root toaster element
  const rootDiv = document.createElement('div')
  rootDiv.className = 'toaster'
  rootDiv.style.position = 'fixed'
  const position = this.options.position

  // Set position styles dynamically
  rootDiv.style[position.includes('top') ? 'top' : 'bottom'] = `${this.options.offset.y}px`
  rootDiv.style[position.includes('right') ? 'right' : 'left'] = `${this.options.offset.x}px`

  document.body.appendChild(rootDiv)

  const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 4 L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 4 L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`

  // Function to handle closing the toast
  const closeToast = (element, isLeft) => {
    element.style.transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)' // Slide out
    element.addEventListener('transitionend', () => element.remove()) // Remove after animation
  }

  this.createToast = (toastData) => {
    const div = document.createElement('div')
    div.className = 'toaster__toast'

    // Create the close button
    if (this.options.clickable) {
      const closeButton = document.createElement('button')
      closeButton.className = 'toaster__close'
      closeButton.innerHTML = closeSvg
      closeButton.addEventListener('click', () => closeToast(div, position.includes('left')))
      div.appendChild(closeButton)
    }

    // Check if content is HTML or text
    div.innerHTML =
      typeof toastData.content === 'string' && toastData.content.includes('<')
        ? toastData.content
        : `<span>${toastData.content}</span>`

    div.style.transition = 'transform 0.3s ease-in-out'
    div.style.transform = position.includes('left') ? 'translateX(-100%)' : 'translateX(100%)'

    // Append to the DOM and slide in
    rootDiv.insertBefore(div, rootDiv.firstChild)
    requestAnimationFrame(() => {
      div.style.transform = 'translateX(0)'
    })

    // Auto-close after duration
    setTimeout(() => closeToast(div, position.includes('left')), this.options.duration)

    console.log('Toast created:', div)
  }
}
