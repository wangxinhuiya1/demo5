<template>
    <div class="file-info">
        <div class="adcate-tools">
            <el-button type="warning" @click="toAdd">添加文件夹</el-button>
            <el-input v-model="searchInput" placeholder="请输入ID或文件名" clearable style="width: 200px;"></el-input>
            <el-button type="primary" @click="searchFolder">查询</el-button>
        </div>
        <el-table :data="folders" style="width: 100%">
            <el-table-column fixed prop="icon" label="图标" width="150" />
            <el-table-column prop="id" label="编号" width="150" />
            <el-table-column prop="name" label="文件夹名称" width="250" />
            <el-table-column fixed prop="pid" label="父编号" width="150" />
            <el-table-column prop="status" label="文件类型" width="150" />
            <el-table-column prop="type" label="操作" width="150">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="toEdit(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="文件夹编辑">
        <el-form :model="folder">
            <el-form-item label="图标" :label-width="100">
                <el-input v-model="folder.icon" autocomplete="off" />
            </el-form-item>
            <el-form-item label="编号" :label-width="100">
                <el-input v-model="folder.id" autocomplete="off" readonly :placeholder="folder.id === '' ? '自动生成ID,无需编辑' : ''" />
            </el-form-item>
            <el-form-item label="文件夹名称" :label-width="100">
                <el-input v-model="folder.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="父编号" :label-width="100">
                <el-input v-model="folder.pid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="文件类型" :label-width="100">
                <el-select v-model="folder.status" placeholder="请选择文件类型">
                    <el-option label="公开" value="0"></el-option>
                    <el-option label="会员" value="1"></el-option>
                    <el-option label="私有" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script>
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import {
    addFolder,
    getAllFolders,
    folderDelId,
    folderEdit,
    folderone,
    folderqueryName
} from "../../http/folder";

export default defineComponent({
    data() {
        return {
            folders: [], // 存储文件夹信息
            dialogFormVisible: false, // 对话框显示状态
            folder: {
                "icon": "",
                "id": '',
                "name": "",
                "pid": 0,
                "status": true
            }, // 当前文件夹
            searchInput: '', // 查询的ID或文件名
        };
    },
    mounted() {
        this.fetchFolders(); // 在组件挂载时获取所有文件夹信息
    },
    methods: {
        fetchFolders() {
            // 调用获取所有文件夹的接口方法
            getAllFolders()
                .then((response) => {
                    this.folders = response.data.folders; // 将获取到的文件夹信息赋值给 folders 数组
                })
                .catch((error) => {
                    console.error("获取文件夹信息失败:", error);
                });
        },
        toAdd() {
            this.dialogFormVisible = true; // 显示添加表格
            // 可以在这里进行一些初始化操作，例如清空表单数据
            this.folder = {
                "icon": "",
                "id": '',
                "name": "",
                "pid": 0,
                "status": true
            };
        },
        save() {
            if (this.folder.id) {
                // 发送更新文件夹的请求
                folderEdit(this.folder)
                    .then(() => {
                        this.fetchFolders(); // 重新获取文件夹信息
                        this.dialogFormVisible = false;
                        ElMessage.success("修改文件夹成功");
                    })

                    .catch((error) => {
                        console.error("修改文件夹失败:", error);
                        ElMessage.error("修改文件夹失败");
                    });
            } else {
                // 发送添加文件夹的请求
                addFolder(this.folder)
                    .then(() => {
                        this.fetchFolders(); // 重新获取文件夹信息
                        this.dialogFormVisible = false;
                        ElMessage.success("添加文件夹成功");
                    })
                    .catch((error) => {
                        console.error("添加文件夹失败:", error);
                        ElMessage.error("添加文件夹失败");
                    });
            }
        },
        del(id) {
            folderDelId(id)
                .then(() => {
                    ElMessage.success("删除文件夹成功");
                    this.fetchFolders(); // 重新获取文件夹信息
                })
                .catch((error) => {
                    console.error("删除文件夹失败:", error);
                    ElMessage.error("删除文件夹失败");
                });
        },
        toEdit(row) {
            this.folder = { ...row }; // 将选中行的数据赋值给 folder 对象
            this.dialogFormVisible = true; // 显示编辑表格
        },
        update() {
            folderEdit(this.folder)
                .then((response) => {
                    console.log("Response:", response);
                    console.log("Data Type:", typeof response.data);
                    return getAllFolders();
                })
                .then((folders) => {
                    this.dialogFormVisible = false;
                    this.folders = folders;
                    ElMessage.success("修改文件夹成功");
                })
                .catch((error) => {
                    console.error("修改文件夹失败:", error);
                    ElMessage.error("修改文件夹失败");
                });
        },
        searchFolder() {
            const input = this.searchInput.trim();
            const id = parseInt(input, 10); // 将输入解析为整数
            if (!isNaN(id)) { // 如果输入为有效的ID
                folderone(id) // 使用输入的ID进行查询
                    .then((response) => {
                        if (response.data && response.data.folder) {
                            this.folders = [response.data.folder];
                            console.log("搜索结果：", this.folders);
                        } else {
                            console.log("未找到文件夹");
                            this.folders = [];
                        }
                        console.log("服务器返回的数据：", response.data); // 打印服务器返回的数据
                    })
                    .catch((error) => {
                        console.error("搜索文件夹失败：", error);
                    });
            } else if (input !== '') { // 如果输入为文件名
                folderqueryName(input) // 使用输入的文件名进行查询
                    .then((response) => {
                        if (response.data && response.data.folders) {
                            this.folders = response.data.folders;
                            console.log("搜索结果：", this.folders);
                        } else {
                            console.log("未找到文件夹");
                            this.folders = [];
                        }
                        console.log("服务器返回的数据：", response.data); // 打印服务器返回的数据
                    })
                    .catch((error) => {
                        console.error("搜索文件夹失败：", error);
                    });
            } else { // 如果输入为空
                this.fetchFolders(); // 获取全部文件夹信息
            }
        }
    }
});
</script>
  
<style lang="scss" scoped>
.folder {
  margin-top: 20px; /* 设置顶部距离 */
}

.adcate-tools {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 设置底部距离 */
}
.file-info {
  padding: 20px;
}
</style>
