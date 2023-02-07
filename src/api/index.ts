import { PluginObject } from 'vue'

const modulesFiles = require.context('./modules', false, /\.ts$/)

export type ModulesType = {
    [key: string]: Record<string, <T = any>(...argvs: unknown[]) => Promise<T>>;
}

const modules: ModulesType = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default modules

export const apiPlugin: PluginObject<never> = {
    install (Vue) {
        Vue.prototype.$api = modules
    }
}
