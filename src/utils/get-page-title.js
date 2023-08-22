import defaultSettings from "@/settings";

const title = defaultSettings.title || "动态表单";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
