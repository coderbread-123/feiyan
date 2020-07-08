<template>
  <div class="login">
    <div class="form">
      <el-form :model="loginData" status-icon :rules="loginRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="loginData.email" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="loginData.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        } else {
          const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (!emailReg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
          }
          callback();
        }
      };
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else {
          if (value.length < 6 || value.length > 10) {
            callback(new Error('密码不能小于6位且不能超过10位'));
          }
          callback();
        }
      };
      return {
        loginData: {
          email: '',
          pwd: ''
        },
        loginRules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              user_email: this.loginData.email,
              user_pwd: this.loginData.pwd
            }
            this.$ajax.get('/user/login', params)
                  .then(response => {
                    const { code, message, userId, userName, userToken } = response.data;
                    
                    // 登陆失败
                    if (code != 0) {
                      this.$message({
                        type: 'error',
                        center: true,
                        message
                      });
                      return;
                    }

                    // 登陆成功
                    this.$message({
                      type: 'success',
                      center: true,
                      message
                    });

                    // 更新用户登录状态
                    this.$store.commit('updateLoginState', true);
                    // 持久化用户信息到本地
                    const user_info = {
                      user_id: userId,
                      user_name: userName,
                      user_token: userToken
                    };
                    localStorage.setItem('user_info', JSON.stringify(user_info));
                    // 更新用户信息
                    this.$store.commit('updateUserInfo', user_info);

  
                    // 登陆成功跳转
                    this.$router.push({ path: '/articleList' });
                  })
                  .catch(error => {
                    console.log(error);
                  });
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped> 
.login {
  .form {
    margin-top: .6rem;
    width: 100%;
  } 
}
</style>