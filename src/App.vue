<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
    import Vue, { defineComponent } from 'vue'
    import { mapActions, mapState } from 'pinia'
    import { useGlobalStore } from './stores/global'

    export default defineComponent({
        name: 'devops-app',
        computed: {
            ...mapState(useGlobalStore, ['publicKey'])
        },
        watch: {
            '$route.fullPath': {
                handler () {
                    this.$syncUrl()
                },
                immediate: true
            }
        },
        async created () {
            const callback = (e: PromiseRejectionEvent | Error, showMessage = true) => {
                console.error(e)
                const err = e instanceof Error ? e.message : e.reason
                showMessage && this.$bkMessage({
                    message: err.message ?? err,
                    theme: 'error',
                    ellipsisLine: 2,
                    ellipsisCopy: true
                })
            }
            window.addEventListener('unhandledrejection', callback)
            Vue.config.errorHandler = e => callback(e, !e.stack.includes('bk-magic-vue')) // 不将组件报错打印到屏幕上
        },
        methods: {
            ...mapActions(useGlobalStore, ['fetchPublicKey'])

        }
    })
</script>

<style lang="scss">
@import './assets/index.scss';
</style>
