<template>
  <div class="result">
    <div class="content">
      <div class="content-title">恭喜您，获得数字人民币红包！</div>
      <div class="vouchers">
        <div class="vouchers-left">
          <div>已领取</div>
          <div class="sale"><span>￥</span>{{ (sale / 100).toFixed(2) }}</div>
        </div>
        <div class="vouchers-right">
          <div>{{ activity }}</div>
          <div>*领取无需中行银行卡</div>
        </div>
      </div>
      <div class="outer">
        <div class="description">
          <div class="title">说明</div>
          <ul class="explain-box">
            <li class="explain-item sub-title">红包将发放至“数字人民币”APP</li>
            <li class="explain-item">
              1、 用数字人民币红包，需先下载“数字人民币”
            </li>
            <li class="explain-item">
              2、
              请使用刚刚登记的手机号在“数字人民币”APP上进行注册账号后登录，选择开通
              <strong>中国银行</strong>
              数字人民币母钱包后，即可在“我的红包”中完成红包的查看并领取，进行消费。
            </li>
          </ul>
          <div class="btn" @click="downloadAPP">下载“数字人民币”APP</div>
          <div class="btn" @click="openAPP">已下载打开“数字人民币”APP</div>
        </div>
      </div>
      <div class="use">
        <div class="use-title">红包详细使用步骤</div>
        <ul class="use-step">
          <li>
            <div class="use-step-title">1.注册“数字人民币APP”并登录</div>
            <div>
              下载“数字人民币”APP，打开APP使用领取号码完成注册后，登录账号，即自动弹出中国银行红包。
            </div>
            <div class="use-step-img">
              <div class="use-step-img-left">
                <img :src="oneStepImg" alt="" />
                <div>①打开APP新用户注册</div>
              </div>
              <div class="use-step-img-right">
                <img :src="twoStepImg" alt="" />
                <div>②APP账户登录</div>
                <img :src="threeStepImg" alt="" />
                <div>③登录后进入首页</div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="use-step">
          <li>
            <div class="use-step-title">2.查看确认红包</div>
            <div>
              完成中国银行母钱包开通后，点击服务-消费红包-已领取，确认已经收到的红包。
            </div>
            <div class="use-step-img">
              <div class="use-step-img-left">
                <img :src="two1Img" alt="" />
                <div>①完成开通中行钱包</div>
              </div>
              <div class="use-step-img-right">
                <img :src="two2Img" alt="" />
                <div>②进入消费红包</div>
                <img :src="two3Img" alt="" />
                <div>③确认收到红包</div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="use-step">
          <li>
            <div class="use-step-title">3.线下消费红包</div>
            <div>
              进入“数字人民币”APP首页-扫一扫，扫商家二维码，付款时自动优先使用红包抵扣，完成消费。
            </div>
            <div class="use-step-img">
              <div class="use-step-img-left">
                <img :src="three1Img" alt="" />
                <div>①进入主页-扫一扫</div>
              </div>
              <div class="use-step-img-right">
                <img :src="three2Img" alt="" />
                <div>②使用红包抵扣</div>
                <img :src="three3Img" alt="" />
                <div>③完成付款</div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="use-step">
          <li>
            <div class="use-step-title">4.线上消费红包</div>
            <div>
              进入“数字人民币”APP我的-钱包快付管理，开通线上平台的钱包快付，在付款时红包自动红包抵扣，完成消费。
            </div>
            <div class="use-step-img">
              <div class="use-step-img-left">
                <img :src="f1Img" alt="" />
                <div>①进入我的-钱包快付管理</div>
              </div>
              <div class="use-step-img-right">
                <img :src="f2Img" alt="" />
                <div>②开通所需线上平台钱包快付</div>
                <img :src="f3Img" alt="" />
                <div>③在相应平台完成付款</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      Copyright © 2023北京华弘集成电路设计有限责任公司
      <div>All rights reserved.</div>
    </div>
  </div>
</template>

<script>
import oneStepImg from "@/assets/images/01_registry.png";
import twoStepImg from "@/assets/images/02_login.png";
import threeStepImg from "@/assets/images/03_login.png";

import two1Img from "@/assets/images/2-1.jpg";
import two2Img from "@/assets/images/2-1.png";
import two3Img from "@/assets/images/2-3.png";

import three1Img from "@/assets/images/3-1.png";
import three2Img from "@/assets/images/3-2.png";
import three3Img from "@/assets/images/3-3.jpg";
import f1Img from "@/assets/images/4-1.png";
import f2Img from "@/assets/images/4-2.png";
import f3Img from "@/assets/images/4-3.png";

export default {
  name: "result",
  data() {
    return {
      oneStepImg,
      twoStepImg,
      threeStepImg,
      two1Img,
      two2Img,
      two3Img,
      f1Img,
      f2Img,
      f3Img,
      three1Img,
      three2Img,
      three3Img,
      timer: null,
      sale: 10,
      activity: "数字人民币红包",
    };
  },
  mounted() {
    const { sale, activity } = this.$route.query;
    this.sale = sale;
    this.activity = activity;
    window.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearTimeout(this.timer);
      }
    });
  },
  methods: {
    downloadAPP() {
      window.location.href =
        "https://pilot.app.ecny.pbcdci.cn/download/index.html";
    },
    openAPP() {
      window.location.href = "dcep://uniwallet/startApp";
      this.timer = setTimeout(() => {
        window.location.href =
          "https://pilot.app.ecny.pbcdci.cn/download/index.html";
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
.result {
  background-image: url("../../assets/images/result_bg.png");
  background-position: center;
  background-size: 100% 100%;
  overflow-y: scroll;
  .flexCenter() {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content {
    padding: 100px 30px 0;
    &-title {
      color: #fffd8d;
      font-size: 40px;
      font-weight: 500;
      text-align: center;
      padding: 50px 0;
    }

    .vouchers {
      background-image: linear-gradient(#fffd8d, #fffd73);
      padding: 15px;
      display: flex;
      align-items: center;
      height: 190px;
      border-radius: 10px;

      &-left {
        background-color: #ff402f;
        width: 180px;
        height: 160px;
        font-size: 30px;
        font-weight: bold;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        .flexCenter();
        border: 1px dashed #fff;
        color: #fff;
        .sale {
          display: inline-block;
          padding-top: 10px;
          font-size: 46px;
          > span {
            font-size: 24px;
          }
        }
      }
      &-right {
        background-color: #fff;
        flex: 1;
        height: 160px;
        color: #ff402f;
        font-size: 35px;
        .flexCenter();
        > div:first-child {
          font-size: 40px;
          font-weight: bold;
          padding-bottom: 10px;
        }
      }
    }
    .outer {
      margin-top: 30px;

      border-radius: 10px;
      background-image: linear-gradient(#fffd8d, #fffd73);
      padding: 15px;
      .description {
        background: #fff;
        border-radius: 10px;
        padding: 0 30px 30px;
        color: #555;
        border: 2px solid #d6c90b;

        .title {
          line-height: 70px;
          text-align: center;
          font-size: 32px;
          font-weight: 500;
          color: #444;
          width: 300px;
          background-color: #ee491bb7;
          margin: 0 auto 20px;
          color: #fff;
          border-radius: 0 0 10px 10px;
        }

        .explain-item {
          font-size: 26px;
          margin-bottom: 10px;
        }
        .sub-title {
          color: #333;
          margin: 15px 0;
          font-weight: 500;
          font-size: 30px;
        }
      }
      .btn {
        background-color: #ee491bb7;
        margin-top: 0.4rem;
        width: 6rem;
        border-radius: 20px;
        line-height: 1.066667rem;
        cursor: pointer;
        margin: 0.4rem auto 0;
        color: #fff;
        text-align: center;
        font-weight: 500;
      }
    }

    .use {
      margin: 30px 0;
      &-title {
        line-height: 70px;
        text-align: center;
        width: 6rem;
        margin: auto;
        color: #d6c90b;
        font-size: 34px;
        font-weight: 500;

        background-color: rgb(222, 37, 29);
        border: 8px solid rgb(251, 211, 144);
      }

      &-step {
        background-color: rgb(222, 37, 29);
        margin-top: 30px;
        border: 12px solid rgb(251, 211, 144);
        padding: 20px;
        color: #333;
        color: rgb(255, 255, 200);
        font-size: 30px;
        &-title {
          font-size: 42px;
          font-weight: bold;
          padding: 16px;
        }
        li {
          margin-bottom: 5px;
        }
        &-img {
          display: flex;
          margin-top: 15px;
          > div {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            > div {
              padding: 10px;
            }
          }
          &-left {
            display: flex;
            flex-direction: column;
            > img {
              flex: 1;
            }
          }
        }
      }
    }
  }
  .bottom {
    text-align: center;
    margin: 10px 0;
    font-size: 24px;
    color: #fff;
  }
}
</style>
