<template>

    <div class="header">
        
        
        <div class="person">
            <div class="avatar">
                <el-avatar size="medium" :src="circleUrl"></el-avatar>
            </div>
            <div class="noLogin" v-if="!isLogin">
                <el-row>
                    <el-button size="medium" type="primary" :round="true" @click="login">登录</el-button>
                    <el-button size="medium" type="primary" :round="true" @click="register">注册</el-button>
                </el-row>
            </div>
            <div class="yesLogin" v-else>
                <span>{{ userName }}</span>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    },
    methods: {
        // 登录
        login() {
            this.$router.push({ path: '/login' });
        },
        // 注册
        register() {
            this.$router.push({ path: '/register' });
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.is_login;
        },
        userName() {
            return this.$store.state.user_info.user_name
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 3rem;
    position: fixed;
    z-index: 999;
    background-color: rgb(54, 54, 54);
    .person {
        float: right;
        margin-right: 21%;
        .avatar {
            float: left;
            margin: 0 1.3rem;
            height: 3rem;
            span {
                margin-top: .4rem;
            }
        }
        .noLogin {
            float: right;
            height: 3rem;
            line-height: 3rem;
        }
        .yesLogin {
            color: #fff;
            float: right;
            line-height: 3rem;
        }
    }
   
}

</style>