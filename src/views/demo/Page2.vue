<template>
    <div class="page-2">
        <router-view></router-view>
    </div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'page-2',
        data () {
            return {}
        },
        computed: {},
        created () {
            // TODO
        },
        mounted () {
            // TODO
        },
        methods: {}
    })
</script>

<style lang="scss" scoped>
.page-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 50px);
    background: #fff;
    border-radius: 2px;
    padding-top: 100px;
}
</style>
