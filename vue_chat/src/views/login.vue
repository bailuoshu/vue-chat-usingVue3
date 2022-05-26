<template>
  <div class="top"></div>
  <div class = "login">
    <div class="login_title"><h2>登录</h2></div>
    <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="rule"
    >
      <!--  用户id-->
      <el-form-item prop="uid">
        <el-input
            v-model="loginData.uid"
            type="text"
            maxlength="9"
            placeholder="账号"
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

      <el-form-item>
        <el-button type="success" style="width: 100%;margin-top: 14px" @click="Login('loginFormRef')">登录</el-button>
      </el-form-item>
    </el-form>
    <div  style="text-align: left;">
      <router-link to="/register" style="font-size: 8px;">没有账号？注册一个</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { ref,Ref } from 'vue'
import type { FormInstance } from "element-plus"
import { getLoginApi } from '@/api/api.js';
const loginFormRef = ref<FormInstance>()
export default defineComponent({
  setup() {
  },
  data() {
    const checkUid=(rule: any, value: any, callback: any)=>{
      let regUid = /^[0-9]+$/
      if (!regUid.test(value)) {
        callback(new Error('UID错误！请输入正确的UID'))
      } else if (value.length != 9) {
        callback(new Error('请检查UID'))
      } else {
        callback()
      }
    }
    const checkPsw=(rule: any, value: any, callback: any)=>{
      if (value.length < 6) {
        callback(new Error('密码位数有误！请检查密码'))
      } else {
        callback()
      }
    }
    return {
      loginData: {
        uid: '',
        password: ''
      },
      rule: {
        uid: [
          {required: true, message: '请输入UID', trigger: 'blur'},
          {validator: checkUid, trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: checkPsw, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    localStorage.clear();
  },
  methods: {
    Login(formName:any){
      this.$refs[formName].validate(valid => {
        if (valid) {
          //表单验证成功登录
          console.log("success submit!!");
          let params = {
            uid: this.loginData.uid,
            password: this.loginData.password,
          };
          getLoginApi(params).then((res:any) => {
            if(res.data.code == 0){
              console.log('账户未注册')
              ElMessage({
                message:'账户未注册',
                type:"warning",
                duration:1000
              })
            }
            else if(res.data.code == 1){
              console.log('密码错误')
              ElMessage({
                message:'密码错误',
                type:"warning",
                duration:1000
              })
            }else if(res.data.code == 2){
              console.log('登录成功')
              let vc_time =Number(new Date())+1000*60*60*24;
              localStorage.setItem("vc_time",vc_time);
              localStorage.setItem("vc_token", res.data.token);//登录后存储token值
              localStorage.setItem("vc_uid", res.data.uid);
              localStorage.setItem("vc_headurl", res.data.selfHeaderUrl);
              localStorage.setItem("vc_uname", res.data.uname);
              ElNotification({
                title: '登录成功',
                message: '欢迎您！'+res.data.uname,
                type: 'success',
                showClose: false,
                duration:1000
              })
              this.$router.push({ path:'/'})
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