<template>
    <span class="g-flex" :style="display">
        <span class="g-flex svg-box g-pointer" :style="top">
            <svg :width="size" :height="size" :style="{ fill: color }" @click.stop.prevent="itemClick" class="icon">
                <use v-bind="{ 'xlink:href': `#${name}` }"></use>
            </svg>
        </span>
    </span>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
            icons: {
                type: Array,
                default: []
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
            }
        },
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            itemClick (item, index, row) {
                this.$emit('item-click', item, index, row)
            }
        }
    }
</script>
<style lang="scss" scoped>
.svg-box {display: flex; align-items: center;position: relative;&:hover .nav-text{opacity: 1; visibility: visible;}}
// .tw-svg-icon i {margin-right: 5px;position: relative; &:hover .nav-text{opacity: 1; visibility: visible;}}
.nav-text{position: absolute; top: -5px; left: 24px;z-index:10; white-space: nowrap; background-color: #191929; font-size: 12px; color: #fff; margin: 0; padding: 4px 10px; border-radius: 4px; transition:opacity .2s ease; opacity: 0; visibility: hidden;}
.nav-text::after{content: ''; position: absolute; left: -3px; top: 9px; width: 8px; height: 8px; background-color: #191929; transform: rotate(45deg);}
.block{display:block;}
</style>
