<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">商品规格</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-dynamic">
      <el-form-item label="规格名称" prop="specsname" class="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in ruleForm.attrs"
        :label="'规格属性'"
        :key="domain.id"
        :prop="'attrs.' + index+ '.value'"
        :rules="{required: true, message: '属性不能为空', trigger: 'blur'}"
      >
        <el-input v-model="domain.value" class="specattr"></el-input>
        <el-button @click="addDomain" class="addDomain">新增属性</el-button>
        <el-button @click.prevent="removeDomain(domain)" type="primary">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "规格编辑";
      this.$http.get("/specsinfo", { id: this.id }).then(res => {
        // console.log(res);
        let { status, attrs } = res.data.list;
        
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
         
         
        };
        
       
        
      });
    } else {
      this.title = "规格添加";
    }
  },
  data() {
    return {
      title: "",index:0,
      ruleForm: {
        attrs: [
          {
            value: ''
          }
        ],
        specsname: "",

        status: false
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let arr = this.ruleForm.attrs.map(item => {
            return item.value;
          });
          console.log(arr);
          let obj = JSON.parse(JSON.stringify(this.ruleForm));
          obj.attrs = arr.join(",");
          
          
          if (!this.id) {
            this.$http.post("/specsadd", obj).then(res => {
              console.log(res);
              this.$router.push("/specs");
            });
          } else {
            this.$http.post("/specsedit", { ...obj, id: this.id }).then(res => {
              this.$router.push("/specs");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: ""
        // key: Date.now(),
      });
    }
  }
};
</script>

<style scoped>
.specsname {
  width: 600px;
}
.specattr {
  width: 400px;
}
.addDomain {
  width: 100px;
  background-color: rgb(241, 108, 107);
  color: #fff;
}
</style>