// time
export function formatDate (value) {
    // 10或13时间戳转换成字符串显示
    const time = (value + '').length === 10 ? value * 1000 : value
    const date = new Date(parseInt(time))
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

// 判断str是否为json
export function isJson (str) {
    if (typeof str === 'string') {
        try {
            const obj = JSON.parse(str)
            return typeof obj === 'object' && obj
        } catch (e) {
            console.log('error：' + str + '!!!' + e)
            return false
        }
    }
}

export function addZero (num) {
    return num < 10 ? '0' + num : num
}

export function formatDateTime (date, format) {
    const time = new Date(Date.parse(date))
    time.setTime(time.setHours(time.getHours() + 8))

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
export function joinUrl (url, query) {
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        const val = query[key]
        if (index === 0) url += `?${key}=${val}`
        else url += `&${key}=${val}`
    })
    return url
}

/**
 * 生成uuid唯一码
 * len: 生成uuid的长度
 * radix: 基数
 */
export function generateUuid (len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    let i = ''
    radix = radix || chars.length
 
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        // rfc4122, version 4 form
        let r
 
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
 
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    return uuid.join('')
}

/**
 *  在一个元素为对象的数组中，根据oldKey: oldValue找到指定的数组元素，并返回该数组的index
 *  @param arr - 元素为对象的数组
 *  @param oldKey - 查找的key
 *  @param oldValue - 查找的value
 *  @return result - 找到的index值，未找到返回-1
 */
export function findIndexByKeyValue (arr, oldKey, oldValue) {
    let result

    arr.some((v, i) => {
        for (const _key in v) {
            if (_key === oldKey && v[_key] === oldValue) {
                result = i
                break
            }
        }
    })

    return result
}

export function findIndexByKey (arr, firstKey, secondKey, value) {
    let result

    arr.some((v, i) => {
        for (const _key in v) {
            if (_key === firstKey && v[firstKey] && v[firstKey] === value) {
                result = i
                break
            } else if (_key === secondKey && v[secondKey] && v[secondKey] === value) {
                result = i
                break
            }
        }
    })

    return result
}

/**
 *  在一个元素为对象的数组中，根据oldKey: oldValue找到指定的数组元素，并返回该数组元素中指定key的value
 *  @param arr - 元素为对象的数组
 *  @param oldKey - 查找的key
 *  @param oldValue - 查找的value
 *  @param key - 需要返回的value的指定的key
 *  @return result - 找到的value值，未找到返回undefined
 */
export function findValByKeyValue (arr, oldKey, oldValue, key) {
    let result

    for (const obj of arr) {
        for (const _key in obj) {
            if (_key === oldKey && obj[_key] === oldValue) {
                result = obj[key]

                break
            }
        }
    }

    return result
}

/**
 * 计算绝对定位元素位置
 */
export function computeFixedEle (e, target) {
    if (Array.isArray(target)) {
        target = target[0]
    }
    const selfH = Object.prototype.toString.call(target) === '[object Object]'
        ? target.$el.offsetHeight
        : target.offsetHeight
    const selfW = Object.prototype.toString.call(target) === '[object Object]'
        ? target.$el.offsetWidth
        : target.offsetWidth
    const position = {
        left: e.x - e.offsetX + 'px',
        top: e.y - e.offsetY + selfH + 'px',
        width: selfW + 'px'
    }
    return position
}

/**
 * 随机生成十六进制颜色
 */
export function getRandomColor () {
    /* return '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
        return i > 5 ? null : a[Math.floor(Math.random() * 16)]
    }).join('') */
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return {
        full: 'rgba(' + r + ',' + g + ',' + b + ',1)',
        alpha: 'rgba(' + r + ',' + g + ',' + b + ',0.1)'
    }
}

/**
 * 防抖
 * @param {*} fn 要执行的函数
 * @param {*} delay 延时
 */
export function _debounce (fn, delay = 200) {
    let timer
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
