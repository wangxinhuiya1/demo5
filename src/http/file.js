import instance from "./axios";

const userLogin=(data)=>{
  //返回Promise对象
 return instance.request({
      url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
      method:'post',
      data,
    
  })
}
const adminLogin=(data)=>{
 return instance.request({
  url:'', //url=baseURL+url
      method:'post',
      data
 })
}
// 添加文件接口
const addFile = (data) => {
  return instance.request({
    url: "api/file-info/add",
    method: "post",
    data,
  });
};

// 获取所有文件接口
const getAllFiles = () => {
  return instance.request({
    url: "/api/file-info/all",
    method: "get",
  })
  .then((response) => {
    return response.data.fileInfos;
  })
  .catch((error) => {
    console.error('Failed to get files:', error);
  });
};

// 删除文件接口
const deleteFile = (params) => {
  return instance.request({
    url: "/api/file-info/delete",
    method: "get",
    params
  });
};

// 编辑文件接口
const editFile = (id, data) => {
  return instance.request({
    url: `/api/file-info/edit`, // 使用模板字符串替换占位符，并将ID作为URL的一部分
    method: "post",
    data
  });
};


// 获取单个文件接口
const getOneFile = (id) => {
  return instance.request({
    url: `/api/file-info/one/${id}`, // 使用模板字符串替换占位符
    method: "get",
  });
};


// 获取文件夹ID接口
const getFilesByFolderId = (id) => {
  return instance.request({
    url: `/api/file-info/folder/${id}`, // 使用模板字符串替换占位符
    method: "get",
  });
};

// 上传文件
const cosUploadFile = (file) => {
  return instance.request({
    url: '/api/upload/file', 
    method: 'post',
    data:file
  });
};

export {
  getOneFile,
  editFile,
  deleteFile,
  getAllFiles,
  addFile,
  userLogin,
  adminLogin,
  getFilesByFolderId,
  cosUploadFile
};
