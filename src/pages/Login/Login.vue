<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
     data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
             { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$store.dispatch('getUser',this.ruleForm)
           
                this.$router.push('/')
              
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style  scoped>
.el-form{
        width: 300px;
        height: 300px;
        border: 1px solid #eee;
        padding:30px;
        position: absolute;
        left:0;
        top: 0;
        bottom: 0;
        right: 0;
        margin:auto;
}
</style>