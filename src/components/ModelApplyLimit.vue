<template>
  <van-dialog
    style="margin-top: 5vh"
    v-model:show="show"
    :show-confirm-button="false"
    :close-on-click-overlay="false"
  >
    <div class="dialog-body">
      <div class="title">
        <span class="text">使用限制</span>
        <van-icon
          @click.stop="handleClose()"
          class="float-right"
          name="cross"
          color="#065e4b"
          size="20px"
        />
      </div>

      <div class="content">
        <div v-for="item in list" :key="item.name">
          <div class="name">{{ item.name }}</div>
          <ul class="text-list">
            <li>{{ item.position }}</li>
          </ul>
        </div>
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
    const list = ref([]);
    const show = ref(false);

    const handleOpen = (val) => {
      list.value = val;
      show.value = true;
    };

    const handleClose = () => {
      show.value = false;
    };

    return {
      list,
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
        padding-left: 25px;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>