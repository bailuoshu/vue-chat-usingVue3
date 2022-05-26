import axios from "axios";
import router from "@/router/index.ts";

// 默认超时设置
axios.defaults.timeout = 5000;

// 相对路径设置
axios.defaults.baseURL = "";

//http request 拦截器
axios.interceptors.request.use(
    (config) => {
        // 获取token
        const token = localStorage.getItem("vc_token");
        // 设置参数格式
        if (!config.headers["Content-Type"]) {
            config.headers = {
                "Content-Type": "application/json",
                // application/x-www-form-urlencoded
            };
        }
        //登陆中， 添加token到headers
        if (token) {
            config.headers.VCTOKEN = token
        }
        // 鉴权参数设置
        if (config.method === "get") {
            //get请求下 参数在params中，其他请求在data中
            config.params = config.params || {};
            let json = JSON.parse(JSON.stringify(config.params));
            //参数处理
        } else {
            config.data = config.data || {};
            //参数处理
        }
        return config;
    },
    (err) => {

    }
);

//http response 拦截器
axios.interceptors.response.use(
    (response) => {
        //一些统一code的返回处理
        if (response.data.code === 1) {
            // 登录验证
            router.push('login');
        }
        return response;
    },
    (error) => {

    }
);

export default axios