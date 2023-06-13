<template>
<div class= "">object页面</div>
<router-view></router-view>
</template>

<script>
import router from '../../router/index.js';



export default{
    setup() {
        console.log("setup");
    },
    data() {
        return {
        //响应是数据
        };
    },
    methods: {
    //方法
    },
    computed: {
    //计算属性
    },
    created() {
        console.log("created");
    },
    //生命周期
    mounted() {
        //函数
        console.log("mounted");
    },
    /**
     * 指令 v-html v-text v-bind : v-on @
     */
    onUnmounted() {
        console.log("onUnmounted");
    },
    components: { router }
};
</script>
<style lang = "scss" scoped>
   //可编程的css
   //scoped css使用范围
</style>
