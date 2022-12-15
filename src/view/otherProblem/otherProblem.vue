<template>
  <div class="page">
    <div class="collapse">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="乘车劵如何使用？" name="1">
          <div class="text">
            使用微信免密支付，切换至本行卡，乘车费大于券面额时自动抵扣
          </div>
          <img class="dmeo-img" src="../../assets/utils/demo4.png" />
          <div class="text text-center mt-sm">乘车券使用示例</div>
        </van-collapse-item>
        <van-collapse-item title="乘车劵在哪查看？" name="2">
          <div class="text">①微信-我-卡包-劵和礼品卡</div>
          <div class="text mt-sm">
            ②前往微信小程序：微信搜索小程序“乘车代金券”或
            <a class="text-green" @click="handleToWeChat">点击前往</a>
          </div>
          <div class="text mt-sm">
            ③农业掌银：生活-出行有礼-乘车权益-乘车劵明细
          </div>
        </van-collapse-item>
        <van-collapse-item title="查看乘车优惠订单or券未抵扣？" name="3">
          <div class="text">进入微信支付-钱包-账单-找到当笔乘车订单</div>
          <img class="dmeo-img" src="../../assets/utils/demo-3.jpg" />
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="footer">
      <div class="content">
        <div class="text text-center">
          如遇到非以上问题无法解决，请拨打客服电话
        </div>
        <div class="text text-center mt-xs">
          （4008762568 工作日9:00-18:00）
        </div>
        <div class="button" @click="handleMakeCall"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Collapse, CollapseItem, Notify } from "vant";
import { generatescheme } from "../../api/index";
export default {
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
  },
  setup() {
    const activeNames = ref(["1"]);

    const handleMakeCall = () => {
      const aDom = document.createElement("a");
      aDom.href = "tel:4008762568";
      aDom.click();
    };

    let loading = false;

    const handleToWeChat = async () => {
      if (loading) return;
      try {
        loading = true;
        const params = {
          path: "/pages/home/home",
          version: "release",
        };
        const { openlink } = await generatescheme(params);
        location.href = openlink;
        loading = false;
      } catch (err) {
        loading = false;
        Notify({ type: "warning", message: err });
      }
    };

    return {
      activeNames,
      handleMakeCall,
      handleToWeChat,
    };
  },
};
</script>
<style lang="less" scoped>
::v-deep .van-cell__title {
  font-weight: 700 !important;
}
.text-green {
  color: #22a78d;
}
.page {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: #f3f3f3;
  position: relative;

  .collapse {
    min-height: 75vh;
  }

  .text {
    color: #3d3c49;
  }

  .dmeo-img {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
  }

  .footer {
    width: 100%;
    height: 25vh;
    overflow: hidden;
    .content {
      box-sizing: border-box;
      padding: 20px;
      margin-top: 2vh;
      height: 23vh;
      background: #fff;
      .button {
        width: 160px;
        height: 40px;
        margin: 0 auto;
        margin-top: 20px;
        background: url("../../assets/utils/button-1.png") no-repeat center;
        background-size: 100% 100%;
        text-align: center;
        color: #fff;
        line-height: 42px;
      }
    }
  }
}
</style>