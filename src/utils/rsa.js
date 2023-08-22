import JSEncrypt from "jsencrypt";

export function getRsaCode(str) {
  // 注册方法
  const pubKey =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgZcVArbe99+ay+4aNfrEsjBgtqak4WPJXtSZ4pTlB26gfZ5dDbzLYcjG+dkjJaLM8PRxvfcRprgwkYi8k17EBtnM2LmYecKk2s6knirqkM4Cg7jm+h2slthL2u8sbZ5lVe0LGrvvfUlURfI3Pq69x5ZI+oN/roTOsYRB48Xc03QIDAQAB"; // ES6 模板字符串 引用 rsa 公钥
  const encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  const data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
}

// 4、解密（origin：加密text，key：私钥）

export function getThirdRsaCode(key) {
  const privateKey =
    "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALojnKvswM8c6SZZA1i/pDJtGTOw8QT4b2IZMzG9KsCef/XyMGoBl+M+6QWivrqj2sry16QRfCYnooA6q012GEU8q72G5IWBasJ/ljSypcDpGVinslr2Orvi2uuv7WpvQn8IuMy+niQOmXZnFGO+TeygMobcW9/azZd8RLHk/yI1AgMBAAECgYEApXFFraHu9adSq1zulpEvVgqWHdWlQ6+1AFI5qHnkZ/P49BdhZLcp0zd1UicGs0k0DLKvbAqGeDs+Og7rdxwCEPCaPEF8n705nRuP+8msSVfr2ymEoNBK1Ajzs/crb8qrx9K03Dneb2s+4vjVII6BnsG9+mdmHlzVuB3d5m+RVTkCQQD5MHsv6pgju80PYqZBz55cnqV0F8xQ0BR4dkME/fieVpQtS3HiTExONHN2yz6c00QsAmzm3ibAWSXbLQ35+J9rAkEAvzn7qbo5DgH1WqBtsR1+erOFSXSy0g1ikRzsDfQ0UqjOTll38Un86DFn/HoCeX+Xn9fVqCyzXkacNVkfSunM3wJAGwfERRVYfX/QpZuY10izL+7Rmb8/HYEEx3BkorT99AcGOceWSerm2BDeeYNgflh4a6GzuHNelrzU22qOuo/akwJADoBtL1/p97/6RVcpOmdMMi3vC7UH4poVQX/5/szoMuSOUK7EQ84imdE1W5Y9Hc2pR/vsPga1y457RihuERZN7QJARJmd8d57ZcD3RfIxeIYRYTZCud6AxkR9EfulN98WATNtkwS+9KMlI/p0MxlCdJ9U7qYAYPkc6pz1ToHgDbSeGg=="; // ES6 模板字符串 引用 rsa 私钥
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  return decrypt.decrypt(key.toString());
}
