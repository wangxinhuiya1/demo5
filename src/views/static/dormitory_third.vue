<template>
  <div>
    <el-button type="warning" @click="addDormitoryStudent">添加学生</el-button>
    <el-table :data="dormitoryStudents" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="150" />
      <el-table-column prop="dormitoryId" label="宿舍ID" width="120" />
      <el-table-column prop="studentId" label="学生ID" width="120" />
      <el-table-column fixed="right" label="功能管理" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toEdit(scope.row)">迁移</el-button>
          <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="添加学生">
      <el-form :model="Student">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-select v-model="Student.studentName" placeholder="请选择学生姓名" @change="updateStudentId">
            <el-option v-for="student in students" :key="student.id"
              :label="`${student.studentName}（${student.classinfo}）`" :value="student.studentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生ID" :label-width="formLabelWidth">
          <el-input v-model="Student.studentId" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="宿舍ID" :label-width="formLabelWidth">
          <el-input v-model="Student.dormitoryId" autocomplete="off" :disabled="true" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">添加</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="transferDialogVisible" title="迁移学生">
      <el-form :model="selectedStudent">
        <el-form-item label="学生ID" :label-width="formLabelWidth">
          <el-input v-model="selectedStudent.studentId" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="宿舍ID" :label-width="formLabelWidth">
          <el-select v-model="selectedStudent.dormitoryId" placeholder="请选择宿舍ID">
            <el-option v-for="dormitory in dormitories" :key="dormitory.id" :label="dormitory.id"
              :value="dormitory.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="transferDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveTransferStudent">迁移</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllDormitoryStudents,
  addDormitoryStudent,
  getAllStudents,
  getAllDormitories,
  editDormitoryStudent,
  deleteDormitoryStudent,
} from '../../http/DormitoryManagement';

export default {
  data() {
    return {
      dormitoryStudents: [],
      students: [],
      dormitories: [],
      dialogFormVisible: false,
      transferDialogVisible: false,
      dorID: 0,
      Student: {
        studentName: '',
        studentId: '',
        dormitoryId: '',
      },
      selectedStudent: {
        studentId: '',
        dormitoryId: '',
      },
      formLabelWidth: '80px', // 添加 formLabelWidth 属性
    };
  },
  mounted() {
    this.getAllDormitoryStudents();
    this.getAllStudents();
    this.getAllDormitories();
    this.dorID = parseInt(this.$route.query.id);
  },
  methods: {
    getAllDormitoryStudents() {
      getAllDormitoryStudents()
        .then(res => {
          console.log(res);
          //this.dormitoryStudents = res.data.dormitoryStudents;
            //-----------上面为了方便测试，是不带有判定默认显示全部的宿舍学生信息
            //-----------下面是带有判定的宿舍学生信息，
            const dormitoryStudents = res.data.dormitoryStudents;
            console.log('this.dorID',this.dorID);
            this.dormitoryStudents = dormitoryStudents.filter(dormitoryStudents => dormitoryStudents.dormitoryId === parseInt(this.dorID))
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllStudents() {
      getAllStudents()
        .then(res => {
          console.log(res);
          if (res) {
            this.students = res.data.students;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllDormitories() {
      getAllDormitories()
        .then(res => {
          console.log(res);
          if (res) {
            this.dormitories = res.data.dormitories;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addDormitoryStudent() {
      this.dialogFormVisible = true;
      this.clearForm();
    },
    save() {
      // 处理添加逻辑
      addDormitoryStudent(this.Student)
        .then(res => {
          console.log(res);
          if (res && res.code === 1) {
            this.dialogFormVisible = false; // 关闭弹窗
            this.clearForm();
            this.getAllDormitoryStudents(); // 更新数据
          } else {
            this.$message({
              type: 'error',
              message: '添加失败',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearForm() {
      this.Student = {
        studentName: '',
        studentId: '',
        dormitoryId: this.dorID,
      };
    },
    toEdit(row) {
      this.selectedStudent.studentId = row.studentId;
      this.selectedStudent.dormitoryId = row.dormitoryId;
      this.selectedStudent.id = row.id; // 添加这行代码
      this.transferDialogVisible = true;
    },
    saveTransferStudent() {
      // 处理迁移逻辑
      const transferData = {
        dormitoryId: this.selectedStudent.dormitoryId,
        id: this.selectedStudent.id,
        studentId: this.selectedStudent.studentId,
      };

      console.log('transferData:', transferData); // 添加这行代码

      editDormitoryStudent(transferData)
        .then(res => {
          console.log(res);
          if (res) {
            this.transferDialogVisible = false; // 关闭迁移对话框
            this.getAllDormitoryStudents(); // 更新数据
          } else {
            console.error('迁移失败');
            // 在控制台输出错误信息或使用其他方式显示错误信息
          }
        })
        .catch(error => {
          console.error(error);
          // 在控制台输出捕获的错误信息或使用其他方式显示错误信息
        });
    },

    del(id) {
        // 处理删除逻辑
        deleteDormitoryStudent(id)
            .then(res => {
            console.log(res);
            if (res && res.code === 1) {
                this.getAllDormitoryStudents();
            } else {
                this.$message({
                type: 'error',
                message: '删除失败',
                });
            }
            })
            .catch(error => {
            console.log(error);
            });
        },
    updateStudentId() {
      const selectedStudent = this.students.find(student => student.studentName === this.Student.studentName);
      if (selectedStudent) {
        this.Student.studentId = selectedStudent.id;
      } else {
        this.Student.studentId = '';
      }
    },
  },
};
</script>
