import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vitePluginVueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import defaultSettings from "./src/settings";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import myPlugin from "./zip";
function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default (mode) => {
  return defineConfig({
    base: "./",
    server: {
      open: true,
      host: "0.0.0.0",
      port: 9527,
      proxy: !defaultSettings.isMockData && {
        "/jc-sms-web": {
          // target: "http://20.20.129.41:8080", // 本地
          target: "http://20.20.129.96:8080", // 本地
          changeOrigin: true,
          // rewrite: (path) => path.replace("/jc-sms-web", ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("src"),
      },
      extensions: [".vue", ".js"],
    },
    build: {
      outDir: "dist", // 指定输出路径
      emptyOutDir: true, // 打包时先清空上一次构建生成的目录
      cssCodeSplit: true, // 启用 CSS 代码拆分
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: "[ext]/[name].[hash].[ext]",
        },
      },
    },
    esbuild: {
      drop:
        loadEnv(mode, process.cwd()).VITE_NODE_ENV === "production"
          ? ["console", "debugger"]
          : [],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/styles/base.less",
          )}";`,
        },
      },
    },
    plugins: [
      vue(),
      vitePluginVueSetupExtend(),
      visualizer({
        emitFile: false,
        file: "stats.html", //分析图生成的文件名
        open: true, //如果存在本地服务端口，将在打包后自动展示
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      }),
      AutoImport({
        resolvers: [AntDesignVueResolver()],
      }),
      viteCompression({
        verbose: true, // 默认即可
        disable: true, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: "gzip", //压缩算法
        ext: ".gz", //文件类型
      }),
      myPlugin(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      defaultSettings.isMockData &&
        viteMockServe({
          mockPath: "./src/mock", //mock文件地址
          localEnabled: false, // 开发打包开关
          prodEnabled: false, // 生产打包开关
          // 这样可以控制关闭mock的时候不让mock打包到最终代码内
          injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
          watchFiles: false, // 是否监控文件变化进行热更新，默认为false不开启
          logger: false, //是否在控制台显示请求日志
          supportTs: false, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        }),
    ],
    define: {
      "process.env": {},
    },
  });
};
