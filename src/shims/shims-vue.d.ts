declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module '*.json' {
    const value: Record<string, unknowm>
    export default value
}

declare module '@devops/bk-magic-vue' {
    import bkMagicVue from '@devops/bk-magic-vue'
    export default bkMagicVue
}
