<template>
  <div class="index">
      <top-header :headPar = "headdata"></top-header>
      <section class="message">
        <button class="outlogin_btn" @click="outLogin">注销</button>
      </section>
      <foot :headPar = "headdata"></foot>
  </div>
</template>

<script>
import TopHeader from './TopHeader.vue'
import Foot from './Foot.vue'
 

export default {
  name: 'index',
  data(){
    return {
      headdata:{
        logo:require('../assets/logo.png'),
        title:'欢迎大家来到Vue.js的世界',
        copyright:'@Copyright gdp'
      },
    } 
  },
  methods:{
    outLogin(){
      this.$cookies.remove('userId')
      this.$cookies.remove('username')
      this.$cookies.remove('userlevel')
      this.$router.push({path:'/login'})
      alert('登出成功')
    }
  },
  created(){
  },
  components:{
    TopHeader,Foot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message{
  width: 900px;
  margin: 100px auto;
}
.outlogin_btn{
  display: block;
  width: 400px;
  height: 50px;
  border:none;
  outline:none;
  background: rgb(214, 6, 214);
  margin: 0 auto;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  border-radius: 5px;
  transition: 0.5s
}
.outlogin_btn:hover{
  background: rgb(200, 8, 248);
}
</style>
