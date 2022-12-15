<template>
  <div class="page">
    <div class="header">
      <div class="title"></div>
      <div class="content">
        <div class="text-truncate">每月只需支付{{ state.price * 100 }}分钱</div>
        <div class="text-truncate">可获得{{ state.quantity }}张乘车劵</div>
      </div>
      <div class="red-packet-money text-truncate">
        <span>{{ state.quantity }}</span> 张
      </div>
    </div>
    <div class="body">
      <div class="content">
        <div class="mt-xs">
          <van-cell-group inset>
            <van-field
              v-model="phone"
              type="tel"
              clearable
              placeholder="请输入掌银手机号"
              :error-message="phoneErrorMessage"
              @blur="handleFieldBlur"
              @clear="handleFieldClear"
            >
              <template #left-icon>
                <img
                  class="field-left-icon"
                  src="../../assets/invitation/icon-8.png"
                />
              </template>
            </van-field>
          </van-cell-group>
          <div class="warning-text">* 如未注册掌银，请填写注册申请手机号</div>
        </div>
        <div class="mt-sm">
          <van-row>
            <van-col span="14">
              <van-cell-group inset>
                <van-field
                  v-model="code"
                  type="digit"
                  clearable
                  left-icon="music-o"
                  :error-message="codeErrorMessage"
                  @blur="handleValidateCode"
                  placeholder="请输入验证码"
                >
                  <template #left-icon>
                    <img
                      class="field-left-icon"
                      src="../../assets/invitation/icon-9.png"
                    />
                  </template>
                </van-field>
              </van-cell-group>
            </van-col>
            <van-col span="8">
              <div class="button-send" @click="handleSendCode">
                <div v-show="!disabled">获取验证码</div>
                <van-count-down
                  v-show="disabled"
                  ref="countDown"
                  format="ss"
                  :auto-start="false"
                  :time="time"
                  @finish="onFinish"
                >
                  <template #default="timeData">
                    <span class="count-down-text"
                      >{{ timeData.seconds }}s后重新发送</span
                    >
                  </template>
                </van-count-down>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="button-submit" @click="handleSubmit">接受邀请</div>
      </div>
    </div>
    <div class="footer">
      <div class="title">如何参与</div>
      <div class="content">
        <div class="box">
          <div class="num">
            <img src="../../assets/invitation/icon-1.png" />
          </div>
          <div class="text">填写 <span>手机号+验证码</span>，接受邀请：</div>
          <div class="stated">
            <img src="../../assets/invitation_/img-3.png" />
          </div>
        </div>
        <div class="box">
          <div class="num">
            <img src="../../assets/invitation/icon-2.png" />
          </div>
          <div class="text">
            下载并登录掌银，新注册用户选“广东省-深圳市”
          </div>
          <div class="stated">
            <img style="width: 150px" src="../../assets/invitation/temp2.png" />
          </div>
        </div>
        <div class="box">
          <div class="num">
            <img src="../../assets/invitation/icon-3.png" />
          </div>
          <div class="text">
            前往掌银，依次点击<span>“首页-生活-出行有礼-优惠乘车”</span>参与活动
          </div>
          <div class="stated">
            <img src="../../assets/invitation/3.png" />
            <!-- <img class="mb-xs mt-xs" src="../../assets/invitation_/img-2.png" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Field,
  CellGroup,
  Col,
  Row,
  CountDown,
  Toast,
  Notify,
  Dialog,
} from "vant";
import { isMobile } from "@/utils/validate";
import {
  sendMsg,
  verificationCodeRegistration,
  queryByIdActivity,
} from "@/api";

export default {
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Col.name]: Col,
    [Row.name]: Row,
    [CountDown.name]: CountDown,
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    const phone = ref("");
    const phoneErrorMessage = ref("");
    const codeErrorMessage = ref("");
    const code = ref("");
    // 倒计时
    const countDown = ref(null);
    const time = ref(60 * 1000);
    const disabled = ref(false);
    const loading = ref(false);
    const _parasm = {};

    const state = ref({});

    // 查询活动
    const handleQueryByIdActivity = async (aid) => {
      try {
        const res = await queryByIdActivity({ activityId: aid });
        state.value = { ...res };
        console.log(state.value, "::::::::::::::state.value");
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    const pageLoad = () => {
      const { uid, aid } = route.query;
      if (uid && aid) {
        _parasm.uid = uid;
        _parasm.aid = aid;
        handleQueryByIdActivity(aid);
      }
    };

    pageLoad();

    const handleValidatePhone = () => {
      if (!phone.value) {
        phoneErrorMessage.value = "请输入手机号";
        return;
      }
      if (!isMobile(phone.value)) {
        phoneErrorMessage.value = "请输入正确的手机号";
        return;
      }
      phoneErrorMessage.value = "";
      return true;
    };

    const handleValidateCode = () => {
      if (!code.value) {
        codeErrorMessage.value = "请输入验证码";
        return;
      }
      if (code.value.length != 6) {
        codeErrorMessage.value = "验证码错误";
        return;
      }
      codeErrorMessage.value = "";
      return true;
    };

    const handleFieldBlur = () => {
      handleValidatePhone();
    };

    const handleFieldClear = () => {
      phoneErrorMessage.value = "";
    };

    const handleSendCode = async () => {
      if (disabled.value) return;
      if (!handleValidatePhone()) return;

      try {
        const params = {
          phone: phone.value,
        };
        sendMsg(params);
        Toast.success("验证码已发送");
        disabled.value = true;
        countDown.value.start();
      } catch {
        console.error("系统错误");
      }
    };

    // 倒计时结束
    const onFinish = () => {
      disabled.value = false;
      countDown.value.reset();
    };

    const beforeClose = (action) =>
      new Promise((resolve) => {
        if (action === "confirm") {
          router.push({
            name: "CallApp",
            query: {
              aid: _parasm.aid,
            },
          });
          resolve(true);
        } else {
          resolve(true);
        }
      });

    // 接受邀请
    const handleSubmit = async () => {
      if (loading.value) return;
      if (!handleValidateCode()) return;
      _parasm["account"] = phone.value;
      _parasm["code"] = code.value;
      try {
        loading.value = true;
        const { StatusMsg } = await verificationCodeRegistration(_parasm);
        if (StatusMsg == "用户已注册！") {
          Dialog.confirm({
            title: "系统提示",
            message: "您的手机号已注册",
            confirmButtonText: "进入掌银APP",
            confirmButtonColor: "#646566",
            cancelButtonText: "关闭",
            closeOnPopstate: true,
            beforeClose,
          });
        } else {
          router.push({
            name: "CallApp",
            query: {
              aid: _parasm.aid,
            },
          });
        }
      } catch (x) {
        Toast.fail(x);
      } finally {
        loading.value = false;
      }
    };

    return {
      state,
      disabled,
      countDown,
      time,
      phone,
      code,
      phoneErrorMessage,
      codeErrorMessage,
      handleSendCode,
      handleFieldBlur,
      handleFieldClear,
      onFinish,
      handleSubmit,
      handleValidateCode,
    };
  },
};
</script>

<style lang="less" scoped>
::v-deep input::-webkit-input-placeholder {
  color: #82aea5;
}

::v-deep .van-cell {
  background: #d3edd8;
}

::v-deep .van-field__control {
  color: #4a4a4a;
}

.page {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: #00ac97;
  box-sizing: border-box;
  .header {
    width: 100%;
    height: 380px;
    background: url('../../assets/invitation_/header.png') no-repeat center;
    background-size: 100% 100%;
    padding-top: 1px;
    box-sizing: border-box;
    position: relative;
    .title {
      width: 280px;
      height: 90px;
      background: url('../../assets/invitation_/title.png') no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -140px;
    }
    .content {
      width: 160px;
      height: 42px;
      position: absolute;
      top: 142px;
      left: 50%;
      margin-left: -80px;
      color: #fff;
      line-height: 22px;
      text-align: center;
    }
    .red-packet-money {
      width: 130px;
      height: 46px;
      position: absolute;
      bottom: 22px;
      left: 50%;
      margin-left: -65px;
      font-size: 16px;
      text-align: center;
      color: #fff;

      span {
        font-size: 46px;
        font-family: fangzhegnlantingcuheijianti;
        background-image: linear-gradient(0deg, #ffeaae, #ffec8b);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }

  .body {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 15px;
    .content {
      width: 100%;
      height: auto;
      background: url('../../assets/invitation_/bg-3.png') no-repeat center;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding-top: 1px;
      padding: 10px 10px;
      box-sizing: border-box;

      .warning-text {
        font-size: 12px;
        color: #9e7344;
        margin-top: 10px;
        margin-left: 20px;
      }

      .field-left-icon {
        margin-right: 10px;
        width: 14px;
        vertical-align: middle;
      }

      .button-send {
        width: 114px;
        height: 40px;
        background: url('../../assets/invitation_/btn-code.png') no-repeat
          center;
        background-size: 100% 100%;
        border-radius: 10%;
        text-align: center;
        color: #fff;
        line-height: 40px;
        margin-top: 2px;

        .count-down-text {
          color: #fff;
          font-size: 12px;
          line-height: 40px;
        }
      }

      .button-submit {
        width: 90%;
        height: 46px;
        margin: 20px auto;
        background: url('../../assets/invitation_/btn-sub.png') no-repeat center;
        background-size: 100% 100%;
        text-align: center;
        color: #fff;
        font-size: 16px;
        line-height: 46px;
      }
    }
  }

  .footer {
    width: 100%;
    height: auto;
    min-height: 200px;
    box-sizing: border-box;
    padding: 5px 15px 15px 15px;
    position: relative;

    .title {
      width: 172px;
      height: 52px;
      background: url('../../assets/invitation_/footer-title.png') no-repeat
        center;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-bottom: 10px;
      color: #fff;
      text-align: center;
      line-height: 66px;
      font-size: 16px;
    }

    .content {
      width: 100%;
      min-height: 200px;
      padding-top: 1px;
      box-sizing: border-box;
      background: url('../../assets/invitation_/bg-1.png') no-repeat center;
      background-size: 100% 100%;
      padding: 20px 25px 20px 25px;
      .box {
        font-size: 14px;
        font-weight: 500;
        margin-top: 20px;
        box-sizing: border-box;
        padding-left: 30px;
        position: relative;
        .num {
          position: absolute;
          left: 0;
          top: -4px;
          img {
            width: 24px;
          }
        }
        .text {
          line-height: 20px;
          span {
            color: #00ac97;
          }
        }
        .stated {
          text-align: center;
          margin-top: 10px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>