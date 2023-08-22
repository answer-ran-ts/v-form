/**
 * 获取文件url
 * 主要用于通过统一文件下载接口获取img url
 * @param blob
 * @returns {string}
 */
export function getUrl(blob) {
  return window.URL.createObjectURL(blob);
}

/**
 * 下载文件
 * @param blob
 * @param fileName
 */
export function downloadFile(blob, fileName) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
}
