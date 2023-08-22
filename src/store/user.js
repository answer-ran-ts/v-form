import router from "@/router";
import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/storage";
import { login, getInfo, logout } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: getToken(), // 登录信息
      userInfo: null, // 用户信息
      roles: [], // 路由权限
    };
  },
  actions: {
    async login(userInfo) {
      const { userName, password, pictureCode, pictureContent } = userInfo;
      let result = await login({
        userName: userName.trim(),
        password,
        pictureCode,
        pictureContent,
      });
      console.log("result", result);
      if (result.status === 0) {
        this.token = result.data;
        setToken(result.data);
      } else {
        return Promise.reject(result.msg);
      }
    },

    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const { data } = response;
            if (!data) {
              reject("权限校验失败，请重新登录");
            }

            if (!data) {
              reject("角色信息不能为空！");
            }
            this.userInfo = data;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout() {
      return new Promise((resolve) => {
        logout().then((response) => {
          if (response.status === 0) {
            this.token = "";
            this.roles = [];
            removeToken();
            router.push("/login");
            resolve();
          }
        });
      });
    },
    resetToken() {
      return new Promise((resolve) => {
        this.token = "";
        this.roles = [];
        removeToken();
        resolve();
      });
    },
  },
});
