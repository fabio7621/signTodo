<template>
  <div class="d-flex flex-column">
    <p>todo</p>
    <p>登入狀態</p>
    <p class="text-success" v-if="resData.status">已登入</p>
    <p class="text-danger" v-else>未登入</p>
    <div class="d-flex flex-column" v-if="resData.status">
      <p>{{ resData.nickname }}</p>
      <p>{{ resData.uid }}</p>
    </div>
    <ul v-if="todos.length !== 0">
      <li v-for="item in todos" :key="item.id" class="d-flex align-items-center mt-2">
        <input
          class="form-check-input"
          :checked="item.status"
          type="checkbox"
          @change="statusTodoChange(item.id)"
          value=""
          id="flexCheckDefault"
        />
        <p>
          <span style="font-size: 10px">{{ formatDate(item.createTime) }}</span>
          {{ item.content }}
        </p>
        <button class="btn bg-info text-white" @click="editTodo(item)" type="button">編輯</button>
        <button class="btn bg-info text-white mx-1" @click="deletedTodo(item.id)" type="button">
          刪除
        </button>
      </li>
    </ul>
    <p v-else>暫時沒資料喔</p>
    <div>
      <input
        v-model.trim="newtodo.content"
        class="form-control"
        placeholder="請輸入內容"
        type="text"
      />
      <button @click.prevent="saveTodo" class="btn bg-info text-white mt-1" type="button">
        {{ isEditing ? '更新' : '新增' }}
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
const isEditing = ref(false)
const editTodoId = ref(null)

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
  } catch (error) {
    console.log('獲取 todos 失敗:', error.message)
  }
}

const saveTodo = async () => {
  try {
    if (newtodo.content.trim() === '') {
      alert('請輸入內容')
      return
    }

    if (isEditing.value) {
      await axios.put(`${apiurl}/todos/${editTodoId.value}`, newtodo)
      console.log('更新成功')
    } else {
      await axios.post(`${apiurl}/todos/`, newtodo)
      console.log('新增成功')
    }

    await getTodos()
    resetForm()
  } catch (error) {
    console.error('保存 Todo 失败:', error.message)
    alert(`保存 Todo 失败: ${error.message}`)
  }
}

const editTodo = (item) => {
  newtodo.content = item.content
  isEditing.value = true
  editTodoId.value = item.id
}

const deletedTodo = async (id) => {
  try {
    await axios.delete(`${apiurl}/todos/${id}`)
    console.log('刪除成功')
    await getTodos()
  } catch (error) {
    console.error('刪除 Todo 失败:', error.message)
  }
}

const statusTodoChange = async (id) => {
  try {
    await axios.patch(`${apiurl}/todos/${id}/toggle`)
    console.log('切換狀態成功')
    await getTodos()
  } catch (error) {
    console.error('切換狀態失败:', error.message)
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

const resetForm = () => {
  newtodo.content = ''
  isEditing.value = false
  editTodoId.value = null
}

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/, '$1')
  axios.defaults.headers.common.Authorization = token

  checkLogin()
  getTodos()
})
</script>
