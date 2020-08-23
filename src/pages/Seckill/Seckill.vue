<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seckill' }">秒杀列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="活动名称" width="180" prop="title"></el-table-column>

      <el-table-column label="状态" width="180" prop="status">
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
    <el-dialog :title="name" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="ruleForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-col :span="11">
                    <el-form-item prop="begintime">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.begintime"
                            style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="endtime">
                        <el-time-picker
                            placeholder="选择时间"
                            v-model="ruleForm.endtime"
                            style="width: 100%;"
                        ></el-time-picker>
                    </el-form-item>
                </el-col>
        </el-form-item>
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
          <el-select v-model="ruleForm.second_cateid" placeholder="请选择二级分类" @change="goodsChange">
            <el-option
              v-for="(item) in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-select v-model="ruleForm.goodsid" placeholder="请选择商品">
            <el-option
              v-for="(item) in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
    this.$http.get("/catelist", { pid: 0 }).then(res => {
      this.firstCate = res.data.list;
    });

    this.$http.get("/specslist", { size: 10, page: 1 }).then(res => {
      this.specList = res.data.list;
    });
   
  },

  data() {
    return {
      tableData: [],
      dialogFormVisibleAdd: false,
      dialogImageUrl: "",
      name: "",
      dialogVisible: false,
      id: "",
      // value1: "",
      firstCate: [],
      secondCate: [],
      goodsList: [],
      ruleForm: {
        title: "",
        goodsname: "",
        goodsid: "",
        begintime: "",
         endtime: "",
        first_cateid: "",
        second_cateid: "",
        status: false
      },
      rules: {
        goodsname: [
          { required: true, message: "请选择商品名称", trigger: "change" }
        ],
        first_cateid: [
          { required: true, message: "请选择上一级", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请选择上一级", trigger: "change" }
        ]
      },
      formLabelWidth: "100px"
    };
  },

  methods: {
    firstChange(id) {
      this.$http.get("/catelist", { pid: id }).then(res => {
        this.secondCate = res.data.list;
      });
    },
    goodsChange(id){
         this.$http.get('/goodslist',{pid:id}).then(res=>{
      this.goodsList=res.data.list
    })
    },
    add() {
      this.name = "添加秒杀";
      this.dialogFormVisibleAdd = true;
    },
    handleEdit(index, row) {
      this.name = "编辑秒杀";
      this.dialogFormVisibleAdd = true;
      this.id = row.id;
      this.$http.get("/seckinfo", { id: row.id }).then(res => {
        //   row.status==1?true:false
        let { status,goodsid, begintime, endtime } = row;
        begintime = this.formatTime(begintime)
         endtime = this.formatTime(endtime)
        this.ruleForm = {
          ...row,
          status: status == 1 ? true : false,
           begintime,
            endtime
        };
        
        console.log(this.value1);
        
      });
      this.firstChange(this.ruleForm.first_cateid);
      this.goodsChange(this.ruleForm.second_cateid);
      console.log(row);
    },
        del(row) {
      console.log("确定删除");
      this.$http.post("/seckdelete", { id: row.id }).then(res => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    sure() {
      this.ruleForm.status = this.ruleForm.status ? 1 : 2;
      if (this.name == "编辑秒杀") {
        this.$http
          .post("/seckedit", { ...this.ruleForm, id: this.id })
          .then(res => {
            if (res.data.code == 200) {
              this.dialogFormVisibleAdd = false;
              this.getList();
            }
            this.ruleForm = {};
          });
      } else if (this.name == "添加秒杀") {
        this.$http.post("/seckadd", this.ruleForm).then(res => {
          this.value1=this.ruleForm.begintime
          if (res.data.code == 200) {
            this.dialogFormVisibleAdd = false;
            this.getList();
          }
          this.ruleForm = {};
        });
      }
    },
  formatTime(time) {
            var date = new Date(time/1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return year+"-"+month+"-"+day+" " + h+":"+m+":"+s
        },
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/secklist").then(res => {
        // console.log(res);
        this.tableData = res.data.list;
      });
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