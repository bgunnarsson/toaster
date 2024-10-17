// @ts-ignore
import Toaster from '@bgunnarsson/toaster'

const toastTester = {
  init() {
    const theToaster = new Toaster({
      duration: 3000,
      clickable: true,
    })

    const button = document.querySelector('.toast-button')
    const button2 = document.querySelector('.toast-button2')
    const button3 = document.querySelector('.toast-button3')

    button?.addEventListener('click', () => {
      theToaster.createToast({ content: 'Tast 1' })
    })
    button2?.addEventListener('click', () => {
      theToaster.createToast({ content: 'Tast 2' })
    })
    button3?.addEventListener('click', () => {
      theToaster.createToast({ content: '<p class="Hellooo">Test 3</p>' })
    })
  },
}

export default toastTester
