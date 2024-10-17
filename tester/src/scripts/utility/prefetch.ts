const prefetch = {
  init() {
    // Event delegation used as there may be hundreds of same-site links on a page:
    document.body.addEventListener('mouseover', this.worker)
  },
  worker(event) {
    const target = event.target

    // Not a link? - if so exit
    if (target.tagName !== 'A') {
      return
    }

    // Read the attribute rather than the property!
    // - because the property is the full https:// address
    const href = target.getAttribute('href')

    // No href, or not a same-site link? - if so exit
    // - link attribute must start with a backslash
    if (!href || href.charAt(0) !== '/') {
      return
    }

    // Already prefetched? - if so exit
    const isAlreadyAdded = document.head.querySelector(`link[href="${href}"]`)
    if (isAlreadyAdded) {
      return
    }

    // Is the same page? - if so exit
    const isSamePage = target.pathname === window.location.pathname
    if (isSamePage) {
    return
    }

    // Add prefetch link to head section
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  },
}

export default prefetch
