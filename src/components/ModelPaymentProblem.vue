<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body">
      <div class="title">
        <span class="text">支付遇到问题</span>
        <van-icon
          @click.stop="handleClose()"
          class="float-right"
          name="cross"
          color="#065e4b"
          size="20px"
        />
      </div>

      <div class="content">
        <div class="name">没有绑卡</div>
        <ul class="text-list">
          <li>
            您的掌银APP还没有绑定银行卡，可前往首页-我的账户-选择借记卡-添加此账户后再进行支付;
          </li>
        </ul>

        <div class="name">余额不足</div>
        <ul class="text-list">
          <li>
            您使用电子账户支付时提示余额不足,可前往首页-我的账户-选择该电子账户-转入转出-转入金额后进行支付;
          </li>
        </ul>

        <div class="name">没有本行卡</div>
        <ul class="text-list">
          <li>
            您是自助注册掌银APP,且暂时没有本行卡,可前往首页-我的账户-下拉到底部-开通电子账户,绑定他行卡开通二三类户后进行支付;
          </li>
        </ul>

        <div class="name">密码错误</div>
        <ul class="text-list">
          <li>
            支付时提示密码错误,请重新输入正确密码再次支付;若为电子账户,可前往首页-我的账户-选择电子账户-详情页-更多-重置密码再进行支付。
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
  name: "ModelPaymentProblem",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup() {
    const show = ref(false);

    const handleOpen = () => {
      show.value = true;
      console.log(show.value, "show.value");
    };

    const handleClose = () => {
      show.value = false;
    };

    return {
      show,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style lang="less" scoped>
.dialog-body {
  height: auto;
  padding: 20px;
  background: url("../assets/invitation/bg-3.png") no-repeat center;
  background-size: 100% 100%;
  overflow-y: hidden;

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

  .content {
    max-height: calc(70vh - 45px);
    margin-top: 10px;
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
        padding-left: 15px;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>