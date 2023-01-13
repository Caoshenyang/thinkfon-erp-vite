<script setup lang="ts">
import { getCodeImg, login } from '@/api/login'
import type { FormInstance } from 'element-plus/es/components/form'
import { ref } from 'vue'

// 登录
const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
  remeberMe: false
})
// 验证码图片
const codeUrl = ref('')
// 验证码开启状态
const captchaEnabled = ref(true)

// 获取验证码图片
const getCode = () => {
  getCodeImg().then((res) => {
    console.log(res)
    captchaEnabled.value = res.data.captchaEnabled === undefined ? true : res.data.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.data.img
    }
    loginForm.value.uuid = res.data.uuid
  })
}
getCode()
const ruleFormRef = ref<FormInstance>()

// 登录
const handleLogin = () => {
  if (!ruleFormRef.value) return
  const username = loginForm.value.username
  const password = loginForm.value.password
  const code = loginForm.value.code
  const uuid = loginForm.value.uuid
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      login(username, password, code, uuid).then((res) => {
        console.log(res)
      })
    } else {
      getCode()
      return false
    }
  })
}

// 校验规则
const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
}
</script>

<template>
  <div class="login">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="ruleFormRef">
      <h3 class="title">ERP 管理系统</h3>
      <el-form-item prop="username" label="">
        <el-input placeholder="账号" type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="">
        <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="">
        <el-input placeholder="验证码" style="width: 63%" type="text" v-model="loginForm.code"></el-input>
        <div class="login-code">
          <img class="login-code-img" :src="codeUrl" @click="getCode()" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.remeberMe"> 记住密码 </el-checkbox>
      <el-form-item style="width: 100%; margin-top: 20px" label="">
        <el-button @click="handleLogin()" style="width: 100%" type="primary" size="default">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <span>Copyright © 2022-2023 thinkfon.erp All Rights Reserved.</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  color: #707070;
  text-align: center;
  margin: 0px auto 30px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}
.login-code {
  width: 33%;
  height: 32px;
  float: right;
  img {
    cursor: pointer;
  }
}
.login-code-img {
  height: 32px;
  margin-left: 20px;
}
.login-form {
  width: 350px;
  border-radius: 6px;
  background-color: #fff;
  padding: 25px 25px 25px 25px;
}

.login-footer {
  position: fixed;
  bottom: 10px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: Arial;
}
</style>
