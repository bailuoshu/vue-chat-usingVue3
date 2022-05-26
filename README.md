### VUE + TypeScript + Vite

本项目使用 **[VUE3](https://v3.cn.vuejs.org/) + [TypeScript](https://www.tslang.cn/) + [Vite](https://vitejs.cn/)** 以及 [element-UI库](https://element-plus.org/zh-CN/) 仿制**WECHAT** PC端界面，通过PHP实现后端数据存储、采用webSocket实现及时信息通讯以及信息存储功能。<br/>
登录验证使用token令牌验证:token数据保存在浏览器本地localStrong，如需要两账户体验使用请使用两个不同浏览器登录。登录状态记录24小时。
<hr/>

### 功能实现

· 实时信息发送/接受<br/>
· 账号注册/登录<br/>
· 好友添加与管理<br/>
· 离线信息记录<br/>

<hr/>

### 待完成功能

· *退出登录（未启用）*<br/>
· *移动端适配*<br/>
· *账号信息更改（后端接口未完善）*<br/>
· *朋友圈功能（未添加）*<br/>
· *图片、表情、文件等传送（后端数据库未完善）*<br/>

<hr/>

### 编译方式

根目录下运行 ***npm install***  检查安装插件<br/>
运行 ***npm run dev***  开启开发编译模式实时浏览更改。

<hr/>

### 演示地址

[vue-chat演示链接 —— PC端打开链接](http://vue-chat.luoshu.ltd/) <br/>
需要清除登录状态在浏览器 *开发者工具* - *console* 下输入 **localStorage.clear()** 清理浏览器记录
##### 测试账号:
 **UID :111111111** <br/> ****PSW:test001**** <br/>
 **UID :222222222** <br/> ****PSW:test002**** <br/>