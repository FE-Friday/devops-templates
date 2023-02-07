import SvgIcon from '@/components/SvgIcon/index.vue'
import { PluginObject } from 'vue'

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
const req = require.context('@/assets/imgs/svg', false, /\.svg$/)
requireAll(req)

const reg = /^\.\/(.*)\.svg$/
export const iconNames = req.keys().map(dir => dir.match(reg)[1])

export const svgIconPlugin: PluginObject<never> = {
    install (Vue) {
        Vue.component('SvgIcon', SvgIcon)
    }
}
