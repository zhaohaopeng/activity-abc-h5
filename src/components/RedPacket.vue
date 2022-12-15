<template>
  <div class="red-packet">
    <ul class="content clearfix">
      <li class="item" v-for="(item, index) in number" :key="item">
        <div
          class="packet"
          :class="{
            'active-style':
              activityList[index] && activityList[index].order_state == 3,
            'packet-unclaimed':
              activityList[index] && activityList[index].order_state == 2,
          }"
          @click="handleClick(index)"
        >
          <span class="icon">￥</span>
          <span class="money">{{ money }}</span>
        </div>
        <div
          class="number"
          :class="{
            'number-before': index % 5 !== 0,
            'number-after': (index + 1) % 5 !== 0,
            unclaimed:
              activityList[index] && activityList[index].order_state == 2,
          }"
          @click="handleClick(item)"
        >
          <span v-if="!activityList[index]"> 第{{ item }}次 </span>
          <span
            v-if="activityList[index] && activityList[index].order_state != 2"
          >
            第{{ item }}次
          </span>
          <span
            v-if="activityList[index] && activityList[index].order_state == 2"
          >
            领取
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Col, Row } from "vant";
export default {
  name: "RedPacket",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
  },
  props: {
    number: {
      default: 10,
    },
    money: {
      default: 5,
    },
    activityList: {
      default: () => [],
    },
  },
  setup(props, ctx) {
    function handleClick(index) {
      if (props.activityList[index]) {
        ctx.emit("message:packey-receive", props.activityList[index]);
      }
    }
    return {
      handleClick,
    };
  },
};
</script>

<style lang="less" scoped>
.red-packet {
  width: 100%;
  height: auto;

  .content {
    width: 100%;
    height: auto;

    .item {
      width: 20%;
      height: 120px;
      float: left;
      box-sizing: border-box;
      padding: 0 8px;

      .packet {
        width: 100%;
        height: 60px;
        background: url("../assets/home/not-red.png") no-repeat center;
        background-size: 100% 100%;
        color: #fff;
        text-align: center;
        line-height: 90px;

        .icon {
          font-size: 12px;
        }
        .money {
          font-size: 14px;
        }
      }

      .packet-unclaimed {
        animation: shake 0.5s linear infinite;
      }

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

      .packet.active-style {
        font-weight: 600;
        background: url("../assets/home/active-red.png") no-repeat center;
        background-size: 100% 100%;
        line-height: 40px;
        color: brown;
        .money {
          font-size: 14px;
        }
      }

      .number {
        margin-top: 10px;
        font-size: 12px;
        width: 100%;
        height: 20px;
        line-height: 22px;
        border: 1px dashed #fca532;
        border-radius: 20px;
        text-align: center;
        color: #fca532;
        position: relative;
      }

      .number-before::before {
        width: 8px;
        height: 2px;
        content: "";
        background-color: #7bc4ae;
        position: absolute;
        left: -8px;
        top: 8px;
      }

      .number-after::after {
        width: 8px;
        height: 2px;
        content: "";
        background-color: #7bc4ae;
        position: absolute;
        right: -8px;
        top: 8px;
      }

      .unclaimed {
        font-size: 12px;
        border: 1px dashed #409eff;
        color: #409eff;
      }
    }
  }
}
</style>
