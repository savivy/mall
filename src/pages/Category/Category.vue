<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="add">添加</el-button>

    <el-table
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="分类编号" width="180" prop="id"></el-table-column>

      <el-table-column label="分类名称" width="180" prop="catename"></el-table-column>

      <el-table-column width="180" label="图片" prop="img">
        <template slot-scope="scope" v-if="scope.row.img">
          <img
            :src="scope.row.img.indexOf('http')!=-1?scope.row.img:'http://localhost:3000'+scope.row.img"
            alt
          />
        </template>
      </el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getList() {
      this.$http.get("/catelist", { istree: true }).then(res => {
        console.log(res);
        this.tableData = res.data.list;
      });
    },
    add() {
      this.$router.push("/category/insert");
    },
    handleEdit(index, row) {
      this.$router.push("/category/" + row.id);
    },
    handleDelete(index, row) {
      this.$http.post("/catedelete", { id: row.id }).then(res => {
        this.getList();
      });
    }
  },
  mounted() {
    this.getList();
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