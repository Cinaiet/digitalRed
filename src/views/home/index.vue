<template>
  <div class="home-box display-flex box-column">
    <img class="home-img" :src="bgImg" alt="" />
    <img class="home-logo" :src="logo" alt="" />
    <img class="home-text" :src="homeText" alt="" />
    <img class="home-pack" :src="redPackImg" alt="" />
    <img class="home-amt" :src="amtImg" alt="" />

    <div class="loading" v-if="loading">
      <van-loading type="spinner" color="#ccc" />
    </div>
    <div v-else class="box-flex1 content">
      <div class="vouchers">
        <div class="vouchers-left">
          <div>待领取</div>
          <div class="sale">
            <span>￥</span>{{ (activityInfo.amt / 100).toFixed(2) }}
          </div>
        </div>
        <div class="vouchers-right">
          <div>{{ activityInfo.activity }}</div>
          <div>*领取无需中行银行卡</div>
        </div>
      </div>
      <div v-if="!supportFlag" class="explain location permission">
        <div>很抱歉，您所在的地区暂未开启数字⼈⺠币试点⼯作，⽆法领取红包</div>
        <div class="btn">请联系赠奖商户</div>
      </div>
      <div v-if="!supportFlag" class="outer">
        <div class="description">
          <div class="title">试点地区</div>
          <ul class="explain-box">
            <li class="explain-item">
              •
              数字人民币面向试点地区开展试点工作，需根据您所在位置判断是否符合领取条件。
            </li>
            <li class="explain-item">
              • 活动时间：{{ activityInfo.startDate }}-{{
                activityInfo.endDate
              }}
            </li>
            <li class="explain-item">
              • 试点地区包括：<strong>{{ activityInfo.pilotArea }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="noLocation" class="explain location">
        <div>很抱歉，您所在的地区暂未开启数字⼈⺠币试点⼯作，⽆法领取红包</div>
        <div class="btn">请联系赠奖商户</div>
      </div>
      <div v-if="!noLocation && supportFlag" class="submit">
        <div class="title">验证手机号</div>
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          label-align="top"
        />
        <van-field
          v-model="sms"
          center
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="Boolean(timer)"
              @click="getCode"
              >{{ timer ? count : "发送验证码" }}</van-button
            >
          </template>
        </van-field>
        <van-button
          class="btn"
          @click="submitReciveMoney"
          loading-type="spinner"
          loading-text="领取中..."
          text="领取红包"
          block
          :loading="submitLoading"
          :disabled="submitLoading"
        />
      </div>
      <div class="outer">
        <div class="description">
          <div class="title">活动概述</div>
          <ul class="explain-box">
            <li class="explain-item">
              <strong>• 活动对象：</strong>特约白名单用户。
            </li>
            <li class="explain-item">
              <strong>• 活动时间：</strong> {{ activityInfo.startDate }} -
              {{ activityInfo.endDate }}
            </li>
            <li class="explain-item">
              <strong>• 活动地区：</strong>{{ activityInfo.pilotArea }}
            </li>
            <li class="explain-item">
              <strong>• 红包查看路径：</strong>数字人民币APP-服务-消费红包
            </li>
            <li class="explain-item">
              <strong>• 适用范围：</strong>可在任何支持数字人民币的场景下使用
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        Copyright © 2023北京华弘集成电路设计有限责任公司
        <div>All rights reserved.</div>
      </div>
    </div>
  </div>
</template>

<script>
import ajaxMethod from "@/request/ajax";
import { Toast, Dialog } from "vant";
import bgImg from "@/assets/images/bg_new.png";
import homeText from "@/assets/images/home-text.png";
import logo from "@/assets/images/logo.png";
import amtImg from "@/assets/images/amt.png";
import redPackImg from "@/assets/images/red-package.png";

export default {
  name: "index",
  data() {
    return {
      sms: "",
      phone: "",
      timer: null,
      count: "",
      token: "",
      loading: false,
      activityInfo: {
        amt: "",
        activity: "数字人民币红包",
        endDate: "",
        startDate: "",
        activityPeriod: "",
      },
      supportFlag: true,
      noLocation: false,
      cityCode: "",
      bgImg,
      homeText,
      logo,
      amtImg,
      redPackImg,
      submitLoading: false,
    };
  },
  mounted() {
    const { token } = this.$route.params;
    this.token = token;
    this.queryMoneyInfo();

    if (window.AMap) {
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        geolocation.getCityInfo((status, result) => {
          //只能获取当前用户所在城市和城市的经纬度
          if (status == "complete") {
            console.log("成功获取位置信息----->>>", result);
            const { province, city, cityCode } = result;
            this.queryActivityCity({ province, city });
            this.cityCode = cityCode;
          } else {
            console.log("获取定位失败-->>", result);
            this.noLocation = true;
            Dialog({
              title: "温馨提示",
              message: "很抱歉，需要获取您的位置信息，请打开定位权限",
            });
          }
        });
      });
    }
  },
  methods: {
    queryActivityCity(payload) {
      return ajaxMethod
        .postJson("/api/h5/pilotarea/check", payload)
        .then((res) => {
          const { flag } = res?.body || {};
          const state = flag === "Y";
          this.supportFlag = state;
          if (!state) {
            Dialog({
              title: "温馨提示",
              message:
                "很抱歉，您所在的地区暂未开启数字人民币试点工作，无法领取红包",
            });
          }
        });
    },
    getCode() {
      if (!this.isMobile(this.phone)) {
        Toast("手机号有误！");
        return;
      }
      let TIME_COUNT = 60;
      if (!this.timer) {
        this.submitMsgCode()
          .then((res) => {
            const { code, msg } = res;
            if (code === "200") {
              this.count = TIME_COUNT;

              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            } else {
              Dialog({
                title: "温馨提示",
                message: msg,
              });
            }
          })
          .catch((err) => {});
      }
    },
    isMobile(phone) {
      let val = phone.replace(/\s/g, "");
      if (!val) {
        return false;
      } else {
        if (val.toString().length === 11 && val.toString()[0] == 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    submitMsgCode() {
      return ajaxMethod.postJson("/api/h5/send/verifycode", {
        phone: this.phone,
        token: this.token,
      });
    },
    submitReciveMoney() {
      if (!this.supportFlag) {
        Dialog({
          title: "温馨提示",
          message:
            "很抱歉，您所在的地区暂未开启数字人民币试点工作，无法领取红包",
        });
        return;
      }
      if (!this.isMobile(this.phone)) {
        Toast.fail("手机号有误");
        return;
      }
      if (!this.sms) {
        Toast.fail("请填写短信验证码！");
        return;
      }
      const that = this;
      this.submitLoading = true;

      ajaxMethod
        .postJson("/api/h5/redpacket/receive", {
          phone: this.phone,
          verifyCode: this.sms,
          token: this.token,
          custProvinceCode: this.cityCode,
        })
        .then((res) => {
          const { tradeState, orderNo } = res.body;
          if (tradeState === "00") {
            that.queryReciveState(orderNo);
          } else if (tradeState === "03" || tradeState === "02") {
            this.submitLoading = false;
            that.$router.push({
              path: "/result",
              query: {
                sale: this.activityInfo.amt,
                activity: this.activityInfo.activity,
              },
            });
            return;
          } else {
            this.submitLoading = false;
            Dialog({
              title: "温馨提示",
              message: res.msg,
            });
          }
        });
    },
    queryMoneyInfo() {
      ajaxMethod.getJson(`/api/h5/redpacket/info/${this.token}`).then((res) => {
        const { body } = res;

        const { activityPeriod = "" } = body;

        const transData = activityPeriod.split(",");
        let startDate = "",
          endDate = "";
        if (transData.length > 1) {
          startDate = this.$dayjs(transData[0]).format("YYYY年MM月DD日");
          endDate = this.$dayjs(transData[1]).format("YYYY年MM月DD日");
        }

        this.activityInfo = {
          ...body,
          startDate,
          endDate,
        };
      });
    },
    queryReciveState(orderNo) {
      const that = this;
      ajaxMethod.getJson(`/api/h5/redpacket/status/${orderNo}`).then((res) => {
        const { body } = res;
        const { tradeState } = body;
        // Toast.clear(true);
        if (tradeState === "00") {
          // Toast.loading({
          //   message: "领取中...",
          //   forbidClick: true,
          //   loadingType: "spinner",
          //   duration: 0,
          // });
          setTimeout(() => {
            that.queryReciveState(orderNo);
          }, 1000);
        } else if (tradeState === "03" || tradeState === "02") {
          that.submitLoading = false;
          that.$router.push({
            path: "/result",
            query: {
              sale: that.activityInfo.amt,
              activity: that.activityInfo.activity,
            },
          });
          return;
        } else {
          that.submitLoading = false;
          Dialog({
            title: "温馨提示",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.home-box {
  background-position: center;
  background-size: 100% 100%;
  overflow-y: scroll;
  background-color: rgb(226, 51, 71);
  position: relative;
  .home-img {
    position: absolute;
    left: 0;
    width: 100%;
    height: auto;
  }
  .home-logo {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .home-text {
    position: absolute;
    left: 5%;
    width: 90%;
    top: 160px;
  }
  .home-pack {
    position: absolute;
    left: 0;
    top: 290px;
  }
  .flexCenter() {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content {
    padding: 590px 30px 0;
    position: absolute;
    .vouchers {
      background-image: linear-gradient(#ffff66, #ffcc00);
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
        border: 2px solid #fff;
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
        font-size: 32px;
        .flexCenter();
        > div:first-child {
          font-size: 40px;
          font-weight: bold;
          padding-bottom: 10px;
        }
      }
    }
    .explain {
      margin-top: 30px;
      width: 100%;
      height: 400px;
      background-color: #fff;
      border-radius: 10px;
    }
    .location {
      .flexCenter();
      padding: 30px;
      color: #444;
      font-size: 30px;
      font-weight: 500;
      text-align: center;
      > div:last-child {
        margin-top: 70px;
      }
    }
  }
  .submit {
    background: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
    .title {
      font-size: 32px;
      color: #444;
      text-align: center;
      margin-bottom: 20px;
      font-weight: bold;
    }
    /deep/ .van-cell {
      font-size: 30px;
    }
    /deep/.van-field__button {
      min-width: 150px;
      max-width: 150px;
      text-align: center;
    }
    /deep/.van-cell .van-button {
      min-width: 150px;
      max-width: 150px;
      background-color: #ee491bb7;
      border: none;
      box-shadow: none;
    }
  }
  .btn {
    background-color: #ee491bb7;
    margin-top: 0.4rem;
    width: 500px;
    border-radius: 20px;
    line-height: 1.066667rem;
    cursor: pointer;
    margin: 0.4rem auto 0;
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 32px;
  }
  .bottom {
    text-align: center;
    margin: 10px 0;
    font-size: 24px;
    color: #fff;
  }
  .loading {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .description {
    background: #fff2dd;
    border-radius: 10px;
    padding: 0 30px 30px;
    color: #555;
    border: 2px solid #daad81;

    .title {
      line-height: 70px;
      text-align: center;
      font-size: 34px;
      font-weight: bold;
      color: #444;
      width: 300px;
      background-color: #ee491bb7;
      margin: 0 auto 20px;
      color: #fff;
      border-radius: 0 0 10px 10px;
    }
    .explain-item {
      margin-bottom: 10px;
    }
  }
  .outer {
    margin-top: 60px;
    border-radius: 10px;
    background-color: #fff2dd;
    padding: 15px;
    position: relative;
    &:before {
      width: 86%;
      left: 7%;
      height: 30px;
      top: -30px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 10px 10px 0 0;
      content: "";
      position: absolute;
    }
  }
}
</style>
