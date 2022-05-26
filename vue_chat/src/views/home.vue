<template>
  <div class="common-layout">
    <el-container style="background: rgb(245,245,245);">

      <!--侧边-->
      <el-aside width="320px">
        <Aside @toName="getToName" v-bind:aside_Msgs="aside_msg"></Aside>
      </el-aside>

      <!--聊天界面-->
      <el-empty v-if="to_Id == ''" :image-size="200" style="flex: 1" description="Vue - Chat" />
      <el-container v-else style="min-width: 340px;">
              <!--聊天对象-->
        <el-header class="chat_header" height="60px">
          <span style="font-weight: bold;line-height:3;font-size: 18px">{{toName}}</span>
        </el-header>

        <el-main class="chat_main">
          <MsgList v-bind:toId="to_Id" v-bind:newMsg="new_MSg"></MsgList>
        </el-main>
        <el-footer class="chat_footer" height="140px">
          <Send v-bind:to_uid="to_Id"  @msgJson="SengMsg"></Send>
        </el-footer>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import router from "../router";

let socket;
import { defineComponent } from "vue"
import Aside from "@/components/Aside.vue";
import Send from "@/components/Send.vue";
import MsgList from "@/components/MsgList.vue";
import {getMsgList} from "../api/api";
import {sendSock, createWebSocket,closeSock,websocketonmessage} from "@/api/Ws"
export default defineComponent({
  name: "home",
  components: {
    //注册组件
    Aside,
    Send,
    MsgList
  },
  created() {
    //接受消息

  },
  data(){
    return{
      selfHeaderUrl:'',//自己的头像
      self_uid:'',//自己用户的uid
      self_name:'',
      token:'',
      choiceID:'',
      toName:'',
      to_Id:'',
      new_MSg:{},
      aside_msg:{},
    }
  },
   mounted(){
     let outTime = localStorage.getItem("vc_time");
     if(outTime<Number(new Date())){
       router.push("/login")
     }
     this.self_uid = localStorage.getItem("vc_uid");
     this.token = localStorage.getItem("vc_token");
     this.selfHeaderUrl = localStorage.getItem("vc_headurl");
     this.self_name = localStorage.getItem("vc_uname");
     this.init(this.self_uid,this.token,this.self_name);
   },
  methods:{
        //子组件向父组件传参，事件处理函数
    async getToName(id,name){
      this.toName = name
      this.to_Id = id
    },
    async SengMsg(msgJson){
      this.new_MSg = msgJson
    },
    init(self_id,token,self_name){
      let that = this
      createWebSocket(this.global_callback);
      console.log("websocket已打开");
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      let getTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
      let msg = {
        'token'  : token,
        'from_uid': self_id,
        'from_uname': self_name,
        'to_uid': '-',
        'to_uname': '-',
        'type'   :  'bind',
        'data'   :  '绑定信息',
        'is_see' :  0,
        'time'   :  getTime
      }
      sendSock(JSON.stringify(msg))
    },

    global_callback(msg) {
      let that = this
      that.new_MSg =  msg
      // console.log("收到服务器信息：" + msg);
    },
  },
  watch:{
    new_MSg:{
      immediate:false,
      deep:true,
      handler(val){
        this.aside_msg = {
          data:val.data,
          time:val.time,
          uid:val.from_uid
        }
      }
    }
  }
})
</script>

<style scoped>
.common-layout,.el-container{
  height: 100%;
  min-height: 500px;
}
.chat_header{
  text-align: left;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #ddd;
}
.chat_main{
   padding: 0;
 }
.chat_footer{
  border-width:1px 0 0 0;
  border-top-style: solid;
  border-color: #ddd;
}
</style>