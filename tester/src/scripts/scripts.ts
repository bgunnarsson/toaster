const isProduction = process.env.NODE_ENV === 'production'

document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  import('components/toast-tester').then((module) => module.default.init())

  if (!isProduction) {
    if (document.querySelector<HTMLElement>('.overlay-grid')) {
      import('helpers/overlay-grid').then((module) => module.default.init())
    }
  }

  // setTimeout(() => {
  //   document.querySelector('.body').classList.add('loaded')
  // }, 100)
  // setTimeout(() => {
  //   document.querySelector('.body').classList.add('preload--hidden')
  //   document.querySelector('.body').classList.remove('preload--transitions')
  // }, 400)
})
