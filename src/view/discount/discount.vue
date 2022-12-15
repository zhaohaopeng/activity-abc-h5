<template>
  <div class="page" :class="{ 'page-bg': list.length > 0 }">
    <van-empty
      v-if="list.length == 0 && !loading"
      class="custom-image"
      :image="imgUrl"
      description="暂无参与记录"
    />

    <div class="list-body" v-if="list.length">
      <div class="card" v-for="(item, index) in list" :key="index">
        <div class="title">
          <div class="text-truncate">{{ item.name }}</div>
          <div>
            <van-tag type="warning" v-if="item.state == 1"
              >已付款待领取</van-tag
            >
            <van-tag type="primary" v-if="item.state == 3">已领取</van-tag>
            <van-tag type="success" v-if="item.state == 2">奖励已领取</van-tag>
          </div>
        </div>
        <div class="mt-sm content clearfix">
          <span class="float-left">{{ item.gift_name }}</span>
          <span class="float-right">有效期至：{{ item.end_date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Empty, List, Tag } from "vant";
import { queryUserOrderRecords } from "@/api";
import { useRoute } from "vue-router";
export default {
  components: {
    [Empty.name]: Empty,
    [List.name]: List,
    [Tag.name]: Tag,
  },
  setup () {
    const imgUrl = ref(require("../../assets/utils/no-record.png"));
    const loading = ref(false);
    const list = ref([]);

    const { id } = useRoute().query;

    const queryData = async () => {
      const params = {
        uid: id,
      };
      try {
        const res = await queryUserOrderRecords(params);
        list.value = res || [];
        console.log(list.value, ":list.value ");
        loading.value = false;
      } catch {
        loading.value = false;
      }
    };

    queryData();

    return {
      imgUrl,
      list,
      loading,
    };
  },
};
</script>

<style lang="less" scoped>
::v-deep .custom-image .van-empty__image {
  width: 240px;
  height: 240px;
  margin-top: 10vh;
}

.page {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  border: 1px solid transparent;
  position: relative;

  .list-body {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px;

    .card {
      width: 100%;
      min-height: 60px;
      background: #fff;
      border-radius: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 15px;

      .title {
        text-align: left;
        color: #333333;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        .text-truncate {
          max-width: 72%;
        }
      }

      .content {
        width: 100%;
        height: auto;

        span {
          color: #9b9b9b;
          font-size: 12px;
        }
      }
    }
  }

  .van-list {
    margin-bottom: 70px;
  }

  .footer {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 60px;
    color: #22a78d;
    font-size: 16px;
  }
}

.page-bg {
  background: #f3f3f3;
}
</style>