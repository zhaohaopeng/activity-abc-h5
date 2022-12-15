<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body-coupon">
      <div class="title">
        温馨提示
        <van-icon
          @click.stop="handleClose()"
          class="float-right"
          name="cross"
          color="#065e4b"
          size="20px"
        />
      </div>
      <div class="content">
        <div class="text">{{ content }}</div>
        <div class="button" @click="handleClose()">我知道了</div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { ref } from "vue";
import { Icon, Dialog } from "vant";
export default {
  name: "ModelLimitReminder",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup() {
    const content = ref("本活动限深圳掌银用户参与 更多热门活动敬请关注！");
    const show = ref(false);
    const handleOpen = (data) => {
      if (data && data.content) {
        content.value = data.content;
      }
      show.value = true;
    };
    const handleClose = () => {
      show.value = false;
    };

    return {
      show,
      content,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style lang="less" scoped>
.dialog-body-coupon {
  height: 220px;
  padding: 15px;
  padding-top: 20px;
  box-sizing: border-box;
  background: url("../assets/invitation/bg-3.png") no-repeat center;
  background-size: 100% 100%;

  .title {
    text-align: center;
    color: #065e4b;
    font-weight: 600;
    .float-right {
      margin-top: -8px;
    }
  }

  .content {
    margin-top: 30px;
    .text {
      width: 70%;
      margin: 0 auto;
      text-align: center;
      color: #4d4746;
      line-height: 30px;
    }
    .button {
      width: 150px;
      height: 40px;
      margin: 0 auto;
      margin-top: 30px;
      background: url("../assets/invitation/bg-button.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #fff;
      line-height: 42px;
    }
  }
}
</style>