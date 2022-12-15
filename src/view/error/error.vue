<template>
  <van-empty image="error" description="非法访问" />
</template>

<script>
import { Empty } from "vant";
export default {
  components: {
    [Empty.name]: Empty,
  },
};
</script>