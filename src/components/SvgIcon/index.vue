<template>
    <span :class="['meas-svg-icon', 'g-flex', disabled ? 'is-disabled' : '']" @click="itemClick">
        <span class="g-flex" :title="title">
            <svg
                :width="size"
                :height="size"
                :style="{ fill: color }">
                <use v-bind="{ 'xlink:href': `#${name}` }"></use>
            </svg>
        </span>
    </span>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'svg-icon',
        props: {
            name: {
                type: String,
                default: ''
            },
            size: {
                type: [String, Number],
                default: 16
            },
            color: {
                type: String,
                default: 'currentColor'
            },
            title: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            stop: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
            }
        },
        methods: {
            itemClick () {
                if (this.stop) event.stopPropagation()
                if (!this.disabled) {
                    this.$emit('item-click')
                }
            }
        }
    })
</script>
<style lang="scss" scoped>
.meas-svg-icon {
    &.is-disabled {
        cursor: not-allowed;

        svg {
            fill: #cbd5e0!important;
        }
    }
}
</style>
