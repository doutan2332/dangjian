<template>
  <!--  <el-row type="flex" class="row-bg" justify="center">-->
  <!--    <el-col :xl="6" :lg="7">-->
  <!--      <h2>欢迎来到VueAdmin管理系统</h2>-->
  <!--      <el-image :src="require('@/assets/dog.png')" style="width: 180px;height: 180px"></el-image>-->
  <!--      <p>你好ya xxx</p>-->
  <!--      <p>是兄弟就来砍我</p>-->
  <!--    </el-col>-->
  <!--    <el-col :span="1">-->
  <!--      <el-divider direction="vertical"></el-divider>-->
  <!--    </el-col>-->
  <!--    <el-col :xl="6" :lg="7">-->
  <div id="login">
    <div class="main">
      <div class="top">
        <slot name="main_title">
          <div class="title">
            <div>
              <a href="/login" class="active">登录</a>
            </div>
          </div>
        </slot>
        <slot name="form">
          <div class="login_form">
            <div class="login_form">
              <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
                <el-form-item label="用户名" prop="username" style="width: 380px">
                  <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" style="width: 380px">
                  <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" style="width: 380px">
                  <el-input v-model="loginForm.code" style="width: 150px;float: left"></el-input>
                  <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                  <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </slot>
      </div>
      <div class="bottom">
        <img src="../../public/images/login/2024.jpg" alt="" style="width: 400px ;height:300px ">
      </div>
    </div>
  </div>
            <!--    </el-col>-->
            <!--  </el-row>-->
</template>

<script>
import qs from 'qs';

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输出验证码', trigger: 'blur'},
          {min: 5, max: 5, message: '长度在 5 个字符', trigger: 'blur'}
        ]
      },
      captchaImg: ''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res => {
            const jwt = res.headers['authorization']

            this.$store.commit('SET_TOKEN', jwt)
            console.log("登录成功")
            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        this.loginForm.token = res.data.data.key
        this.captchaImg = res.data.data.base64Img
        this.loginForm.code = ''
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>
<style scoped lang="scss">
@import "../assets/sass/login.scss";
#login{
  background-image: url('../assets/bg-login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.main {
  opacity: 0.7;
}
</style>

<!--<style scoped>-->
<!--.el-row {-->
<!--  background-color: #FAFAFA;-->
<!--  height: 100vh;-->
<!--  /*左右和上下交叉轴居中*/-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  text-align: center;-->
<!--}-->

<!--.el-divider {-->
<!--  height: 200px;-->
<!--}-->

<!--.captchaImg {-->
<!--  float: left;-->
<!--  margin-left: 8px;-->
<!--  border-radius: 4px;-->
<!--}-->
<!--</style>-->