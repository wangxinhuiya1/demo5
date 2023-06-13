import instance from "./axios";

// 用户登录接口
const userLogin = (data) => {
return instance.request({
url: 'api/mobile/elogin',
method: 'post',
data,
headers: {}
});
};

// 管理员登录接口
const adminLogin2 = function(data) {
return instance.request({
url: 'api/admin/login', // 替换为实际的URL
method: 'post',
data
});
};

// 获取所有学校接口
const getAllSchool = () => {
return instance.request({
url: "api/school/all",
method: "get",
});
};

// 获取所有建筑接口
const getAllBuilding = () => {
return instance.request({
url: "api/building/all",
method: "get",
});
};

// 获取单个宿舍信息接口
const getDormitoryById = (params) => {
return instance.request({
url: 'api/dormitory/one',
method: 'get',
params
});
};


// 获取所有宿舍接口
const getAllDormitories = () => {
return instance.request({
url: "api/dormitory/all",
method: "get",
});
};
// 添加宿舍信息接口
const addDormitory = (data) => {
return instance.request({
url: "api/dormitory/add",
method: "post",
data
});
};
// 编辑宿舍信息接口
const editDormitory = (data) => {
return instance.request({
url: 'api/dormitory/edit',
method: 'post',
data
});
};

// 删除宿舍信息接口
const deleteDormitory = (params) => {
return instance.request({
url: 'api/dormitory/delete',
method: 'get',
params
});
};

// 获取所有学生接口
const getAllStudents = () => {
return instance.request({
url: "api/student/all",
method: "get",
});
};

// 获取所有教师接口
const getAllTeachers = () => {
return instance.request({
url: "api/teacher/all",
method: "get",
});
};

// 添加宿舍学生信息接口
const addDormitoryStudent = (dormitoryStudentData) => {
    return instance.request({
      url: "api/dormitory-student/add",
      method: "post",
      data: dormitoryStudentData,
    });
  };
  
  // 获取所有宿舍学生信息接口
  const getAllDormitoryStudents = () => {
    return instance.request({
      url: "api/dormitory-student/all",
      method: "get",
    });
  };
  
  // 删除宿舍学生信息接口
  const deleteDormitoryStudent = (id) => {
    return instance.request({
      url: `api/dormitory-student/delete/${id}`,
      method: "get",
    });
  };
  
  // 编辑宿舍学生信息接口
  const editDormitoryStudent = (dormitoryStudentData) => {
    return instance.request({
      url: "api/dormitory-student/edit",
      method: "post",
      data: dormitoryStudentData,
    });
  };
  
  // 获取单个宿舍学生信息接口
  const getDormitoryStudentById = (id) => {
    return instance.request({
      url: `api/dormitory-student/one/${id}`,
      method: "get",
    });
  };


export {
userLogin,
adminLogin2,
getAllSchool,
getAllBuilding,
getAllDormitories,
getDormitoryById,
addDormitory,
editDormitory,
deleteDormitory,
getAllStudents,
getAllTeachers,
addDormitoryStudent,
getAllDormitoryStudents,
deleteDormitoryStudent,
editDormitoryStudent,
getDormitoryStudentById
};