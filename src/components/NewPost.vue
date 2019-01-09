<template>
  <div class="new-post">
    <top-header :headPar="headdata"></top-header>
    <section class="newpost_part">
      <div class="newpost_title_part">
        <div class="newpost_title">
          <input name="title" type="text" placeholder="请输入聊天室名称" v-model="title">
        </div>
      </div>
      <div class="editor">
        <div ref="editor" style="text-align:left"></div>
        <button class="editor_btn" v-on:click="getContent">提交</button>
      </div>
    </section>
    <foot :headPar="headdata"></foot>
  </div>
</template>

<script>
import TopHeader from "./TopHeader.vue";
import Foot from "./Foot.vue";
import E from "wangeditor";
import Qs from 'qs';

export default {
  name: "new-post",
  data() {
    return {
      headdata: {
        logo: require("../assets/logo.png"),
        title: "欢迎大家来到Vue.js的世界",
        copyright: "@Copyright gdp"
      },
      title:"",
    };
  },
  methods: {
    getContent() {
      var newsPost = {
        send:"创建聊天室",
        title:this.title,
        body:this.editorContent
      }
      this.axios.post('chatAddSave.php',Qs.stringify(newsPost))
      .then(res => {
        console.log(res.data)
        alert(res.data.message)
        if(res.data.message == "聊天室创建成功"){
          this.$router.push({path:'/index'})
        }
      })
    }
  },
  created() {
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    };
    editor.create();
  },
  components: {
    TopHeader,
    Foot
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newpost_part {
  width: 900px;
  margin: 0 auto;
}
.newpost_title {
  width: 100%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 50px 0;
  padding: 1px;
}
.newpost_title input{
  border:none;
  outline:none;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  text-indent: 1em
}
.editor_btn{
  display: block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin: 25px auto;
  border:none;
  outline:none;
  background: rgb(3, 176, 245);
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s
}
.editor_btn:hover{
  background: rgb(7, 121, 228);
}
</style>
