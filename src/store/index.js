import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


const state = {
  // 用户的状态
  is_login: false,
  // 用户信息
  user_info: JSON.parse(localStorage.getItem('user_info')) || '',
  // 文章列表
  article_list: [],
  // 评论数据
  comment_data: [],
  // 点赞的数据
  priase_data: []
};


const mutations = {
  /* 
    updateLoginState
    更新用户的状态
  */
  updateLoginState(state, isLogin) {
    state.is_login = isLogin;
  },
  /*
    updateUserInfo
    更新用户信息
  */
  updateUserInfo(state, userInfo) {
    state.user_info = userInfo;
  },
  /* 
    updateArticleList
    更新文章数据
  */
  updateArticleList(state, articleList) {
    state.article_list = articleList;
  },
  /* 
    updateCommentData
    更新评论数据
  */
  updateCommentData(state, commentData) {
    state.comment_data = commentData;
  },
  /* 
    resolvePriaseData
    更新点赞过的数据
  */
  resolvePriaseData(state, priaseData) {
    // 将点赞过的评论的数据交给state保存
    state.priase_data = priaseData;

    // 处理原始的评论数据
    // 根据从数据库获取的用户点赞过的评论列表遍历原始的评论数据
    for (var index = 0; index < state.comment_data.length; index++) {
        for (let i = 0; i < priaseData.length; i++) {
          if (state.comment_data[index].comment_id == priaseData[i].comment_id) {
            return state.comment_data[index].is_like = 1;
          }
        }
    }
  }
};


const getters = {
  /* 
    updateArticleReadCount
    即时更新文章访问量
  */
  updateArticleReadCount(state, articleId) {
    return (articleId) => {
      state.article_list.map(item => {
        if (item.article_id == articleId) {
          item.read_count += 1;
        }
      });
    }
  },
  /* 
    updateCommentPraiseCount
    即时更新评论列表中点赞数
  */
  updateCommentPraiseCount(state, commentId) {
    return (commentId) => {
      state.comment_data.map(item => {
        if (item.comment_id == commentId) {
          item.like_count += 1;
        }
      });
    }
  },
  /* 
    updatePriaseEffect
    即时更新点赞效果
  */
  updatePriaseEffect(state, commentId) {
    return (commentId) => {
      state.comment_data.map(item => {
        if (item.comment_id == commentId) {
          item.is_like = 1;
        }
      });
    }
  }
};


const actions = {};
const modules = {};
const store = new Vuex.Store({
  state,
  mutations,
  getters
});

export default store;