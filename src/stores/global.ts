import api from '@/api'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
    state () {
        return {
            isCollapsed: JSON.parse(localStorage.getItem('measIsCollapsed')) ?? true,
            publicKey: localStorage.getItem('measPublicKey') ?? ''
        }
    },
    actions: {
        setMenuStatus (payload: boolean) {
            this.isCollapsed = payload
            localStorage.setItem('measIsCollapsed', JSON.stringify(this.isCollapsed))
        },
        setPublicKey (payload: string) {
            this.publicKey = payload
            localStorage.setItem('measPublicKey', this.publicKey)
        },
        async fetchPublicKey () {
            if (!this.publicKey) {
                this.setPublicKey(await api.common.getPublicKey())
            }
            return this.publicKey
        }
    }
})
