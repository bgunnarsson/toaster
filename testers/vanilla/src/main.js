// Import the Toaster library
import Toaster from '@bgunnarsson/toaster'

// Initialize the Toaster
const toaster = new Toaster({
  position: 'bottom right',
  offset: { x: 20, y: 20 },
  customClass: 'my-toaster',
})

const button1 = document.querySelector('.button--default')
const button2 = document.querySelector('.button--success')
const button3 = document.querySelector('.button--error')
const button4 = document.querySelector('.button--warning')
const button5 = document.querySelector('.button--info')

function renderToastContent(type) {
  return `
      <div class="my-toaster__content my-toaster__toast--${type}">
        <p>Toaster content</p>
      </div>
    `
}

// Add a click event to show the toast when the button is clicked
button1.addEventListener('click', () => {
  toaster.toast({
    content: renderToastContent('default'),
    duration: 3000, // 3 seconds
    persist: true,
  })
})
button2.addEventListener('click', () => {
  toaster.toast({
    content: renderToastContent('success'),
    duration: 3000, // 3 seconds
  })
})
button3.addEventListener('click', () => {
  toaster.toast({
    content: renderToastContent('error'),
    duration: 3000, // 3 seconds
  })
})
button4.addEventListener('click', () => {
  toaster.toast({
    content: renderToastContent('warning'),
    duration: 3000, // 3 seconds
  })
})
button5.addEventListener('click', () => {
  toaster.toast({
    content: renderToastContent('info'),
    duration: 3000, // 3 seconds
  })
})
