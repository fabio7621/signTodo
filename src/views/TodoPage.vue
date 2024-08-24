<template>
  <div class="todo-page-wrap">
    <h1 class="sr-only">最實用的線上代辦事項服務</h1>

    <div class="section-todolist">
      <header class="todo-header d-flex align-items-center">
        <div class="todo-logo-pic me-auto">
          <img src="../../public/images/logo.png" alt="logo" />
        </div>
        <p style="cursor: pointer" v-if="resData.status" class="ms-auto">
          {{ resData.nickname }}<span @click.prevent="checkout">登出</span>
        </p>
        <p style="cursor: pointer" class="text-danger" v-else>未登入</p>
      </header>
      <section class="todo-content">
        <div class="newTodo d-flex align-items-center">
          <input v-model.trim="newtodo.content" placeholder="新增/編輯" type="text" />
          <div class="newTodo-box d-flex">
            <button @click.prevent="saveTodo" class="m-auto btn d-flex p-0">
              <div class="plus-pic">
                <img src="../../public/images/plus.png" alt="plus" />
              </div>
            </button>
          </div>
        </div>
        <div class="todos-box">
          <div class="todos-top-btns">
            <button
              @click="getTodos(全部)"
              class="todo-btn rounded-0"
              :class="{ active: optStatus.all }"
            >
              全部
            </button>
            <button
              @click="getTodos(待完成)"
              class="todo-btn rounded-0"
              :class="{ active: optStatus.finish }"
            >
              待完成
            </button>
            <button
              @click="getTodos(已完成)"
              class="todo-btn rounded-0"
              :class="{ active: optStatus.all }"
            >
              已完成
            </button>
          </div>
          <ul class="todo-lists">
            <li v-for="item in todos" :key="item.uid">
              <input v-if="!item.status" type="checkbox" @change="statusTodoChange(item.id)" />
              <div v-else class="todo-lists-check">
                <img src="../../public/images/check 1.png" alt="check" />
              </div>
              <p v-if="!item.status">{{ item.content }}</p>
              <p v-else>
                <del>{{ item.content }}</del>
              </p>
              <i
                v-if="!item.status"
                @click="editTodo(item)"
                class="bi bi-pencil-square d-block ms-3"
              ></i>
              <i @click="deletedTodo(item.id)" class="bi bi-x-lg ms-auto"></i>
            </li>
            <aside>{{ notFinish.length }} 個待完成項目</aside>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
import axios from 'axios'

const apiurl = 'https://todolist-api.hexschool.io'

const resData = ref({})
const todos = ref([])
const newtodo = reactive({
  content: ''
})
const isEditing = ref(false)
const editTodoId = ref(null)

const optStatus = reactive({
  all: false,
  finish: false,
  noFin: false
})

const checkLogin = async () => {
  try {
    const response = await axios.get(`${apiurl}/users/checkout`)
    resData.value = response.data
  } catch (error) {
    console.error('驗證失敗:', error.message)
    alert(`驗證失敗: ${error.message}`)
    router.push('/')
  }
}

const getTodos = async () => {
  try {
    const response = await axios.get(`${apiurl}/todos/`)
    todos.value = response.data.data
    console.log(todos.value)
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

// const formatDate = (timestamp) => {
//   const date = new Date(timestamp * 1000)
//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')
//   const hours = String(date.getHours()).padStart(2, '0')
//   const minutes = String(date.getMinutes()).padStart(2, '0')
//   return `${year}年${month}月${day}日 ${hours}時${minutes}分`
// }

const checkout = async () => {
  try {
    await axios.post(`${apiurl}/users/sign_out`)
    alert('登出成功')
    router.push('/login')
  } catch (error) {
    console.error('登出失敗:', error.message)
  }
}

const resetForm = () => {
  newtodo.content = ''
  isEditing.value = false
  editTodoId.value = null
}

const notFinish = computed(() => {
  return todos.value.filter((item) => item.status === false)
})

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/, '$1')
  axios.defaults.headers.common.Authorization = token

  checkLogin()
  getTodos()
})
</script>
