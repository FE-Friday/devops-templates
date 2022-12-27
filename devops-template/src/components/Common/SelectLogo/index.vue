<template>
    <section>
        <section class="select-logo" ref="selectLogo">
            <section @click="uploadLogo" class="has-upload">
                <img :src="form[dataKey]" :title="dataKey === 'logoUrl' ? '上传LOGO' : '上传ICON'">
                <span>{{ dataKey === 'logoUrl' ? '编辑LOGO' : '编辑ICON' }}</span>
            </section>
            <!-- <section v-else @click="uploadLogo" :class="[{ 'logo-error': isErr && !form.[key] }, 'un-upload']">
                <i class="devops-icon icon-plus"></i>
                <p> {{ $t('store.上传LOGO') }} </p>
            </section>
            <p v-if="isErr && !form.[key]" class="is-err"> {{ $t('store.Logo必填') }} </p> -->
        </section>
        <select-logo-dialog
            :show-dialog="showDialog"
            :imgs="imgs"
            @toConfirmLogo="toConfirmLogo"
            @toCloseDialog="toCloseDialog"
            :selected-url="selectedUrl"
        ></select-logo-dialog>
    </section>
</template>

<script>
    import selectLogoDialog from './selectLogoDialog'
    export default {
        components: { selectLogoDialog },
        props: {
            form: Object,
            type: String,
            isErr: Boolean,
            label: String,
            right: {
                type: Number,
                default: 0
            },
            top: {
                type: Number,
                default: 0
            },
            aimUrl: {
                type: String,
                default: '/store/api/op/store/logo/upload'
            },
            dataKey: {
                type: String,
                default: 'logoUrl'
            }
        },

        data () {
            return {
                imgs: [],
                showDialog: false,
                selectedUrl: '',
                loading: false
            }
        },

        async created () {
            await this.getImgs()
        },

        methods: {
            scrollIntoView () {
                this.$refs.selectLogo.scrollIntoView()
            },

            getImgs () {
                this.loading = true
                this.$store.dispatch('admin/RDStore/getLogoUrl', { type: this.type })
                    .then((res) => {
                        this.imgs = res || []
                        if (!this.form[this.dataKey]) this.form[this.dataKey] = (this.imgs[0] || {}).logoUrl
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            async uploadHandle (file) {
                const formData = new FormData()
                formData.append('logo', file)
                window.Vue.prototype.$ajax
                    .post(this.aimUrl, formData)
                    .then(iconUrl => {
                        this.form[this.dataKey] = iconUrl.logoUrl
                        this.$bkMessage({
                            theme: 'success',
                            message: 'ICON已成功上传'
                        })
                    }).catch(e => {
                        this.$bkMessage({
                            theme: 'error',
                            message: e.message || 'ICON上传失败'
                        })
                    })
            },

            uploadLogo () {
                this.selectedUrl = this.form[this.dataKey]
                this.showDialog = true
            },

            async toConfirmLogo (file) {
                await this.uploadHandle(file)
                this.showDialog = false
            },

            toCloseDialog () {
                this.showDialog = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/conf';

    .select-logo {
        // position: absolute;
        width: 100px;
        cursor: pointer;
        .un-upload {
            background: rgba(255, 255, 255, 1);
            height: 100px;
            width: 100px;
            border-radius: 2px;
            border: 1px dashed rgba(195, 205, 215, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            &.logo-error {
                border: 1px dashed #ff5656;
            }
        }
        .has-upload {
            position: relative;
            img {
                height: 100px;
                width: 100px;
            }
            > span {
                display: none;
            }
            &:hover {
                > span {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    line-height: 25px;
                    text-align: center;
                    color: #fff;
                    background: black;
                    opacity: 0.7;
                }
            }
        }
        .is-err {
            color: #ff5656;
            text-align: center;
        }
    }

    .logo-dialog {
        .bk-dialog-tool {
            min-height: 19px;
        }
        .bk-dialog-content .bk-dialog-header .bk-dialog-header-inner {
            font-size: 22px;
        }
    }

    .logo-main {
        .logo-pic {
            margin: 0;
            float: left;
            height: 96px;
            width: 96px;
            background: $fontLightColor;
            border-radius: 2px;
            .pic-img {
                width: 88px;
                height: 88px;
                margin: 4px;
            }
        }
        .logo-choose {
            margin-left: 116px;
            .choose-upload {
                position: relative;
                height: 32px;
                padding-bottom: 19px;
                box-sizing: content-box;
                border-bottom: 1px dotted $lightColor;
                .input-file {
                    position: absolute;
                    left: 0;
                    height: 32px;
                    line-height: 32px;
                    width: 74px;
                    z-index: 2;
                    cursor: pointer;
                    opacity: 0;
                    &::-webkit-file-upload-button {
                        cursor: pointer;
                    }
                }
                .upload-info {
                    line-height: 32px;
                    font-size: 12px;
                    color: $fontWeightColor;
                    text-align: left;
                }
            }
            .sys-title {
                font-size: 14px;
                color: $fontDarkColor;
                line-height: 19px;
                margin-bottom: 8px;
                margin-top: 15px;
            }
            .choose-sys {
                border-top: 1px solid $borderLightColor;
                border-left: 1px solid $borderLightColor;
                display: inline-block;
                &:after {
                    content: '';
                    display: table;
                    clear: both;
                }
                .sys-icon {
                    height: 56px;
                    width: 56px;
                    padding: 9px;
                    background: #fff;
                    float: left;
                    border-right: 1px solid $borderLightColor;
                    border-bottom: 1px solid $borderLightColor;
                    cursor: pointer;
                    .icon {
                        height: 37px;
                        width: 37px;
                    }
                }
                .select-icon {
                    background: $tinyBlue;
                    border: 1px solid $darkerBlue;
                    transform: translate3d(-1px, -1px, 0);
                }
            }
        }
    }
</style>
