<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "app",
  data() {
    return {};
  },
  components: {}
};
</script>

<style>
[v-cloak] {
  display: none;
}
* {
  margin: 0;
  padding: 0;
}
body {
  max-width: 1920px;
  min-width: 1200px;
  font-size: 16px;
  font-family: "微软雅黑,宋体";
}
ul,
ol {
  list-style: none;
}
h1 {
  font-weight: normal;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>
