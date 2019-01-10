<template>
  <div class="new-view">
    <top-header :headPar="headdata"></top-header>
    <section class="new_message">
      <div class="news_part">
        <h1>{{newsview.title == null ? "你是第一个进来的,正等你的一句话呢" : newsview.title}}</h1>
        <p v-if="newsview.body == undefined">快快评论,由你解开其中奥妙</p>
        <p v-else v-html="newsview.body">{{newsview.body}}</p>
      </div>
      <div class="take_comment">
        <h1>发布评论</h1>
        <div class="editor" ref="editor" style="text-align:left"></div>
        <button class="editor_btn" v-on:click="getContent">提交</button>
      </div>
      <div class="comment">
        <h1>评论内容区</h1>
        <ul class="comment_list">
          <li v-for="(comment,index) in comments" :key="index">
            <div class="comment_top">
              <div class="c_top_l">
                <div class="head_img">
                  <img :src="userAvatar + comment.userAvatar" alt>
                </div>
                <span>{{comment.userName}}</span>
              </div>
              <div class="c_top_r">
                {{comment.id}}
                <span>|</span>
                {{comment.createTime}}
              </div>
            </div>
            <div class="comment_body">
              <p v-html="comment.chatBody">{{comment.chatBody}}</p>
            </div>
          </li>
        </ul>
        <span class="loadmore" @click="loadmore" v-if="commentLength != end && commentArray.length > 10">加载更多</span>
        <span class="loadend" v-else>已经到底了鸭!</span>
      </div>
    </section>
    <foot :headPar="headdata"></foot>
  </div>
</template>

<script>
import TopHeader from "./TopHeader.vue";
import Foot from "./Foot.vue";
import E from "wangeditor";
import Qs from "qs";

export default {
  name: "new-view",
  data() {
    return {
      headdata: {
        logo: require("../assets/logo.png"),
        title: "欢迎大家来到Vue.js的世界",
        copyright: "@Copyright gdp"
      },
      id: this.$route.params.id,
      userAvatar: "http://gsw513gg.gz01.bdysite.com/",
      commentLength: 0,
      start: 0,
      end: 10,
      newsview: {},
      comments: [],
      commentArray:[],
      userid:this.$cookies.get("userId"),
      editorContent: "",
      username:this.$cookies.get("username")
    };
  },
  created() {
    this.getData(0, this.end)
    
  },
  methods: {
    loadmore() {
      let more = 10;
      if (this.commentLength - this.comments.length < 10) {
        more = this.commentLength - this.comments.length;
      }
      this.end = this.end + more;
      this.getData(0, this.end);
    },
    getContent: function() {
      let messageConent = {
        content:this.editorContent,
        chatId:this.id,
        userId:this.userid,
        username:this.username
      }
      this.axios.post('messageAdd.php',Qs.stringify(messageConent))
      .then((res) => {
        alert(res.data.message)
        this.getData(0, this.end)
      })
      .catch((error) => {
        alert(error)
      })
    },
    getData(start, end) {
      start == "" ? 0 : parseInt(start);
      end == "" ? 10 : parseInt(end);
      this.axios
        .get("getchatAll.php?chatId=" + this.id)
        .then(res => {
          this.commentArray = res.data.message
          this.commentLength = res.data.message.length;
          this.newsview = res.data.message[0];
          this.comments = res.data.message
            .reverse()
            .slice(this.start, this.end);
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
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
.new_message {
  width: 900px;
  margin: 25px auto;
}
.news_part {
  width: 100%;
  height: 175px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 25px;
  box-shadow: 1px 1px 5px #888;
}
.news_part h1 {
  height: 25px;
  padding: 15px;
  font-size: 18px;
  color: #888;
  border-bottom: 1px solid #ddd;
}
.news_part p {
  height: 90px;
  padding: 15px;
  color: #666;
  font-size: 14px;
}
.take_comment h1,
.comment h1 {
  font-size: 13px;
  border-bottom: 1px solid rgb(92, 163, 22);
  color: rgb(92, 163, 22);
  padding: 10px;
  margin-bottom: 25px;
}
.editor_btn {
  margin-top: 25px;
  display: block;
  width: 80px;
  height: 50px;
  background: rgb(27, 133, 233);
  border: none;
  outline:none;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #888;
  transition:0.5s
}
.editor_btn:hover{
  background: rgb(9, 84, 245);
}
.comment {
  background: rgb(245, 244, 244);
  margin-top: 25px;
  padding: 15px;
  color: rgb(59, 128, 231);
}
.comment_list li {
  background-color: #fff;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ddd;
}
.comment_top {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  height: 80px;
  align-items: center;
}
.c_top_l {
  display: flex;
  align-items: center;
}
.head_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgb(92, 163, 22);
  box-shadow: 1px 1px 8px #888;
  margin-right: 25px;
  overflow: hidden;
}
.head_img > img {
  min-width: 100%;
  height: 100%;
}
.c_top_r {
  display: flex;
  align-items: center;
}
.c_top_r span {
  margin: 0 15px;
  color: #000;
}
.comment_body {
  height: 100px;
  padding: 15px 0;
}
.loadmore {
  display: block;
  color: #fff;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background: rgb(10, 147, 238);
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.4s;
}
.loadmore:hover {
  background: rgb(4, 83, 228);
}
.loadend {
  display: block;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-size: 16px;
}
</style>