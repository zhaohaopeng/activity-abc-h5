<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: fangzhegnlanting;
  src: url('./fonts/FZLTHJW.TTF');
}

@font-face {
  font-family: fangzhegnlantingcuheijianti;
  src: url('./fonts/FZLTDHJW.TTF');
}

#app {
  font-family: fangzhegnlanting, Avenir, Helvetica, Arial, sans-serif;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: 14px;
}
</style>
