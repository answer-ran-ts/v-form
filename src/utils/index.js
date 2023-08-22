export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? "早上好"
    : hour <= 11
    ? "上午好"
    : hour <= 13
    ? "中午好"
    : hour < 20
    ? "下午好"
    : "晚上好";
}

/**
 * 数组结构转为树结构
 * @param {*} data 数组数据
 * @returns
 */
export function flatTotreeAndSort(data) {
  const result = [];
  const obj = data.reduce((pre, cur) => {
    pre[cur.id] = cur;
    return pre;
  }, {});
  for (const item of data) {
    if (!item.parentId) {
      result.push(item);
      continue;
    }
    if (item.parentId in obj) {
      const parent = obj[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return sortWithChildren(result);
}

function recursiveSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].menuSort < pivot.menuSort) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return recursiveSort(left).concat(pivot, recursiveSort(right));
}

function sortWithChildren(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children) {
      arr[i].children = sortWithChildren(arr[i].children);
    }
  }
  return recursiveSort(arr);
}

/**
 * 数组转树形结构
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）的 id
 * @return array
 */
export function flatTotree(list, root) {
  const result = []; // 用于存放结果
  const map = {}; // 用于存放 list 下的节点

  // 1. 遍历 list，将 list 下的所有节点以 id 作为索引存入 map
  for (const item of list) {
    map[item.id] = { ...item }; // 浅拷贝
  }

  // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
  for (const item of list) {
    // 3. 获取节点的 id 和 父 id
    const { id, parentId } = item; // ES6 解构赋值
    // 4. 如果是根节点，存入 result
    if (item.parentId === root) {
      result.push(map[id]);
    } else {
      // 5. 反之，存入到父节点
      map[parentId].children
        ? map[parentId].children.push(map[id])
        : (map[parentId].children = [map[id]]);
    }
  }

  // 将结果返回
  return result;
}

export function welcome() {
  const arr = [
    "休息一会儿吧",
    "准备吃什么呢?",
    "要不要打一把 DOTA",
    "我猜你可能累了",
  ];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function filterTableMater(code, arr) {
  for (const item of arr) {
    if (item.name === code) return item;
    if (item.children && item.children.length) {
      const _item = this.filterTableMater(code, item.children);
      if (_item) return _item;
    }
  }
}
// 递归筛选最后一个嵌套对象
export function filterLastChildren(arr) {
  for (const item of arr) {
    if (!item.children) return item;
    if (item.children && item.children.length) {
      const _item = this.filterLastChildren(item.children);
      if (_item) return _item;
    }
  }
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("resize", true, true);
  event.eventType = "message";
  window.dispatchEvent(event);
}

export function handleScrollHeader(callback) {
  let timer = 0;

  let beforeScrollTop = window.pageYOffset;
  callback = callback || function () {};
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let direction = "up";
        const afterScrollTop = window.pageYOffset;
        const delta = afterScrollTop - beforeScrollTop;
        if (delta === 0) {
          return false;
        }
        direction = delta > 0 ? "down" : "up";
        callback(direction);
        beforeScrollTop = afterScrollTop;
      }, 50);
    },
    false,
  );
}

export function isIE() {
  const bw = window.navigator.userAgent;
  const compare = (s) => bw.indexOf(s) >= 0;
  const ie11 = (() => "ActiveXObject" in window)();
  return compare("MSIE") || ie11;
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = "", timeout = 1500) {
  if (id === "") {
    return;
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id));
  }, timeout);
}
export function scorePassword(pass) {
  let score = 0;
  if (!pass) {
    return score;
  }
  // award every unique letter until 5 repetitions
  const letters = {};
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] === true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}

export function randomWord() {
  var str = "";
  var range = 10;
  var arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  // 随机产生
  // range = Math.round(Math.random() * 4) + 5;
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

// 时间格式化处理
export function timeFormat(value) {
  if (!value) {
    return "";
  }
  return this.$moment().format("YYYY-MM-DD");
}
// url为视频
export function isVideo(value) {
  if (value) {
    return (
      value.endsWith("mp4") || value.endsWith("avi") || value.endsWith("mov")
    );
  }
  return false;
}
