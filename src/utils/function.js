/* eslint-disable */
//避开代码检测
import { vueObj } from "@/main";
export function getArrayTo(list) {
  const shopList = [
    [],
    []
  ]
  for (let i = 0; i < list.length; i++) {
    let colIndex = i % 2 // 两列
    shopList[colIndex].push(list[i])
  }
  console.log(shopList)
  return shopList
}
/**
 * 判断是否为微信
 * @returns {boolean}
 */
export function isWechat() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断平台
 * @returns {boolean}
 */
export function userAgent() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;

  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}

/**
 * 保留几位小数不够的0补全
 * @param value
 * @param n
 * @returns {string}
 */
export function fomatFloat(value, n) {
  const f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
  let s = f.toString();
  const rs = s.indexOf(".");
  if (rs < 0) {
    s += ".";
  }
  for (let i = s.length - s.indexOf("."); i <= n; i++) {
    s += "0";
  }
  return s;
}

/**
 * 保留小数 默认保留两位小数
 * @param num
 * @param point
 * @param isRound 是否四舍五入 默认不四舍五入
 * @returns {string}
 */
export function keepPoint(num, point, isRound = false) {
  if (isRound) {
    return parseFloat(num).toFixed(point || 2);
  } else {
    return parseFloat(num)
      .toFixed(point + 1 || 3)
      .slice(0, -1);
  }
}

/**
 * 返回上一级
 */
export function goBack() {
  window.history.go(-1);
}

/**
 * 获取客户端是 Android 还是IOS 还是PC
 * @returns {string}
 */
export function getDeviceType() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // 判断iPhone|iPad|iPod|iOS
    return "IOS";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    // 判断Android
    return "Android";
  } else {
    // pc
    return "PC";
  }
}

/**
 * 获取url里边的指定参数
 * @param name
 * @returns {*}
 */
export function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
}

/**
 * 获取全部url参数
 * @param href
 * @returns {{}}
 */
export function getUrlParams(href) {
  if (href.indexOf("?") === -1) {
    return {};
  }
  href = decodeURIComponent(href);
  const queryString = href.substring(href.indexOf("?") + 1);
  const parameters = queryString.split("&");
  const all = {};
  let pos, paraName, paraValue;
  for (let i = 0; i < parameters.length; i++) {
    pos = parameters[i].indexOf("=");
    if (pos === -1) {
      continue;
    }
    paraName = parameters[i].substring(0, pos);
    paraValue = parameters[i].substring(pos + 1);
    all[paraName] = paraValue;
  }
  return all;
}
/**
 * 保留两位整数补零
 * @param n
 * @returns {string}
 */
export function numZero(n) {
  return n < 10 ? "0" + n : "" + n;
}

/**
 * 为数字添加千位分隔符
 * @param num
 * @returns {*|string}
 */
export function milliFormat(num) {
  return num && num.toString()
    .replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{3})+$)/g, '$1,'))
  // return (
  //   num &&
  //   num.toString().replace(/\d+/, function(s) {
  //     return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  //   })
  // );
}

//避开代码检测
/**
 * 解决小数相加精度丢失
 * @param num1
 * @param num2
 * @returns {number}
 */
export function numAdd (num1, num2) { //
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  let baseNum, baseNum1, baseNum2
  try {
    baseNum1 = parseFloat(num1 + '').toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = parseFloat(num2 + '').toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  // console.log(baseNum1, baseNum2)
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}

/**
 * 解决小数相减精度丢失问题
 * @param num1
 * @param num2
 * @returns {string}
 */
export function numSub (num1, num2) {
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  let baseNum, baseNum1, baseNum2
  let precision // 精度
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
}

/**
 * 乘法精度
 * @param num1
 * @param num2
 * @returns {number}
 */
export function numMulti (num1, num2) { //
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  let baseNum = 0
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {
  }
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
}
/**
 * 除法精度
 * @param num1
 * @param num2
 * @returns {number}
 */
export function numDiv (num1, num2) {
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  if (num2 === 0 || num1 === 0) {
    return 0
  }
  let baseNum1 = 0
  let baseNum2 = 0
  let baseNum3, baseNum4
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum3 = Number(num1.toString().replace('.', ''))
  baseNum4 = Number(num2.toString().replace('.', ''))
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
}
