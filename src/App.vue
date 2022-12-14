<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'devops-app',
        watch: {
            $route: {
                // eslint-disable-next-line no-unused-vars
                handler (to, from) {
                    this.$syncUrl(to.fullPath) // 同步地址栏链接，未处于Devops内控制台会有报错，无实质影响
                },
                immediate: true
            }
        },
        created () {
            const callback = e => {
                this.$bkMessage({
                    message: (e.reason || e).message,
                    theme: 'error'
                })
            }
            window.addEventListener('unhandledrejection', callback)
            Vue.config.errorHandler = callback
        }
    }
</script>

<style lang="scss">
@import './assets/scss/index.scss';

#app {
    padding-top: 100px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
