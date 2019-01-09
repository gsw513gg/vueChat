<template>
  <div class="index">
      <top-header :headPar = "headdata"></top-header>
      <section class="newslink">
        <ul class="newslist">
          <li v-for="(newtitle,index) in newstitle" :key="index">
            <div class="newtime">
              {{newtitle.createDate | timeFilter()}}
            </div>
            <div class="new_wrap">
              <div class="newtitle">
                <h3>{{newtitle.title}}</h3>
              </div>
              <div class="newcontent_wrap"><router-link :to="/newview/+newtitle.chatId" v-html="newtitle.body">{{newtitle.body}}</router-link></div>
            </div>
          </li>
        </ul>
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
      newstitle:[]
    } 
  },
  methods:{
    getData(){
      this.axios.get('getChatList.php')
      .then((res) => {
        this.newstitle = res.data
        console.log(this.$cookies.get("userId"))
      })
      .catch((error) => {
        alert(error)
      })
    }
  },
  created(){
    this.getData()
  },
  filters:{
    timeFilter:(val) => {
      const valarr = []
      for(var i=0;i<val.length;i++){
        valarr.push(val[i])
      }
      valarr.splice('4',1," ")
      val = valarr.join('')
      return val
    }
  },
  components:{
    TopHeader,Foot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .newslink{
    width: 800px;
    margin: 0 auto;
  }
  .newslist li{
    position: relative;
    margin:20px 0;
  }
  .newtime{
    width: 50px;
    line-height: 25px;
    position: absolute;
    text-align: center;
    transform: translate(20%,20%);
    background: rgb(20, 209, 20);
    padding: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #eee;
  }
  .new_wrap{
    border:1px solid rgb(192, 190, 190);
    margin-left: 120px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #eee;
  }
  .newtitle{
    font-size: 15px;
    line-height: 50px;
    padding-left: 20px;
    color: rgb(28, 230, 28);
    border-bottom: 1px solid rgb(192, 190, 190);
  }
  .newcontent_wrap{
    font-size: 14px;
  }
  .newcontent_wrap a{
    display: block;
    box-sizing: border-box;
    padding: 34px;
    width: 100%;
    height: 100%;
    color: #888;
    transition: 0.8s;
  }
  .newcontent_wrap:hover a{
    background-color: #eee;
    color: rgb(231, 81, 81);
  }
</style>
