<template>
    <section class="schedule-right-content">
        <div class="content">
            <slot name="content"></slot>
        </div>
    </section>
</template>
<script>
    export default {
    
    }
</script>
<style lang="scss" scoped>
.schedule-right-content {
    display: flex;
    flex: 1;
    height: calc(100% - 60px);

    .content {
        width: 100%;
        height: 100%;
        background-color: #fff;
        // padding: 15px;
        // box-shadow: -3px 0 7px #ececec, 0 3px 7px #ececec, 3px 0 7px #ececec, 0 -3px 7px #ececec;
    }
}
</style>
