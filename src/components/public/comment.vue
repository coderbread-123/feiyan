<template>
    <div class="comment">
        <!-- 评论组件 -->
        <div class="comment_input">
            <el-input
                type="text"
                size="medium"
                placeholder="请输入内容"
                minlength="5"
                maxlength="100"
                :show-word-limit="true"
                :clearable="true"
                v-model="comment_content">
            </el-input>
        </div>
        <div class="list_title">
            <p>评论列表</p>
            <el-button type="primary" @click="addComment" :disabled="disCommitBtn">发表评论</el-button>
        </div>
        <!-- 评论列表 -->
        <div class="infinite-list-wrapper" style="overflow:auto">
            <ul class="comment_list">
                <li v-for="item in commentList" class="list-item" :key="item.comment_id">
                    <!-- 用户 -->
                    <div class="user">
                        <!-- 头像 -->
                        <span class="user_avator">
                            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="">
                        </span>
                        <!-- 昵称 -->
                        <span class="user_name">{{ item.user_name }}</span>
                    </div>
                    <!-- 评论 -->
                    <p class="comment_content">{{ item.comment_content }}</p>
                    <!-- 底部详情 -->
                    <div class="bottom">
                        <!-- 点赞和踩 -->
                        <div class="like_count">
                            <button @click="likeComment(item.comment_id)" class="iconfont icon-dianzan" :class="{ active: item.is_like }">
                                <span>{{ item.like_count }}</span>
                            </button>
                        </div>
                        <!-- 评论的时间 -->
                        <p class="add_time">
                            {{ item.add_time }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { resolveDate } from 'utils/utils.js';
export default {
    props: {
        articleId: {
            type: String,
            default: 1,
            required: true
        }
    },
    data() {
        return {
            user_id:  this.$store.state.user_info.user_id,
            user_name:  this.$store.state.user_info.user_name,
            comment_content: '',
            commentList: [],
            disCommitBtn: false
        }
    },
    methods: {
        /* 
            verifyUser
            验证登录有效性
        */
        verifyUser() {
            // 没有登陆或者登录已经过期
            const isLogin = this.$store.state.is_login;
            // 验证登录身份 
            if (!isLogin) {
                this.$message({
                    type: 'error',
                    center: true,
                    message: '你还未登录或登录已过期'
                });
                return false;
            }
            return true;
        },
        /* 
            addCommit
            添加评论
        */
        addComment() {
            // 验证用户的状态
            const result = this.verifyUser();
            if (!result) {
                return;
            }
            // 验证评论内容
            if (this.comment_content.length == '') {
                this.$message({
                    type: 'warning',
                    center: true,
                    message: '评论不能为空'
                });
                return;
            }
            // 验证成功可以评论
            const params = {
                article_id: this.articleId,
                user_id: this.user_id,
                user_name: this.user_name, 
                comment_content: this.comment_content
            }
            // 清空输入框的内容
            this.comment_content = '';
            this.$ajax.post('/comment/addComment', params)
                    .then(response => {
                        const { code, message } = response.data;
                        if (code === 0) {
                            this.$message({
                                type: 'success',
                                center: true,
                                message
                            });
                            // 禁用评论按钮10s以后再启用
                            this.disCommitBtn = true;
                            // 重新加载用户新添加的评论
                            this.loadComment();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        /* 
            loadComment
            加载评论
        */
        loadComment() {
            const params = { article_id: this.articleId };
            this.$ajax.get('/comment/getCommentByArticleId', params)
                .then(response => {
                    // 数组反转把最新的数据展示在最前面
                    const data = response.data.reverse();
                    // 处理数组中的时间并更新state中的评论数据
                    this.$store.commit('updateCommentData', resolveDate(data));

                    // 加载评论以后  要把当前用户id  和被点赞的评论的id 是否被点赞了 
                    // 保存到Vuex中 根据当前点赞过的数据  过滤  原始的评论  点赞过的  新增一个点赞过的标识
                    this.$ajax.get('/comment/getPraiseComment', { user_id: this.user_id })
                        .then(response => {
                            this.$store.commit('resolvePriaseData', response.data);
                            // 为评论重新赋值 此时拿到的是最新的值
                            this.commentList = this.$store.state.comment_data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        /* 
            likeComment
            点赞评论
        */
        likeComment(comment_id) {
            // 验证用户的状态
            const result = this.verifyUser();
            if (!result) {
                return;
            }
            // 验证成功可以点赞
            const params = { 
                user_id: this.user_id,
                comment_id: comment_id
            };
            this.$ajax.post('/comment/likeComment', params)
                .then(response => {
                    const { code, message } = response.data;
                    // 已经赞过了
                    if (code != 0) {
                        this.$message({
                            type: 'warning',
                            center: true,
                            message
                        });
                        return;
                    }
                    // 点赞成功以后
                    // 更新vuex中的数据和数据库保持同步
                    // 有三种办法
                    // 1 使用redis做缓存处理
                    // 2 把用户点赞的评论 先在vuex中getters修改一下（此时后台的数据库中已经修改只是没有推送回来）
                    // 3 后台点赞之后 插入关系之后 再查询一次评论
                    this.$store.getters.updateCommentPraiseCount(comment_id);
                    this.$store.getters.updatePriaseEffect(comment_id);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.loadComment();
    },
    watch: {
        // 监视按钮是否可用
        'disCommitBtn': function(newVal, oldVal) {
            setTimeout(() => {
                this.disCommitBtn = false
            }, 10000);
        }
    }
}
</script>

<style lang="less" scoped>
.comment {
    .comment_input {
        margin: .6rem 0;
    }
    .list_title {
        display: flex;
        justify-content: space-between;
        p {
            color: #666;
            margin: .6rem 0;
            font-size: 1.2rem;
            font-weight: bold;
        }
    }
    .comment_list {
        background-color: #F3F3F3;
        list-style: none;
        margin-top: 1.2rem;
        padding: 0;
        li {
            padding-top: .6rem;
            border-top: 1px solid #ccc;
            line-height: 1.5rem;
            word-break: break-all;
            padding: 0 5px;
            color: #000;
            .user {
                margin-top: 5px;
                .user_avator {
                    vertical-align: middle;
                    img {
                        width: 2.4rem;
                        height: 2.4rem;
                    }
                }
                .user_name {
                    color: #666;
                    font-size: .9rem;
                    margin-left: .6rem;
                }
            }
            .comment_content {
                margin: 0;
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                .like_count {
                    display: flex;
                    align-items: center;
                    button {
                        border: none;
                        outline: none;
                        font-size: 1.2rem;
                        background: none;
                        margin-right: 5px;
                        span {
                            color: #666;
                            margin-left: 5px;
                            font-size: 1rem;
                        }
                    }
                    .active {
                        color: #409EFF;
                    }
                }
                .add_time {
                    color: #666;
                }
            }
            
        }
        li:hover {
            box-shadow: 0 10px 5px #ddd;
        }
        .loading {
            text-align: center;
        }
        .no_more {
            text-align: center;
        } 
    }
}
</style>