// toaster.d.ts

declare module '@bgunnarsson/toaster' {
  export interface ToasterOptions {
    position?: 'top left' | 'top right' | 'bottom left' | 'bottom right'
    offset?: { x: number; y: number }
    customClass?: string
    duration?: number
    clickable?: boolean
    persist?: boolean
    pause?: boolean
  }

  export interface ToastOptions {
    content: string
    duration?: number
    clickable?: boolean
    persist?: boolean
    pause?: boolean
  }

  export default class Toaster {
    constructor(options: ToasterOptions)
    toast(tastOptions: ToastOptions): void
    dismiss(): void
  }
}
