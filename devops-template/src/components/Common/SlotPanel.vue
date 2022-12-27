<template>
    <section class="schedule-panel" :style="{ ...panelPosition, padding: padding + 'px', height: height + 'px', width: width + 'px', maxHeight: height + 'px' }">
        <slot name="cw-content"></slot>
    </section>
</template>
<script>
    export default {
        props: {
            positionObj: {
                required: true,
                type: Object
            },
            height: {
                required: false,
                type: Number,
                default: () => 200
            },
            width: {
                required: false,
                type: Number,
                default: () => 380
            },
            padding: {
                required: false,
                type: Number,
                default: () => 15
            }
        },
        data () {
            return {
                panelPosition: {}
            }
        },
        computed: {
            
        },
        created () {
            const bodyH = document.body.offsetHeight
            this.$nextTick(() => {
                const { x, y, offsetX, offsetY, target: { offsetHeight } } = this.positionObj
                const finalY = y - offsetY + offsetHeight
                const top = bodyH - finalY > this.height ? finalY + 5 + 'px' : y - offsetY - this.height - 5 + 'px'
                this.panelPosition = {
                    left: x - offsetX + 'px',
                    top: top
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
.schedule-panel {
    position: fixed;
    background-color: #fff;
    // padding: 15px;
    box-shadow: -2px 0 2px #ececec, 0 2px 2px #ececec, 2px 0 2px #ececec, 0 -2px 2px #ececec;
    z-index: 5;
    overflow: hidden;
    overflow-y: auto;
}
</style>
