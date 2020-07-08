<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <Header></Header>
 
    <el-row :gutter="24">
      <!-- 左侧的导航栏 -->
      <el-col class="left" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-menu
          style="text-align: left"
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff">
          <div id="app">
          <div id="nav">
            <router-link to="/">
            <el-menu-item index="1" @click="emitEventByType('疫情地图')">
              <i class="el-icon-picture-outline-round"></i>
              
              <span slot="title">疫情地图</span>
            </el-menu-item>
          </router-link>
          

          </div>
          
          <router-link to="/knowledge">
            <el-menu-item index="2" @click="emitEventByType('防疫知识')">
              <i class="el-icon-notebook-1"></i>
              
              <span slot="title">防疫知识</span>
            </el-menu-item>
          </router-link>
          
         
          <router-link to="/fit">
            <el-menu-item index="3" @click="emitEventByType('健康码')">
             <i class="el-icon-document"></i>
              <span slot="title">健康填报</span>
            </el-menu-item>
          </router-link>
          <router-link to="/rumor">
            <el-menu-item index="4" @click="emitEventByType('')">
              <i class="el-icon-news"></i>
              <span slot="title">辟谣信息</span>
            </el-menu-item>
          </router-link>
          </div>
        </el-menu>
       
          
           
         
      </el-col>
      
      
      <!-- 中间的文章的列表 -->
      <el-col class="center" :push="4" :xs="20" :sm="15" :md="15" :lg="15" :xl="15">
        <!-- 根据路由动态切换的组件都会显示在下面 -->
        <transition>
          <keep-alive include="articleList, addArticle">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-col>
      <!-- 右边图表 -->
      <div>
   
  </div>
      
      <!-- 右边标签联系 -->
      <!-- <el-col class="right" :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        
        <el-card class="box-card tags" shadow="hover">
          <p class="tag_title">热门标签</p>
          <div class="item_tag" v-for="item in tags" :key="item.id">
            <el-tooltip effect="light" :content="item.count" placement="top">
              <el-button :type="item.type">{{ item.content }}</el-button>
            </el-tooltip>
          </div>
        </el-card> -->
        <!-- 关于我
        <el-card class="box-card contact" shadow="hover">
            <div slot="header" class="clearfix">
              <span>社交账号</span>
            </div>
            <div class="person_tag">
              <div v-for="item in contacts" :key="item.id">
                <el-tooltip effect="light" :content="item.tip" placement="top">
                  <i :class="item.content"></i>
                </el-tooltip>
              </div>
            </div>
          </el-card>
      </el-col> -->
    </el-row>
  </div>
</template> 

<script>
import Header from 'views/header.vue';

export default {  
    data() {
      return {
       
      }
    },
    
    methods: {
      /* 
        emitEventByType
        根据类型来触发事件
      */
      emitEventByType(type) {
          this.$bus.$emit('eventByType', type);
      },
      /* 
        verifyLogin
        验证登录有效性
      */
      verifyLogin() {
          // 获取token并验证token的有效性 获取的可能是空串
          const userToken = this.$store.state.user_info.user_token;
          const params = { token: userToken };
          this.$ajax.get('/user/verifyLogin', params)
                  .then(response => {
                      const { code } = response.data;
                      // 没有登陆或者登录已经过期
                      if (code != 0) {
                          this.$store.commit('updateLoginState', false);
                          return;
                      }
                      // 验证通过
                      this.$store.commit('updateLoginState', true);
                  })
                  .catch(error => {
                      console.log(error);
                  });
      }
    },
    created() {
      // 每次重新加载页面都要先验证用户登录的有效性
      this.verifyLogin();
    },
    components: {
      Header
    },
     
    
}
</script>
<style lang="less" scoped>
@import "assets/css/base.css";
#app {
  overflow: hidden;
  .el-row {
    width: 100%;
    height: 100%;
    .left {
      position: fixed;
      z-index: 1;
      padding: 0!important;
      border-radius: 4px;
      height: 100%;
      margin-top: 2.9rem;
      overflow: hidden;
      // width: 14rem;
      ul {
        height: 100%;
        background-color: rgb(54, 54, 54)!important;
      }
      a {
        text-align: left;
        text-decoration: none;
        li {
          height: 4rem;
          line-height:4rem;
          background-color: rgb(54, 54, 54)!important;
          i {
            font-size: 2rem;
            padding-right: 1rem;
          }
        }
      }
    }
    .center {
      z-index: 1;
      margin-top: 3rem;
      .v-enter {
        opacity: 0;
      }
      .v-leave-to {
        opacity: 0;
      }
      .v-enter-active, .v-leave-active{
          position: absolute;
      }
    }
    .right {
      padding: 0!important;
      margin-top: 3rem;
      background-color: #fff;
      position: fixed;
      z-index: 1;
      right: 0;
      .tags {
        width: 100%;
        padding: .3rem;
        .tag_title {
          margin: 0;
          font-weight: bold;
          font-size: 1.2rem;
          text-align: center;
        }
        .item_tag {
          float: left;
          width: 50%;
          margin-top: .9rem;
          .el-button {
            border-radius: 5px;
            width: 90%;
            font-size: 1rem;
            display: flex;
            justify-content: center;
          }
        }
      }
      .contact {
        margin-top: .7rem;
        .el-card__header {
          margin-top: .7rem;
          display: block;
          padding: .3rem 1.2rem!important;
        }
        .person_tag {
          display: flex;
          justify-content: space-between;
          i {
            font-size: 1.8rem;
          }
        }
        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }
        .clearfix:after {
          clear: both
        }
        .clearfix {
          text-align: center;
        }
      }
    }
  }
}
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
span{
  font-size:1.5rem;
}
</style>