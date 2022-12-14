const vue = new window.Vue()
const projPrefix = '/project/api'

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

const projectApi = {
    // 获取项目
    getProjects () {
        return vue.$ajax.get(`${projPrefix}/user/project/cw/cardList`)
    },
}

export default projectApi
