<template>
    <section>
        <bk-dialog v-model="dialog.visiable"
            theme="primary"
            :mask-close="maskClose"
            :render-directive="'if'"
            :header-position="headerPosition"
            :title="title" :width="width">
            <div class="dialog-content" ref="dialogContent">
                <slot name="cw-content"></slot>
            </div>
            <div slot="footer" ref="dialogFooter">
                <slot name="cw-footer"></slot>
            </div>
        </bk-dialog>
    </section>
</template>
<script>
    export default {
        props: {
            dialog: {
                required: true,
                type: Object,
                default: () => {
                    return {
                        visiable: false
                    }
                }
            },
            maskClose: {
                required: false,
                type: Boolean,
                default: () => false
            },
            headerPosition: {
                required: false,
                type: String,
                default: () => 'left'
            },
            title: {
                required: false,
                type: String,
                default: () => ''
            },
            width: {
                required: false,
                type: Number,
                default: () => 750
            }
        },
        data () {
            return {
                position: {
                    top: 0
                }
            }
        },
        computed: {
        },
        mounted () {
            const bodyH = document.body.offsetHeight - 50 // 575
            if (bodyH < 600) {
                this.position.top = 70
            } else {
                this.position.top = 150
            }
            /* const dialogHeader = 65
            this.$nextTick(() => {
                const contentH = this.$refs.dialogContent.offsetHeight // 385
                const footH = this.$refs.dialogFooter.offsetHeight // 是32的话就是57，顶部65
                this.top = (bodyH - dialogHeader - contentH - footH) / 2 + 50 + 'px'
            }) */
        }
    }
</script>
<style lang="scss" scoped>
::v-deep .bk-dialog {
    &.big {
        .bk-dialog-content {
            height: 400px;
        }
    }
    .bk-dialog-content {
        max-height: 550px;
        .bk-dialog-body {
            overflow: auto;
            height: auto;
            max-height: 450px;
        }

            .bk-dialog-header {
            margin-top: -10px;
            padding: 3px 24px 10px!important;
        }
    }
}

::v-deep .bk-dialog-wrapper{
    overflow: hidden;
}
</style>
