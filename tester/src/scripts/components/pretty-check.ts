const prettyCheck = {
  init: () => {
    const elements = document.querySelectorAll<HTMLLabelElement>('.pretty-check label')

    if (elements.length > 0) {
      Array.prototype.forEach.call(elements, (item) => {
        item.addEventListener('keyup', (e) => {
          e.preventDefault()
          e.stopImmediatePropagation()
          const control =
            e.target.parentNode.querySelector('input[type=radio]') ||
            e.target.parentNode.querySelector('input[type=checkbox]')

          if (e.keyCode === 32 || e.keyCode === 13) {
            control.click()
          }
        })
      })
    }
  },
}

export default prettyCheck
