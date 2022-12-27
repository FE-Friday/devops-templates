<template>
    <section>
        <bk-sideslider :is-show.sync="sideSlider.isShow" :quick-close="true" :width="width" class="schedule-slider">
            <div slot="header">{{ title }}</div>
            <div slot="content" class="g-100H schedule-slider-outer">
                <div class="schedule-slider-content">
                    <slot name="cw-content"></slot>
                </div>
                <slot name="cw-footer"></slot>
            </div>
        </bk-sideslider>
    </section>
</template>
<script>
    export default {
        props: {
            title: {
                required: true,
                type: String,
                default: () => ''
            },
            sideSlider: {
                required: true,
                type: Boolean,
                default: () => {
                    return {
                        isShow: false
                    }
                }
            },
            width: {
                required: false,
                type: Number,
                default: () => 750
            }
        }
    }
</script>
<style lang="scss" scoped>
.schedule-slider{
    ::v-deep .bk-sideslider-wrapper{
        padding-bottom: 0;
    }

    ::v-deep .bk-sideslider-content {
        position: relative;
        height: calc(100vh - 60px);
    }

    &-outer {
        display: flex;
        flex-direction: column;
    }
    &-content {
        padding: 20px;
        // max-height: calc(100% - 57px);
        // height: calc(100% - 57px);
        flex: 1;
        overflow-y: auto;
    }

    /* &-footer{
        text-align: right;
        padding: 0 24px;
        line-height: 56px;
        background-color: #fafbfd;
        border-top: 1px solid #dcdee5;
        border-radius: 2px;
        height: 57px;
    } */
}
</style>
