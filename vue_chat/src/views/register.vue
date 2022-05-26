<template>
  <div class="top"></div>
  <div class = "login">
    <div class="login_title"><h2>新用户注册</h2></div>
    <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="rule"
    >
      <!--  用户名 -->
      <el-form-item prop="uname">
        <el-input
            v-model="loginData.uname"
            type="text"
            maxlength="16"
            placeholder="请输入用户名"
            clearable
        />
      </el-form-item>
      <!--用户密码-->
      <el-form-item prop="password">
        <el-input
            v-model="loginData.password"
            type="password"
            maxlength="16"
            placeholder="密码"
            show-password
        />
      </el-form-item>
      <!--重复用户密码-->
      <el-form-item prop="repsw">
        <el-input
            v-model="loginData.repsw"
            type="password"
            maxlength="16"
            placeholder="密码"
            show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width: 100%;margin-top: 14px" @click="Login('loginFormRef')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { ref,Ref } from 'vue'
import type { FormInstance } from "element-plus"
import { registerApi,getLoginApi } from '@/api/api.js';
const loginFormRef = ref<FormInstance>()
export default defineComponent({
  setup() {
  },
  data() {
    const checkPsw=(rule: any, value: any, callback: any)=>{
      if (value.length < 6) {
        callback(new Error('密码位数有误！请检查密码'))
      } else {
        callback()
      }
    }
    const checkRePsw=(rule: any, value: any, callback: any)=>{
      if (value.length < 6) {
        callback(new Error('密码位数有误！请检查密码'))
      }else if(this.loginData.password!=this.loginData.repsw){
        callback(new Error('两次密码不相同！'))
      } else {
        callback()
      }
    }
    return {
      uid: '',
      loginData: {
        uname: '',
        password: '',
        repsw: '',
      },
      rule: {
        uname: [
          {required: true, message: '请输入您的昵称', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: checkPsw, trigger: 'blur'}
        ],
        repsw: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: checkRePsw, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    Login(formName:any){
      this.$refs[formName].validate(valid => {
        if (valid) {
          //表单验证成功登录
          console.log("success submit!!");
          let params = {
            uname: this.loginData.uname,
            password: this.loginData.password,
          };
          registerApi(params).then((res:any) => {
            if(res.data.code == 2){
              console.log('注册成功')
              let data = {
                uid:res.data.uid,
                password: this.loginData.password,
              }
              ElMessageBox.alert( '您的账号是  \n:'+res.data.uid, '即将跳转登录', {
                confirmButtonText:'确认',
                callback: (action: Action) => {
                  getLoginApi(data).then((ress:any)=>{
                    localStorage.setItem("vc_token", ress.data.token);//登录后存储token值
                    localStorage.setItem("vc_uid", ress.data.uid);
                    localStorage.setItem("vc_headurl", ress.data.selfHeaderUrl);
                    localStorage.setItem("vc_uname", ress.data.uname);
                    ElNotification({
                      title: '登录成功',
                      message: '欢迎您！'+res.data.uname,
                      type: 'success',
                      showClose: false,
                      duration:1000
                    })
                    this.$router.push({ path:'/'})
                  })
                },
              })
            }else {
              console.log("错误，请重试")
              ElMessage({
                message:'错误，请重试',
                type:"warning",
                duration:1000
              })
            }
          });
        }else{
          console.log('Err submit!!');
        }
      });
    }
  }
})
</script>
<style scoped>
.top{
  padding-top: 100px;
}
.login{
  margin: 0 auto;
  width: 260px;
  padding: 24px  36px;
  background: #ededed;
}
.login_title{
  padding-bottom: 20px;
  text-align: left;
}
.el-alert {
  margin: 20px 0 0;
}
</style>