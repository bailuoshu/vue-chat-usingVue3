<template>
  <div style="height: 100%;width: 100%">
    <div id="send_menu">
      <svg t="1652989930878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4836" width="20" height="20"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m0 832C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384z" p-id="4837" fill="#2c2c2c"></path><path d="M320 384m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4838" fill="#2c2c2c"></path><path d="M704 384m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4839" fill="#2c2c2c"></path><path d="M224 512c0 159.072 128.928 288 288 288s288-128.928 288-288H224z" p-id="4840" fill="#2c2c2c"></path></svg>
      <svg t="1652990023040" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1338" width="20" height="20"><path d="M506 894.2a33 32.9 0 1 0 66 0 33 32.9 0 1 0-66 0Z" fill="#2c2c2c" p-id="1339"></path><path d="M864 388.7v-4.4c0-70.7-57.3-128-128-128H511.8l-82.5-110.9c-7.4-12.9-18-16.2-27.3-16l-0.1-0.1H192.1c-70.7 0-128 57.3-128 128v542.1c0 70.7 57.3 128 128 128H407v-0.4c18.2 0 33-14.7 33-32.9s-14.8-32.9-33-32.9c-1 0-2.1 0.1-3.1 0.1h-181c-35.3 0-64-28.7-64-64 0-5.5 0.7-10.9 2-16L234 498.9l0.2-0.1c6.7-28.1 31.9-49 62.1-49.1l0.2-0.1h532.2c1.3-0.1 2.5-0.1 3.8-0.1 35.3 0 64 28.7 64 64 0 6.7-1.1 13.3-3 19.4v0.1L821 812.8c-0.1 0.6-0.3 1.1-0.4 1.7l-1.5 5.8-0.5 0.4c-1.5 3.9-3.4 7.5-5.5 11h-1.3c-2.6 4.7-5.8 9.1-9.5 12.9-11.4 10.6-26.7 17.1-43.4 17.1-1.3 0-2.6 0-3.8-0.1h-80.8c-1-0.1-2.1-0.1-3.1-0.1-18.2 0-33 14.7-33 32.9s14.8 32.9 33 32.9v0.2H763l0.5-0.4c59.1-0.2 108.7-40.4 123.2-95l0.2-0.2 67.8-285.5c2.9-10.8 4.5-22.1 4.5-33.8-0.1-59.5-40.5-109.5-95.2-123.9z m-571.5-4.9c-62 0-113.7 44.2-125.5 102.7l-0.5 0.4-38 160.3V257c0-35.3 28.7-64 64-64H383l82.7 111.3c6.6 11.4 19.2 17.2 31.5 15.8h238.5c35.2 0 63.8 28.5 64 63.7H292.5z" fill="#2c2c2c" p-id="1340"></path></svg>
      <svg t="1652990377612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4836" width="20" height="20"><path d="M551.384615 899.938462V945.230769h78.769231a39.384615 39.384615 0 0 1 0 78.769231H393.846154a39.384615 39.384615 0 0 1 0-78.769231h78.769231v-45.292307c-199.010462-19.731692-354.461538-187.667692-354.461539-391.876924V472.615385a39.384615 39.384615 0 0 1 78.769231 0v35.446153a315.076923 315.076923 0 1 0 630.153846 0V472.615385a39.384615 39.384615 0 0 1 78.769231 0v35.446153c0 204.209231-155.451077 372.145231-354.461539 391.876924zM512 0a236.307692 236.307692 0 0 1 236.307692 236.307692v275.692308a236.307692 236.307692 0 1 1-472.615384 0V236.307692a236.307692 236.307692 0 0 1 236.307692-236.307692z" fill="#2c2c2c" p-id="4837"></path></svg>
    </div>
    <div id="input_msg">
      <textarea rows="2" autofocus="autofocus" @keydown="messageSendlisten" v-model="MSG" maxlength="254" name="msg"></textarea>
    </div>
    <div id="send_btn">
      <button class="button" @click="send()">发送</button>
    </div>
  </div>
</template>
<script>
import {sendSock, createWebSocket, closeSock} from "@/api/Ws"
export default {
  props:{
    to_uid:Number|String,
  },
  name: "Send",
  data(){
    return{
      MSG:'',
      self_uid:'',
      token:'',
      self_name:'',
      msgJson:{},
    }
  },
  mounted() {
    this.self_uid = localStorage.getItem("vc_uid");
    this.token = localStorage.getItem("vc_token");
    this.self_name = localStorage.getItem("vc_uname");
  },
  methods: {
    messageSendlisten(event) {
      if (event.keyCode === 13) {
        this.send(); // 发送文本
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    },
    send() {
      if (!this.MSG) {
        ElMessage({
          message: '消息不能为空',
          type: "warning",
          duration: 1000
        })
        return;
      }else{
        //获取当前时间
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        let getTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        let msg = {
          'token'  : this.token,
          'from_uid': this.self_uid,
          'from_uname': this.self_name,
          'to_uid': this.to_uid,
          'to_uname': '-',
          'type'   :  'text',
          'data'   :  this.MSG,
          'is_see' :  0,
          'time'   :  getTime
        }
        this.$emit('msgJson',msg);
        sendSock(JSON.stringify(msg))
        this.MSG = '';
      }
    }
  }
}
</script>


<style scoped>
#send_menu{
  padding-top: 10px;
  text-align: left;
}
#send_menu svg{
  margin-right: 10px;
}
#input_msg{

}
textarea{
  font-size: 18px;
  width:96%;
  line-height: 28px;
  border: 0;
  background: rgb(245,245,245);
  outline: none;
  resize:none;
}
textarea::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
textarea::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
  background:#888888;
}
textarea::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: rgb(245,245,245);
}
#send_btn{
  text-align: right;
}
.button{
  border: none;
  font-size: 16px;
  border-radius: 5px;
  background: rgb(233,233,233);
  padding: 6px 36px;
  color:rgb(6,174,87);
}
.button:hover{
  background: rgb(210,210,210);
}
.button:active {
  background: rgb(195,195,195);
}
</style>