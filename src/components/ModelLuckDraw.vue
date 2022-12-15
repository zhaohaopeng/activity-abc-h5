<template>
  <van-dialog
    style="background: none"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
    :modal="false"
  >
    <div class="dialog-body">
      <div class="text-1">获得</div>
      <div class="text-2">张券</div>
      <div class="text-3">{{ num }}</div>
    </div>
  </van-dialog>
</template>
  
  <script>
import { ref, onMounted, nextTick } from "vue";
import { Icon, Dialog } from "vant";
export default {
  name: "ModelApplyLimit",
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  setup(props, cxt) {
    let total = 0;

    const handleOpen = (val) => {
      total = val || 0;
      count = 0;
      show.value = true;
      nextTick(() => {
        luck();
      });
    };

    const handleClose = () => {
      show.value = false;
    };

    const num = ref(0);

    let count = 0;

    const show = ref(false);

    const luck = () => {
      if (count < 50) {
        setTimeout(() => {
          count++;
          num.value = randomNum(2, 8);
          luck();
        }, 50);
      } else {
        num.value = total;
        setTimeout(() => {
          handleClose();
          cxt.emit("ok", total);
        }, 1000);
      }
    };

    function randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    }

    return {
      num,
      show,
      handleOpen,
      handleClose,
    };
  },
};
</script>
  
  <style lang="less" scoped>
.dialog-body {
  height: 310px;
  padding: 20px;
  background: url("../assets/utils/luckDraw.png") no-repeat center;
  background-size: 100% 100%;
  overflow-y: hidden;
  position: relative;
  .text-1 {
    position: absolute;
    top: 158px;
    left: 80px;
    color: #1e2674;
  }
  .text-2 {
    position: absolute;
    top: 158px;
    right: 80px;
    color: #1e2674;
  }

  .text-3 {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 148px;
    right: 0;
    font-size: 36px;
    color: #f3181b;
  }
}
</style>