<template>
    <div class="devops-navigation">
        <div class="devops-logo">
            <svg width="48" height="14" class="devops-navigation-logo">
                <use xlink:href="#c-meas"></use>
            </svg>
            <!-- <span class="devops-navigation-item-separator">/</span> -->
            <svg width="10" height="10" class="devops-navigation-item-separator">
                <use xlink:href="#separator"></use>
            </svg>
        </div>
        <div
            class="devops-navigation-item"
            v-for="(item,index) in pathList"
            :key="index">
            <span
                class="devops-navigation-item-inner g-pointer"
                @click="jump(item)"
                :title="item.title"
            >
                {{ item.title }}
            </span>
            <svg width="10" height="10" class="devops-navigation-item-separator">
                <use xlink:href="#separator"></use>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { Location, Route, RouteRecord } from 'vue-router'

    type NavigationPath = {
        name: string
        title: string
        redirect: Location
        path: string
        to: {
            name: string
            params: Record<string, unknown>
        }
    }

    export default defineComponent({
        name: 'navigation',
        data () {
            return {
                pathList: []
            }
        },
        watch: {
            $route: {
                handler (to: Route) {
                    this.generatePath(to)
                },
                immediate: true
            }
        },
        methods: {
            generatePath (to?: Route) {
                const { params, matched } = to ?? this.$route
                this.pathList = matched.map((item: RouteRecord) => {
                    const { name, redirect = { name: '' }, meta: { title } } = item
                    return {
                        name,
                        title,
                        redirect,
                        to: {
                            name,
                            params
                        }
                    }
                }).slice(1)
            },
            jump (path: NavigationPath) {
                if (this.$route.name !== path.name) {
                    const toPath = this.judge(path)
                    if (toPath) {
                        this.$router.push(toPath)
                    }
                }
            },
            judge (path: NavigationPath) {
                const current = this.$route.name
                const to = path.redirect.name
                if (path.redirect?.name !== current) {
                    const next = this.pathList.find(item => item.name === to)
                    if (next) {
                        this.judge(next)
                    } else {
                        return path
                    }
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
.devops-navigation {
    display: flex;
    align-items: center;
    height: 40px;
    position: sticky;
    top: 0;
    z-index: 1;
    color: #081E40;

    &-item {
        &:last-child {
            .devops-navigation-item {
                &-inner {
                    color: #8797AA;
                    cursor: default;
                    max-width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    display: inline-block;
                    vertical-align: bottom;
                    text-overflow: ellipsis;
                }

                &-separator {
                    display: none;
                }
            }
        }

        &-separator {
            margin: 0 4px;
        }
    }
}

</style>
