<template>
    <bk-dialog v-model="dialog.show"
        width="380"
        ext-cls="cw-dialog"
        :close-icon="false"
        :mask-close="false">
        <div slot="header" class="dialog-header">
            <span class="dialog-header-title">{{ dialog.title }}</span>
            <i class="bk-icon icon-close close-icon" @click="cancel"></i>
        </div>
        <div style="padding: 24px;">
            <i class="bk-icon type-icon" :class="typeList[type]"></i>
            <span class="dialog-context">{{ dialog.context }}</span>
        </div>
        <div slot="footer">
            <bk-button @click="cancel">取消</bk-button>
            <bk-button theme="primary" @click="confirm">确定</bk-button>
        </div>
    </bk-dialog>
</template>
<script>
    export default {
        props: {
            dialog: Object,
            type: String
        },
        data () {
            return {
                typeList: {
                    success: 'icon-check-1 success',
                    warning: 'icon-exclamation warning',
                    error: 'icon-close error'
                }
            }
        },
        methods: {
            confirm () {
                this.$emit('confirm', this.dialog.data)
            },
            cancel () {
                this.$emit('cancel')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .type-icon {
        width: 26px;
        height: 26px;
        line-height: 26px;
        font-size: 24px;
        color: #fff;
        border-radius: 50%;
    }
    .error {
        background-color: #EA3736;
    }
    .warning {
        background-color: #FFB549;
    }
    .success {
        background-color: #14AB5B;
    }
    .dialog-context {
        font-size: 14px;
        font-weight: 500;
        color: #081E40;
        margin-left: 12px;
    }
    ::v-deep .cw-dialog {
        .bk-dialog-header {
            width: 100%;
            position: relative;
            top: -15px;
            padding: 0 20px 15px;
            border-bottom: 1px solid #EBEDF0;
        }
    }
    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-title {
            font-size: 16px;
            font-weight: 500;
            color: #081E40;
        }
        .close-icon {
            cursor: pointer;
            font-size: 18px;
            &:hover {
                color: #3a84ff;
                background-color: #3a84ff1a;
            }
        }
    }
</style>
