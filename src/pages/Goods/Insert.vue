<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>

      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择一级分类" @change="firstChange">
          <el-option
            v-for="(item,index) in firstCate"
            :key="index"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择二级分类" >
          <el-option
            v-for="(item) in secondCate"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
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
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="ruleForm.specsid" placeholder="商品规格" @change="sepChange">
          <el-option
            v-for="(item,index) in specList"
            :key="index"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="规格属性">
          <el-option v-for="(item,index) in specAttr" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>

          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>

          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="商品描述" prop="description">
        <div id="editor"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>

        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 import wangEditor from 'wangeditor'
export default {
  data() {
    return {
      id: "",
      title: "",
      goodsList: [],
      firstCate: [],
      secondCate: [],
      specList: [],
      specAttr: [],
      arr: [],
      ruleForm: {
        goodsname: "",
        first_cateid: "",
        second_cateid: "",
        description: "",
        specsid: "",
        specsattr: "",
        price: "",
        market_price: "",
        status: false,
        isnew: "",
        ishot: ""
      },
      img: "",
      editor:null,
      dialogImageUrl: "",
      dialogVisible: false,
     
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        first_cateid: [
          { required: true, message: "请选择上一级", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请选择上一级", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    // let  editor= window.wangEditor;
    // let editor2 = new editor("#editor");
    // editor2.create();
    this.editor = new wangEditor("#editor");
    this.editor.create();
    this.$http.get("/catelist",{pid:0}).then(res => {
      this.firstCate = res.data.list;
      
    });
    
    this.$http.get("/specslist",{size:10,page:1}).then(res => {
      this.specList = res.data.list;
    });
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "商品编辑";
      this.$http.get("/goodsinfo", { id: this.id }).then(res => {
        let { status, img,isnew,ishot} = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
          isnew:isnew == 0 ? 2 : 1 ,
            ishot: ishot == 0 ? 2 : 1,
       
        };
        this.firstChange(this.ruleForm.first_cateid);
        this.editor.txt.html(res.data.list.description)
        this.arr.push({
          url: img.indexOf("http") != -1 ? img : "http://localhost:3000" + img
        });
      });
    } else {
      this.title = "商品添加";
    }
    // this.$http.get("/goodslist", { istree: true }).then(res => {
    //   console.log(res);
    //   this.goodsList = res.data.list;
    // });
  },
  methods: {
    firstChange(id) {
        
      this.$http.get("/catelist", { pid: id }).then(res => {
        this.secondCate = res.data.list;
      });
    },
    sepChange(id) {
      this.specAttr = this.specList.find(item => {
        return item.id == id;
      }).attrs;
    },
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
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.description=this.editor.txt.html()
          let form = new FormData();
          for (let key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          if (this.img) {
            form.append("img", this.img);
          }
          if (!this.id) {
            this.$http.post("/goodsadd", form).then(res => {
                // console.log(this.ruleForm);
              this.$router.push("/goods");
            });
            
          } else {
            form.append("id", this.id);

            this.$http.post("/goodsedit", form).then(res => {
                this.$router.push("/goods");
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
    }
  }
};
</script>

<style scoped>
</style>