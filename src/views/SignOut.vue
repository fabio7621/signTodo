<template>
  <form class="d-flex flex-column">
    <div>
      <label for="nickname">User</label>
      <input v-model="signOutbox.nickname" type="text" id="nickname" />
    </div>
    <div>
      <label for="myemail">Email</label>
      <input v-model="signOutbox.email" type="email" id="myemail" />
    </div>
    <div>
      <label for="mypassword">Password</label>
      <input
        v-model="signOutbox.password"
        type="password"
        id="mypassword"
        autocomplete="current-password"
      />
    </div>
    <button class="btn bg-info" @click="signup" type="button">送出</button>
  </form>
</template>

<script setup>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const apiurl = 'https://todolist-api.hexschool.io'
const signOutbox = reactive({
  email: '',
  password: '',
  nickname: ''
})

const router = useRouter()

const signup = async () => {
  try {
    const res = await axios.post(`${apiurl}/users/sign_up`, signOutbox)
    alert('註冊成功')
    console.log(res.status)
    signOutbox.email = ''
    signOutbox.password = ''
    signOutbox.nickname = ''
    router.push('/signin')
  } catch (error) {
    alert('註冊失敗')
    console.log(error.message)
  }
}
</script>
