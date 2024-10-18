import React from 'react'
import { useToasterContext } from '@bgunnarsson/toaster/react'
import Navigation from './Navigation'

function Advanced() {
  const { toast } = useToasterContext()

  const renderToastContent = (type) => `
      <div class="my-toaster__content my-toaster__toast-${type}">
        <p>Toaster content</p>
      </div>
    `

  const toastOptions = {
    persist: false,
    duration: 10000,
  }

  return (
    <>
      <Navigation />
      <div className="toaster-buttons">
        <button
          className="button"
          type="button"
          onClick={() => toast({ content: renderToastContent('default'), ...toastOptions })}
        >
          Default
        </button>
        <button
          className="button"
          type="button"
          onClick={() => toast({ content: renderToastContent('success'), ...toastOptions })}
        >
          Success
        </button>
        <button
          className="button"
          type="button"
          onClick={() => toast({ content: renderToastContent('error'), ...toastOptions })}
        >
          Error
        </button>
        <button
          className="button"
          type="button"
          onClick={() => toast({ content: renderToastContent('warning'), ...toastOptions })}
        >
          Warning
        </button>
        <button
          className="button"
          type="button"
          onClick={() => toast({ content: renderToastContent('info'), ...toastOptions })}
        >
          Info
        </button>
      </div>
    </>
  )
}

export default Advanced
