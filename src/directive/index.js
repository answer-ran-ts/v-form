const modules = import.meta.glob("./*.js", { eager: true }); // 批量导入 /apis 文件夹下所有js文件
let directiveModules = {}; // 导出的对象
for (const path in modules) {
  let itemKey = path.replace("./", "").replace(".js", ""); // 模块的名称
  directiveModules[itemKey] = modules[path].default; // 对应模块的内容
}
export default directiveModules;
