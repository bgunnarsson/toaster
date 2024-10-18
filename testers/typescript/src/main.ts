// Import the Toaster library
import Toaster from '@bgunnarsson/toaster'

// Initialize the Toaster
const toaster = new Toaster({
  position: 'bottom right',
  offset: { x: 20, y: 20 },
  customClass: 'my-toaster',
})

const button = document.getElementById('show-toast') as HTMLButtonElement

// Add a click event to show the toast when the button is clicked
button.addEventListener('click', () => {
  toaster.toast({
    content: 'Hello, this is a toast notification!',
    duration: 3000, // 3 seconds
    clickable: true, // Make the toast clickable
  })
})
