<template>
<router-link to="/">首页</router-link>
<router-link to="/user">用户中心</router-link>
<router-link to="/login">登录页面</router-link>
<div>
  <!--页面组件的占位 -->
  <router-view></router-view>
</div>

</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({});
</script>

<style lang="scss" scoped>
</style>

