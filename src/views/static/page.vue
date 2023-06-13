<template>
    <div>
      <el-menu mode="horizontal" @select="handleSelect" :default-active="currentPage">
        <el-menu-item index="Page1">文件夹管理</el-menu-item>
        <el-menu-item index="Page2">文件管理</el-menu-item>
      </el-menu>
  
      <div>
        <component :is="currentPage"></component>
      </div>
    </div>
  </template>
  
  <script>
  import { ElMenu, ElMenuItem } from 'element-plus';
  import Page2 from '../../views/static/file.vue';
  import Page1 from '../../views/static/folder.vue';
  
  export default {
    components: {
      ElMenu,
      ElMenuItem,
      Page1,
      Page2
    },
    data() {
      return {
        currentPage: 'Page1'
      };
    },
    methods: {
      handleSelect(index) {
        this.currentPage = index;
      }
    }
  };
  </script>
  