<template>
  <div class="chat_aside">
    <div id="aside_menu">
      <img :src=selfHeaderUrl style="width: 46px;height: 46px;margin-top: 40px;" alt="">
      <div style="margin-top: 20px"><svg t="1653484312638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3420" width="28" height="28"><path d="M511.913993 67.085503C264.90173 67.085503 63.989249 239.443642 63.989249 451.193012c0 116.453553 62.957164 226.026541 174.07828 301.368722l84.1149 51.948261c-3.612296 23.565933-18.749538 74.48211-33.370737 115.93751-4.300353 12.040988-0.860071 25.458088 8.428691 34.230808 6.020494 5.504452 13.761129 8.428691 21.673778 8.428691 4.472367 0 8.77272-0.860071 13.073072-2.752226 36.466991-16.169326 147.416093-68.977658 187.49538-125.398287 243.571981-3.440282 440.356123-174.422308 440.356123-383.935495C960.010751 239.443642 759.09827 67.085503 511.913993 67.085503zM580.203595 543.908618 384.967579 543.908618c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625l195.236015 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S597.921048 543.908618 580.203595 543.908618zM640.924576 415.930119 384.967579 415.930119c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625l255.956996 0c17.717453 0 31.994625 14.277171 31.994625 31.994625C672.9192 401.652948 658.642029 415.930119 640.924576 415.930119z" p-id="3421" fill="#36ab60"></path></svg></div>
    </div>
    <div
        id="chat_list"
        :class="chatScrollCss"
        @mouseover="over"
        @mouseout="out"
    >
      <!--侧边栏顶部搜索框-->
      <div style="text-align:left;position:absolute;top:0;background:rgb(246,246,246);height:60px;width:256px">
        <div>
          <el-input v-model="select" placeholder="功能优化中...暂未开启" style="margin-top:14px; font-size: 12px;margin-left: 16px;width: 180px;height: 28px;">
            <template #prefix>
              <el-icon class="el-input__icon"><search/></el-icon>
            </template>
          </el-input>
          <span style="margin-left: 12px;vertical-align:bottom" @click="addF">
              <el-icon size="18px" style="background:#fff;padding: 4px;border-radius: 4px;border: 1px solid #ddd"><Plus /></el-icon>
          </span>
        </div>
      </div>


      <!--好友列表渲染-->
      <ul style="text-align: left">
        <li
            ref=data.uid
            v-for="data in FriendList"
            :key="data"
            :name="data.uname"
            :uid="data.uid"
            :head_url="data.head_url"
            :id="'fri_'+data.uid"
            @click="choiceFrd(data.uid)"
        >

          <div style="padding: 10px">
            <!--头像-->
            <el-badge :value="(data.msg_unm==0?'':data.msg_unm)" :max="99" class="item" style="float: left;">
            <img :src=data.head_url alt="" style="float: left;height: 50px;">
            </el-badge>
            <!--信息-->
            <div style="float: left">
              <div style="width: 184px;">
                <span style="font-size: 14px;margin-left: 20px">{{data.uname}}</span>
                <span style="float: right;font-size: 8px;color: #aaa">{{timesubstr((data.last_time))}}</span>
              </div>
              <div style="margin-top: 10px;font-size: 12px;color:#bbb;margin-left: 20px">{{data.msg}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {addfriend, AlreadyLook, getFriendList} from "../api/api";

export default {
  name: "Aside",
  props:{
    aside_Msgs:Object||Array
  },
  data(){
    return{
      selfHeaderUrl:'',//自己的头像
      self_uid:'',//自己用户的uid
      self_name:'',
      select:'',//搜索框绑定
      clickID:'',//当前点击选择的好友列表id
      toName:'',//跟谁聊天
      toId:'',//跟谁聊天
      FriendList:[],//好友列表
      chatScrollCss:'chatScrollHide',//初始化滑块状态
    }
  },
  mounted(){
    this.self_uid = localStorage.getItem("vc_uid");
    this.selfHeaderUrl = localStorage.getItem("vc_headurl");
    this.self_name = localStorage.getItem("vc_uname")
    let params = {
      uid:this.self_uid
    }
    this.$nextTick(function (){
      getFriendList(params).then((res) =>{
        this.FriendList = res.data.data
        if(res.data == null){return ;}
        if(res.data.code!==2){this.$router.push({ path:'/login'})}
        for(let i=0;i < res.data.length;i++){
          if(res.data[i].last_time!=null){
            this.FriendList[i].last_time = res.data[i].last_time.substr(5,11)
          }
        }
      })
    })

  },
  methods:{
    addF(){
      ElMessageBox.prompt('你要加谁呀？', '添加好友', {
        confirmButtonText: '添加',
        cancelButtonText: '取消',
        inputPattern:/^(\d{9})$/,
        inputErrorMessage: 'UID错误',
      }).then(({ value }) => {
        let add_data = {
          uid:this.self_uid,
          f_uid:value
        }
        addfriend(add_data).then((res) =>{
          if(res.data.code==1){
            ElMessage({
              type: 'warning',
              message: `${value} 已是您的好友`,
            })
          }
          if(res.data.code==2){
            ElMessage({
              type: 'success',
              message: `您已添加: ${value} 为好友`,
            })
          }
          if(res.data.code==3){
            ElMessage({
              type: 'warning',
              message: `未查询到UID为： ${value}  的好友`,
            })
          }
          if(res.data.code==4){
            ElMessage({
              type: 'warning',
              message: `您不能添加自己为好友`,
            })
          }
        })
      })
    },
    timesubstr(string){
      if(string){
        return string.substr(5,11)
      }
    },
    logout(){
      closeSock();退出登录
    },
    //鼠标划过的滑动条样式修改
    over(){
      this.chatScrollCss = "chatScrollShow"
    },
    out(){
      this.chatScrollCss = "chatScrollHide"
    },
    choiceFrd(id){
      this.clickID = 'fri_'+id;//更改当前id
      let forName = document.getElementById(this.clickID).getAttribute('name')//改选中用户的名字
      let forId = document.getElementById(this.clickID).getAttribute('uid')//改选中用户的id
      this.toName = forName
      this.toId = forId
      this.$emit('toName',forId,forName);//向父级传值
      for(let i =0;i<this.FriendList.length;i++){//清除消息提示
        if(this.FriendList[i].uid==id){
          this.FriendList[i].msg_unm = 0;
        }
      }
    }
  },
  watch:{
    clickID:{
      handler(Id,oldId) {
        document.getElementById(Id).setAttribute('style','background: rgb(210,210,210);');
        if(oldId != ''){
          //初始化时不会消除任何用户选中状态
          document.getElementById(oldId).setAttribute('style','background: rgb(230,230,230);');
        }
        AlreadyLook({from_uid:this.toId})
        console.log("正在和uid为："+this.toId+"的用户对话")
      }
    },
    aside_Msgs:{
      deep:true,
      handler(val){
        if(this.toId != val.uid){//收到的消息不是当前聊天界面的人
          for(let i =0;i<this.FriendList.length;i++){//清除消息提示
            if(this.FriendList[i].uid == val.uid){
              this.FriendList[i].last_time = val.time;
              this.FriendList[i].msg = val.data;
              this.FriendList[i].msg_unm ++;
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chat_aside{
  height: 100%;
  background: rgb(245,245,245);
  display: -webkit-flex;
  display: flex;
}
#aside_menu{
  background: #2d2d2d;
  width: 60px;
}
#chat_list{
  margin-top: 60px;
  width: 260px;
  overflow-y: auto;
}

li{
  width: 256px;
  height: 70px;
  list-style: none;
  background: rgb(230,230,230);
}
li:hover{
  background: rgb(210,210,210);
}


.chatScrollHide::-webkit-scrollbar {
  display: none;
}
.chatScrollShow::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.chatScrollShow::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
  background:#888888;
}
.chatScrollShow::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: rgb(245,245,245);
}
</style>