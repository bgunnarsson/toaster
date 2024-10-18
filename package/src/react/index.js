import { useEffect, useRef } from 'react'
import Toaster from '@bgunnarsson/toaster'

/**
 * A React hook that provides access to the Toaster instance.
 * @param {Object} options - Options to initialize the Toaster.
 * @returns {Object} An object containing the toast and dismiss methods.
 */
const useToaster = (options) => {
  const toasterRef = useRef(null)

  useEffect(() => {
    // Initialize the Toaster only once
    if (!toasterRef.current) {
      toasterRef.current = new Toaster(options)
    }
    return () => {
      // Optional cleanup if needed
    }
  }, [options])

  return {
    toast: (toastData) => {
      toasterRef.current.toast(toastData)
    },
    dismiss: () => {
      toasterRef.current.dismiss()
    },
  }
}

export default useToaster
