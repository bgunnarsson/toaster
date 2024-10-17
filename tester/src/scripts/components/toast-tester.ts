// @ts-ignore
import Toaster from '@bgunnarsson/toaster'

const toastTester = {
  init() {
    const toaster = new Toaster({
      position: 'bottom right',
      duration: 1000,
      clickable: true,
      customClass: 'toaster-bg',
      offset: {
        x: 20,
        y: 20,
      },
    })

    document.addEventListener('toaster:added', (event) => {
      // @ts-ignore
      console.log('Toast added!', event.detail)
    })

    document.addEventListener('toaster:removed', (event) => {
      // @ts-ignore
      console.log('Toast removed!', event.detail)
    })

    const button = document.querySelector('.toast-button')
    const button2 = document.querySelector('.toast-button2')
    const button3 = document.querySelector('.toast-button3')

    button?.addEventListener('click', () => {
      toaster.toast({ content: 'Tast 1' })
    })
    button2?.addEventListener('click', () => {
      toaster.toast({ content: 'Tast 2', persist: true })
    })
    button3?.addEventListener('click', () => {
      toaster.toast({ content: '<p class="Hellooo">Test 3</p>' })
    })
  },
}

export default toastTester
