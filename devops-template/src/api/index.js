import Vue from 'vue'

function joinUrl (url, query) {
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        const val = query[key]
        if (index === 0) url += `?${key}=${val}`
        else url += `&${key}=${val}`
    })
    return url
}

export function ajax (prefix, method, url, { query = {}, params } = {}, header = 'application/json; charset=UTF-8') {
    return new Promise((resolve) => {
        url = joinUrl(prefix + url, query)
        const apiFun = Vue.prototype.$ajax[method]
        Vue.prototype.$ajax.defaults.headers.post['Content-Type'] = header
        apiFun(url, params).then((res) => {
            resolve(res)
        }).catch((err) => {
            const message = err.message || '接口请求失败'
            Vue.prototype.$bkMessage({ message, theme: 'error', limit: 1 })
            resolve()
        })
    })
}
