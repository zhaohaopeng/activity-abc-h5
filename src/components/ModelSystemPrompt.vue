<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body">
      <div class="title">
        <span class="text">系统提示</span>
        <van-icon
          @click.stop="handleClose()"
          class="float-right"
          name="cross"
          color="#065e4b"
          size="20px"
        />
      </div>
      <div class="content">
        {{ content }}
        <div class="button" @click.stop="handleClose()">我知道了</div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { ref } from "vue";
import { Icon, Dialog } from "vant";
export default {
  name: "ModelApplyLimit",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup() {
    const content = ref("本月乘车优惠已领完，请下月参加！");
    const show = ref(false);

    const handleOpen = (val) => {
      if (val && val.content) {
        content.value = val.content;
      } else {
        content.value = "本月乘车优惠已领完，请下月参加！";
      }
      show.value = true;
    };

    const handleClose = () => {
      show.value = false;
    };

    return {
      content,
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
    margin-top: 50px;
    text-align: center;
    color: #0c0c0c;
    .button {
      width: 160px;
      height: 40px;
      margin: 0 auto;
      margin-top: 50px;
      margin-bottom: 5px;
      background: url("../assets/utils/button-2.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #fff;
      line-height: 42px;
    }
  }
}
</style>