<template>
  <div class="foot">
    <p>{{headPar.copyright}}</p>
  </div>
</template>

<script>
export default {
  name:'foot',
  props:{
    headPar:Object
  }
}
</script>

<style scoped>
  .foot{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #000;
  }
</style>
