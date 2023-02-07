/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue, { VNode } from 'vue'
import lodash from 'lodash'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: unknown
    }
  }

  interface Window {
    Vue: typeof Vue.VueConstructor
    devopsVue: any
    _: typeof lodash
    bkMagicVue: any
  }
}

declare module 'm-grid-layout'
