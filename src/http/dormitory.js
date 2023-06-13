//统一api管理
import instance from "./axios";
const userLogin=(data)=>{
    //返回Promise对象
    return instance.request({
        url:'api/mobile/elogin', //url=baseUrl+url,
        method:'post',
        data,
        headers:{

        }
    })
}

const getalldormitory = (data)=>{
    return instance.request({
        url:'api/dormitory/all',
        data
    })
}

const addDormitory = (data)=>{
    return instance.request({
        url:'api/dormitory/add',
        method:'post',
        data
    })
}

const deleteDormitory = (params)=>{
    return instance.request({
        url:'api/dormitory/delete',
        params
    })
}

const editDormitory = (data)=>{
    return instance.request({
        url:'api/dormitory/edit',
        method:'post',
        data
    })
}

const getDormitoryByColums = (data)=>{
    return instance.request({
        url:'api/dormitory/colums',
        data
    })
}

const getonedormitory = (params)=>{
    return instance.request({
        url:'api/dormitory/one',
        params
    })
}


export {

    getalldormitory,
    addDormitory,
    deleteDormitory,
    editDormitory,
    getDormitoryByColums,
    getonedormitory
} 