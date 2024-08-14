<template>
  <form @submit.prevent="signIn">
    <div>
      <label for="myemail">Email</label>
      <input id="myemail" v-model="signinBox.email" type="email" required />
    </div>
    <div>
      <label for="mypass">Password</label>
      <input id="mypass" v-model="signinBox.password" type="password" required />
    </div>
    <button type="submit">登入</button>
  </form>
</template>

<script setup>
import axios from 'axios'
import { reactive } from 'vue'
// import { useRouter } from 'vue-router'

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

    document.cookie = `fabio20token=${res.data.token};expires=${new Date(res.data.exp)}; path=/`
    signinBox.email = ''
    signinBox.password = ''
    console.log(res)
    // router.push('/todo')
  } catch (error) {
    alert('登入失敗')
    console.log(error.message)
  }
}
</script>
