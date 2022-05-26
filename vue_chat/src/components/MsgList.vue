<template>
  <div id="msgBox">
    <div id="listBox">
      <div v-for="data in msgList" :class="setClass(data.to_uid)+'box'">
        <span :class="setClass(data.to_uid)+'head_img'">
          <img v-if="data.to_uid != this.self_uid" :src=selfHeaderUrl alt="">
          <img v-else :src=selfHeaderUrl alt="">
        </span>
        <div :class="setClass(data.to_uid)+'msg_box'">
          <div>
            <span :class="setClass(data.to_uid)+'triangle'"></span>
            <span :class="setClass(data.to_uid)+'msg'">{{data.data.split(' ').join('&emsp;')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMsgList} from "../api/api";

export default {
  name: "MsgList",
  props: {
    toId:String,//与谁对话的uid
    newMsg:Object||Array,
  },
  data(){
    return{
      classNum:0,//渲染前会监听两次初始赋值，记录并无视
      selfHeaderUrl:'',//自己的头像
      self_uid:'',//自己用户的uid
      msgList:[],
    }
  },
  mounted() {
    this.self_uid = localStorage.getItem("vc_uid");
    this.selfHeaderUrl = localStorage.getItem("vc_headurl");
    this.self_name = localStorage.getItem("vc_uname")
    getMsgList({
      uid:this.self_uid,
      to_id:this.toId,
    }).then((response) =>{
      this.msgList = response.data;
    })
  },
  methods:{
    GetMsg(val){
      getMsgList({
        uid:this.self_uid,
        to_id:val,
      }).then((response) =>{
        this.msgList = response.data;
      })
    },
    scrollToBottom(){
      //滑倒信息底部
      console.log("滑倒底了")
      let box = document.getElementById("msgBox");
      box.scrollTop = box.scrollHeight;
    },
    setClass(msg_to){
      //后期修改为id验证
      if(msg_to == this.self_uid){
        return 'other_'
      }
      else return 'self_'
    },
  },
  watch:{
    toId:{
      immediate:false,
      handler(val){
        this.GetMsg(val);
      }
    },
    msgList:{
      deep:true,
      immediate:true,
      handler(){
        if(this.classNum < 2){
          this.classNum ++
        }else{
          this.$nextTick(function (){//当页面渲染后在执行
            this.scrollToBottom()
          })
        }
      }
    },
    newMsg:{
      deep:true,
      immediate:false,
      handler(val){
        if (val.from_uid == this.toId || val.from_uid == this.self_uid){
          this.msgList.push(val)
        }
      }
    }
  },
}
</script>

<style scoped>
#msgBox{
  height: 100%;
  overflow-y: auto;
}

#msgBox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
#msgBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  box-shadow: inset 0 0 2px rgba(97, 184, 179, 0.1);
  background:#eee;
}
#msgBox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: #fff;
}
#listBox{

}
.other_head_img{
  float: left;
}
.other_head_img img{
  width: 40px;
  height: 40px;
}
.self_head_img{
  float: right;
}
.self_head_img img{
  width: 40px;
  height: 40px;
}
.self_box {
  padding: 10px;
  padding-bottom: 1px;
  text-align: right;
}
.self_msg_box{
  margin: 6px 44px 6px 70px;
}
.self_msg_box div{
  display: flex;
  flex-direction: row-reverse;
}
.self_msg{
  letter-spacing:2px;
  line-height:16px;
  padding: 8px;
  text-align: left;
  word-wrap:break-word;
  font-size: 12px;
  border-radius: 6px;
  background: rgb(146,234,104);
}
.other_box{
  padding: 10px;
  padding-bottom: 1px;
  text-align: left;

}
.other_msg_box{
  margin: 6px 70px 6px 44px;
}
.other_msg_box div{
  display: flex;
}
.other_msg{
  letter-spacing:2px;
  line-height:16px;
  padding: 8px;
  font-size: 12px;
  border-radius: 6px;
  word-wrap:break-word;
  background: #fff;
}
.self_triangle{
  margin-top: 6px;
  width: 0px;
  height: 0px;
  border: 6px solid #000;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: rgb(146,234,104);
  border-right-color: transparent;
}
.other_triangle{
  margin-top: 6px;
  width: 0px;
  height: 0px;
  border: 6px solid #000;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: #fff;
}
</style>