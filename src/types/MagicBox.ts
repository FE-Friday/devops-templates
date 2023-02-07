export type BkMessageBody = {
    theme: string
    [key: string]: unknown
}

export type BkMessage = (messageBody: BkMessageBody) => void

export type BkTree = typeof window.bkMagicVue.bkTree

export type BkForm = typeof window.bkMagicVue.bkForm
