// Per-deployment globals injected by the server into the index page.
declare global {
  interface Window {
    scbdApp?: {
      accountsUrl: string
      version: string
      apiUrl?: string
      host?: string
    }
  }
}

export {}
