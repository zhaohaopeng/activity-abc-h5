<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body-coupon">
      <div class="title">
        <span class="text">待领取</span>
      </div>
      <div class="content">
        <div class="card">
          <div class="box-left">
            <div class="name mt-sm">{{ state.giftname }}</div>
            <div class="text mt-sm">{{ state.giftexplain }}</div>
          </div>
          <div class="box-right">
            <span>{{ state.worth }}</span> 元
          </div>
        </div>
        <div class="text-center mt-xs describe">
          微信支付乘车费时，<br />
          用本行卡支付可抵用
        </div>
        <div class="button" @click="handleToWeChat">去微信领劵</div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { ref } from "vue";
import { Icon, Dialog, Notify } from "vant";
import { generatescheme } from "@/api";
export default {
  name: "ModelCollectCoupons",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup(props, cxt) {
    const show = ref(false);
    const state = ref({});
    let loading = false;
    let activityId = null;
    let uid = null;

    const handleOpen = (prop, data) => {
      activityId = data.aid;
      uid = data.uid;
      state.value = prop;
      console.log(state.value, ":state.valuestate.valuestate.valuestate.value");
      show.value = true;
    };

    const handleClose = () => {
      cxt.emit("close");
      show.value = false;
    };

    async function handleToWeChat() {
      if (loading) return;
      try {
        loading = true;
        const params = {
          path: "/pages/volume/volume",
          version: "release",
          query: `uid=${uid}&aid=${activityId}`,
        };
        const { openlink } = await generatescheme(params);
        location.href = openlink;
        cxt.emit("ok");
        loading = false;
      } catch (err) {
        loading = false;
        Notify({ type: "warning", message: err });
      }
    }

    return {
      show,
      state,
      handleOpen,
      handleClose,
      handleToWeChat,
    };
  },
};
</script>

<style lang="less" scoped>
.dialog-body-coupon {
  min-height: 320px;
  padding: 15px;
  padding-top: 20px;
  box-sizing: border-box;
  background: url("../assets/invitation/bg-3.png") no-repeat center;
  background-size: 100% 100%;
  .title {
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
    margin-top: 25px;

    .card {
      width: 290px;
      height: 113px;
      margin: 0 auto;
      background: url("../assets/utils/img-2.png") no-repeat center;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding: 25px;

      .box-left {
        width: 120px;
        height: 100%;
        float: left;
        .name {
          font-size: 17px;
          color: #065e4b;
        }
        .text {
          font-size: 12px;
          color: #065e4b;
        }
      }

      .box-right {
        width: 100px;
        height: 100%;
        float: right;
        text-align: center;
        color: #f04c42;
        font-size: 18px;
        text-shadow: 1px 1px 1px #ff0000;
        font-weight: 700;
        line-height: 60px;

        span {
          display: inline-block;
          margin-top: 3px;
          font-size: 26px;
          text-shadow: 1px 1px 1px #ff0000;
        }
      }
    }

    .describe {
      line-height: 25px;
      color: #4d4746;
    }

    .button {
      width: 160px;
      height: 40px;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 15px;
      background: url("../assets/utils/button-2.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #fff;
      line-height: 42px;
    }
  }
}
</style>