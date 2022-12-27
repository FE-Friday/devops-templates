// import Vue from 'vue'
export function joinUrl (url, query) {
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        const val = query[key]
        if (index === 0) url += `?${key}=${val}`
        else url += `&${key}=${val}`
    })
    return url
}
export function isVNode (node) {
    return typeof node === 'object' && node.hasOwnProperty('componentOptions')
}

export function isInArray (ele, array) {
    for (const item of array) {
        if (item === ele) {
            return true
        }
    }
    return false
}

export function isInlineElment (node) {
    const inlineElements = [
        'a',
        'abbr',
        'acronym',
        'b',
        'bdo',
        'big',
        'br',
        'cite',
        'code',
        'dfn',
        'em',
        'font',
        'i',
        'img',
        'input',
        'kbd',
        'label',
        'q',
        's',
        'samp',
        'select',
        'small',
        'span',
        'strike',
        'strong',
        'sub',
        'sup',
        'textarea',
        'tt',
        'u',
        'var'
    ]
    const tag = node.tagName.toLowerCase()
    const display = getComputedStyle(node).display

    if (
        (isInArray(tag, inlineElements) && display === 'index')
    || display === 'inline'
    ) {
        console.warn(
            'Binding node is displayed as inline element. To avoid some unexpected rendering error, please set binding node displayed as block element.'
        )

        return true
    }

    return false
}

/**
 *  获取元素相对于页面的高度
 *  @param node {NodeElement} 指定的DOM元素
 */
export function getActualTop (node) {
    let actualTop = node.offsetTop
    let current = node.offsetParent

    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }

    return actualTop
}

/**
 *  获取元素相对于页面左侧的宽度
 *  @param node {NodeElement} 指定的DOM元素
 */
export function getActualLeft (node) {
    let actualLeft = node.offsetLeft
    let current = node.offsetParent

    while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
    }

    return actualLeft
}

/**
 *  对元素添加样式类
 *  @param node {NodeElement} 指定的DOM元素
 *  @param className {String} 类名
 */
export function addClass (node, className) {
    const classNames = className.split(' ')
    if (node.nodeType === 1) {
        if (!node.className && classNames.length === 1) {
            node.className = className
        } else {
            let setClass = ' ' + node.className + ' '
            classNames.forEach(cl => {
                if (setClass.indexOf(' ' + cl + ' ') < 0) {
                    setClass += cl + ' '
                }
            })
            const rtrim = /^\s+|\s+$/
            node.className = setClass.replace(rtrim, '')
        }
    }
}

/**
 *  对元素删除样式类
 *  @param node {NodeElement} 指定的DOM元素
 *  @param className {String} 类名
 */
export function removeClass (node, className) {
    const classNames = className.split(' ')
    if (node.nodeType === 1) {
        let setClass = ' ' + node.className + ' '
        classNames.forEach(cl => {
            setClass = setClass.replace(' ' + cl + ' ', ' ')
        })
        const rtrim = /^\s+|\s+$/
        node.className = setClass.replace(rtrim, '')
    }
}

/**
 *  将传入的配置项转成本地的对象
 *  @param config {Object} 传入的对象
 *  @return obj {Object} 本地化之后的对象
 */
export function localizeConfig (config) {
    const obj = {}

    for (const key in config) {
        obj[key] = config[key]
    }

    return obj
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

export function deepClone (obj) {
    const _obj = {}

    for (const key in obj) {
        if (obj[key].toString().toLowerCase() === '[object object]') {
            _obj[key] = deepClone(obj[key])
        } else {
            _obj[key] = key === 'text' ? '' : obj[key]
        }
    }

    return _obj
}

/**
 *  将字符串去掉指定内容之后转成数字
 *  @param {String} str - 需要转换的字符串
 *  @param {String} indicator - 需要被去掉的内容
 */
export function converStrToNum (str, indicator) {
    const reg = new RegExp(indicator, 'g')
    const $str = str.replace(reg, '')

    return ~~$str
}

/**
 *  将字符串根据indicator转成数组
 */
export function converStrToArr (str, indicator) {
    return str.length ? str.split(indicator) : []
}

/**
 * 将字符串根据indicator转成数组并将内容都转成Number类型（仅限数组内容均为数字的字符串）
 */
export function convertStrToNumArr (str, indicator) {
    return converStrToArr(str, indicator).map(item => {
        return ~~item
    })
}

/**
 *  将毫秒值转换成x时x分x秒的形式
 *  @param {Number} time - 时间的毫秒形式
 *  @return {String} str - 转换后的字符串
 */
export function convertMStoString (time) {
    function getSeconds (sec) {
        return `${sec}秒`
    }

    function getMinutes (sec) {
        if (sec / 60 >= 1) {
            return `${Math.floor(sec / 60)}分${getSeconds(sec % 60)}`
        } else {
            return getSeconds(sec)
        }
    }

    function getHours (sec) {
        if (sec / 3600 >= 1) {
            return `${Math.floor(sec / 3600)}小时${getMinutes(sec % 3600)}`
        } else {
            return getMinutes(sec)
        }
    }

    function getDays (sec) {
        if (sec / 86400 >= 1) {
            return `${Math.floor(sec / 86400)}天${getHours(sec % 86400)}`
        } else {
            return getHours(sec)
        }
    }

    return time ? getDays(Math.floor(time / 1000)) : '0秒'
}

/**
 *  将毫秒值转换成x时x分x秒的形式并使用格式化规则
 *  @param {Number} time - 时间的毫秒形式
 *  @return {String} str - 转换后的字符串
 */
export function convertMStoStringByRule (time) {
    const str = convertMStoString(time)
    let res = str
    const arr = str.match(/^\d{1,}([\u4e00-\u9fa5]){1,}/)
    if (arr.length) {
        switch (arr[1]) {
            case '秒':
                res = '1分钟内'
                break
            case '天':
                res = `大于${arr[0]}`
                break
            case '时':
                res = str.replace(/\d{1,}秒/, '')
                break
        }
    }
    return res
}

function prezero (num) {
    num = Number(num)

    if (num < 10) {
        return '0' + num
    }

    return num
}

export function convertTime (ms) {
    const time = new Date(ms)

    return `${time.getFullYear()}-${prezero(time.getMonth() + 1)}-${prezero(
        time.getDate()
    )} ${prezero(time.getHours())}:${prezero(time.getMinutes())}:${prezero(
        time.getSeconds()
    )}`
}

/**
 *  转换文件大小
 */
export function convertFileSize (size, unit) {
    const arr = ['B', 'KB', 'MB', 'GB', 'TB']
    const calcSize = size / 1024
    let index

    arr.some((item, _index) => {
        if (unit === item) {
            index = _index
            return true
        }
        return false
    })

    const next = arr[index + 1]

    if (calcSize > 1024) {
        if (!next) {
            return `${calcSize.toFixed(2)}${unit}`
        } else {
            return convertFileSize(calcSize, next)
        }
    } else {
        return `${calcSize.toFixed(2)}${next || unit}`
    }
}

export function isObject (o) {
    return o !== null && typeof o === 'object' && !Array.isArray(o)
}

export function mergeModules (target, ...modules) {
    return modules.reduce((merged, mod) => {
        Object.keys(mod).map(key => {
            if (isObject(merged[key]) && isObject(mod[key])) {
                merged[key] = {
                    ...merged[key],
                    ...mod[key]
                }
            }
        })

        return merged
    }, target)
}

/**
 * @param {String} selector
 * @param {DOM element} parent
 */
export const getOuterHeight = (selector, parent) => {
    const {
        marginTop,
        height,
        marginBottom
    } = getDOMRect(selector, parent)
    return parseFloat(marginTop) + parseFloat(height) + parseFloat(marginBottom)
}

/**
 * @param {String} selector
 * @param {DOM element} parent
 */
export const getOuterWidth = (selector, parent) => {
    const {
        marginLeft,
        width,
        marginRight
    } = getDOMRect(selector, parent)
    return parseFloat(marginLeft) + parseFloat(width) + parseFloat(marginRight)
}

/**
 * @param {String} selector
 * @param {DOM element} parent
 */
export const getInnerWidth = (selector, parent) => {
    const {
        width
    } = getDOMRect(selector, parent)
    return parseFloat(width)
}

const getDOMRect = (selector, parent) => {
    const target = isDOMElement(selector)
        ? selector
        : parent
            ? parent.querySelector(selector)
            : document.querySelector(selector)

    if (!target) {
        return {}
    }

    const style = window.getComputedStyle(target)

    return {
        width: style.width,
        height: style.height,
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight
    }
}

const isDOMElement = obj => {
    return typeof HTMLElement === 'object'
        ? obj instanceof HTMLElement
        : obj
    && typeof obj === 'object'
    && obj !== null
    && obj.nodeType === 1
    && typeof obj.nodeName === 'string'
}

export const deepCopy = obj => {
    return JSON.parse(JSON.stringify(obj))
}

export const hashID = (length = 8) => {
    let pos = 0
    let result = ''
    while (pos < length) {
        const n = Math.round(Math.random() * 126) + 33
        result += String.fromCharCode(n)
        pos++
    }
    return result
}

export function getServiceLogoByPath (link) {
    return link.replace(/\/?(devops\/)?(\w+)\S*$/, '$2')
}

// export function isPublic () {
//     return BUILD_TARGET === 'master'
// }

export function getAtomPath (...args) {
    return args.join('-')
}

/**
 *  获取url参数值
 */
export function getQueryString (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

/**
 *  将毫秒值转换成xx:xx(分:秒)的形式
 *  @param {Number} time - 时间的毫秒形式
 *  @return {String} str - 转换后的字符串
 */
export function coverTimer (time, type) {
    let res = ''

    function getSeconds (sec, min) {
        const m = min / 60 >= 1 ? '' : '00:'
        if (type) {
            res = sec < 10 ? `${m}0${sec}秒` : `${m}${sec}秒`
        } else {
            res = sec < 10 ? `${m}0${sec}` : `${m}${sec}`
        }
        return res
    }

    function getMinutes (sec) {
        if (sec / 60 >= 1) {
            let res = ''
            let m = Math.floor(sec / 60)
            m = m < 10 ? `0${m}` : m
            if (type) {
                res = `${m}分${getSeconds(sec % 60, sec)}`
            } else {
                res = `${m}:${getSeconds(sec % 60, sec)}`
            }
            return res
        } else {
            return getSeconds(sec)
        }
    }

    function getHours (sec) {
        if (sec / 3600 >= 1) {
            let res = ''
            let h = Math.floor(sec / 3600)
            h = h < 10 ? `0${h}` : h
            if (type) {
                res = `${h}时${getMinutes(sec % 3600)}`
            } else {
                res = `${h}:${getMinutes(sec % 3600)}`
            }
            return res
        } else {
            return getMinutes(sec)
        }
    }

    return time ? getHours(Math.floor(time / 1000)) : '00:00'
}

export function isPipelineChanged (p1, p2) {
    if (p1 !== p2) return true
    const s1 = p1.stages
    const s2 = p2.stages
    if (s1.length !== s2.length) return true
    for (let i = 0; i < s1.length; i++) {
        const c1 = s1[i].containers
        const c2 = s2[i].containers
        if (c1.length !== c2.length) return true
        for (let j = 0; j < c1.length; j++) {
            const cObj1 = c1[j]
            const cObj2 = c2[j]
            for (const k in cObj1) {
                if (k !== 'id' && k !== 'elements' && k !== 'isError') {
                    if (cObj1.hasOwnProperty(k) !== cObj2.hasOwnProperty(k)) return true
                } else if (k === 'elements') {
                    const e1 = cObj1[k]
                    const e2 = cObj2[k]
                    if (e1.length !== e2.length) return true
                    for (let l = 0; l < e1.length; l++) {
                        const eObj1 = e1[l]
                        const eObj2 = e2[l]

                        for (const m in eObj1) {
                            if (m !== 'id' && m !== 'isError') {
                                if (eObj1[m] !== eObj2[m]) return true
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}

/**
 * 获取页面中滚动条宽度
 */
let cached
export function getScrollBarSize (fresh) {
    if (fresh || cached === undefined) {
        const inner = document.createElement('div')
        inner.style.width = '100%'
        inner.style.height = '200px'

        const outer = document.createElement('div')
        const outerStyle = outer.style

        outerStyle.position = 'absolute'
        outerStyle.top = 0
        outerStyle.left = 0
        outerStyle.pointerEvents = 'none'
        outerStyle.visibility = 'hidden'
        outerStyle.width = '200px'
        outerStyle.height = '150px'
        outerStyle.overflow = 'hidden'

        outer.appendChild(inner)

        document.body.appendChild(outer)

        const widthContained = inner.offsetWidth
        outer.style.overflow = 'scroll'
        let widthScroll = inner.offsetWidth

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth
        }

        document.body.removeChild(outer)

        cached = widthContained - widthScroll
    }
    return cached
}
export function test (curObj, ele) {
    return Object.prototype.toString.call(curObj.$refs[ele])
    === '[object HTMLDivElement]'
        ? curObj.$refs[ele].offsetHeight
        : curObj.$refs[ele].$el.offsetHeight
}

/**
 * 获取元素高度
 * 第一个参数：页面this对象
 * 第二个参数：页面总高度
 * 其他参数：其他元素ref
 * 43:tab的padding,30:content的padding,40:表头
 */
export function getEleHeight (param) {
    const transArr = Array.prototype.slice.call(arguments)
    const rootEle = arguments[0]
    const refsArr = transArr.slice(2)
    const total = transArr[1]
    let sum = 0
    refsArr.forEach(item => {
        return (sum += test(rootEle, item))
    })
    const lastH = test(rootEle, total) - sum - 43 - 30 - 40 + 'px'
    return lastH
}

/**
 * 检测storage变化
 * key: 要存储的名字
 * fn: 触发storage后要执行的方法
 * value: 自己设置存的值， 利用这个值跨页面传参
 */
export function storageChange (key, fn, value) {
    const val = value || ''
    localStorage.setItem(key, val)
    window.addEventListener('storage', function (e) {
        if (e.key === key) {
            fn(e.newValue, e.oldValue)
        }
    })
}

/**
 * 防抖
 */
// 非立即执行版
export function debounce (fn, delay = 300) { // 默认300毫秒
    let timer
    return function () {
        const args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args) // this 指向vue
        }, delay)
    }
}
// 立即执行版
// export function debounce(func, delay = 300) {
//   var timer = null;
//   var startTime = Date.now();
//   return function() {
//       var curTime = Date.now();
//       var remaining = delay - (curTime - startTime);
//       var context = this;
//       var args = arguments;
//       clearTimeout(timer);
//       if (remaining <= 0) {
//           func.apply(context, args);
//           startTime = Date.now();
//       } else {
//           timer = setTimeout(func, remaining);
//       }
//   }
// }

/**
 * 转换转义字符
 */
export function escape2Html (str) {
    const arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    }
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t]
    })
}

// export function encode (item, times) { // base64加密
//     for (let i = 0; i < times; i++) {
//         item = Base64.encode(item)
//     }
//     return item
// }

// export function decode (item, times) { // base64解密
//     for (let i = 0; i < times; i++) {
//         item = Base64.decode(item)
//     }
//     return item
// }

export function getBrowserInfo () { // 得出浏览器类型和版本  例如：["chrome/81.0.4044.122"] 是个数组类型
    const agent = navigator.userAgent.toLowerCase()
    const regStrIe = /msie [\d.]+;/gi
    // var regStrFf = /firefox\/[\d.]+/gi
    // var regStrChrome = /chrome\/[\d.]+/gi ;
    const regStrFf = /firefox/gi
    const regStrChrome = /chrome/gi
    const regStrSaf = /safari/gi
    // var regStr_saf = /safari\/[\d.]+/gi ;
    // IE11以下
    if (agent.indexOf('msie') > 0) {
        return agent.match(regStrIe)
    }
    // IE11版本中不包括MSIE字段
    if (agent.indexOf('trident') > 0 && agent.indexOf('rv') > 0) {
        return 'IE ' + agent.match(/rv:(\d+\.\d+)/)[1]
    }
    // firefox
    if (agent.indexOf('firefox') > 0) {
        return agent.match(regStrFf)
    }
    // Chrome
    if (agent.indexOf('chrome') > 0) {
        return agent.match(regStrChrome)
    }
    // Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
        return agent.match(regStrSaf)
    }
}

export function popoverShowTime (ref) {
    if (!ref) return
    setTimeout(() => {
        ref.hide()
    }, 750)
}

export const formatDate = (dateStr) => {
    const dt = new Date(dateStr)
    const y = dt.getFullYear()
    const m = prezero(dt.getMonth() + 1)
    const d = prezero(dt.getDate())
    const hh = prezero(dt.getHours())
    const mm = prezero(dt.getMinutes())
    const ss = prezero(dt.getSeconds())
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
