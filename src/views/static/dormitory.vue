<template>
  <!-- el-table显示数据,分页 -->

  <div class="head">
    <div class="adcate-tools">
      <el-button type="warning" @click="toAdd">添加</el-button>
      <el-button type="warning" @click="searchById">查询</el-button>
      <el-button type="warning" @click="refresh()">刷新查询</el-button>
    </div>
    <el-table :data="dormitorys" style="width: 100%">
      <el-table-column fixed prop="id" label="id" width="150" />
      <el-table-column fixed prop="name" label="name" width="120" />
      <el-table-column fixed prop="leader" label="leader" width="120" />
      <el-table-column fixed prop="maxNumber" label="maxNumber" width="120" />
      <el-table-column fixed prop="leftNumber" label="leftNumber" width="120" />
      <el-table-column fixed prop="liveNumber" label="liveNumber" width="120" />
      <el-table-column fixed prop="status" label="status" width="120" />
      <el-table-column fixed prop="comment" label="comment" width="120" />
      <el-table-column fixed prop="school" label="school" width="120" />
      <el-table-column fixed prop="type" label="type" width="120" />
      <el-table-column fixed prop="building" label="building" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toEdit(scope.row)"
            >更新</el-button
          >
          <el-button link type="primary" size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="page.size"
      :total="page.total"
      @current-change="currentchange"
    />
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加宿舍">
    <el-form :model="dormitory">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="dormitory.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="leader" :label-width="formLabelWidth">
        <el-input v-model="dormitory.leader" autocomplete="off" />
      </el-form-item>
      <el-form-item label="maxNumber" :label-width="formLabelWidth">
        <el-input v-model="dormitory.maxNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="leftNumber" :label-width="formLabelWidth">
        <el-input v-model="dormitory.leftNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="liveNumber" :label-width="formLabelWidth">
        <el-input v-model="dormitory.liveNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="status" :label-width="formLabelWidth">
        <el-input v-model="dormitory.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="school" :label-width="formLabelWidth">
        <el-input v-model="dormitory.school" autocomplete="off" />
      </el-form-item>
      <el-form-item label="type" :label-width="formLabelWidth">
        <el-input v-model="dormitory.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="building" :label-width="formLabelWidth">
        <el-input v-model="dormitory.building" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save()">保存 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisibleById" title="查询">
    <el-form :model="dormitory">
      <el-form-item label="请输入宿舍ID" :label-width="formLabelWidth">
        <el-input
          v-model="searchText"
          placeholder="请输入宿舍ID"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="getdormitoryById(searchText)"
          >查询
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
import {
  getalldormitory,
  deleteDormitory,
  addDormitory,
  editDormitory,
  getonedormitory,
} from "../../http/dormitory";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      dormitorys: [],
      Dormitory: [],
      searchText: "",
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      dialogFormVisible: false,
      dialogFormVisibleById: false,
      dormitory: {
        building: "",
        comment: "",
        id: 0,
        name: "",
        maxNumber: 0,
        leader: "",
        leftNumber: 0,
        liveNumber: 0,
        school: "",
        status: 0,
        type: 0,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getdormitoryPage(1);
  },

  methods: {
    refresh() {
      this.getdormitoryPage(1);
    },
    toEdit(dormitory) {
      console.log(dormitory);
      this.dialogFormVisible = true;
      this.dormitory = cloneDeep(dormitory);
    },
    getdormitoryPage() {
      let start = this.page.size * (this.page.current - 1);
      let end = this.page.current * this.page.size;

      getalldormitory()
        .then((res) => {
          this.dormitorys = res.data.dormitories.slice(start, end);
          this.page.total = res.data.dormitories.length;
          ElMessage(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getdormitoryById(id) {
      console.log(id);
      this.Dormitory = [];
      const params = {
        id: id,
      };
      getonedormitory(params).then((res) => {
        this.dialogFormVisibleById = false;
        console.log(res);
        this.Dormitory.push(res.data.dormitory);
        const dormitorys = this.Dormitory;
        this.dormitorys = dormitorys;
      });
    },

    currentchange(current) {
      // console.log(current);
      this.getdormitoryPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) {
        console.log(id);
        const params = {
          id: id,
        };
        deleteDormitory(params)
          .then((res) => {
            if (res.success) {
              this.getdormitoryPage(this.page.current);
            } else {
              console.log(res.msg);
              return false;
            }
          })
          .catch((err) => {});
      }
    },

    toAdd() {
      this.dialogFormVisible = true;
    },
    searchById() {
      this.dialogFormVisibleById = true;
    },
    save() {
      const dormitory = this.dormitory;
      if (dormitory.id == 0) {
        addDormitory(dormitory)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getdormitoryPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        editDormitory(dormitory)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getdormitoryPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>
<style lang = "scss" scoped></style>