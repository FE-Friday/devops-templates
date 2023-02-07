import Vue from 'vue'
import { joinUrl } from '@/utils'
import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'

const request: AxiosInstance = axios.create({
    baseURL: '/ms',
    validateStatus: status => {
        if (status > 400) {
            console.warn(`HTTP 请求出错 status: ${status}`)
        }
        return status >= 200 && status <= 503
    },
    withCredentials: true
})

const _download: AxiosInstance = axios.create({
    baseURL: '/ms',
    validateStatus: status => {
        if (status > 400) {
            console.warn(`HTTP 请求出错 status: ${status}`)
        }
        return status >= 200 && status <= 503
    },
    responseType: 'blob',
    withCredentials: true
})

function errorHandler (error: AxiosError) {
    if (error && error.response) {
        error.message = `请求出错（${error.response.status}）!`
    } else {
        // 请求超时或者网络有问题
        if (error.message.includes('timeout')) {
            error.message = '请求超时！请检查网络是否正常'
        } else {
            error.message = '请求失败，请检查网络是否已连接'
        }
    }
    return Promise.reject(error)
}

[request, _download].forEach(item => {
    item.interceptors.request.use(config => {
        return config
    })
    item.interceptors.response.use(response => {
        const { data: { code, data, message, status }, status: httpStatus } = response

        if (httpStatus === 401) {
            Vue.prototype.$toggleLoginDialog()
            return Promise.reject({ // eslint-disable-line
                status: httpStatus,
                message: '登录过期，请重新登录'
            })
        } else if (httpStatus === 500 || httpStatus === 503 || httpStatus === 502) {
                return Promise.reject({ // eslint-disable-line
                status: httpStatus,
                message: message ?? '服务异常，请联系管理员'
            })
        } else if (httpStatus === 400 || httpStatus === 404) {
                return Promise.reject({ // eslint-disable-line
                status: httpStatus,
                message: message ?? '接口请求失败，请联系管理员'
            })
        } else if ((typeof code !== 'undefined' && code !== 0) || (typeof status !== 'undefined' && status !== 0)) {
            let msg = message
            if (Object.prototype.toString.call(message) === '[object Object]') {
                msg = Object.keys(message).map(key => message[key].join(';')).join(';')
            } else if (Object.prototype.toString.call(message) === '[object Array]') {
                msg = message.join(';')
            }
            const errorMsg = { httpStatus, message: msg, code: code || status }
            return Promise.reject(errorMsg)
        }
        return data || response
    }, errorHandler)
})

type Argvs = {
    query?: Record<string, string | number | boolean>,
    params?: Record<string, unknown>
}

export function download (method: Method, url: string, argvs: Argvs = { query: {}, params: {} }, msName = 'insight', header = 'application/json; charset=UTF-8') {
    return new Promise((resolve, reject) => {
        url = msName + '/api' + joinUrl(url, argvs.query ?? {})
        const apiFun: AxiosInstance = _download[method]
        _download.defaults.headers.common['Content-Type'] = header
        apiFun(url, argvs.params).then((res: AxiosResponse) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function ajax (method: Method, url: string, argvs: Argvs = { query: {}, params: {} }, msName = 'insight', header = 'application/json; charset=UTF-8') {
    return new Promise((resolve, reject) => {
        url = msName + '/api' + joinUrl(url, argvs.query ?? {})
        const apiFun: AxiosInstance = request[method]
        request.defaults.headers.common['Content-Type'] = header
        apiFun(url, argvs.params).then((res: AxiosResponse) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
