import Cookies from "js-cookie";

const TokenKey = "jc-sms-web";

export const getCookies = (key, defaultValue) =>
  Cookies.get(key) ? JSON.parse(Cookies.get(key)) : defaultValue;

export const getLocalStorage = (key, defaultValue) =>
  window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : defaultValue;
export const setCookies = (key, value) =>
  Cookies.set(key, JSON.stringify(value));

export const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const removeCookies = (key) => Cookies.remove(key);

export const removeLocalStorage = (key) => window.localStorage.removeItem(key);

export const getToken = () => getLocalStorage(TokenKey);

export const setToken = (token) => setLocalStorage(TokenKey, token);

export const removeToken = () => removeLocalStorage(TokenKey);
