<template>
    <section class="top-header-container">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right">
            <!-- <bk-button :theme="'primary'" icon="plus" @click.stop.prevent="create">{{rightTitle}}</bk-button> -->
            </slot>
        </div>
    </section>
</template>
<script>
    // import { mapState } from 'vuex'
    export default {
        props: {
            // rightTitle: String
        },
        computed: {
            // ...mapState('gitlabconf', ['currRouter'])
        },
        methods: {
            /* create () {
                this.$emit('create-click')
            } */
        }
    }
</script>
<style lang="scss" scoped>
.top-header-container {
    display: flex;
    justify-content: space-between;
    height: 60px;
    // padding: 0 20px;
    // border-bottom: 1px solid #dde4eb;
    // box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    background: #fff;
    align-items: center;

    .left, .right {
        flex: 1;
    }

    .right {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
