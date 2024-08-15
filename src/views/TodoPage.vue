<template>
  <div class="d-flex flex-column">
    <p>todo</p>
    <p>登入狀態</p>
    <div class="d-flex flex-column" v-if="resData.status">
      <p>{{ resData.nickname }}</p>
      <p>{{ resData.uid }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const apiurl = 'https://todolist-api.hexschool.io'
const token = document.cookie.replace(/(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/, '$1')

const resData = ref({})

onMounted(async () => {
  try {
    const response = await axios.get(`${apiurl}/users/checkout`, {
      headers: {
        Authorization: token
      }
    })
    console.log(response.data)
    resData.value = response.data
  } catch (error) {
    console.error('驗證失敗:', error.message)
    alert(`驗證失敗: ${error.message}`)
  }
})
</script>
