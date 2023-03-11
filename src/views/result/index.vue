<template>
  <div class="result">
    <div class="content">
      <div class="vouchers">
        <div class="vouchers-left">
          <div>已领取</div>
          <div class="sale"><span>￥</span>{{ sale }}</div>
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
          <li>1、开通中行母钱包（已有中行母钱包可从2开始）:</li>
          <li>
            下载“数字人民币”APP，完成注册后，登录账号，开通中国银行母钱包查看红包。
          </li>
          <li>①注册APP账户</li>
          <li>②登录账户开通中行钱包</li>
          <li>③开通完成即查看红包</li>
          <li>2、查看确认红包</li>
          <li>
            进入“数字人民币”APP点击服务-消费红包-已领取，确认已经收到的红包，点击查看，可查看红包相关使用有效期及使用规则等。
          </li>
          <li>①进入服务-消费红包</li>
          <li>②查看确认红包领取</li>
          <li>③查看详细规则</li>
          <li>3、线下消费红包</li>
          <li>
            进入“数字人民币”APP首页-扫一扫，扫商家二维码，付款时自动优先使用红包抵扣，完成消费。
          </li>
          <li>①进入主页-扫一扫</li>
          <li>②使用红包抵扣</li>
          <li>③完成付款</li>
          <li>4、线上消费红包</li>
          <li>
            进入“数字人民币”APP我的-钱包快付管理，开通所需线上平台的钱包快付，在对应商家付款时自动使用红包抵扣，完成消费。
          </li>
          <li>①进入我的-钱包快付管理</li>
          <li>②开通所需线上平台钱包快付</li>
          <li>③在相应平台完成付款</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
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
  background-image: url("../../assets/images/u351.png");
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
    padding: 600px 30px 0;

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
        line-height: 60px;
        text-align: center;
        width: 6rem;
        margin: auto;
        color: #d6c90b;
        font-size: 32px;
        font-weight: 500;

        background-color: #fff;
        border: 8px solid #d6c90b;
      }

      &-step {
        background-color: #fff;
        margin-top: 30px;
        border: 8px solid #d6c90b;
        border-radius: 10px;
        padding: 20px;
        color: #333;
        li {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
