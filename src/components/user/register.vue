<template>
  <div class="register">
    <div class="form">
      <el-form :model="registerData" status-icon :rules="registerRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input type="text" v-model="registerData.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerData.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="registerData.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="registerData.checkPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
       const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('昵称不能为空'));
        } else {
          if (value.length > 6) {
            callback(new Error('昵称不能超过6个字符'));
          }
          callback();
        }
      };
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
      const validatePwds = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerData.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerData: {
          name: '',
          email: '',
          pwd: '',
          checkPwd: ''
        },
        registerRules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePwd, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validatePwds, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              user_name: this.registerData.name,
              user_email: this.registerData.email,
              user_pwd: this.registerData.pwd
            }
            this.$ajax.post('/user/addUser', params)
                    .then(response => {
                      const { code, message } = response.data;
                      // 邮箱已注册
                      if (code != 0) {
                        this.$message({
                          type: 'warning',
                          center: true,
                          message
                        });
                        return;
                      }
                      // 注册成功
                      this.$message({
                        type: 'success',
                        center: true,
                        message
                      });
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
.register {
  .form {
    margin-top: .6rem;
    width: 100%;
  } 
}
</style>