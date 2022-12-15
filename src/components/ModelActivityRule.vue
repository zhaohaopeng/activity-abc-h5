<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body">
      <div class="title">
        <span class="text">活动规则</span>
        <van-icon
          @click.stop="handleClose()"
          class="float-right"
          name="cross"
          color="#065e4b"
          size="20px"
        />
      </div>
      <!-- <div class="sub-title">即日起至2022年12月30日</div> -->
      <div class="content">
        <div class="name">一、活动时间</div>
        <ul class="text-list">
          <li>即日起至2022年12月31日。</li>
        </ul>
        <div class="name">二、参与规则</div>
        <ul class="text-list">
          <li>1、深圳注册农业银行掌银APP用户</li>
          <li>
            2、支付{{ state.price }}元，{{
              state.activitymode == 0
                ? "领取" + state.quantity
                : "随机领取2 ~ 8"
            }}张{{ state.worth }}元的乘车券，每天派发{{ state.daynum }}张。
          </li>
          <li>每位用户每月均可参与一次，限时参加。</li>
        </ul>
        <div class="name">三．活动细则</div>
        <ul class="text-list">
          <li>
            1、用户登录农业银行APP——本地生活——出行福利——优惠乘车，进入活动详情页面，可通过支付0.06元领取乘车礼包，随机抽取2~8张0.99元乘车券，派发形式为每天2张，发完即止。
          </li>
          <li>
            2、乘车券可至“微信——我——卡包——券和礼品卡”查询。发放到卡包的<text class="tel">乘车券有效期为当天，过期作废不补</text>。
          </li>
          <li>
            3、乘车券使用：用户领取完车票后，可自行打开腾讯地图APP或者腾讯乘车码小程序，乘车时抵扣使用。
          </li>
          <li>
            4、活动参与成功，中途不可暂停，如需帮助可致电客服热线人工处理。
          </li>
          <li>
            5、同一客户每月可参与乘车券活动一次，同一客户指同一身份证号、同一银行卡号、同一手机号码，同一收货手机、同一IP地址、同一设备号或其他合理显示同一用户的情形，<text class="tel">均认定为同一客户</text>。
          </li>
          <li>
            6、如出现不可抗力或情势变更的情况，如自然灾害事件，活动受政府机关指令需要停止举办或调整等，活动方可能进行活动调整或停止举办，届时将通过页面消息、站内公告等方式通知。
          </li>
          <li>
            7、参与活动用户因手机号码未实名认证、被工信部拉黑、涉嫌诈骗、被举报过多，或者微信号被腾讯风控拉黑等情况则无法成功领取奖励。
          </li>
          <li>
            8、客户因自身电子设备不支持或其他问题导致无法享受活动优惠等情况的，活动方不予承担相应责任，后续亦<text class="tel">不予补发奖品</text>。
          </li>
          <li>
            9、请仔细阅读活动细则，客户如对活动有异议，可于2022年12月31日前致电消费者客服热线400-876-2568进行咨询（工作日9:00-18:00），逾期将视为放弃反馈权利，农业银行将不再受理。
          </li>
        </ul>
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { ref } from "vue";
import { Icon, Dialog } from "vant";
export default {
  name: "ModelActivityRule",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup() {
    const state = ref({});
    const show = ref(false);
    const handleOpen = (data) => {
      state.value = data;
      show.value = true;
    };
    const handleClose = () => {
      show.value = false;
    };
    return {
      state,
      show,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style lang="less" scoped>
.dialog-body {
  height: 70vh;
  text-align: center;
  padding: 20px;
  background: url("../assets/invitation/bg-3.png") no-repeat center;
  background-size: 100% 100%;
  overflow-y: hidden;
  color: rgba(0, 0, 0, 0.8);

  .title {
    height: 20px;
    text-align: center;
    color: #065e4b;
    font-weight: 600;

    .text {
      display: inline-block;
      position: relative;
      &::before {
        width: 18px;
        height: 5px;
        content: "";
        background: url("../assets/utils/bg-title-left.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        left: -30px;
        top: 5px;
      }
      &::after {
        width: 18px;
        height: 5px;
        content: "";
        background: url("../assets/utils/bg-title-right.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        right: -30px;
        top: 5px;
      }
    }
    .float-right {
      margin-top: -8px;
    }
  }

  .sub-title {
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
  }

  .content {
    width: 100%;
    height: calc(70vh - 45px);
    overflow-y: auto;
    text-align: left;

    .name {
      width: auto;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      box-sizing: border-box;
      padding: 0 10px;
      background-color: #fbb25a;
      border-radius: 5px;
      text-align: center;
      color: #6d5000;
      font-size: 14px;
      margin-top: 10px;
    }

    .text-list {
      margin-top: 10px;
      font-size: 13px;
      color: #0c0c0c;
      li {
        margin-top: 5px;
        position: relative;
        box-sizing: border-box;
        padding-left: 25px;
        line-height: 20px;
        font-size: 12px;
        &::before {
          width: 8px;
          height: 8px;
          content: "";
          border-radius: 50%;
          background-color: #22a78d;
          position: absolute;
          left: 10px;
          top: 5px;
        }
        .tel {
          color: red;
        }
      }
    }
  }
}
</style>