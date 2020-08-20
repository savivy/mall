<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category'}">商品分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择活动区域">
           <el-option label="商品分类菜单" value="0"></el-option>
          <el-option
            v-for="(item) in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="fileChange"
          :auto-upload="false"
          :file-list="arr"
        >
          <!-- <img :src="ruleForm.img" alt=""> -->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "商品分类编辑";
      this.$http.get("/cateinfo", { id: this.id }).then(res => {
        let { status, img } = res.data.list;

        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false
        };
        this.arr.push({
          url: img.indexOf("http") != -1 ? img : "http://localhost:3000" + img
        });
      });
    } else {
      this.title = "商品分类添加";
    }
    this.$http.get("/catelist", { istree: true }).then(res => {
      console.log(res);
      this.cateList = res.data.list;
    });
  },
  data() {
    return {
      arr: [],
      dialogImageUrl: "",
      dialogVisible: false,
      id: "",
      title: "",
      cateList: [],
      ruleForm: {
        pid: "",
        catename: "",
        status: true
      },
      img: ""
    };
  },
  methods: {
    // 当文件发生改变之后出发的函数
    fileChange(file, filelist) {
      this.img = file.raw;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   console.log(this.ruleForm);
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let form = new FormData();
          for (let key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          if (this.img) {
            form.append("img", this.img);
          }
          if (!this.id) {
            this.$http.post("/cateadd", form).then(res => {
              this.$router.push("/category");
            });
          } else {
            form.append("id", this.id);
            this.$http.post("/cateedit", form).then(res => {
              this.$router.push("/category");
            });
          }
          // FormData
        } else {
          console.log("error submit!!");
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

<style scoped>
img {
  width: 200px;
}
</style>
