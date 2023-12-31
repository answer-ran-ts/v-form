import Clipboard from "clipboard";
import { message } from "ant-design-vue";

export default () => {
  /**
   * @method handleClipboard 处理剪切板
   * @param {*} e 事件源
   * @param {*} text 文本内容
   */
  const handleClipboard = (e, text) => {
    const clipboard = new Clipboard(e.target, {
      text: () => text,
    });
    clipboard.on("success", () => {
      message.success("复制成功");
      clipboard.destroy();
    });
    clipboard.on("error", () => {
      message.error("复制失败");
      clipboard.destroy();
    });
    clipboard.onClick(event);
  };

  return {
    handleClipboard,
  };
};
