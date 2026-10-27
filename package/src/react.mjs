import { createContext, createElement, useContext, useEffect, useRef } from 'react'
import Toaster from './toaster.mjs'

/** @typedef {import('./toaster.mjs').ToasterOptions} ToasterOptions */
/** @typedef {import('./toaster.mjs').ToastOptions} ToastOptions */

/**
 * @typedef {Object} ToasterApi
 * @property {(toastOptions: ToastOptions) => void} toast
 * @property {() => void} dismiss
 * @property {() => void} clearAllToasts
 */

/** @type {import('react').Context<ToasterApi | null>} */
const ToasterContext = createContext(/** @type {ToasterApi | null} */ (null))

/** @type {Toaster | null} */
let globalToasterInstance = null // Singleton instance stored outside the component lifecycle

/**
 * @param {ToasterOptions} options
 * @returns {ToasterApi}
 */
const useToaster = (options) => {
  const toasterRef = useRef(/** @type {Toaster} */ (globalToasterInstance)) // Hold reference to the singleton

  // biome-ignore lint/correctness/useExhaustiveDependencies: the singleton is created once and ignores later options
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

/** @param {{ children?: import('react').ReactNode, options: ToasterOptions }} props */
export const ToasterProvider = ({ children, options }) => {
  const toaster = useToaster(options) // Provide the singleton instance

  return createElement(ToasterContext.Provider, { value: toaster }, children)
}

/** @returns {ToasterApi} */
export const useToasterContext = () => {
  return /** @type {ToasterApi} */ (useContext(ToasterContext))
}
