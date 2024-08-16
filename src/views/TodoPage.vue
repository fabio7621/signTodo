<template>
  <div class="d-flex flex-column">
    <p>todo</p>
    <p>登入狀態</p>
    <div class="d-flex flex-column" v-if="resData.status">
      <p>{{ resData.nickname }}</p>
      <p>{{ resData.uid }}</p>
    </div>
    <ul>
      <li v-for="item in todos" :key="item.id" class="d-flex align-items-center mt-2">
        <p>
          <span>{{ formatDate(item.createTime) }}</span> {{ item.content }}
        </p>
        <button class="btn bg-info text-white" type="button">編輯</button>
        <button class="btn bg-info text-white mx-1" type="button">刪除</button>
      </li>
    </ul>
    <div>
      <input
        v-model.trim="newtodo.content"
        class="form-control"
        placeholder="請輸入內容"
        type="text"
      />
      <button @click.prevent="addTodo" class="btn bg-info text-white mt-1" type="button">
        新增/編輯
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

const apiurl = 'https://todolist-api.hexschool.io'

const resData = ref({})
const todos = ref([])
const newtodo = reactive({
  content: ''
})

const checkLogin = async () => {
  try {
    const response = await axios.get(`${apiurl}/users/checkout`)
    resData.value = response.data
  } catch (error) {
    console.error('驗證失敗:', error.message)
    alert(`驗證失敗: ${error.message}`)
  }
}

const getTodos = async () => {
  try {
    const response = await axios.get(`${apiurl}/todos/`)
    todos.value = response.data.data
    console.log('回傳資料', todos.value)
  } catch (error) {
    console.log('獲取 todos 失敗:', error.message)
  }
}

const addTodo = async () => {
  try {
    if (newtodo.content.trim() === '') {
      alert('請輸入內容')
      return
    }
    const response = await axios.post(`${apiurl}/todos/`, newtodo)
    console.log('新增成功:', response.data)
    await getTodos()
    newtodo.content = ''
  } catch (error) {
    console.error('添加 Todo 失败:', error.message)
    alert(`添加 Todo 失败: ${error.message}`)
  }
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}年${month}月${day}日 ${hours}時${minutes}分`
}

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/, '$1')
  axios.defaults.headers.common.Authorization = token

  checkLogin()
  getTodos()
})
</script>
