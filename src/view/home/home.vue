<template>
  <div class="page">
    <div class="pendant" @click="handleJump">
      <img class="logo-ride" src="../../assets/home/ride.png" />
      <div>去乘车</div>
    </div>
    <div class="header">
      <div class="logo">
        <img src="../../assets/utils/qqmap.png" alt="腾讯地图" />
      </div>
      <div class="lable" @click="handleDialogShow('dialogShow')">活动规则</div>
      <div class="name"></div>
      <div class="theme">
        <img src="../../assets/h/header-title.png" />
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div class="box">
          <div class="title text-truncate">
            {{ currentMonth
            }}{{ activitymode == 0 ? "月可瓜分补贴" : "月可随机抽取" }}
          </div>
          <div class="card">
            <div class="name text-truncate">
              {{ activitymode == 0 ? state.quantity : "2~8" }}<span>张</span>
            </div>
            <div class="describe text-truncate">
              <span>{{ state.worth }}</span
              >元乘车劵
            </div>
          </div>
          <div class="text-1 text-truncate">
            乘车券自动每日派发{{ state.daynum }}张，当天有效
          </div>
          <div class="text-1 text-truncate">
            使用本行卡支付时抵扣，活动数量有限，先到先得
          </div>
          <div class="text-2 text-truncate">
            可使用城市为：深圳公交、深圳地铁
          </div>
          <!-- <div
            class="btn-receive"
            @click="handlePayment"
            v-if="!userOrderInfo.orderstate || userOrderInfo.orderstate < 1"
          >
            {{ state.price }}元领取
          </div> -->
          <div class="btn-receive" @click="handlePayment">
            {{ state.price }}元领取
          </div>
          <!-- <div
            class="btn-receive btn-not-receive"
            v-if="userOrderInfo.orderstate && userOrderInfo.orderstate >= 1"
          >
            <div>{{ nextMonth }}月1日可领</div>
            <div>邀请朋友可继续领取</div>
          </div> -->
        </div>
      </div>
      <div class="container">
        <div class="box">
          <div class="tab">
            <div
              class="tab-item text-truncate"
              :class="{ active: active == 1 }"
              @click="handleClick(1)"
            >
              乘车劵明细
            </div>
            <div
              class="tab-item text-truncate"
              :class="{ active: active == 2 }"
              @click="handleClick(2)"
            >
              邀请用户
            </div>
          </div>
          <div class="tab-block" v-if="active == 1">
            <div class="block-item">
              <div class="left-centent">
                <img src="../../assets/h/icon-1.png" />
                <div class="text">已领乘车券</div>
              </div>
              <div class="right-centent">{{ voucher.total }}张</div>
            </div>
            <div class="block-item">
              <div class="left-centent">
                <img src="../../assets/h/icon-2.png" />
                <div class="text">已发乘车券</div>
              </div>
              <div class="right-centent">{{ voucher.receive }}张</div>
            </div>
            <div class="block-item">
              <div class="left-centent">
                <img src="../../assets/h/icon-3.png" />
                <div class="text">未发乘车券</div>
              </div>
              <div class="right-centent">{{ voucher.surplus }}张</div>
            </div>
          </div>
          <div class="card-bag" v-if="active == 1">
            <div
              class="envelopes"
              :class="{ 'red-envelopes': item < voucher.surplus + 1 }"
              v-for="item in 5"
              :key="item"
              @click="handlePackeyReceive(item)"
            >
              <div class="text ling">领</div>
            </div>
          </div>
          <div class="card-tips" v-if="active == 1">
            点击红包手动领取未发乘车券，当日有效，过期作废
          </div>
          <div class="tab-invitation" v-if="active == 2">
            <div
              class="invitation-title text-truncate"
              v-if="invitationRe.length == 0"
            >
              每邀请一位朋友参加活动，即可获得
              {{ state.invitationreward }} 张乘车券
            </div>
            <img
              v-if="invitationRe.length == 0"
              class="mt-xs"
              width="200"
              src="../../assets/utils/demo-2.png"
            />
            <div class="invitation-text" v-if="invitationRe.length == 0">
              还未邀请朋友，快去邀请领福利吧！
            </div>
            <div class="invitation-list">
              <div
                class="invitation-list-item"
                v-for="item in invitationRe"
                :key="item.account"
              >
                <div class="iphone">
                  {{ item.account }}
                  <van-tag type="success" v-if="item.state >= 1">
                    邀请成功
                  </van-tag>
                  <van-tag type="warning" v-if="item.state == 0">
                    等待支付
                  </van-tag>
                </div>
                <div class="time">受邀时间：{{ item.createDate }}</div>
                <div class="hr"></div>
              </div>
            </div>
            <div class="invitation-button" @click="handleToInvitation()">
              立即邀请
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="button-text mr-lg" @click="handleClickModel(2)">
        <img src="../../assets/home/icon-2.png" />
        支付问题
      </span>
      <span class="button-text" @click="handleToPage('OtherProblem')">
        <img src="../../assets/home/icon-1.png" />
        其他问题
      </span>

      <div class="content">
        <div class="text text-center">
          如遇到非以上问题无法解决，请拨打客服电话
        </div>
        <div class="text text-center mt-sm">
          （4008762568 工作日9:00-18:00）
        </div>
        <div class="text text-center mt-sm">
          本服务由深圳市多品网络科技有限公司提供
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model:show="systemTipsShow"
      title="声明"
      :close-on-click-overlay="false"
    >
      <div class="action-content">
        本服务由深圳市多品网络科技有限公司提供，相关责任由该公司承担。我行将在法律法规和合同约定范围内合规开展经营活动，维护客户信息安全，保护消费者合法权益。
        <div class="action-button" @click="systemTipsShow = false">
          我知道了
        </div>
      </div>
    </van-action-sheet>

    <!-- 活动规则弹窗 -->
    <ModelActivityRule ref="refModelActivityRule" />
    <!-- 领卷弹窗 -->
    <ModelCollectCoupons
      ref="refModelCollectCoupons"
      @ok="handleToWeChat"
      @close="handleCloce"
    />
    <!-- 非深圳用户提示 -->
    <ModelLimitReminder ref="refModelLimitReminder" />
    <!-- 温馨提示 -->
    <ModelReminder ref="refModelReminder" />
    <!-- 支付问题弹窗 -->
    <ModelPaymentProblem ref="refModelPaymentProblem" />
    <!-- 使用限制提醒 -->
    <ModelApplyLimit ref="refModelApplyLimit" />
    <!-- 使用限制提醒 -->
    <ModelSystemPrompt ref="refModelSystemPrompt" />
    <!-- 抽奖 -->
    <ModelLuckDraw
      ref="refModelLuckDraw"
      @ok="handleToCollectCoupons"
    ></ModelLuckDraw>
    <ModelCollectCouponsLuck
      ref="refModelCollectCouponsLuck"
      @ok="handleToWeChat"
      @close="handleCloce"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ModelActivityRule from "../../components/ModelActivityRule.vue";
import ModelCollectCoupons from "../../components/ModelCollectCoupons.vue";
import ModelCollectCouponsLuck from "../../components/ModelCollectCouponsLuck.vue";
import ModelReminder from "../../components/ModelReminder.vue";
import ModelPaymentProblem from "../../components/ModelPaymentProblem.vue";
import ModelApplyLimit from "../../components/ModelApplyLimit.vue";
import ModelSystemPrompt from "../../components/ModelSystemPrompt.vue";
import ModelLuckDraw from "../../components/ModelLuckDraw.vue";
import ModelLimitReminder from "../../components/ModelLimitReminder.vue";
import { useRouter } from "vue-router";
import {
  Col,
  Row,
  Tag,
  Divider,
  Notify,
  Dialog,
  Toast,
  ActionSheet,
} from "vant";
import store from "../../store";
import {
  queryByIdActivity,
  queryUserActivityInfo,
  queryUserInvitationRecords,
  queryOrderInfo,
  queryOrderList,
  createOrder,
  generatescheme,
  receiveVoucherReward,
  queryUserVoucherStatistics,
  lottery,
} from "@/api";
export default {
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Divider.name]: Divider,
    [Dialog.Component.name]: Dialog.Component,
    [ActionSheet.name]: ActionSheet,
    ModelActivityRule,
    ModelCollectCoupons,
    ModelLimitReminder,
    ModelReminder,
    ModelPaymentProblem,
    ModelApplyLimit,
    ModelSystemPrompt,
    ModelLuckDraw,
    ModelCollectCouponsLuck,
  },
  setup() {
    const systemTipsShow = ref(false);
    const router = useRouter();
    const currentMonth = new Date().getMonth() + 1;
    const nextMonth =
      new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2;
    const state = ref({});
    const active = ref(1);
    const userOrderInfo = ref({});
    const activityList = ref([]);
    const invitationRe = ref([]);
    const applicableplace = ref([]);
    const voucher = ref({});
    const orderList = ref([]);
    const refModelActivityRule = ref(null);
    const refModelCollectCoupons = ref(null);
    const refModelLimitReminder = ref(null);
    const refModelReminder = ref(null);
    const refModelPaymentProblem = ref(null);
    const refModelApplyLimit = ref(null);
    const refModelSystemPrompt = ref(null);
    const refModelLuckDraw = ref(null);
    const refModelCollectCouponsLuck = ref(null);
    const RegBranch = store.state.RegBranch;
    const uid = store.state.uid;
    const activityId = "1";
    // activitymode == 0 普通模式 1 抽奖模式
    const activitymode = ref(0);
    const handleClick = (type) => {
      active.value = type;
    };
    let loopOrderInfo = true;

    /**
     * @name 白名单ID
     */
    // const whiteList = ["3", "4", "5", "9", "10", "82", "182", "184", "8294", "377", "2185", "73"];
    const whiteList = [];

    /**
     * @name 是否上线维护开关
     */
    const maintain = false;
    function isMaintain() {
      if (whiteList.includes(uid)) {
        return false;
      }
      return maintain;
    }

    onMounted(() => {
      // Dialog.confirm({
      //   title: "系统提示",
      //   message:
      //     "为了给您提供更好的服务，目前系统进行升级维护中，预计将于6月26日06时00分结束，请您稍后再试！",
      //   confirmButtonText: "我知道了",
      //   confirmButtonColor: "#646566",
      //   cancelButtonText: "确定",
      // });

      if (maintain) {
        refModelSystemPrompt.value.handleOpen({
          content: "功能升级，敬请期待！",
        });
      }

      if (store.state.onActionTips) {
        systemTipsShow.value = true;
        store.commit("setOnActionTips", false);
      }
    });

    // 进入我的优惠列表
    const handleToPage = (name) => {
      router.push({
        name,
        query: {
          id: uid,
          activityId,
        },
      });
    };

    // 查询活动
    const handleQueryByIdActivity = async () => {
      try {
        const res = await queryByIdActivity({ activityId });
        state.value = { ...res };
        activitymode.value = res.activitymode;
        if (state.value.applicableplace) {
          applicableplace.value = JSON.parse(state.value.applicableplace);
        }
        init();
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };
    handleQueryByIdActivity();

    // 查询活跃信息
    const handleQueryUserActivityInfo = async () => {
      try {
        const res = await queryUserActivityInfo({
          uid,
          aid: activityId,
        });
        activityList.value = res;
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    // 查询用户代金券统计信息
    const handleQueryUserVoucherStatistics = async () => {
      try {
        const res = await queryUserVoucherStatistics({
          uid,
          aid: activityId,
        });
        voucher.value = { ...res };
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    // 查询用户邀请记录信息
    const handleQueryUserInvitationRecords = async () => {
      try {
        const res = await queryUserInvitationRecords({
          uid,
          aid: activityId,
        });
        invitationRe.value = res;
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    // 查询是否是新注册并并下过单的人员
    async function handleQueryOrderList() {
      try {
        const res = await queryOrderList({
          uid,
          activityid: activityId,
        });
        orderList.value = res || [];
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    }

    // 查询指定人员订单信息
    const handleQueryOrderInfo = async () => {
      try {
        const res = await queryOrderInfo({
          uid,
          activityid: activityId,
        });
        userOrderInfo.value = res || {};
        if (
          userOrderInfo.value &&
          userOrderInfo.value.orderstate &&
          userOrderInfo.value.orderstate == "1"
        ) {
          if (state.value.activitymode == 0) {
            refModelCollectCoupons.value.handleOpen(state.value, {
              aid: activityId,
              uid,
            });
          } else {
            if (userOrderInfo.value.total == 0) {
              // 抽奖模式  前去抽奖
              const res = await lottery({
                activityid: activityId,
                uid,
                oid: userOrderInfo.value.id,
              });
              refModelLuckDraw.value.handleOpen(res.total);
            } else {
              // 抽过奖直接展示待领取页面
              refModelCollectCouponsLuck.value.handleOpen(
                userOrderInfo.value.total,
                {
                  aid: activityId,
                  uid,
                }
              );
            }
          }
        } else {
          // 判断活动是否到达最大上限
          // 达到上限进行提示
          const { threshold, orderNum } = state.value;
          if (orderNum >= threshold && !maintain) {
            refModelSystemPrompt.value.handleOpen();
          }
        }
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    //查询订单状态 如果是已经领取了就关闭弹窗刷新页面
    const handleToWeChat = async () => {
      try {
        const res = await queryOrderInfo({
          uid,
          activityid: activityId,
        });
        userOrderInfo.value = res || {};
        if (userOrderInfo.value.orderstate == 2) {
          loopOrderInfo = false;
          if (state.value.activitymode == 0) {
            refModelCollectCoupons.value.handleClose();
          } else {
            refModelCollectCouponsLuck.value.handleClose();
          }
          init();
        } else {
          if (loopOrderInfo) {
            setTimeout(() => {
              handleToWeChat();
            }, 2000);
          }
        }
      } catch (err) {
        Notify({ type: "warning", message: err });
      }
    };

    const handleCloce = () => {
      loopOrderInfo = false;
    };

    const init = () => {
      handleQueryUserActivityInfo();
      handleQueryUserInvitationRecords();
      handleQueryUserVoucherStatistics();
      handleQueryOrderInfo();
      handleQueryOrderList();
    };

    const handleDialogShow = (type) => {
      if (type === "dialogShow") {
        refModelActivityRule.value.handleOpen(state.value);
      }
    };

    const handleClickModel = (type) => {
      if (type == 1) {
        refModelApplyLimit.value.handleOpen(applicableplace.value);
      }
      if (type == 2) {
        refModelPaymentProblem.value.handleOpen();
      }
    };

    /**
     * 支付
     * 创建订单
     */
    let loading = false;
    async function handlePayment() {
      if (isMaintain()) {
        refModelSystemPrompt.value.handleOpen({
          content: "功能升级，敬请期待！",
        });
        return;
      }
      const { threshold, orderNum } = state.value;
      // 地域限制
      if (!whiteList.includes(uid)) {
        if (!RegBranch || RegBranch[0] != 4 || RegBranch[1] != 1) {
          refModelLimitReminder.value.handleOpen();
          return;
        }
      }
      // 购买限制
      if (orderNum >= threshold) {
        refModelSystemPrompt.value.handleOpen();
        return;
      }

      // 购买限制 newcustomerorders 0 允许  1不允许
      if (state.value.newcustomerorders == 1 && orderList.value.length == 0) {
        refModelSystemPrompt.value.handleOpen();
        return;
      }

      // 购买后的提示
      if (
        userOrderInfo.value.orderstate &&
        userOrderInfo.value.orderstate >= 1
      ) {
        refModelSystemPrompt.value.handleOpen({
          content: "您已经参与本月活动，明年再会！",
        });
        return;
      }

      if (loading) return;

      try {
        const params = {
          activityid: activityId,
          uid,
        };
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        const res = await createOrder(params);
        if (res.StatusCode == 0) {
          console.log(res.StatusMsg, ":res.StatusMsg");
          if (res.StatusMsg && res.StatusMsg.indexOf("TOKEN=") > -1) {
            const token = res.StatusMsg.split("TOKEN=")[1];
            let AlipayJSBridge = window.AlipayJSBridge
              ? window.AlipayJSBridge
              : AlipayJSBridge;
            if (token && AlipayJSBridge) {
              AlipayJSBridge.call(
                "startApp",
                {
                  appId: "30603024", // 固定值
                  param: {
                    type: "3", //   3： 掌银内H5页面，
                    tokenId: token, //商户传过来的tokenId
                    paySystem: "", //商户传过来的paySystem, 没有则传空字符串
                    payType: "1111", //商户传过来的payType，没有则传'1111'
                    webviewURL: "https://m.szduopin.com", //商户传过来的回跳地址
                    startMultApp: "YES", // 同一个H5容器如果需要多次调起快E付
                    showProgress: "NO",
                    backBehavior: "back",
                  },
                },
                function (result) {
                  console.log(result, ":");
                  console.log("支付成功~");
                }
              );
            }
          }
        }
        Toast.clear();
        loading = false;
      } catch (err) {
        loading = false;
        Notify({ type: "warning", message: err });
      }
    }

    /**
     * 邀请朋友
     */
    async function handleToInvitation() {
      if (isMaintain()) {
        refModelSystemPrompt.value.handleOpen({
          content: "功能升级，敬请期待！",
        });
        return;
      }

      // 地域限制
      if (!whiteList.includes(uid)) {
        if (!RegBranch || RegBranch[0] != 4 || RegBranch[1] != 1) {
          refModelLimitReminder.value.handleOpen();
          return;
        }
      }

      if (state.value.share == 1) {
        refModelSystemPrompt.value.handleOpen({
          content: "功能升级，敬请期待！",
        });
        return;
      }

      if (loading) return;

      try {
        loading = true;
        const params = {
          path: "/pages/invitation/invitation",
          version: "release",
          query: `uid=${uid}&activityid=${activityId}`,
        };
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        const { openlink } = await generatescheme(params);
        location.href = openlink;
        handleQueryUserActivityInfo();
        loading = false;
        Toast.clear();
      } catch (err) {
        loading = false;
        Toast.clear();
        Notify({ type: "warning", message: err });
      }
    }

    /**
     * 跳转首页
     */
    const beforeClose = (action) =>
      new Promise((resolve) => {
        if (action === "confirm") {
          (async function () {
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
          })();
          resolve(true);
        } else {
          resolve(true);
        }
      });

    /**
     * 成功提示
     */
    const handleSuccessDialog = () => {
      Dialog.confirm({
        title: "系统提示",
        message: "奖励已领取，请前往微信小程序搜索《乘车代金券》或微信卡包查看",
        confirmButtonText: "进入小程序",
        confirmButtonColor: "#646566",
        cancelButtonText: "确定",
        closeOnPopstate: true,
        beforeClose,
      });
    };

    /**
     * 领取红包
     */
    async function handlePackeyReceive(index) {
      if (!(index < voucher.value.surplus + 1)) {
        return;
      }
      if (loading) return;
      loading = true;
      try {
        const params = {
          aid: activityId,
          uid,
        };
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        await receiveVoucherReward(params);
        handleQueryUserVoucherStatistics();
        handleSuccessDialog();
        Toast.clear();
        loading = false;
      } catch (err) {
        loading = false;
        Toast.clear();
        Notify({ type: "warning", message: err });
      }
    }

    /**
     * 领券
     */
    function handleToCollectCoupons(num) {
      refModelCollectCouponsLuck.value.handleOpen(num, {
        aid: activityId,
        uid,
      });
    }

    function handleJump() {
      router.push({
        name: "Ride",
      });
    }

    return {
      activitymode,
      systemTipsShow,
      currentMonth,
      nextMonth,
      state,
      active,
      activityList,
      voucher,
      applicableplace,
      userOrderInfo,
      invitationRe,
      refModelActivityRule,
      refModelCollectCoupons,
      refModelCollectCouponsLuck,
      refModelLimitReminder,
      refModelReminder,
      refModelPaymentProblem,
      refModelApplyLimit,
      refModelSystemPrompt,
      refModelLuckDraw,
      handleToCollectCoupons,
      handleClick,
      handleToPage,
      handleDialogShow,
      handleClickModel,
      handlePayment,
      handleToInvitation,
      handlePackeyReceive,
      handleJump,
      handleToWeChat,
      handleCloce,
    };
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: #00ac97;
  box-sizing: border-box;
  overflow-x: hidden;
  font-size: 12px;
  color: #fff;

  .action-content {
    padding: 20px;
    font-size: 14px;
    text-indent: 28px;
    .action-button {
      width: 80%;
      height: 40px;
      margin: 0 auto;
      margin-top: 40px;
      background: url("../../assets/invitation/bg-button.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #fff;
      line-height: 42px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .pendant {
    position: fixed;
    width: 54px;
    height: 54px;
    top: 50%;
    right: 6px;
    margin-top: -27px;
    background-color: #fff;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    z-index: 20;
    color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .logo-ride {
      width: 22px;
      height: 22px;
      margin-top: 8px;
    }
  }

  .header {
    width: 100%;
    height: 394px;
    background: url("../../assets/h/header.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .logo {
      width: 100px;
      height: 26px;
      position: absolute;
      left: 12px;
      top: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .lable {
      width: 66px;
      height: 20px;
      line-height: 20px;
      background: url("../../assets/home/lable.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #92620d;
      position: absolute;
      right: 0;
      top: 38px;
      &:nth-child(3) {
        top: 74px;
      }
    }

    .theme {
      height: 100px;
      width: 100%;
      line-height: 60px;
      box-sizing: border-box;
      position: absolute;
      top: 86px;
      text-align: center;
      box-sizing: border-box;
      padding: 0 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .body {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 10px;

    .container {
      width: 100%;
      height: 300px;
      background: url("../../assets/h/box-bg-1.png") no-repeat center;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding: 20px;

      &:nth-child(2) {
        width: 100%;
        height: 480px;
        margin-top: 30px;
        background: url("../../assets/h/box-bg-2.png") no-repeat center;
        background-size: 100% 100%;
      }

      .box {
        width: 100%;
        height: 100%;
        text-align: center;
        .title {
          width: 198px;
          height: 36px;
          background: url("../../assets/h/title.png") no-repeat center;
          background-size: 100% 100%;
          box-sizing: border-box;
          margin: 0 auto;
          text-align: center;
          line-height: 36px;
          font-size: 18px;
          padding: 0 16px 0 16px;
          font-family: fangzhegnlantingcuheijianti;
        }

        .card {
          width: 260px;
          height: 120px;
          background: url("../../assets/h/card.png") no-repeat center;
          background-size: 100% 100%;
          box-sizing: border-box;
          margin: 0 auto;
          margin-top: 10px;
          padding-top: 1px;
          .name {
            width: 200px;
            height: auto;
            margin: 0 auto;
            margin-top: 14px;
            text-align: center;
            font-size: 46px;
            font-family: fangzhegnlantingcuheijianti;
            span {
              font-size: 18px;
              margin-left: 4px;
            }
          }

          .describe {
            width: 200px;
            height: auto;
            margin: 0 auto;
            margin-top: 14px;
            font-size: 14px;
            text-align: center;
            span {
              font-size: 16px;
              font-weight: bold;
            }
          }
        }

        .text-1 {
          width: 300px;
          height: auto;
          text-align: center;
          margin: 0 auto;
          margin-top: 6px;
          color: #065e4b;
          font-size: 13px;
        }

        .text-2 {
          width: auto;
          max-width: 300px;
          height: auto;
          text-align: center;
          margin: 0 auto;
          margin-top: 6px;
          display: inline-block;
          color: #22a78d;
          font-size: 14px;
          background-color: #d3edd8;
          box-sizing: border-box;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .btn-receive {
          width: 174px;
          height: 40px;
          background: url("../../assets/h/button.png") no-repeat center;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding: 6px 0;
          margin: 0 auto;
          margin-top: 4px;
          font-size: 18px;
          text-align: center;
          line-height: 28px;
          color: #8a5a27;
        }

        .btn-not-receive {
          font-size: 12px;
          line-height: 14px;
        }

        .tab {
          width: 100%;
          height: 46px;
          display: flex;
          justify-content: space-around;
          margin-top: 8px;

          .tab-item {
            width: 144px;
            height: 100%;
            background: url("../../assets/h/tab.png") no-repeat center;
            background-size: 100% 100%;
            font-size: 18px;
            color: #fff;
            line-height: 46px;
            font-weight: bold;
          }

          .active {
            color: #22a78d;
            line-height: 44px;
            background-image: url("../../assets/h/tab-active.png");
          }
        }

        .tab-block {
          width: 100%;
          height: 212px;
          margin-top: 10px;

          .block-item {
            width: 100%;
            height: 64px;
            background: url("../../assets/h/bg-block.png") no-repeat center;
            background-size: 100% 100%;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            .left-centent {
              height: 100%;
              display: flex;
              align-items: center;
              img {
                width: 38px;
                height: 42px;
                margin-left: 20px;
                margin-right: 20px;
              }
              .text {
                font-size: 16px;
                color: #6d5000;
              }
            }
            .right-centent {
              height: 100%;
              margin-right: 20px;
              display: flex;
              align-items: center;
              font-size: 18px;
              color: #128d75;
              font-weight: bold;
            }
          }
        }

        .card-bag {
          width: 100%;
          height: 92px;
          margin-top: 26px;
          display: flex;
          justify-content: space-between;
          .envelopes {
            width: 52px;
            height: 100%;
            background: url("../../assets/h/red-envelopes.png") no-repeat center;
            background-size: 100% 100%;
            .text {
              display: none;
            }
          }
          .red-envelopes {
            background-image: url("../../assets/h/envelopes.png");
            animation: shake 0.5s linear infinite;
            @keyframes shake {
              25% {
                transform: rotate(3deg);
              }
              75% {
                transform: rotate(-3deg);
              }

              50%,
              100% {
                transform: rotate(0);
              }
            }
            .text {
              margin-top: 20px;
              font-size: 16px;
              display: block;
              color: brown;
              span {
                font-size: 12px;
              }
            }

            .ling {
              font-size: 12px;
              color: brown;
              margin-top: 20px;
            }
          }
        }

        .card-tips {
          color: #128d75;
          margin-top: 6px;
        }

        .tab-invitation {
          margin-top: 20px;
          width: 100%;
          height: 330px;
          overflow: hidden;

          .invitation-title {
            color: #34351a;
            font-size: 12px;
            font-weight: bold;
          }

          .invitation-text {
            color: #2aae93;
            font-size: 16px;
            margin-bottom: 30px;
          }

          .invitation-list {
            width: 100%;
            height: auto;
            max-height: 236px;
            overflow-y: auto;
            text-align: left;
            margin-bottom: 30px;
            .invitation-list-item {
              padding: 20px;
              padding-bottom: 0;
              position: relative;

              &:nth-child(1) {
                padding-top: 0;
              }

              .hr {
                margin-top: 10px;
                height: 1px;
                width: 200%;
                background-color: #0b8168;
                transform: scale(0.5);
                transform-origin: 0 0;
              }

              .iphone {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.8);
              }
              .time {
                margin-top: 10px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
              }
            }
          }

          .invitation-button {
            width: 150px;
            height: 40px;
            margin: 0 auto;
            background: url("../../assets/invitation/bg-button.png") no-repeat
              center;
            background-size: 100% 100%;
            text-align: center;
            color: #fff;
            line-height: 42px;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .footer {
    font-size: 16px;
    text-align: center;
    color: #fff;
    height: auto;
    padding: 20px;
    img {
      height: 14px;
      vertical-align: center;
    }

    .content {
      font-size: 12px;
      box-sizing: border-box;
      margin-top: 20px;
    }
  }
}
</style>