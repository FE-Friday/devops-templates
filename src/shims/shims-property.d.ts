import { VNode } from 'vue'
import { formatDateTime, encrypt, copy, loadScript } from '@/utils'
import { ModulesType } from '@/api'

declare module 'vue/types/vue' {
    interface Vue {
        $api: ModulesType
        $loadScript: typeof loadScript
        $copy: typeof copy
        $encrypt: typeof encrypt
        $formatTime: typeof formatDateTime
        $syncUrl: () => void
        $toggleLoginDialog: () => void

        // bk-magic-vue
        $bkMessage: (options: {
            theme?: 'primary' | 'success' | 'warning' | 'error',
            icon?: string,
            message: string,
            delay?: number,
            dismissable?: boolean,
            offsetY?: number,
            spacing?: number,
            limit?: number,
            ellipsisLine?: number,
            onClose?: () => void,
            extCls?: string,
            ellipsisCopy?: boolean
        }) => any

        $bkInfo: (options: {
            extCls?: string,
            width?: number,
            type?: 'success' | 'warning' | 'error' | 'info',
            title?: string,
            subHeader?: string | VNode,
            subTitle?: string,
            showFooter?: boolean,
            theme?: 'primary' | 'success' | 'warning' | 'danger',
            maskClose?: boolean,
            escClose?: boolean,
            closeIcon?: boolean,
            okText?: string,
            cancelText?: string,
            container?: HTMLElement | VNode | string,
            icon?: string,
            confirmLoading?: boolean,
            confirmFn?: () => (void | boolean),
            cancelFn?: () => void,
            closeFn?: () => void,
            stateChangeFn?: (state: boolean) => void,
            afterLeaveFn?: () => void,
        }) => void

        $bkNotify: (options: {
            theme?: 'success' | 'warning' | 'error' | 'primary',
            icon?: string,
            title?: string,
            message: string | HTMLElement,
            position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
            delay:? number,
            dismissable?: boolean,
            limit?: number,
            limitLine?: number,
            showViewMore?: boolean,
            offsetX?: number,
            offsetY?: number,
            onViewMoreHandler?: () => void,
            onClose?: () => void,
            extCls?: string,
            useHTMLString?: boolean,
        }) => void

    }
}
