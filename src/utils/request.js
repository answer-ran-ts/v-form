import { getToken } from "@/utils/storage"; // get token from cookie
import axios from "axios";
import notification from "ant-design-vue/es/notification";
import defaultSettings from "../settings";

// import { useUserStore } from "@/store/user";
// const userStore = useUserStore();

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: defaultSettings.isMockData ? "" : import.meta.env.VITE_APP_BASE_API,
  timeout: 60000, // 请求超时时间
});
console.log(import.meta.env);
// 异常拦截处理器
const errorHandler = async (error) => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: data.message,
      });
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      notification.error({
        message: "Unauthorized",
        description: "Authorization verification failed",
      });
      if (getToken()) {
        // await userStore.logout();
        window.location.reload();
      }
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config) => {
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改,本项目采用JWT认证
  if (getToken()) {
    config.headers.Authorization = getToken();
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use(async (response) => {
  if (response.data && response.data.status === 2) {
    // await userStore.logout();
    window.location.reload();
  }
  if (response.headers["content-disposition"]) {
    return response;
  }
  return response.data;
}, errorHandler);

export default request;
