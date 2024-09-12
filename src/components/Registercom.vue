<template>
  <form class="login-from">
    <h2>註冊帳號</h2>
    <div class="login-from-item">
      <label for="myemail">Email</label>
      <input placeholder="請輸入Email" v-model="signOutbox.email" type="email" id="myemail" />
    </div>
    <div class="login-from-item d-flex flex-column">
      <label for="nickname">您的暱稱</label>
      <input v-model="signOutbox.nickname" placeholder="請輸入您的暱稱" type="text" id="nickname" />
    </div>
    <div class="login-from-item d-flex flex-column">
      <label for="mypassword">密碼</label>
      <input
        v-model="signOutbox.password"
        type="password"
        id="mypassword"
        placeholder="請輸入密碼"
      />
    </div>
    <div class="login-from-item d-flex flex-column">
      <label for="againpassword">再次輸入密碼</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="againpassword"
        placeholder="請再次輸入密碼"
      />
    </div>

    <div class="d-flex flex-column mx-auto">
      <button class="member-sumit-btn btn" type="button " @click="signup">註冊帳號</button>
      <router-link to="/login" class="member-sumit-btn btn" type="button ">登入</router-link>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const apiurl = 'https://todolist-api.hexschool.io'
const signOutbox = reactive({
  email: '',
  password: '',
  nickname: ''
})

const confirmPassword = ref('')
const router = useRouter()

const signup = async () => {
  if (signOutbox.password !== confirmPassword.value) {
    alert('兩次密碼輸入不一致')
    return
  }

  try {
    const res = await axios.post(`${apiurl}/users/sign_up`, signOutbox)
    alert('註冊成功')
    console.log(res.status)
    signOutbox.email = ''
    signOutbox.password = ''
    signOutbox.nickname = ''
    confirmPassword.value = ''

    router.push('/login')
  } catch (error) {
    alert('註冊失敗')
    console.log(error.message)
  }
}
</script>
