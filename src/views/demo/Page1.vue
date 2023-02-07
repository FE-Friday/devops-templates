<template>
    <div class="home">
        <img src="@/assets/imgs/logo.png" alt="devops-logo">
        <div class="svg-btn mt15 flex-center">
            <svg-icon
                class="icon-btn mr5"
                size="14"
                name="edit"
                v-bk-tooltips="'编辑'"
            />
            <svg-icon
                class="icon-btn is-danger"
                size="14"
                name="delete"
                v-bk-tooltips="'删除'"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Home',
        data () {
            return {
            }
        },
        methods: {
        }
    })
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 50px);
    background: #fff;
    border-radius: 2px;

    img {
        width: 280px;
        margin-top: 100px;
    }
}
</style>
