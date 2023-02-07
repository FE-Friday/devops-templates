<template>
    <div class="side-menu">
        <!-- 一级菜单 -->
        <div class="side-menu-static">
            <router-link
                v-for="(menu, index) in menuList"
                :key="index"
                :to="menu.menuTo"
                custom
                v-slot="{ route, isActive }"
            >
                <div :class="['g-pointer side-menu-static-item', isActive ? 'is-actived' : '']" @click="navigate(route)">
                    <svg-icon class="mb5" size="18" :name="menu.menuIcon"></svg-icon>
                    {{ menu.menuLabel }}
                </div>

            </router-link>
        </div>

        <!-- 二级菜单 -->
        <div class="side-menu-sticky" :style="{ left: isCollapsed ? '-135px' : '60px' }">
            <router-link
                class="side-menu-sticky-item"
                active-class="is-actived"
                v-for="(menu, index) in subMenu"
                :key="index"
                :to="menu.menuTo"
            >
                <svg-icon class="mr5" size="12" :name="menu.menuIcon"></svg-icon>
                {{ menu.menuLabel }}
            </router-link>
            <div class="collapse-icon" @click="collapseMenu">
                <i class="bk-icon icon-angle-left"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { Route } from 'vue-router'
    import { mapActions, mapState } from 'pinia'
    import { useGlobalStore } from '@/stores/global'

    type MenuItem = {
        menuLabel: string
        menuIcon: string
        menuName: string
        menuTo: string
        subMenu?: MenuItem[]
    }

    export default defineComponent({
        name: 'side-menu',
        data () {
            return {
                menuList: [
                    {
                        menuLabel: 'Page-1',
                        menuIcon: 'dashboard',
                        menuName: 'page-1',
                        menuTo: '/page-1'
                    },
                    {
                        menuLabel: 'Page-2',
                        menuIcon: 'datasource',
                        menuName: 'page-2',
                        menuTo: '/page-2',
                        subMenu: [
                            {
                                menuLabel: 'Page-2-1',
                                menuIcon: 'task',
                                menuName: 'task',
                                menuTo: '/page-2/page-2-1'
                            },
                            {
                                menuLabel: 'Page-2-2',
                                menuIcon: 'params',
                                menuName: 'page-2-2',
                                menuTo: '/page-2/page-2-2'
                            }
                        ]
                    }
                ] as MenuItem[],
                subMenu: []
            }
        },
        computed: {
            ...mapState(useGlobalStore, ['isCollapsed'])
        },
        created () {
            this.navigate(this.$route)
        },
        methods: {
            ...mapActions(useGlobalStore, ['setMenuStatus']),
            collapseMenu () {
                this.setMenuStatus(!this.isCollapsed)
            },
            navigate (route: Route) {
                const { name, meta: { parent } } = route
                const menu = this.menuList.find(menu => menu.menuName === (parent ?? name))
                const subMenu = menu?.subMenu
                if (subMenu?.length) {
                    this.subMenu = menu.subMenu
                    this.setMenuStatus(false)
                    if (subMenu.find(item => item.menuName === this.$route.name)) {
                        return
                    }
                } else {
                    this.subMenu = []
                    this.setMenuStatus(true)
                }
                if (this.$route.name !== name) {
                    this.$router.push({ name })
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
