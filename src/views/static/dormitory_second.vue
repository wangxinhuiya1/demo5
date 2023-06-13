<template>
  <div class="container1">
    <div class="sidebar">
      <h2 class="sidebar-title">请选择管理宿舍楼</h2>
      <el-select v-model="selectedBuildingName" placeholder="请选择建筑" class="select-box">
        <el-option v-for="building in buildings" :key="building.id" :label="building.name"
          :value="building.name"></el-option>
      </el-select>

    </div>
    <div class="content">
      <h1 class="title">微校园管理-宿舍管理</h1>
      <div class="center">
        <!-- 内容区域 -->
        <div v-if="selectedBuildingName && selectedBuildingDormitories.length > 0">
          <h2>宿舍信息</h2>
          <el-button type="warning" @click="addDormitory">添加宿舍</el-button>
          <el-input v-model="searchId" placeholder="请输入宿舍名称" clearable style="width: 120px;"></el-input>
          <el-button type="primary" @click="searchDormitory">搜索</el-button>
          <el-table :data="selectedBuildingDormitories" style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="80" />
            <el-table-column fixed prop="name" label="名称" width="120" />
            <el-table-column fixed prop="leader" label="宿舍长" width="120" />
            <el-table-column fixed prop="maxNumber" label="最大人数" width="120" />
            <el-table-column fixed prop="leftNumber" label="剩余人数" width="120" />
            <el-table-column fixed prop="liveNumber" label="居住人数" width="120" />
            <el-table-column fixed prop="status" label="状态" width="120" />
            <el-table-column fixed prop="comment" label="备注" width="120" />
            <el-table-column fixed prop="school" label="学校" width="120" />
            <el-table-column fixed prop="type" label="类型" width="120" />
            <el-table-column fixed prop="building" label="建筑" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="editDormitory(scope.row)">编辑</el-button>
                <el-button link type="primary" size="small" @click="deleteDormitory(scope.row.id)">删除</el-button>
                <el-button link type="primary" size="small" @click="editMembers(scope.row.id)">修改宿舍成员</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <p>暂无宿舍信息</p>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="添加宿舍">
      <el-form :model="dormitory">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="dormitory.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍长" :label-width="formLabelWidth">
          <el-input v-model="dormitory.leader" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最大人数" :label-width="formLabelWidth">
          <el-input v-model="dormitory.maxNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="剩余人数" :label-width="formLabelWidth">
          <el-input v-model="dormitory.leftNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入住人数" :label-width="formLabelWidth">
          <el-input v-model="dormitory.liveNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="dormitory.status" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校" :label-width="formLabelWidth">
          <el-input v-model="dormitory.school" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="dormitory.type" autocomplete="off" />
        </el-form-item>
        <el-form-item label="建筑" :label-width="formLabelWidth">
          <el-input v-model="dormitory.building" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">{{ editingDormitory ? '保存' : '添加' }}</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getAllBuilding, getAllDormitories, addDormitory, editDormitory, deleteDormitory,getDormitoryById } from '../../http/DormitoryManagement';

export default defineComponent({
  data() {
    return {
      selectedBuildingName: '', // 存储选择的建筑名称
      buildings: [], // 存储建筑数据
      allDormitories: [], // 存储所有宿舍数据
      selectedBuildingDormitories: [], // 存储选择建筑对应的宿舍数据
      searchId: '', // 添加搜索框的绑定值
      dialogFormVisible: false, // 控制添加宿舍弹窗显示
      dialogFormVisibleById: false, // 控制查询宿舍弹窗显示
      editingDormitory: null, // 存储当前正在编辑的宿舍对象
      editDormitory(dormitory) {
        this.editingDormitory = { ...dormitory }; // 将点击的宿舍对象赋值给editingDormitory
        this.dormitory = { ...dormitory }; // 将点击的宿舍对象赋值给dormitory，以在编辑对话框中显示当前选择的宿舍数据
        this.dialogFormVisible = true; // 打开对话框
      },

      dormitory: { // 宿舍对象
        building: '',
        comment: '',
        id: 0,
        leader: 0,
        leftNumber: 0,
        liveNumber: 0,
        maxNumber: 0,
        name: '',
        school: '',
        status: 0,
        type: 0,
      },
      formLabelWidth: '100px', // 表单label宽度
      searchText: '', // 查询宿舍的输入框绑定值
      schoolId: 0,
      
    };
  },
  mounted() {
    this.getAllBuildingData();
    this.getAllDormitoryData();
    const params = new URLSearchParams(window.location.search);
  this.schoolId = params.get('schoolId');
  //console.log('选择的学校Id1:', this.schoolId);
  },
  watch: {
    selectedBuildingName(newValue) {
      this.selectedBuildingDormitories = this.allDormitories.filter(dormitory => dormitory.building === newValue);
    },
  },
  methods: {
    getAllBuildingData() {
      getAllBuilding()
        .then(res => {
          console.log('建筑',res);
          if (res) {
            console.log('选择的学校Id2:', this.schoolId);
            //this.buildings = res.data.buildings; // 将建筑数据存储到buildings数组中
            const buildings = res.data.buildings;
            //console.log('建筑23',buildings);
            // 过滤出与 this.schoolId 相同的建筑对象
            this.buildings = buildings.filter(building => building.schoolId === parseInt(this.schoolId));
            console.log('建筑2',this.buildings);
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllDormitoryData() {
      getAllDormitories()
        .then(res => {
          console.log(res);
          if (res) {
            this.allDormitories = res.data.dormitories; // 将所有宿舍数据存储到allDormitories数组中
            this.selectedBuildingDormitories = this.allDormitories; // 初始化selectedBuildingDormitories数组
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addDormitory() {
      this.dialogFormVisible = true;
    },
    save() {
  if (this.editingDormitory) {
    // 编辑操作
    editDormitory(this.dormitory)  // 将 this.dormitory 传递给 editDormitory 函数
      .then(res => {
        console.log(res);
        if (res && res.code === 1) {
          // 更新成功后刷新宿舍数据
          this.getAllDormitoryData();
          this.editingDormitory = null; // 清空编辑的宿舍对象
          this.dormitory = {  // 清空宿舍对象
            building: '',
            comment: '',
            id: 0,
            leader: 0,
            leftNumber: 0,
            liveNumber: 0,
            maxNumber: 0,
            name: '',
            school: '',
            status: 0,
            type: 0,
          };
          this.dialogFormVisible = false;
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    // 添加操作
    addDormitory(this.dormitory)
      .then(res => {
        console.log(res);
        if (res && res.code === 1) {
          // 添加成功后刷新宿舍数据
          this.getAllDormitoryData();
          this.dormitory = {  // 清空宿舍对象
            building: '',
            comment: '',
            id: 0,
            leader: 0,
            leftNumber: 0,
            liveNumber: 0,
            maxNumber: 0,
            name: '',
            school: '',
            status: 0,
            type: 0,
          };
          this.dialogFormVisible = false;
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
},


    editDormitory(dormitory) {
      this.editingDormitory = { ...dormitory }; // 将点击的宿舍对象赋值给editingDormitory
      this.dormitory = { ...dormitory }; // 将点击的宿舍对象赋值给dormitory，以在编辑对话框中显示当前选择的宿舍数据
      this.dialogFormVisible = true; // 打开对话框
    },

    deleteDormitory(dormitoryId) {
      deleteDormitory({ id: dormitoryId })
        .then(res => {
          console.log(res);
          if (res && res.code === 1) {
            // 删除成功后刷新宿舍数据
            this.getAllDormitoryData();
            this.dialogFormVisible = false;
            this.editingDormitory = null; // 清空编辑的宿舍对象
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    searchDormitory() {
      const keyword = this.searchId.trim();
      if (keyword === '') {
        this.selectedBuildingDormitories = this.allDormitories;
      } else {
        this.selectedBuildingDormitories = this.allDormitories.filter(dormitory =>
          dormitory.name.includes(keyword)
        );
      }
    },
    getdormitoryById(searchText) {
      console.log(searchText);
      // 根据宿舍ID查询宿舍信息的逻辑代码
    },

    editMembers(dormitoryId) {
  this.$router.push({
    path: '/dormitory_third',
    query: { id: dormitoryId }
  });
},

  },
});
</script>

<style>
.container1 {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex: 0 0 200px;
  background-color: #f0f0f0;
  padding: 20px;
  position: relative; /* 添加此行 */
  top: 0; /* 添加此行 */
}


.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content {
  flex: 1;
  padding: 20px;
}

.title {
  font-size: 50px;
  color: rgb(0, 179, 95);
  margin-bottom: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.center {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.select-box {
  width: 100%;
  margin-bottom: 10px;
}
</style>
