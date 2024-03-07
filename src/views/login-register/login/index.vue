<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-19 22:45:27
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-23 18:50:26
 * @FilePath: /vue-front-template/src/views/login-register/login/index.vue
 * @Description: 登录
-->
<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <!-- 头部图标：PC端 -->
    <div class="hidden pt-10 h-16 xl:block">
      <img class="m-auto" src="https://res.lgdsunday.club/signlogo.png" alt="" />
    </div>
    <!-- 头部图标：移动端 -->
    <div class="h-[111px] xl:hidden">
      <img class="dark:hidden w-full" src="https://res.lgdsunday.club/login-bg.png" alt="" />
      <img
        class="h-10 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        srcset=""
      />
    </div>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-6 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-16 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3 class="mb-8 font-semibold text-[16px] text-main dark:text-zinc-300 hidden xl:block">
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="handleLogin()">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1.5 px-1 mb-1 text-[14px] focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
          :rules="validateUsername"
        />
        <vee-error-message
          class="text-[13px] text-red-600 block mt-1 text-left duration-200"
          name="username"
        ></vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1.5 mt-2 px-1 text-[14px] focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
          :rules="validatePassword"
        />
        <vee-error-message
          class="text-[13px] text-red-600 block mt-1 text-left duration-200"
          name="password"
        ></vee-error-message>
        <div class="pt-4 pb-3 leading-[0px] text-right">
          <a
            class="inline-block py-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
          >
            去注册
          </a>
        </div>

        <i-button
          type="main"
          :loading="loading"
          class="w-full dark:bg-zinc-900 text-[14px] py-1.5 xl:dark:bg-zinc-800"
          :is-active-anim="false"
        >
          登录
        </i-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <i-svg-icon class="w-6 cursor-pointer" name="qq"></i-svg-icon>
        <!-- 微信 -->
        <i-svg-icon class="w-6 cursor-pointer" name="wexin"></i-svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { defineOptions, ref } from 'vue'
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'Login'
})
const loading = ref(false)
// 用户输入的用户名和密码
const loginForm = ref({
  username: 'Anson',
  password: 'szkd0421',
  loginType: 'username'
})
const store = useStore()
const router = useRouter()
const handleLogin = async () => {
  loading.value = true
  try {
    await store.dispatch('user/login', {
      ...loginForm.value
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>
