export default {
  /**
   * 全局
   */
  // 页面标题
  title: "动态表单",
  // 默认全局尺寸, 可选值 large / default /small
  size: "small",
  // 全局设置状态
  showSettings: false,

  // The default is only used in the production env，If you want to also use it in dev, you can pass ['production', 'development']
  errorLog: ["production", "localhost"],
  // 是否基于 mockjs vite-plugin-mock 开启mock数据, 关闭后将开启 proxy 代理
  isMockData: true,
};
