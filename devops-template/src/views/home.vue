<template>
    <div class="template-home">
        <router-view class="main-page"></router-view>
    </div>
</template>

<script>
    // import { getSomething } from '@/api/template'
    import '@/components/Common/Icon/index.js'
    export default {
        name: 'home',
        data () {
            return {
            }
        },
        computed: {},
        watch: {},
        async created () {},
        methods: {}
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/conf';
    .template-home {
        display: flex;
        height: 100%;
        overflow: hidden;
        flex-direction: column;
    }
        @media (max-width: 1366px) {
            .template-home {
                overflow: auto;
            }
        }
</style>
