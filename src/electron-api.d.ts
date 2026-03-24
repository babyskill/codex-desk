import type { DesktopApi } from './types'

declare global {
  interface Window {
    managerCodex?: DesktopApi
  }
}

export {}
