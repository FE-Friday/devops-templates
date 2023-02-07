import { BkMessage, BkMessageBody } from '@/types/MagicBox'
import JSEncrypt from 'jsencrypt'
import { useGlobalStore } from '@/stores/global'
import { PluginObject } from 'vue'

/**
 * 动态加载脚本
 * @param {string} url
 * @returns Promise
 */
export function loadScript (url: string): Promise<void> {
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        document.getElementsByTagName('head')[0].appendChild(script)
        script.onload = () => {
            resolve()
        }
    })
}

/**
 * URL拼接参数
 * @param url string
 * @param query Record<string, string | number | boolean | any[]>
 * @returns string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function joinUrl (url: string, query: any): string {
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        if (Array.isArray(query[key])) {
            query[key].forEach((v: string | number | boolean, i: number) => {
                const val = encodeURIComponent(v)
                if (index === 0 && i === 0) url += `?${key}=${val}`
                else url += `&${key}=${val}`
            })
        } else {
            const val = encodeURIComponent(query[key])
            if (index === 0) url += `?${key}=${val}`
            else url += `&${key}=${val}`
        }
    })
    return url
}

/**
 *
 * @param fn function
 * @param delay number
 * @returns void
 */
export function throttleMessage (fn: BkMessage, delay = 1000): BkMessage {
    let lastTime = 0
    return function (messageBody: BkMessageBody) {
        // 设置默认配置
        const message = {
            limit: 1,
            offsetY: 80,
            ellipsisLine: 2,
            ellipsisCopy: true,
            ...messageBody
        }
        if (message.theme !== 'error') {
            return fn(message)
        }
        const now = +new Date()
        if (lastTime + delay > now) return
        lastTime = now
        return fn(message)
    }
}

/**
 * 格式化大小
 * @param {Number} size_
 * @returns string
 */
export function parseSize (size_: number): string {
    if (size_ === undefined) return
    let size = ''
    if (size_ < 0.1 * 1024) {
        size = size_.toFixed(2) + 'B'
    } else if (size_ < 0.1 * 1024 * 1024) {
        size = (size_ / 1024).toFixed(2) + 'KB'
    } else if (size_ < 0.1 * 1024 * 1024 * 1024) {
        size = (size_ / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
        size = (size_ / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }
    const sizestr = size + ''
    const len = sizestr.indexOf('.')
    const dec = sizestr.substr(len + 1, 2)
    if (dec === '00') {
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
    }
    return sizestr
}

function addZero (num:number): string {
    return num < 10 ? '0' + num : num.toString()
}

/**
 * 用于日期格式化
 * @param {*} date 日期
 * @returns 返回格式化日期
 */
export function formatDateTime (date: string | number | Date, format?: string): string {
    if (!date) return ''
    const time = date instanceof Date ? date : new Date(Date.parse(date.toString()))
    const Y = time.getFullYear() + '-'
    const M = addZero(time.getMonth() + 1) + '-'
    const D = addZero(time.getDate())
    const h = addZero(time.getHours()) + ':'
    const m = addZero(time.getMinutes()) + ':'
    const s = addZero(time.getSeconds())
    if (format === 'yyyy-MM-dd') {
        return Y + M + D
    } else {
        return Y + M + D + ' ' + h + m + s
    }
}

/**
 * 复制内容至剪贴板
 * @param value string
 */
export function copy (value: string): void {
    const textarea = document.createElement('textarea')
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
    textarea.readOnly = true
    // 移除屏幕范围
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    textarea.value = value
    document.body.appendChild(textarea)
    textarea.select()
    const result = document.execCommand('Copy')
    if (result) {
        window.devopsVue.$bkNotify({
            limit: 1,
            delay: 3000,
            theme: 'success',
            position: 'bottom-right',
            title: '已复制链接至剪贴板'
        })
    }
    document.body.removeChild(textarea)
}

/**
 * 判断字符串是否为JSON格式
 * @param str string
 * @returns boolean
 */
export function isJson (str: string): boolean {
    if (str === '') return true
    if (typeof str === 'string') {
        try {
            const obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
}

/**
 * RSA 加密
 * @param {*} val 需要加密的数据
 * @returns 加密后的数据
 */
export function encrypt (val: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (val !== null && val !== undefined) {
            const encrypt = new JSEncrypt()
            let key = ''
            useGlobalStore().fetchPublicKey().then(res => {
                key = res
                encrypt.setPublicKey(key)
                const r = encrypt.encrypt(val)
                if (!r) {
                    window.devopsVue.$bkMessage({
                        theme: 'warning',
                        message: '加密失败，请稍后重试'
                    })
                    reject(new Error())
                } else {
                    resolve(r)
                }
            })
        } else {
            resolve(val)
        }
    })
}

// 获取唯一随机数
export function uuid (): string {
    let id = ''
    const randomNum = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

    for (let i = 0; i < 7; i++) {
        id += randomNum
    }
    return id
}

export const utilsPlugin: PluginObject<never> = {
    install (Vue) {
        Vue.prototype.$copy = copy
        Vue.prototype.$encrypt = encrypt
        Vue.prototype.$loadScript = loadScript
        Vue.prototype.$formatTime = formatDateTime
    }
}
