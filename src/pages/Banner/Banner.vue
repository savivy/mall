<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }">轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" width="130" prop="id"></el-table-column>
      <el-table-column label="轮播图标题" width="200" prop="title"></el-table-column>

      <el-table-column label="图片" width="200" prop="img">
        <template slot-scope="scope" v-if="scope.row.img">
          <img :src="'http://localhost:3000' + scope.row.img" />
        </template>
      </el-table-column>

      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="del(scope.row)" @onCancel="cancel">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加轮播图" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="ruleForm">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="'http://localhost:3000'+ruleForm.img" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd  = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getList();
  },

  data() {
    return {
      tableData: [],
      arr: [],
      name: "",
      
      dialogFormVisibleAdd: false,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        title: "",
        status: true,
        img: "",
        id:"",
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      img: "",
      formLabelWidth: "100px"
    };
  },

  methods: {
    handleEdit(index, row) {
      this.name = "编辑";
      this.dialogFormVisibleAdd = true;
      this.ruleForm.id = row.id;
       this.$http.get("/bannerinfo", row).then(res => {
          row.status==1?true:false
          this.ruleForm.title=row.title
        this.arr.push({
          url: row.img.indexOf('http')!=-1?row.img:'http://localhost:3000'+row.img
       });
       });console.log(this.name);
       
    },
    add() {
      this.name = "添加";
      this.dialogFormVisibleAdd = true;
    },
    sure() {
      this.ruleForm.status = this.ruleForm.status ? 1 : 2;
      let form = new FormData();
      for (let key in this.ruleForm) {
        form.append(key, this.ruleForm[key]);
      }
      if (this.img) {
        form.append("img", this.img);
      }
      if (this.name == "添加") {
        this.$http.post("/banneradd", form).then(res => {
          if (res.data.code == 200) {
            this.dialogFormVisibleAdd = false;
            this.getList();
          }
          this.ruleForm = {};
        });
      } else if (this.name == "编辑") {
        
        form.append("id", this.ruleForm.id);
        this.$http.post("/banneredit",form).then(res => {
          if (res.data.code == 200) {
            this.dialogFormVisibleAdd = false;
            this.getList();
          }
          this.ruleForm = {};
        });
      }
    },
    del(row) {
      console.log("确定删除");
      this.$http.post("/bannerdelete", { id: row.id }).then(res => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/bannerlist").then(res => {
        // console.log(res);
        this.tableData = res.data.list;
      });
    },
    fileChange(file, filelist) {
      this.img = file.raw;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.img = file.url;
      this.dialogVisible = true;
    }
  },
  filters: {
    status(num) {
      switch (num) {
        case 1:
          return "启用";
          break;
        default:
          return "禁用";
          break;
      }
    },
    isNew(flag) {
      switch (flag) {
        case 0:
          return "否";
          break;
        case 1:
          return "是";
          break;
        case 2:
          return "否";
          break;
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 150px;
}
</style>