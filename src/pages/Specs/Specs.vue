<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="add">添加</el-button>

    <el-table
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="规格编号" width="80" prop="id"></el-table-column>

      <el-table-column label="规格名称" width="100" prop="specsname" ></el-table-column>
      <el-table-column label="规格属性" width="480" prop="attrs">
        <template slot-scope="scope">
          <el-button type="primary" plain v-for="(item) in scope.row.attrs" :key="item.id" size="small">{{item}}</el-button>
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
      tableData: [],
      
    };
  },
  methods: {
    getList() {
      this.$http.get("/specslist", {size:5,page:1}).then(res => {
        console.log(res);
        this.tableData = res.data.list;
      
      });
    },
    add() {
      this.$router.push("/specs/insert");
    },
    handleEdit(index, row) {
      this.$router.push("/specs/" + row.id);
    },
    handleDelete(index, row) {
      this.$http.post("/specsdelete", { id: row.id }).then(res => {
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