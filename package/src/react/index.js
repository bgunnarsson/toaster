import React, { createContext, useContext, useEffect, useRef } from 'react'
import Toaster from '@bgunnarsson/toaster' // Ensure this is correctly pointing to the main toaster class

const ToasterContext = createContext(null)

let globalToasterInstance = null // Singleton instance stored outside the component lifecycle

const useToaster = (options) => {
  const toasterRef = useRef(globalToasterInstance) // Hold reference to the singleton

  useEffect(() => {
    if (!globalToasterInstance) {
      globalToasterInstance = new Toaster(options)
      toasterRef.current = globalToasterInstance
    }
    // No reinitialization needed even if options change after initialization
  }, []) // Remove dependency on options

  return {
    toast: (toastOptions) => toasterRef.current.toast(toastOptions),
    dismiss: () => toasterRef.current.dismiss(),
    clearAllToasts: () => toasterRef.current.clearAllToasts(),
  }
}

export const ToasterProvider = ({ children, options }) => {
  const toaster = useToaster(options) // Provide the singleton instance

  return <ToasterContext.Provider value={toaster}>{children}</ToasterContext.Provider>
}

export const useToasterContext = () => {
  return useContext(ToasterContext)
}
