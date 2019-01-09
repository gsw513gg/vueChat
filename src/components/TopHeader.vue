<template>
  <div class="top-header">
      <div class="wrap">
          <div class="left_wrap">
            <img :src="headPar.logo" :alt="headPar.title">
            <h1 class="tophead">{{headPar.title}}</h1>
          </div>
          <div class="right_wrap">
            <ul class="main_nav">
              <li>
                <router-link to="/index">首页</router-link>
              </li>
              <li>
                <router-link to="/newpost">创建聊天室</router-link>
              </li>
              <li>
                <router-link to="/message">个人信息</router-link>
              </li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'top-header',
  props:{
    headPar:Object
  }
}
</script>

<style scoped>
  .top-header{
    width: 100%;
    height: 50px;
    background: rgb(11, 139, 212);
  }
  .tophead{
    color: #fff;
    margin-left: 40px;
    font-size: 16px
  }
  .wrap{
    display: flex;
    width: 1200px;
    height: 50px;
    margin: 0 auto;
    justify-content: space-between
  }
  .left_wrap{
    display: flex;
    height: 100%;
    align-items: center;
  }
  .left_wrap img{
    height: 40px;
  }
  .main_nav{
    display: flex;
    height: 50px;
  }
  .main_nav li{
    line-height: 50px;
  }
  .main_nav a{
    display: block; 
    color: #fff;
    padding: 0 20px;
  }
  .main_nav a.router-link-active{
    background: rgb(8, 233, 147);
  }
</style>
