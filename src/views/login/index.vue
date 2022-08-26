<template>
  <div class="login">
    <div class="login-card">
      <h3 class="form-title">电机云</h3>
      <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" clearable />
        </el-form-item>
      </el-form>
      <el-button class="submit-button" round type="primary" @click="onSubmit(loginFormRef)">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import testApi from '@/api/modules/test'

const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
})

// 登录按钮
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      testApi.login({
        ...loginForm
      }).then((result: any) => {
        console.log('登录成功返回值', result)
      });
    }
  })
}

</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;

  .login-card {
    width: 320px;
    height: 400px;
    padding: 20px;
    margin: auto;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);

    .form-title {
      margin-bottom: 40px;
      font-size: 28px;
      text-align: center;
    }

    .login-form {
      margin-bottom: 20px;
    }

    .submit-button {
      width: 100%;
    }
  }
}
</style>