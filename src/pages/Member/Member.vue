<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="用户编号" width="180" prop="uid"></el-table-column>
      <el-table-column label="昵称  " width="180" prop="nickname"></el-table-column>

      <el-table-column label="手机号" width="180" prop="phone"></el-table-column>

      <el-table-column label="状态" width="180" prop="status">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="ruleForm">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd  = false">取 消</el-button>
        <el-button type="primary" @click="sure">修改</el-button>
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
      dialogFormVisibleAdd: false,
      dialogImageUrl: "",
      dialogVisible: false,
     uid:'',
      ruleForm: {
        nickname: "",
        phone: "",
        password: "",
        uid:"",
        status: false,
      },
      rules: {
        nickname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
         phone: [
          { required: true, message: "请输手机号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输手机号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
      },
      img: "",
      formLabelWidth: "100px"
    };
  },

  methods: {
    handleEdit(index, row) {
      this.dialogFormVisibleAdd = true;
      this.uid = row.uid;
       this.$http.get("/memberinfo", {uid:row.uid}).then(res => {
        //   row.status==1?true:false
        let {status}=row
          this.ruleForm={...row,status:status==1?true:false,password:''}
       
       });
       console.log(row);
       
    },
 
    sure() {
      this.ruleForm.status = this.ruleForm.status ? 1 : 2;
     
        this.$http.post("/memberedit",{...this.ruleForm,uid:this.uid}).then(res => {
          if (res.data.code == 200) {
            this.dialogFormVisibleAdd = false;
            this.getList();
          }
          this.ruleForm = {};
        });
     
    },
  
 
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/memberlist").then(res => {
        // console.log(res);
        this.tableData = res.data.list;
      });
    },
    
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