<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商品编号" width="80" prop="id"></el-table-column>

      <el-table-column label="商品名称" width="100" prop="goodsname"></el-table-column>

      <el-table-column width="80" label="商品价格" prop="price"></el-table-column>
      <el-table-column width="80" label="市场价格" prop="market_price"></el-table-column>
      <el-table-column label="图片" width="150" prop="img">
        <template slot-scope="scope" v-if="scope.row.img">
          <img
            :src="scope.row.img.indexOf('http')!=-1?scope.row.img:'http://localhost:3000'+scope.row.img"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="100" prop="isnew">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.isnew| isFlag}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100" prop="ishot">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.ishot| isFlag}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" >{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="5" @current-change="turn"></el-pagination>
  </div>
</template>

<script>
export default {
  filters: {
    status(num) {
      switch (num) {
        case 1:
          return "启用";
          break;

        case 2:
          return "禁用";
          break;
      }
    },
    isFlag(num) {
      switch (num) {
        case 1:
          return "是";
          break;

        default:
          return "否";
          break;
      }
    }
  },
  data() {
    return {
      tableData: [],
      total:0,
      currentPage:1,
      type:""
     
    };
  },
  methods: {
      turn(n){
          this.currentPage=n;
          this.getList()
      },
    getList() {
      this.$http.get("/goodslist",{size: 5, page: this.currentPage}).then(res => {
        console.log(res);
        this.tableData = res.data.list;
    
        
      });
    },
    add() {
      this.$router.push("/goods/insert");
    },
    handleEdit(index, row) {
      this.$router.push("/goods/" + row.id);
    },
    handleDelete(index, row) {
      this.$http.post("/goodsdelete", { id: row.id }).then(res => {
        this.getList();
      });
    }
  },
  mounted() {
    this.getList();
    this.$http.get('/goodscount').then(res=>{
        this.total=res.data.list[0].total
    })
    
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
img {
  width: 150px;
}
</style>