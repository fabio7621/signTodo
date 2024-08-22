<template>
  <form class="login-from" @submit.prevent="signIn">
    <h2>最實用的線上代辦事項服務</h2>
    <div class="login-from-item">
      <label for="">Email</label>
      <input placeholder="請輸入Email" v-model="signinBox.email" type="email" required />
    </div>

    <div class="login-from-item d-flex flex-cloun">
      <label for="">密碼</label>
      <input placeholder="請輸入密碼" v-model="signinBox.password" type="password" />
    </div>

    <div class="d-flex flex-column mx-auto">
      <button @click="signIn" class="member-sumit-btn btn" type="button">登入</button>
      <router-link to="/register" class="member-sumit-btn btn" type="button ">註冊帳號</router-link>
    </div>
  </form>
</template>
<script setup>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const signinBox = reactive({
  email: '',
  password: ''
})

// const router = useRouter()

const apiurl = 'https://todolist-api.hexschool.io'

const signIn = async () => {
  try {
    const res = await axios.post(`${apiurl}/users/sign_in`, signinBox)
    alert('登入成功')

    document.cookie = `fabio20token=${res.data.token};expires=${new Date(res.data.exp * 1000)}; path=/`
    signinBox.email = ''
    signinBox.password = ''
    console.log(res)
    router.push('/todo')
  } catch (error) {
    alert('登入失敗')
    console.log(error.message)
  }
}
</script>
