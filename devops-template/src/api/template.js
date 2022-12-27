const vue = new window.Vue()
const prefix = 'template/api'

function joinUrl (query) {
    let qs = ''
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        const val = encodeURIComponent(query[key])
        if (index === 0) qs += `?${key}=${val}`
        else qs += `&${key}=${val}`
    })
    return qs
}

export function getSomething (query = {}) {
    return vue.$ajax.get(`${prefix}/user/get${joinUrl(query)}`)
}
