<template>
  <!-- <MyComponent></MyComponent>
  <RouterLink to="/">首页</RouterLink>
  <RouterLink :to="{name:'user',params:{id:1}}">用户中心</RouterLink>
  <RouterLink to="/login">登陆页面</RouterLink>
  <RouterLink to="/object">object页面</RouterLink>
  <RouterLink to="/cart">连锁店信息</RouterLink>
  <button @click="toJump">跳转页面</button> -->
  <div>  
      <!--页面组件的占位-->
      <RouterView name="Header"></RouterView>  
      <RouterView></RouterView>
      <RouterView name="Footer"></RouterView>  
  </div>  
 </template>
<script>  
import { defineComponent } from 'vue';
import MyComponent from './components/MyComponent.vue';
export default defineComponent({
    components: { MyComponent },
    methods:{
        toJump(){
            //代码跳转
            // push,replace
            this.$router.replace({path:'/user',params:{id:1}})
        }
    }
});
</script>
<style lang="scss" scoped></style>