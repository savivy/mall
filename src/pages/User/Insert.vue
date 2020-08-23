<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择角色">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "管理员编辑";
      this.$http.get("/userinfo", { uid: this.id }).then((res) => {
        console.log(res);
        let { status } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
          password:""
        //   menus: JSON.parse(res.data.list.menus),
        };
      });
    } else {
      this.title = "管理员添加";
    }
    this.$http.get("/rolelist").then((res) => {
      console.log(res);
      this.roleList = res.data.list;
    });
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },
      roleList: [],
      id: "",
      title: "",
      ruleForm: {
        username: "",
        password: "",
        roleid: "",
        status: false,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
        roleid: {
          required: true,
          message: "请选择所属角色",
          trigger: "change",
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.ruleForm));
          obj.status = obj.status ? 1 : 2;
          if (!this.id) {
            this.$http.post("/useradd", obj).then((res) => {
              console.log(res);
              this.$router.push('/user')
            });
          } else {
            this.$http
              .post("/useredit", { ...obj, uid: this.id })
              .then((res) => {
                console.log(res);
                this.$router.push('/user')
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
</style>