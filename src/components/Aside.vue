<template>
  <el-aside width="200px">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="rgb(31 ,33, 40)"
        text-color="#fff"
        active-text-color="rgb(236 ,193, 71)"
        router
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu
          :index="index.toString()"
          v-for="(menuItem,index) in menuList"
          :key="menuItem.id"
        >
          <template slot="title">
            <i :class="menuItem.icon"></i>
            <span>{{menuItem.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="item.url"
              v-for="(item) in menuItem.children"
              :key="item.id"
            >{{item.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
export default {
 
  data() {
    return {
      // menuList: []
    };
  },
  methods: {
    // getData() {
    //   this.$http.get("/menulist", { istree: true }).then(res => {
    //     console.log(res);
    //     this.menuList = res.data.list;
    //   });
    // },
    
  },
   computed: {
       menuList(){
         return this.$store.state.user.menus
       }
   }
    
  
};
</script>

<style >
</style>