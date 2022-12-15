<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body-coupon">
      <div class="title">
        <span class="text">温馨提示</span>
        <van-icon
          @click.stop="handleClose()"
          class="float-right"
          name="cross"
          color="#065e4b"
          size="20px"
        />
      </div>
      <div class="content">
        <img class="icon" src="../assets/utils/demo-2.png" />
        <div class="text-center mt-xs describe">您有2份乘车券/权益待领取</div>
        <div class="button" @click.stop="handleToWeChat()">去领取</div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { ref } from "vue";
import { Icon, Dialog, Notify } from "vant";
import { generatescheme } from "@/api";
export default {
  name: "ModelReminder",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup() {
    const show = ref(false);
    let activityId = null;
    let uid = null;
    let loading = false;

    const handleOpen = (data) => {
      activityId = data.aid;
      uid = data.uid;
      show.value = true;
    };

    const handleClose = () => {
      show.value = false;
    };

    /**
     * 邀请朋友
     */
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
        loading = false;
      } catch (err) {
        loading = false;
        Notify({ type: "warning", message: err });
      }
    }

    return {
      show,
      handleOpen,
      handleClose,
      handleToWeChat,
    };
  },
};
</script>

<style lang="less" scoped>
.dialog-body-coupon {
  min-height: 300px;
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
    text-align: center;

    .icon {
      width: 100px;
      margin-top: 10px;
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