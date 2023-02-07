<template>
    <div class="devops-new">
        <SideMenu></SideMenu>
        <div class="devops-new-main" :style="mainStyle">
            <Navigation v-show="!$route.meta.hidden"></Navigation>
            <transition name="bk-fade-in-ease">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    import { mapState } from 'pinia'

    import SideMenu from '@/components/SideMenu/index.vue'
    import Navigation from '@/components/Navigation/index.vue'
    import { useGlobalStore } from '@/stores/global'

    export default defineComponent({
        name: 'devops-home',
        components: {
            SideMenu,
            Navigation
        },
        data () {
            return {
                mainStyle: ''
            }
        },
        computed: {
            ...mapState(useGlobalStore, ['isCollapsed'])
        },
        watch: {
            isCollapsed: {
                handler (val) {
                    this.mainStyle = !val ? `
                            width: calc(100% - 215px);
                            transform: translateX(135px);`
                        : `
                          transform: translateX(0);
                          width: calc(100% - 80px);`
                },
                immediate: true
            }
        }
    })
</script>

<style lang="scss" scoped>
.devops-new {
    display: flex;
    background: #f0f2f5;

    &-main {
        margin: 0 10px 10px;
        border-radius: 2px;
        transition: all .3s;
    }
}
</style>
