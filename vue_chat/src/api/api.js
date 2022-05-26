import request from "@/router/axios";  //引入封装的axios，也就是步骤一中的axios文件

//发送Post 登录请求
export const getLoginApi = (params) => {
    return request({
        url: "/api/login",
        method: "post",
        data:params,
    });
};
export const registerApi = (params) => {
    return request({
        url: "/api/register",
        method: "post",
        data:params,
    });
};
export const addfriend = (params) => {
    return request({
        url: "/api/addfriend",
        method: "post",
        data:params,
    });
};
export const getFriendList = (params) => {//获取好友列表
    return request({
        url: "/api/getmsglist",
        method: "post",
        data:params,
    });
};
export const getMsgList = (params) => {
    return request({
        url: "/api/getmsg",
        method: "post",
        data:params,
    });
};
export const AlreadyLook = (params) => {
    return request({
        url: "/api/looked",
        method: "post",
        data:params,
    });
};