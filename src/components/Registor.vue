<template>
  <div class="registor">
    <div class="container">
      <form>
        <div class="avatar">
          <input type="file" accept="image/*" class="uploadFile" @change="upload($event)">
          <img :src="baseData.src">
          <input type="hidden" v-model="baseData.src">
        </div>
        <div class="form_control">
          <label v-rainbow>输入用户名</label>
          <input class="user_name" name="username" type="text" v-model="username">
        </div>
        <div class="form_control">
          <label v-rainbow>输入密码</label>
          <input class="user_name" name="password" type="password" v-model="password">
        </div>
        <div class="form_control">
          <label v-rainbow>确认密码</label>
          <input class="user_name" name="password" type="password" v-model="checkpassword">
        </div>
        <el-alert :title="errorAlert" type="error" v-if="errorBoolean" @close="error"></el-alert>
        <el-button class="btn_registor" type="button" @click="addUser">注册</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "registor",
  data() {
    return {
      username: "",
      password: "",
      checkpassword: "",
      baseData: {
        src: null
      },
      errorAlert: "",
      errorBoolean: false
    };
  },
  methods: {
    error(){
      this.errorBoolean = false
    },
    upload(e) {
      var that = this;
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        that.baseData.src = reader.result;
      };
    },
    addUser() {
      if (this.password == "" || this.checkpassword == "") {
        this.errorBoolean = true;
        this.errorAlert = "输入密码或确认密码不能为空";
        return false;
      } else if (this.password != this.checkpassword) {
        this.errorBoolean = true;
        this.errorAlert = "输入密码或确认密码不能相同";
        return false;
      }
      var postData = {
        username: this.username,
        password: this.checkpassword,
        userAvatar: this.baseData.src,
        send: 1
      };
      this.axios
        .post("registerSave.php", Qs.stringify(postData))
        .then(res => {
          if (res.data.message == "注册成功") {
            this.$alert("注册成功", "恭喜", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            this.errorAlert = res.data.message;
            this.errorBoolean = true;
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  created() {}
};
</script>

<style scoped>
.container {
  width: 900px;
  margin: 200px auto;
}
.avatar {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto;
}
.uploadFile {
  width: 100%;
  height: 100%;
}
.avatar img {
  width: 100px;
  height: 100px;
  border: 1px solid #888;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.uploadFile {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 555;
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
  border: 1px solid #888;
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
  background: rgb(10, 133, 248);
  margin: 0 auto;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #888;
  transition: 0.5s;
}
.btn_registor:hover {
  background: rgb(93, 109, 204);
}
.el-alert{
  margin: 20px auto;
}
</style>
