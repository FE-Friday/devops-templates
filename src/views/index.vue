<template>
    <div class="plugin-project">
        <platform-card-header :plugin="plugin" @edit-card="editCard" @delete-card="deleteCard" :is-edit="isEdit">
            <!-- 卡片头部右侧内容 -->
        </platform-card-header>

        <div class="plugin-content" >
            <!-- 卡片下方内容 -->
        </div>
    </div>
</template>

<script>
// import projectApi from '../api/index'
export default {
    props: {
        plugin: {
            type: Object,
        },
        isEdit: {
            type: Boolean,
        },
    },
    components: {},
    data() {
        return {
        }
    },
    computed: {
    },
    watch: {},
    created() {
    },
    methods: {
        editCard(plugin) {
            this.$emit('edit-card', plugin)
        },
        deleteCard(plugin) {
            this.$emit('delete-card', plugin)
        }
    },
}
</script>

<style lang="scss" scoped>
</style>