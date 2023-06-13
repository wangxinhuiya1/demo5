<template>
    <div class="file-info">
      <div class="file-tools">
        <el-button type="warning" @click="showAddForm">添加文件</el-button>
        <el-input v-model="searchId" placeholder="请输入文件ID或文件夹ID" clearable style="width: 200px;"></el-input>
        <el-button type="primary" @click="performSearch">查询</el-button>
      </div>
      <el-table :data="files" style="width: 100%" class="file-table">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="文件名称" />
        <el-table-column prop="size" label="文件大小" />
        <el-table-column prop="type" label="文件类型" />
        <el-table-column prop="description" label="文件描述" />
        <el-table-column prop="folderId" label="文件夹ID" />
        <el-table-column prop="url" label="网址" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" @click="getFileById(row.id)" class="file-edit-btn">修改</el-button>
            <el-button type="danger" @click="removeFile(row.id)" class="file-delete-btn">删除</el-button>
            <template v-if="isPreviewable(row)">
              <el-button type="success" @click="previewFile(row.url)" class="file-preview-btn">预览</el-button>
            </template>
            <template v-else>
              <el-button type="success" @click="downloadFile(row.url)" class="file-download-btn">下载</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
  
  
      <el-dialog v-model="dialogVisible" title="文件编辑" :close-on-click-modal="false">
        <el-form :model="file" ref="fileForm" label-width="80px">
          <el-form-item label="ID" required>
            <el-input v-model="file.id" autocomplete="off" readonly :placeholder="file.id === '' ? '自动生成ID,无需编辑' : ''" />
          </el-form-item>
  
          <el-form-item label="文件名称" required>
            <el-input v-model="file.name" autocomplete="off" readonly :placeholder="file.name === '' ? '上传文件自动识别名称,无需编辑' : ''" />
          </el-form-item>
          <el-form-item label="文件大小" required>
            <el-input v-model="file.size" autocomplete="off" readonly :placeholder="file.size === '' ? '上传文件自动识别文件大小,无需编辑' : ''" />
          </el-form-item>
          <el-form-item label="文件类型" required>
            <el-select v-model="file.type" placeholder="请选择文件类型">
              <el-option label="0：图片" value="0"></el-option>
              <el-option label="1：视频或文件" value="1"></el-option>
            </el-select>
          </el-form-item>
  
          <el-form-item label="文件描述" required>
            <el-input v-model="file.description" autocomplete="off" placeholder="请简略描述文件"/>
          </el-form-item>
          <el-form-item label="文件夹ID" required>
            <el-select v-model="file.folderId" placeholder="请选择存入的文件夹">
              <el-option label="图片" value="918"></el-option>
              <el-option label="文档" value="919"></el-option>
              <el-option label="PDF" value="915"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网址" required>
            <el-input v-model="file.url" autocomplete="off" readonly :placeholder="file.url === '' ? '点击上传文件自动识别url,无需编辑' : ''" />
          </el-form-item>
          <form @submit.prevent="uploadFile">
            <input type="file" ref="fileInput" @change="handleFileChange" />
            <button type="submit">上传文件</button>
          </form>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveFile">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
    
  <script>
  import { ref, onMounted } from 'vue';
  import { getOneFile, getFilesByFolderId, deleteFile, editFile, getAllFiles, addFile, cosUploadFile } from '../../http/file';
  import { fromPairs } from 'lodash-es';
  
  export default {
    data() {
      return {
        selectedFile: null,
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
        console.log('选择的文件信息：', this.selectedFile);
        // 将文件大小赋值给编辑框中的 '文件大小' 字段
        this.file.size = this.selectedFile.size;
  
        // 将文件名称赋值给编辑框中的 '文件名称' 字段
        this.file.name = this.selectedFile.name;
      },
      uploadFile() {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
  
          // 调用API上传文件
          cosUploadFile(formData)
            .then(response => {
              console.log('文件上传成功：', response.data);
              // 将 filePath 赋值给编辑框中的 '网址' 字段
              this.file.url = response.data.filePath;
            })
            .catch(error => {
              console.error('文件上传失败：', error);
            });
        } else {
          console.error('请选择要上传的文件');
        }
      },
      //判断是预览还是下载
      isPreviewable(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        return ext === 'jpg' || ext === 'pdf';
      },
  
    },
    setup() {
      const files = ref([]);
      const searchId = ref('');
      const dialogVisible = ref(false);
      const selectedFile = ref(null);
      const file = ref({
        description: '',
        folderId: '',
        id: 0,
        name: '',
        size: '',
        type: '',
        url: ''
      });
      const fileForm = ref(null);
      const uploadRef = ref(null);
      const showAddForm = () => {
        file.value = {
          description: '',
          folderId: '',
          id: '',
          name: '',
          size: '',
          type: '',
          url: ''
        };
        dialogVisible.value = true;
      };
  
      const getFileById = (id) => {
        return new Promise((resolve, reject) => {
          getOneFile(id)
            .then((response) => {
              console.log(response.data.fileInfo);
              file.value = response.data.fileInfo;
              dialogVisible.value = true;
              resolve(); // 解析 Promise 对象，表示异步操作成功完成
            })
            .catch((error) => {
              console.error('获取文件失败：', error, error.response);
              reject(error); // 拒绝 Promise 对象，表示异步操作失败
            });
        });
      };
  
      const removeFile = (id) => {
        deleteFile({ id })
          .then(() => {
            ElMessage.success("删除文件成功");
            getFileList();
          })
          .catch((error) => {
            ElMessage.success("删除文件失败");
          });
      };
  
      const saveFile = () => {
        if (file.value.id) {
          // 发送更新文件的请求
          editFile(file.value.id, file.value)
            .then(() => {
              return getFileList();
            })
            .then((fileList) => {
              ElMessage.success("更新文件成功");
              dialogVisible.value = false;
              files.value = fileList;
            })
            .catch((error) => {
              ElMessage.success("更新文件失败");
            });
        } else {
          // 发送添加文件的请求
          addFile(file.value)
            .then(() => {
              return getFileList();
            })
            .then((fileList) => {
              ElMessage.success("添加文件成功");
              dialogVisible.value = false;
              files.value = fileList;
            })
            .catch((error) => {
              console.error('添加文件失败：', error);
            });
        }
      };
  
      const performSearch  = () => {
        if (searchId.value) {
          if (searchId.value === '918' || searchId.value === '919' || searchId.value === '915') {
            // 执行文件夹ID搜索
            console.log('搜索文件夹ID：', searchId.value);
            getFilesByFolderId(searchId.value)
              .then((response) => {
                console.log('搜索文件夹ID：', response.data);
                files.value = response.data.fileInfos;
                ElMessage.success("搜索文件成功");
              })
              .catch((error) => {
                console.error('搜索文件失败：', error);
                ElMessage.success("搜索文件失败");
              });
          } else {
            // 执行文件ID搜索
            console.log('搜索文件ID：', searchId.value);
            getOneFile(searchId.value)
              .then((response) => {
                if (response.data && response.data.fileInfo) {
                  files.value = [response.data.fileInfo];
                  ElMessage.success("搜索文件成功");
                } else {
                  ElMessage.success("未找到文件夹");
                  files.value = [];
                }
              })
              .catch((error) => {
                console.error('搜索文件失败：', error);
                ElMessage.success("搜索文件失败");
              });
          }
        } else {
          getFileList();
        }
      };
  
  
      const getFileList = () => {
        getAllFiles()
          .then((fileInfos) => {
            files.value = fileInfos;
          })
          .catch((error) => {
            console.error('获取文件列表失败：', error);
          });
      };
      //下载文件
      const downloadFile = (url) => {
        window.open(url, '_blank');
      };
      //预览文件
      const previewFile = (url) => {
        // 执行预览操作，例如打开一个新的页面展示图片或PDF
        window.open(url, '_blank');
      };
  
      onMounted(getFileList);
  
      return {
        files,
        searchId,
        dialogVisible,
        file,
        showAddForm,
        getFileById,
        removeFile,
        saveFile,
        performSearch,
        cosUploadFile,
        downloadFile,
        previewFile
      };
    }
  };
  </script>
  
  <style scoped>
  .file-info {
    padding: 20px;
  }
  
  .file-tools {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .file-table {
    background-color: #f5f7fa;
    text-align: center; /* 设置表格内容居中对齐 */
  }
  
  
  
  .file-edit-btn {
    margin-right: 10px;
    margin-left: 10px; /* 设置左边距 */
  }
  
  .file-delete-btn {
    margin-right: 10px;
    margin-left: 10px; /* 设置左边距 */
  }
  
  .file-preview-btn {
    margin-right: 10px;
    margin-left: 10px; /* 设置左边距 */
  }
  
  .file-download-btn {
    margin-right: 10px;
    margin-left: 10px; /* 设置左边距 */
  }
  </style>