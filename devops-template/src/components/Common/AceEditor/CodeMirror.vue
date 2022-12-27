<template>
    <div class="vue-codemirror-wrap">
        <textarea></textarea>
    </div>
</template>

<script>
    const CodeMirror = require('codemirror/lib/codemirror.js')
    require('codemirror/lib/codemirror.css')
    
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/vue/vue')
    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    require('codemirror/addon/hint/javascript-hint.js')
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: function () {
                    return {
                        mode: 'text/javascript',
                        lineNumbers: true,
                        lineWrapping: true
                    }
                }
            }
        },
        data: function () {
            return {
                skipNextChangeEvent: false
            }
        },
        ready: function () {
            const _this = this
            this.editor = CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
            this.editor.setValue(this.value)
            this.editor.on('change', function (cm) {
                if (_this.skipNextChangeEvent) {
                    _this.skipNextChangeEvent = false
                    return
                }
                _this.value = cm.getValue()
                if (_this.$emit) {
                    _this.$emit('change', cm.getValue())
                }
            })
        },
        watch: {
            'value': function (newVal, oldVal) {
                const editorValue = this.editor.getValue()
                if (newVal !== editorValue) {
                    this.skipNextChangeEvent = true
                    const scrollInfo = this.editor.getScrollInfo()
                    this.editor.setValue(newVal)
                    this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
                }
            },
            'options': function (newOptions, oldVal) {
                if (typeof newOptions === 'object') {
                    for (const optionName in newOptions) {
                        if (newOptions.hasOwnProperty(optionName)) {
                            this.editor.setOption(optionName, newOptions[optionName])
                        }
                    }
                }
            }
        },
        mounted: function () {
            const _this = this
            this.editor = CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
            this.editor.setValue(this.value)
            this.editor.on('change', function (cm) {
                if (_this.skipNextChangeEvent) {
                    _this.skipNextChangeEvent = false
                    return
                }
                if (_this.$emit) {
                    _this.$emit('change', cm.getValue())
                    _this.$emit('input', cm.getValue())
                }
            })
        },
        beforeDestroy: function () {
            if (this.editor) {
                this.editor.toTextArea()
            }
        }
    }
</script>

<style>
  .CodeMirror-code {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  }
</style>
