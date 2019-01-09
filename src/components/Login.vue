<template>
  <div class="login">
    <div class="container">
      <h1 class="login_title">登录页面</h1>
      <form>
        <div class="form_control">
          <label v-rainbow>账号</label>
          <input type="text" name="username" v-model="username">
        </div>
        <div class="form_control">
          <label v-rainbow>密码</label>
          <input type="password" v-model="password">
        </div>
        <input class="btn_login" type="button" value="登录" @click="loginClick">
        <router-link to="/registor">
          <input class="btn_registor" type="button" value="注册">
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import Qs from "qs";


export default {
  name: "login",
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods:{
    loginClick(){
      let loginMessge = {
        username:this.username,
        password:this.password,
        send:1
      }
      this.axios.post('loginSave.php',Qs.stringify(loginMessge))
      .then((res) => {
        alert(res.data.message)
        if(res.data.message == "登陆成功"){
          this.$router.push({path:"/index"})
        }
      })
      .catch((error) => {
        alert(error)
      })
    },
  }
};
</script>

<style scoped>
.container {
  width: 900px;
  margin: 200px auto;
  padding: 50px;
}
.login_title{
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: rgb(8, 131, 247);
}
.form_control {
  display: flex;
  height: 50px;
  margin: 25px 0;
}
.form_control label {
  width: 20%;
  height: 100%;
  font-size: 24px;
  text-align: center;
  line-height: 50px;
}
.form_control input {
  width: 80%;
  height: 100%;
  border: 1px solid #ccc;
  outline: none;
  font-size: 20px;
  text-indent: 1em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #888;
}
.btn_registor,
.btn_login {
  display: block;
  width: 400px;
  height: 50px;
  border: none;
  outline: none;
  background: rgb(10, 133, 248);
  margin: 20px auto;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #888;
  transition: 0.5s
}
.btn_registor:hover{
  background: rgb(90, 106, 197);
}

.btn_login{
  background: rgb(8, 223, 105);
}
.btn_login:hover{
  background: rgb(49, 240, 182);
}
</style>
