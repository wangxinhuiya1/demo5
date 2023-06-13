<template>
  <div class="salesclerks">
      <!-- salesclerks 店员管理 CURD
        1 数据展示 table element-plus table组件使用
        2 数据添加 表单 element-plus 表单组件使用 添加按钮,ICON,弹出组件
        实现添加功能
        3 数据更新 表单
        4 数据删除 查询
        事件方法，传参
        v-for
        分页处理

        //购物车
        -->
      <h3><slot></slot></h3>
      <div class="tools">
          <el-button icon="Plus" @click="toAdd" />
      </div>
      <slot name="header"></slot>
      <slot name="headers"></slot>
      <el-table :data="salesclerks" style="width: 100%">
          <el-table-column prop="id" label="编号" width="75" />
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="prefession" label="职位" width="180" />
          <el-table-column prop="shop" label="店名" />
          <el-table-column label="功能管理">
              <template #default="scope">
                  <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button type="danger" @click="btnClick">组件自定义事件</el-button>
                  <el-button type="danger" @click="btnClick1">子父传参</el-button>
              </template>
          </el-table-column>
      </el-table>

      <el-dialog v-model="dialogSalesclerksFormVisible" title="店员编辑">
          <el-form :model="salesclerk">
              <el-form-item label="编号" :label-width="formLabelWidth">
                  <el-input v-model="salesclerk.id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="salesclerk.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="职位" :label-width="formLabelWidth">
                  <el-input v-model="salesclerk.prefession" autocomplete="off" />
              </el-form-item>
              <el-form-item label="店名" :label-width="formLabelWidth">
                  <el-input v-model="salesclerk.shop" autocomplete="off" />
              </el-form-item>
          </el-form>
          <template #footer>
              <span class="dialog-footer">
                  <el-button @click="dialogSalesclerksFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="save(salesclerks)">
                      保存
                  </el-button>
              </span>
          </template>
      </el-dialog>
  </div>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  // props:['salesclerks'],
  props:{
      salesclerks:{
          type:Array,
          requires:true
      }
  },
  data() {
      return {
          dialogSalesclerksFormVisible: false,
          salesclerk: {
              id: 0,
              name: '',
              prefession: '',
              shop: ''
          },
          salesclerk1: {
              id: 0,
              name: '',
              prefession: '',
              shop: ''
          },
          num:'',
          formLabelWidth: '80px',
          flag: true,//添加，FALSE更新
          in: 0,
      }


  },
  methods: {
      toAdd() {
          this.salesclerk = {
              id: null,
              name: '',
              prefession: '',
              shop: ''
          };
          this.dialogSalesclerksFormVisible = true,
              this.flag = true;

      },
      save(salesclerks) {
          //添加
          if (this.flag) {
              let obj = this.salesclerks.find((item) => { item.id === this.salesclerk.id });
              console.log(this.salesclerk)
              console.log(this.salesclerks.find((item) => {item.id === this.salesclerk.id }))
              console.log()
              if (obj) {
              // 存在，返回obj={name:'JP'}
              console.log('已存在该id，添加失败')
          } else {
              // 不存在
              this.salesclerks.push(this.salesclerk)
          }
          // if (this.salesclerk.id != this.salesclerk1.id) {
          //         this.salesclerks.push(this.salesclerk)
          //     }
          //     console.log('已存在该id，添加失败')
          // }
          }
          else {
              //更新
              console.log(this.salesclerk);
              console.log(this.salesclerk.id, this.salesclerk1.id)
              if(this.salesclerk.id!=this.salesclerk1.id||this.salesclerk.name!=this.salesclerk1.name||this.salesclerk.prefession!=this.salesclerk1.prefession||this.salesclerk.shop!=this.salesclerk1.shop){

                console.log('no');
                console.log(this.salesclerks);
                console.log(this.num);
                console.log(this.salesclerks[this.num].id==this.salesclerk.id);
                console.log(this.salesclerks.splice(this.num,1,'{ id: 1111, name: "黄药师", prefession: "店长", shop: "桃花岛" }'));
                this.salesclerks.splice(this.num,1,{ id: this.salesclerk.id, name: this.salesclerk.name, prefession: this.salesclerk.prefession, shop: this.salesclerk.shop });
                console.log(this.salesclerks)

              }
          }

          this.dialogSalesclerksFormVisible = false;
      },
      handleEdit(index, row) {
          this.flag = false;
          console.log(index, row)
          console.log(this.$options.methods.deepClone(row))
          this.salesclerk1 = row;
          this.num=index;
          this.salesclerk = this.$options.methods.deepClone(row);
          console.log(this.dialogSalesclerksFormVisible)
          this.dialogSalesclerksFormVisible = true;
      },
      handleDelete(index, row) {
          console.log(index, row)
          // index 删除的位置 删除多少个
          this.salesclerks.splice(index, 1)
      },
      deepClone(obj) {
          var target = {};
          for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  if (typeof obj[key] === 'object') {
                      target[key] = deepClone(obj[key]);
                  } else {
                      target[key] = obj[key];
                  }
              }
          }
          return target;
      },
      btnClick(){
          this.$emit('customEvent');
      },
      btnClick1(){
          // this.$emit('customEvent1',this.salesclerks[0]);
          const data={};
          data.salesclerk=this.salesclerks[0];
          data.index=0;
          this.$emit('customEvent1',data);
      },
  }
});
</script>

<style lang="scss" scoped>
.active {
  background-color: red;
}

.hasError {
  color: red;
}
</style>