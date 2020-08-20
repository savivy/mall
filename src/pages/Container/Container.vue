<template>
	<el-container>
	    <Aside></Aside>
	  <el-container>
	    <el-header>Header</el-header>
	    <el-main>
			
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
import Aside from '@/components/Aside'
export default{
	components:{
                   Aside
	},
	methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
		
	html,body,#app{
		width: 100%;
		height: 100%;
	}
	.el-container{
		width: 100%;
		height: 100%;
	}
		 	  .el-con{
		      height: 100%;
		      background-color: rgb(31,33, 40);
	}
	 .el-aside{
	    background-color: rgb(31 ,33, 40);
	    color: #333;
	  }

	.el-header, .el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	  }
	  

	  .el-main {
	    background-color: #fff;
	    color: #333;
	  }
</style>
