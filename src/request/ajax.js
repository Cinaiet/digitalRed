/* eslint-disable */ //避开代码检测
import Axios from "axios";
import { vueObj } from "@/main";
let getHeaders = () => {
  return {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
};
Axios.defaults.headers = getHeaders();
Axios.defaults.timeout = 60000;
Axios.defaults.withCredentials = false;
//请求次数
Axios.defaults.retry = 3;
//请求的间隙
Axios.defaults.retryDelay = 1000;
// 首先对拦截器的请求进行设置，并在方法中return config，此处为固定格式
Axios.interceptors.request.use(async (config) => {
  return config;
});

// http response 拦截器
Axios.interceptors.response.use(
  (response) => {
    //拦截响应，做统一处理
    if (response.data.code !== "200") {
      const { msg } = response.data;
      vueObj.$toast.fail(msg);
    }
    return response;
  }, //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    if (error.response.code === "400") {
      vueObj.$toast.fail("参数异常，请重试");
      return;
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

function postJsonIndicator(url, params = {}) {
  const req = {
    url: url,
    method: "POST",
    data: {
      ...params,
    },
  };
  return new Promise((resolve, reject) => {
    Axios(req)
      .catch(function (err) {
        vueObj.$toast.fail(
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.response.statusText || "网络连接不可用，请重试"
        );
        reject(err.response);
      })
      .then(function (res) {
        resolve(res ? res.data : {});
      });
  });
}

export default {
  /**
   * 封装ajax的get请求
   * @param url
   * @param params
   */
  getJson: function (url, params = {}) {
    const req = {
      // url: process.env.base + url,
      url: url,
      method: "get",
      params: params,
      async: false,
    };
    return new Promise((resolve, reject) => {
      Axios(req)
        .catch(function (err) {
          vueObj.$toast.fail(
            err.response && err.response.data.msg
              ? err.response.data.msg
              : "网络连接不可用，请重试"
          );
          reject(err.response.data);
        })
        .then(function (res) {
          resolve(res ? res.data : {});
        });
    });
  },
  postJson: function (url, params, successFun, errorFun, show = false) {
    return postJsonIndicator(url, params, successFun, errorFun, show);
  },
};
