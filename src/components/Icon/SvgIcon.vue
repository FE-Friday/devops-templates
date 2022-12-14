<template>
    <span class="g-flex icon-content" :style="display">
        <span
            v-if="isSingle"
            class="g-flex"
            :style="top"
            :title="svgTitle">
            <svg
                :width="size"
                :height="size"
                :style="{ fill: color }"
                @click.stop.prevent="itemClick"
                class="icon">
                <use v-bind="{ 'xlink:href': `#${name}` }"></use>
            </svg>
        </span>
        <span v-else class="tw-doc-svg-icon g-flex svg-box" :style="top">
            <i v-for="(icon, index) in icons" :key="index" v-bk-tooltips.top="icon.name">
                <svg
                    :width="size"
                    :height="size"
                    :style="{ fill: color }"
                    class="block">
                    <use v-bind="{ 'xlink:href': `#${icon.ico}` }"></use>
                </svg>
            </i>
        </span>
    </span>
</template>

<script>
    /**
     * 单个图标展示：:name="tw-bug"
     * 多个图标展示：:icons="icons"
     * icons: [
     *     {
     *         ico: 'tw-bug',
     *         name: 'bug'
     *     }
     * ]
     */
    export default {
        name: 'SvgIcon',
        props: {
            name: {
                type: String,
                default: ''
            },
            icons: {
                type: Array,
                default: () => []
            },
            size: {
                type: [String, Number],
                default: 16
            },
            color: {
                type: String,
                default: 'currentColor'
            },
            display: {
                type: String,
                default: 'flex'
            },
            top: {
                type: String,
                default: ''
            },
            svgTitle: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
            }
        },
        computed: {
            isSingle () {
                return this.name !== ''
            }
        },
        methods: {
            itemClick (item, index, row) {
                this.$emit('item-click', item, index, row)
            }
        }
    }
</script>
<style lang="scss" scoped>
.svg-box {
    display: flex;
    align-items: center;
    position: relative;

    &:hover .nav-text {
        opacity: 1;
        visibility: visible;
    }
}
.icon-content{
    justify-content: center
}
.tw-doc-svg-icon i {
    margin-right: 5px;
    position: relative;

    &:hover .nav-text {
        opacity: 1;
        visibility: visible;
    }
}

.block {
    display: block;
}
</style>
