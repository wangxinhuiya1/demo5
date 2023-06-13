<template>
    <div class="container">
        <h1 class="title">微校园管理-宿舍管理</h1>
        <div class="center">
            <el-select v-model="selectedSchoolId" placeholder="请选择学校名称" class="select-box">
                <el-option v-for="school in schools" :key="school.id" :label="school.schoolName"
                    :value="school.id"></el-option>
            </el-select>
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>
  
<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
    width: 300px;
    margin-right: 10px;
}
</style>
  
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getAllSchool } from '../../http/DormitoryManagement'
import { useRouter } from 'vue-router'

interface SchoolItem {
    id: number;
    province: string;
    city: string;
    area: string;
    schoolName: string;
}

const selectedSchoolId = ref('') // 存储选择的学校ID
const schools = ref<SchoolItem[]>([]) // 存储学校数据

const router = useRouter()

const getAllSchoolData = () => {
    getAllSchool()
        .then(res => {
            console.log(res)
            if (res) {
                schools.value = res.data.schools // 将学校数据存储到schools数组中
            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const submit = () => {
    console.log('选择的学校ID:', selectedSchoolId.value)
    router.push({
        path: '/dormitory_second',
        query: {
            schoolId: selectedSchoolId.value
        }
    })
}

onMounted(() => {
    getAllSchoolData()
})
</script>
