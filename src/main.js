import { createApp, nextTick } from "vue";

import settings from "@/settings";
import { isString, isArray } from "@/utils/validate";

import "normalize.css"; // a modern alternative to CSS resets

import "@/styles/index.less"; // global css
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import { createPinia } from "pinia"; // pinia
import router from "./router";

import "virtual:svg-icons-register";
// import SvgIcon from "@/components/SvgIcon/index.vue";
// import Pagination from "@/components/Pagination/index.vue";

import { useErrorLogStore } from "@/store/errorLog";
import directiveModules from "@/directive";

const app = createApp(App);

app
  //   .component("SvgIcon", SvgIcon)
  .use(createPinia())
  .use(router)
  .mount("#app");

Object.keys(directiveModules).forEach((key) => {
  app.directive(directiveModules[key].name, directiveModules[key]); //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
});

const errorLogStore = useErrorLogStore();
// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings;

/**
 * @method checkNeed 检查需要日志
 * @returns
 */
function checkNeed() {
  const env = import.meta.env.VITE_NODE_ENV;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
}

if (checkNeed()) {
  app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    nextTick(() => {
      errorLogStore.addErrorLog({
        err,
        vm,
        info,
        url: window.location.href,
      });
    });
  };
}
