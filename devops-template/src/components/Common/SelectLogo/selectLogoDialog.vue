<template>
    <bk-dialog
        class="atom-logo-dialog"
        v-model="showDialog"
        width="570"
        title="修改ICON"
        header-position="left"
        @cancel="toCloseDialog">
        <main class="atom-logo-content">
            <div class="upload-content">
                <div class="upload-left">
                    <div v-if="currentUrl" class="container-box" :style="{
                        width: `${containerBoxData.width}px`,
                        height: `${containerBoxData.height}px`
                    }">
                        <img ref="$img" :src="currentUrl" />
                        <div class="upload-img-mask"></div>
                        <div class="select-box"
                            @mousedown="onMouseDown($event, 'move')" :style="{
                                top: `${selectData.top}px`,
                                left: `${selectData.left}px`,
                                width: `${selectData.width}px`,
                                height: `${selectData.width}px`,
                                'background-image': `url(${currentUrl})`,
                                'background-position': `${-selectData.left}px ${-selectData.top}px`,
                                'background-size': `${containerBoxData.width}px ${containerBoxData.height}px`
                            }">
                            <ul class="x-line">
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'Top')"></li>
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'Bottom')"></li>
                            </ul>
                            <ul class="y-line">
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'Left')"></li>
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'Right')"></li>
                            </ul>
                            <ul class="point">
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'TopLeft')"></li>
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'TopRight')"></li>
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'BottomLeft')"></li>
                                <li @mousedown.stop="onMouseDown($event, 'stretch', 'BottomRight')"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="upload-right">
                    <div class="preview">
                        <p>预览</p>
                        <canvas ref="$canvas" width="512" height="512"></canvas>
                    </div>
                    <div>
                        <input type="file" name="adminfile" id="adminfile"
                            accept="image/png, image/jpeg, image/svg+xml"
                            @change="fileChange">
                        <label for="adminfile">自定义</label>
                    </div>
                    <div v-if="imgs.length" class="default-image" @click="changeDefaultImg">
                        <bk-button text>不喜欢？换一个</bk-button>
                        <i class="bk-icon icon-refresh"></i>
                    </div>
                </div>
            </div>
        </main>
        <template slot="footer">
            <div class="bk-dialog-outer">
                <template>
                    <bk-button class="bk-dialog-btn bk-dialog-btn-cancel" @click="toCloseDialog">
                        取消
                    </bk-button>
                    <bk-button theme="primary" class="bk-dialog-btn bk-dialog-btn-confirm bk-btn-primary"
                        @click="toConfirmLogo">
                        确定
                    </bk-button>
                </template>
            </div>
        </template>
    </bk-dialog>
</template>

<script>
    export default {
        props: {
            showDialog: Boolean,
            selectedUrl: String,
            imgs: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                currentUrl: '',
                containerBoxData: { // 容器宽高
                    width: 300,
                    height: 300
                },
                scaleRate: 1, // 缩放比
                minWidth: 50, // 选择框最小宽度
                selectData: {
                    top: 0,
                    left: 0,
                    width: 300,
                    action: '', // 当前进行的操作
                    originPoint: {}, // 点击时所在位置
                    selectLine: '' // 选择那一条边进行拉伸，为空则不是在拉伸
                }
            }
        },
        watch: {
            showDialog (val) {
                if (val) {
                    this.init()
                }
            }
        },
        mounted () {
            // 全局监听松开事件，放在在内容选择框外松开
            document.addEventListener('mouseup', this.onMouseUp)
            document.addEventListener('mousemove', this.onMouseMove)
        },
        beforeDestroy () {
            document.removeEventListener('mouseup', this.onMouseUp)
            document.removeEventListener('mousemove', this.onMouseMove)
        },
        methods: {
            init () {
                this.containerBoxData = {
                    width: 300,
                    height: 300
                }
                this.selectData = Object.assign(this.selectData, {
                    top: 0,
                    left: 0,
                    width: 300
                })
                if (this.selectedUrl) this.currentUrl = this.selectedUrl
                else if (this.imgs.length) this.currentUrl = this.imgs[0].iconUrl
                this.scaleRate = 300 / 512
                this.getImgSize(this.currentUrl)
            },
            toCloseDialog () {
                this.$nextTick(() => {
                    document.getElementById('adminfile').value = null
                })
                this.$emit('toCloseDialog')
            },
            // 获取图片宽高
            getImgSize (url) {
                const img = new Image()
                img.onload = () => {
                    const width = img.naturalWidth
                    const height = img.naturalHeight
                    if (width > height) { // 300为外盒子宽高
                        this.scaleRate = 300 / width
                        this.containerBoxData.width = 300
                        this.containerBoxData.height = Math.floor(height * this.scaleRate)
                        this.selectData.top = 0
                        this.selectData.left = (300 - this.containerBoxData.height) / 2
                        this.selectData.width = this.containerBoxData.height
                    } else {
                        this.scaleRate = 300 / height
                        this.containerBoxData.height = 300
                        this.containerBoxData.width = Math.floor(width * this.scaleRate)
                        this.selectData.left = 0
                        this.selectData.top = (300 - this.containerBoxData.width) / 2
                        this.selectData.width = this.containerBoxData.width
                    }
                    this.setPreview()
                }
                img.src = url
            },

            // 从base64转化为file文件
            base64ToFile (base64Str, fileName) {
                const params = base64Str.split(',')
                const mime = params[0].match(/:(.*?)/)[1]
                const fileData = atob(params[1]) // 解码Base64
                let { length } = fileData
                const uint8Array = new Uint8Array(length)
                while (length) {
                    length -= 1
                    uint8Array[length] = fileData.charCodeAt(length)
                }
                return new File([uint8Array], fileName, { type: mime })
            },

            // 鼠标点击
            onMouseDown (event, action, direction) {
                const { selectData } = this
                selectData.action = action
                selectData.direction = direction || ''
                selectData.originPoint = {
                    x: event.clientX > 0 ? event.clientX : 0,
                    y: event.clientY > 0 ? event.clientY : 0
                }
            },

            // 鼠标松开
            onMouseUp () {
                const { selectData } = this
                selectData.action = ''
                selectData.direction = ''
            },

            // 鼠标移动
            onMouseMove (event) {
                const { selectData, containerBoxData } = this
                const { x, y } = selectData.originPoint
                const moveX = event.clientX - x // X轴移动的距离
                const moveY = event.clientY - y // Y轴移动的距离
                if (selectData.action === 'move') { // 移动选择框
                    this.doMove(selectData, containerBoxData, moveX, moveY)
                } else if (selectData.action === 'stretch') { // 拉伸选择框
                    this.doStretch(selectData, containerBoxData, moveX, moveY)
                } else {
                    return
                }

                selectData.originPoint = {
                    x: event.clientX > 0 ? event.clientX : 0,
                    y: event.clientY > 0 ? event.clientY : 0
                }

                this.setPreview()
            },

            // 选择框移动
            doMove (selectData, containerBoxData, moveX, moveY) {
                selectData.top += moveY
                selectData.left += moveX
                if (selectData.top < 0) {
                    selectData.top = 0
                }
                if (selectData.left < 0) {
                    selectData.left = 0
                }
                if (selectData.top + selectData.width > containerBoxData.height) {
                    selectData.top = containerBoxData.height - selectData.width
                }
                if (selectData.left + selectData.width > containerBoxData.width) {
                    selectData.left = containerBoxData.width - selectData.width
                }
            },

            // 选择框拉伸
            doStretch (selectData, containerBoxData, moveX, moveY) {
                const { minWidth } = this

                // 获取溢出长度
                function getOverflowLength () {
                    const overflowLeft = selectData.left < 0 ? -selectData.left : 0
                    const overflowTop = selectData.top < 0 ? -selectData.top : 0
                    const overflowRight = selectData.left + selectData.width > containerBoxData.width ? selectData.left + selectData.width - containerBoxData.width : 0
                    const overflowBottom = selectData.top + selectData.width > containerBoxData.height ? selectData.top + selectData.width - containerBoxData.height : 0
                    const overflowWidth = selectData.width < minWidth ? minWidth - selectData.width : 0
                    return Math.max(overflowLeft, overflowTop, overflowRight, overflowBottom, overflowWidth)
                }

                // 向左拉伸
                function doStretchLeft (action) {
                    let space = moveX
                    space = action === 'preDo' ? space : -space
                    selectData.top += space / 2
                    selectData.left += space
                    selectData.width -= space
                }

                function doStretchRight (action) {
                    let space = moveX
                    space = action === 'preDo' ? space : -space
                    selectData.top -= space / 2
                    selectData.width += space
                }

                function doStretchTop (action) {
                    let space = moveY
                    space = action === 'preDo' ? space : -space
                    selectData.top += space
                    selectData.left += space / 2
                    selectData.width -= space
                }

                function doStretchBottom (action) {
                    let space = moveY
                    space = action === 'preDo' ? space : -space
                    selectData.left -= space / 2
                    selectData.width += space
                }

                function doStretchTopLeft (action) {
                    let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY
                    space = action === 'preDo' ? space : -space
                    selectData.top += space
                    selectData.left += space
                    selectData.width -= space
                }

                function doStretchTopRight (action) {
                    let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY
                    space = action === 'preDo' ? space : -space
                    selectData.top -= space
                    selectData.width += space
                }

                function doStretchBottomLeft (action) {
                    let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY
                    space = action === 'preDo' ? space : -space
                    selectData.left += space
                    selectData.width -= space
                }

                function doStretchBottomRight (action) {
                    let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY
                    space = action === 'preDo' ? space : -space
                    selectData.width += space
                }

                const doStretchFun = {
                    doStretchLeft,
                    doStretchRight,
                    doStretchTop,
                    doStretchBottom,
                    doStretchTopLeft,
                    doStretchTopRight,
                    doStretchBottomLeft,
                    doStretchBottomRight
                }[`doStretch${selectData.direction}`]

                doStretchFun('preDo')
                const overflowLength = getOverflowLength()
                if (overflowLength > 0) {
                    doStretchFun('reset')
                }
            },

            // 设置预览图
            setPreview () {
                const { selectData, scaleRate } = this
                const $canvas = this.$refs.$canvas.getContext('2d')
                $canvas.clearRect(0, 0, 512, 512)
                $canvas.drawImage(
                    this.$refs.$img,
                    Math.floor(selectData.left / scaleRate),
                    Math.floor(selectData.top / scaleRate),
                    selectData.width / scaleRate,
                    selectData.width / scaleRate,
                    0,
                    0,
                    512,
                    512
                )
            },

            // 选择图片
            fileChange (event) {
                const file = event.target.files[0]
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/svg+xml')) {
                    this.$bkMessage({
                        theme: 'error',
                        message: '上传图片只能是 JPG、PNG或SVG 格式!'
                    })
                }
                if (!isLt2M) {
                    this.$bkMessage({
                        theme: 'error',
                        message: '上传图片大小不能超过 2MB!'
                    })
                    return false
                }
                const reader = new FileReader()
                reader.onload = () => {
                    this.currentUrl = reader.result
                    this.getImgSize(this.currentUrl)
                    event.target.value = null
                }
                reader.readAsDataURL(file)
            },

            // 确认
            toConfirmLogo () {
                if (this.currentUrl) {
                    this.$emit('toConfirmLogo', this.base64ToFile(this.$refs.$canvas.toDataURL(), 'logo.png')) // 返回链接
                } else {
                    this.$bkMessage({
                        theme: 'error',
                        message: '请选择图片'
                    })
                }
            },

            changeDefaultImg () {
                const maxIndex = this.imgs.length - 1
                const currentIndex = this.imgs.findIndex(img => img.logoUrl === this.currentUrl)
                if (currentIndex < maxIndex) this.currentUrl = this.imgs[currentIndex + 1].logoUrl
                else {
                    if (this.imgs.length === 1) {
                        this.$bkMessage({
                            theme: 'error',
                            message: '没有其他可选LOGO了'
                        })
                        return
                    } else {
                        this.currentUrl = this.imgs[0].logoUrl
                    }
                }
                this.getImgSize(this.currentUrl)
            }
        }
    }
</script>

<style lang="scss">
@import '@/assets/scss/conf';
.atom-logo-dialog {
    user-select: none;
    .atom-logo-content {
        .icon-close {
            position: absolute;
            top: 0;
            right: 0;
            margin-top: 14px;
            margin-right: 14px;
            font-size: 12px;
            color: $fontLigtherColor;
            cursor: pointer;
        }
    }
    .upload-content {
        display: flex;
        padding: 20px 10px 10px;
        .upload-left {
            position: relative;
            margin-right: 16px;
            width: 300px;
            height: 300px;
            font-size: 0;
            box-sizing: content-box;
            border: 1px solid #e8e8e8;
            .container-box {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .upload-img-mask {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    opacity: .5;
                    z-index: 1;
                    background-color: white;
                }
                .select-box {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    cursor: move;
                    .x-line, .y-line {
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        li {
                            position: relative;
                            border: solid 1px $fontLigtherColor;
                        }
                        li:nth-child(1):before,
                        li:nth-last-child(1):before {
                            content: '';
                            position: absolute;
                            margin-left: -3px;
                            margin-top: -3px;
                            width: 6px;
                            height: 6px;
                            background-color: $fontLigtherColor;
                        }
                    }
                    .x-line {
                        flex-direction: column;
                        li:nth-child(1) {
                        cursor: n-resize;
                        &:before {left: 50%;}
                        }
                        li:nth-last-child(1) {
                        cursor: s-resize;
                        &:before {left: 50%;}
                        }
                    }
                    .y-line {
                        li:nth-child(1) {
                        cursor: w-resize;
                        &:before {top: 50%;}
                        }
                        li:nth-last-child(1) {
                        cursor: e-resize;
                        &:before {top: 50%;}
                        }
                    }
                    .point {
                        width: 100%;
                        height: 100%;
                        li {
                        position: absolute;
                        margin-left: -3px;
                        margin-top: -3px;
                        width: 6px;
                        height: 6px;
                        content: '';
                        cursor: crosshair;
                        background-color: $fontLigtherColor;
                        }
                        li:nth-child(1) {
                        top: 2px;
                        left: 1px;
                        cursor: nw-resize;
                        }
                        li:nth-child(2) {
                        top: 2px;
                        right: -2px;
                        cursor: ne-resize;
                        }
                        li:nth-child(3) {
                        bottom: -2px;
                        left: 1px;
                        cursor: sw-resize;
                        }
                        li:nth-child(4) {
                        bottom: -2px;
                        right: -2px;
                        cursor: se-resize;
                        }
                    }
                }
            }
        }
    }
    .upload-right {
        position: relative;
        font-size: 16px;
        color: $fontBoldColor;
        text-align: center;
        .preview {
            padding: 0 16px 16px;
            margin-bottom: 16px;
            border: solid 1px #e8e8e8;
            background-color: #fafafa;
            p {
                height: 30px;
                line-height: 30px;
            }
            canvas {
                display: block;
                width: 150px;
                height: 150px;
                border: solid 1px #e8e8e8;
            }
        }
        .default-image {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            i {
                padding-left: 5px;
                color: $darkBlue;
                cursor: pointer;
            }
        }
    }
    #adminfile {
        width: 0;
        height: 0;
        overflow: hidden;
        position: absolute;
    }
    #adminfile + label {
        cursor: pointer;
        width: 120px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
        text-align: center;
        background-color: $primaryColor;
        color: white;
        border-radius: 2px;
        .icon-bk {
            position: relative;
            top: 2px;
            margin-right: 4px;
            font-size: 16px;
        }
    }
    .bk-dialog-footer {
        button {
            margin-top: 0;
            width: 70px;
            min-width: 70px;
            height: 32px;
            line-height: 30px;
        }
    }
    button.disabled {
        background-color: #fafafa;
        border-color: #e6e6e6;
        color: #ccc;
        cursor: not-allowed;
        &:hover {
            background-color: #fafafa;
            border-color: #e6e6e6;
        }
    }
}
</style>
