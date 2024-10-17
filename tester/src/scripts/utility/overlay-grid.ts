const overlayGrid = {
  el: {
    root: document.querySelector<HTMLElement>('.overlay-grid'),
    button: document.querySelector<HTMLButtonElement>('.overlay-grid__button'),
  },
  init(): void {
    if (this.el.button) {
      this.el.button.addEventListener('click', (e: Event & { target: HTMLButtonElement }) => {
        e.preventDefault()
        this.el.root.classList.toggle('overlay-grid--show')
      })
    }
  },
}

export default overlayGrid
