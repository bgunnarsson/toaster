// @ts-ignore
import Toaster from '@bgunnarsson/toaster'

const toastTester = {
  init() {
    const toaster = new Toaster({
      position: 'bottom right',
      duration: 5000,
      clickable: true,
      customClass: 'toaster-bg',
      offset: {
        x: 20,
        y: 20,
      },
    })

    // Listen to the toaster events
    // document.addEventListener('toaster:added', (event) => {
    //   // @ts-ignore
    //   console.log('Toast added!', event.detail)
    // })

    // document.addEventListener('toaster:removed', (event) => {
    //   // @ts-ignore
    //   console.log('Toast removed!', event.detail)
    // })

    const button = document.querySelector('.toast-button')
    const button2 = document.querySelector('.toast-button2')
    const button3 = document.querySelector('.toast-button3')

    const closeButton = '<span class="toaster-bg__close">[ x ]</span>'

    button?.addEventListener('click', () => {
      toaster.toast({ content: 'Text toast', clickable: false })
    })

    button2?.addEventListener('click', () => {
      toaster.toast({
        content: `
          <span class="toaster-bg__content">
            <h1 class="headline2">Persistent</h1>
            <p class="body">Persistent HTML toast</p>
          </span>

          ${closeButton}
      `,
      })
    })

    button3?.addEventListener('click', () => {
      toaster.toast({ content: `Text toast with a sprinkle of html ${closeButton}` })
    })
  },
}

export default toastTester
