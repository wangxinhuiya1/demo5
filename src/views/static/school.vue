<template>
    <div class="root">
      <el-button type="success" plain @click="toAdd">新增</el-button>
      <el-dialog v-model="dialogFormVisible" title="学校表单">
        <el-form :model="school">
          <el-form-item label="省份" :label-width="formLabelWidth">
            <el-input v-model="school.province" autocomplete="off" />
          </el-form-item>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-input v-model="school.city" autocomplete="off" />
          </el-form-item>
          <el-form-item label="市|县" :label-width="formLabelWidth">
            <el-input v-model="school.area" autocomplete="off" />
          </el-form-item>
          <el-form-item label="学校名称" :label-width="formLabelWidth">
            <el-input v-model="school.schoolName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model="school.latitude" autocomplete="off" />
          </el-form-item>
          <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model="school.longitude" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-input v-model="school.enable" autocomplete="off" />
          </el-form-item>
          <el-form-item label="学校说明" :label-width="formLabelWidth">
            <el-input v-model="school.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="school.address" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm()"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
      <div class="table">
        <el-table :data="list" style="width: 100%">
          <el-table-column fixed prop="id" label="id" width="80" align="center"/>
          <el-table-column prop="province" label="省份" width="80" align="center"/>
          <el-table-column prop="city" label="城市" width="80" align="center"/>
          <el-table-column prop="area" label="市|县" width="80" align="center"/>
          <el-table-column prop="schoolName" label="学校名称" width="170" align="center"/>
          <el-table-column prop="latitude" label="纬度" width="100" align="center"/>
          <el-table-column prop="longitude" label="经度" width="150" align="center" />
          <el-table-column prop="enable" label="是否启用" width="80" align="center"/>
          <el-table-column prop="description" label="学校说明" width="80" align="center"/>
          <el-table-column prop="address" label="地址" width="250" align="center"/>
          <el-table-column prop="createTime" label="创建时间" width="250" align="center"/>
          <el-table-column prop="updateTime" label="修改时间" width="250" align="center"/>
          <el-table-column fixed="right" label="权限" width="150" align="center">
            <template #default="scope">
              <el-button type="info" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" plain size="small"  @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
    
    <script>
  import school from "../../http/school";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        list: [],
        school: {},
        dialogFormVisible: false,
        formLabelWidth: '100px',
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        school.all().then((res) => {
          console.log(res)
          this.list = res.data.schools;
        });
      },
      handleDelete(id) {
        const data = { id };
        ElMessageBox.confirm("您是否需要删除该学校?", "提示", {
          confirmButtonText: "ok",
          cancelButtonText: "no",
          type: "warning",
        })
          .then(() => {
            school.remove(data).then((res) => {
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
                this.fetchData();
              } else {
                ElMessage({
                  type: "error",
                  message: "网络出问题，联系管理员",
                });
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "warning",
              message: "取消删除",
            });
          });
      },
      handleEdit(id) {
        this.dialogFormVisible = true;
        const data = { id };
        school.one(data).then((res) => {
          this.school = res.data.school;
        });
      },
      toAdd() {
        this.school = {};
        this.dialogFormVisible = true;
      },
      confirm() {
        if (this.school.id == undefined) {
          school.add(this.school).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "添加成功",
              });
              this.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
              });
            }
            this.dialogFormVisible = false;
          });
        } else {
          school.update(this.school).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "编辑成功",
              });
              this.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
              });
            }
          });
          this.dialogFormVisible = false;
        }
      },
    },
  });
  </script>
    
    <style lang="scss" scoped>
  
  </style>
    