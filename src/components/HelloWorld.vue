<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <br>
        <h3>
            Installed Plugins
            <SvgIcon
                style="cursor: pointer;"
                name="plugin"
                color="#3a84ff"
                @item-click="onClick"></SvgIcon>
        </h3>
        <br>
        <ul>
            <li><a href="#">axios</a></li>
            <li><a href="#">babel</a></li>
            <li>
                <a href="http://bkui.fed.canway.com/">
                    <bk-tag theme="info">bk-magic-box</bk-tag>
                </a>
            </li>
            <li><a href="#">eslint</a></li>
            <li><a href="#">sass & sass-loader</a></li>
            <li><a href="#">svg-sprite-loader</a></li>
            <li><a href="#">vue-router</a></li>
            <li><a href="#">vuex</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        methods: {
            onClick () {
                this.$bkMessage({
                    theme: 'primary',
                    message: 'You clicked the plugin icon'
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
