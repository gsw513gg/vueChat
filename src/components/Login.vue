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
        <el-alert :title="loginMessage" type="error" v-if="loginBoolean" @close="close"></el-alert>
        <el-button type="primary" @click="loginClick">登录</el-button>
        <router-link to="/registor" class="btn_registor">注册</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loginMessage: "",
      loginBoolean: false
    };
  },
  methods: {
    close() {
      this.loginBoolean = false;
    },
    loginClick() {
      this.loginBoolean = true;
      let loginMessge = {
        username: this.username,
        password: this.password,
        send: 1
      };
      this.axios
        .post("loginSave.php", Qs.stringify(loginMessge))
        .then(res => {
          if (res.data.message == "登陆成功") {
            this.$alert("登陆成功", "恭喜", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ path: "/index" });
              }
            });
          } else {
            this.loginMessage = res.data.message;
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 900px;
  margin: 200px auto;
  padding: 50px;
}
.login_title {
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
  text-align: left;
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
.btn_registor {
  display: block;
  width: 400px;
  height: 50px;
  border: none;
  outline: none;
  background: rgb(181, 10, 248);
  margin: 20px auto;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
}

.btn_registor:hover {
  background: rgb(206, 12, 245);
}
.el-button {
  width: 400px;
  height: 50px;
  margin: 0 auto;
  display: block;
  font-size: 18px;
  transition: 0.5s;
}
.el-alert {
  margin: 20px auto;
}
</style>
