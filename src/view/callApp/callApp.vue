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

    <div class="footer">
      <div class="content clearfix">
        <div class="title">点击下方打开</div>
        <img class="arrow" src="../../assets/utils/arrow.png" />
      </div>
      <div class="body">
        <img class="logo" src="../../assets/utils/logo.png" />
        <div class="open" @click="handleOpen">打开</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Notify } from "vant";
import { queryByIdActivity } from "@/api";
export default {
  setup () {
    const state = ref({});
    const route = useRoute();

    // 查询活动
    const handleQueryByIdActivity = async (aid) => {
      try {
        const res = await queryByIdActivity({ activityId: aid });
        state.value = { ...res };
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    function initPage () {
      const { aid } = route.query;
      if (aid) {
        handleQueryByIdActivity(aid);
      }
    }
    initPage();

    function handleOpen () {
      window.location.href = "https://wx.abchina.com/webank/main-view/openTagForSZSes?id=xufDk%2Far668%3D";
    }

    return {
      state,
      handleOpen,
    };
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100vh;
  background: #00ac97;
  box-sizing: border-box;
  overflow-x: hidden;
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

  .content {
    height: auto;

    .title {
      height: 40px;
      background-color: rgba(6, 94, 75, 1);
      line-height: 40px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
    }

    .arrow {
      width: 62px;
      float: right;
      margin-right: 40px;
      padding: 10px;
    }
  }

  .footer {
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;

    .body {
      width: 100%;
      height: 55px;
      background: #fff;
      line-height: 55px;
      box-sizing: border-box;
      padding-left: 20px;
      .logo {
        height: 34px;
        vertical-align: middle;
      }
      .open {
        margin-top: 10px;
        float: right;
        width: auto;
        height: 35px;
        padding: 0 15px;
        background: url('../../assets/utils/button-6.png') no-repeat center;
        background-size: 100% 100%;
        margin-right: 20px;
        line-height: 35px;
        color: rgba(34, 167, 141, 1);
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>